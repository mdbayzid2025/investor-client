// ConversationPanel.tsx
import MuiImageViewer from "@/components/shared/MuiImageViewer";
import { getIsAuthenticated } from "@/hooks/socket";
import useSocket from "@/hooks/useSocket";
import { useGetMessagesQuery, useSendMessageMutation } from "@/redux/slice/chatApi";
import { useGetProfileQuery } from "@/redux/slice/userApi";
import { getImageUrl } from "@/utils/baseUrl";
import Grid from "@mui/material/Grid";
import {
    ArrowLeft,
    Image,
    Loader,
    MessageCircleMore,
    OctagonX,
    Send,
    X,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";

const SOCKET_EVENTS = {
    SEND_MESSAGE: "send_message",
    NEW_MESSAGE: "new_message",
    JOIN_CONVERSATION: "join_conversation",
    LEAVE_CONVERSATION: "leave_conversation",
    MESSAGE_SENT: "message_sent",
    USER_TYPING: "user_typing",
    USER_STOPPED_TYPING: "user_stopped_typing",
    TYPING_START: "typing_start",
    TYPING_STOP: "typing_stop",
    ERROR: "error",
    // ✅ Added missing events
    WARNING: "warning",
    CHAT_NOTIFICATION: "chat_notification",
};

function ConversationPanel({
    conversationId,
    setSelectedConversationId,
}: {
    conversationId: string;
    setSelectedConversationId?: any;
}) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    // ✅ Removed redundant localMessages state — use single source of truth
    const [messages, setMessages] = useState<any[]>([]);
    const [typingAlias, setTypingAlias] = useState<string | null>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // ── Pagination state ──────────────────────────────────────────────
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const isInitialLoad = useRef(true);

    // ✅ profileId ref to avoid stale closures
    const profileIdRef = useRef<string | undefined>(undefined);

    const { data, isLoading } = useGetMessagesQuery({ chatId: conversationId, page, limit: 50 });
    const [sendMessage] = useSendMessageMutation();
    // ✅ Fixed: was watching profileData?.data?._id but the query returns profileData?._id
    const { data: profileData } = useGetProfileQuery({});
    const socket = useSocket();

    // ✅ Fixed: correct dependency — profileData?._id not profileData?.data?._id
    useEffect(() => {
        profileIdRef.current = profileData?._id;
    }, [profileData?._id]);

    // ─── Handle incoming page data ────────────────────────────────────
    useEffect(() => {
        if (!data?.messages || !profileIdRef.current) return;

        const enriched = data.messages.map((msg: any) => ({
            ...msg,
            isMine: msg.senderId === profileIdRef.current,
        }));


        setMessages(prev => page === 1 ? enriched : [...prev, ...enriched])

        // if (isInitialLoad.current) {
        //     setMessages(enriched);
        //     isInitialLoad.current = false;
        // } else {
        //     // Subsequent pages: prepend older messages, de-duplicate by _id
        //     setMessages((prev) => {
        //         const existingIds = new Set(prev.map((m) => m._id));
        //         const newOnes = enriched.filter((m: any) => !existingIds.has(m._id));
        //         return [...newOnes, ...prev];
        //     });
        // }

        const pagination = data?.pagination;
        setHasMore(pagination ? pagination.page < pagination.totalPages : false);
        setIsFetchingMore(false);
    }, [data?.messages, profileData?._id]);

    // ─── Scroll to bottom on initial load only ────────────────────────
    useEffect(() => {
        if (!isLoading && page === 1) {
            messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        }
    }, [isLoading]);

    // ─── Scroll to bottom when new messages arrive (not paginating up) ─
    const prevLengthRef = useRef(0);
    useEffect(() => {
        const curr = messages.length;
        const prev = prevLengthRef.current;

        if (curr > prev && !isFetchingMore) {
            const lastMsg = messages[curr - 1];
            if (lastMsg?.isMine || lastMsg?.senderId) {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        }
        prevLengthRef.current = curr;
    }, [messages]);

    // ─── Scroll handler: load more when scrolled to top ──────────────
    const handleScroll = useCallback(() => {
        const container = messagesContainerRef.current;
        if (!container || !hasMore || isFetchingMore) return;

        if (container.scrollTop <= 80) {
            const prevScrollHeight = container.scrollHeight;

            setIsFetchingMore(true);
            setPage((p) => p + 1);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const newScrollHeight = container.scrollHeight;
                    container.scrollTop = newScrollHeight - prevScrollHeight;
                });
            });
        }
    }, [hasMore, isFetchingMore]);

    // ─── Join AFTER authentication ────────────────────────────────────
    useEffect(() => {
        if (!data?.messages || !profileIdRef.current) return;

        const enriched = data.messages.map((msg: any) => ({
            ...msg,
            isMine: msg.senderId === profileIdRef.current,
        }));

        setMessages(prev => {
            if (page === 1) return enriched;

            const existingIds = new Set(prev.map(m => m._id));
            const newMessages = enriched.filter((m: any) => !existingIds.has(m._id));

            return [...newMessages, ...prev];
        });
        const pagination = data?.pagination;
        setHasMore(pagination ? pagination.page < pagination.totalPages : false);
        setIsFetchingMore(false);

    }, [data?.messages, page]);


    // ─── Listen for incoming messages + all server socket events ─────
    useEffect(() => {
        if (!socket) return;

        // NEW_MESSAGE: broadcast to room, add if not already present
        const handleNewMessage = (msg: any) => {
            setMessages((prev) => {
                const exists = prev.some((m) => m._id === msg._id);
                if (exists) return prev;
                return [
                    ...prev,
                    {
                        ...msg,
                        isMine: msg.senderId === profileIdRef.current,
                    },
                ];
            });
        };

        // MESSAGE_SENT: server confirmed save — replace optimistic message
        const handleMessageSent = ({
            message: savedMsg,
        }: {
            tempId: string;
            message: any;
        }) => {
            setMessages((prev) =>
                prev.map((m) =>
                    // Match by optimistic flag + content since we have no real tempId
                    m._id?.toString().startsWith("optimistic-") &&
                        m.content === savedMsg.content
                        ? { ...savedMsg, isMine: true }
                        : m
                )
            );
        };

        // WARNING: server auto-deleted message (contact info detected)
        const handleWarning = ({ message: warningMsg }: { message: string }) => {
            toast.warning(warningMsg);
            // Remove the optimistic message that was just sent, since server deleted it
            setMessages((prev) =>
                prev.filter((m) => !m._id?.toString().startsWith("optimistic-"))
            );
        };

        // CHAT_NOTIFICATION: other user is not in room — show toast for other convos
        const handleChatNotification = ({
            conversationId: notifConvId,
            senderAlias,
            preview,
        }: {
            conversationId: string;
            senderAlias: string;
            preview: string;
            createdAt: string;
        }) => {
            // Only notify if it's not the currently open conversation
            if (notifConvId !== conversationId) {
                toast.info(`💬 ${senderAlias}: ${preview}`);
            }
        };

        // ERROR: server-side rejections (unauth, closed, unauthorized, etc.)
        const handleError = ({ message: errMsg }: { message: string }) => {
            toast.error(errMsg);
            setLoading(false);
            // Remove any pending optimistic message on error
            setMessages((prev) =>
                prev.filter((m) => !m._id?.toString().startsWith("optimistic-"))
            );
        };

        socket.on(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
        socket.on(SOCKET_EVENTS.MESSAGE_SENT, handleMessageSent);
        socket.on(SOCKET_EVENTS.WARNING, handleWarning);
        socket.on(SOCKET_EVENTS.CHAT_NOTIFICATION, handleChatNotification);
        socket.on(SOCKET_EVENTS.ERROR, handleError);

        return () => {
            socket.off(SOCKET_EVENTS.NEW_MESSAGE, handleNewMessage);
            socket.off(SOCKET_EVENTS.MESSAGE_SENT, handleMessageSent);
            socket.off(SOCKET_EVENTS.WARNING, handleWarning);
            socket.off(SOCKET_EVENTS.CHAT_NOTIFICATION, handleChatNotification);
            socket.off(SOCKET_EVENTS.ERROR, handleError);
        };
        // ✅ conversationId in deps so CHAT_NOTIFICATION check is always fresh
    }, [socket, conversationId]);

    // ─── Typing indicators ────────────────────────────────────────────
    useEffect(() => {
        if (!socket) return;

        const handleUserTyping = ({ alias }: { alias: string }) =>
            setTypingAlias(alias);
        const handleUserStoppedTyping = () => setTypingAlias(null);

        socket.on(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
        socket.on(SOCKET_EVENTS.USER_STOPPED_TYPING, handleUserStoppedTyping);

        return () => {
            socket.off(SOCKET_EVENTS.USER_TYPING, handleUserTyping);
            socket.off(SOCKET_EVENTS.USER_STOPPED_TYPING, handleUserStoppedTyping);
        };
    }, [socket]);

    // ─── Typing emit helpers ──────────────────────────────────────────
    const emitTyping = () => {
        if (!socket || !profileData) return;
        socket.emit(SOCKET_EVENTS.TYPING_START, {
            conversationId,
            alias: data?.conversation?.myAlias ?? "User",
        });
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit(SOCKET_EVENTS.TYPING_STOP, {
                conversationId,
                alias: data?.conversation?.myAlias ?? "User",
            });
        }, 1500);
    };

    const removeImage = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // ─── Send message ─────────────────────────────────────────────────
    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        if (!message.trim() && !imageFiles.length) return;



        // Images go through REST
        if (imageFiles.length > 0) {
            setLoading(true);
            const payload = new FormData();
            payload.append("data", JSON.stringify({ content: message }));
            imageFiles.forEach((img) => payload.append("images", img));

            try {
                const response = await sendMessage({
                    id: conversationId,
                    payload,
                })?.unwrap();
                if (response?.success) {
                    setImageFiles([]);
                    setMessage("");
                }
            } catch (error: any) {
                toast.error(error?.data?.message);
            } finally {
                setLoading(false);
            }
            return;
        }

        // Text → socket
        if (!socket) {
            toast.error("Not connected to server");
            return;
        }

        if (!getIsAuthenticated()) {
            toast.error("Socket not authenticated yet, please wait...");
            return;
        }


        setMessage("");

        const trimmed = message.trim();
        if (!trimmed && !imageFiles.length) return;

        // // ✅ Optimistic message: show immediately, replaced on MESSAGE_SENT or removed on WARNING/ERROR
        // const optimisticMsg = {
        //     _id: `optimistic-${Date.now()}`,
        //     conversationId,
        //     content: trimmed,
        //     type: "text",
        //     images: [],
        //     senderAlias: data?.conversation?.myAlias ?? "You",
        //     senderId: profileIdRef.current,
        //     isMine: true,
        //     createdAt: new Date().toISOString(),
        // };
        // setMessages((prev) => [...prev, optimisticMsg]);

        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
            conversationId,
            content: trimmed,
        });
    };

    const handleOnChange = (e: any) => {
        setMessage(e.target.value);
        emitTyping();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            {isLoading && page === 1 ? (
                <p className="p-4 text-gray-400 animate-bounce">
                    <Loader />
                </p>
            ) : (
                data?.conversation?.myAlias === "Post Owner" && (
                    <div
                        onClick={() => setSelectedConversationId("")}
                        className="flex items-center gap-3 px-6 py-4 border-b border-white/10 cursor-pointer"
                    >
                        <button className="text-gray-400 hover:text-white">
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <p className="text-white font-semibold">Back</p>
                    </div>
                )
            )}

            {/* Messages */}
            <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-3"
            >
                {/* Load more indicator */}
                {isFetchingMore && (
                    <div className="flex justify-center py-2">
                        <Loader className="w-4 h-4 text-gray-400 animate-spin" />
                    </div>
                )}

                {/* No more messages indicator */}
                {!hasMore && messages.length > 0 && page > 1 && (
                    <p className="text-center text-xs text-gray-600 py-2">
                        — Beginning of conversation —
                    </p>
                )}

                {messages.length ? (
                    messages.map((msg: any) => (
                        <ChatBubble key={msg._id} msg={msg} />
                    ))
                ) : (
                    <div className="flex-1 flex h-[calc(100%-100px)] items-center justify-center px-4 py-2">
                        <div className="flex flex-col items-center gap-4 px-8 text-center">
                            <MessageCircleMore
                                className="w-32 h-32 text-primary"
                                strokeWidth={1.5}
                            />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                                    No messages yet
                                </h3>
                                <p className="text-gray-500 max-w-sm">
                                    Start a conversation by sending your first message below
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Typing indicator */}
                {typingAlias && (
                    <div className="flex items-start">
                        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl rounded-bl-md px-4 py-2 text-xs text-gray-400 italic">
                            {typingAlias} is typing…
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            {data?.conversation?.status === "closed" ? (
                <div className="px-6 py-6 border-t border-white/10 flex items-center justify-center gap-2 text-slate-500">
                    <OctagonX size={20} />
                    <p className="text-center text-sm">
                        This conversation has been closed by admin
                    </p>
                </div>
            ) : (
                <div className="px-6 border-t border-white/10 relative">
                    {/* Image Preview */}
                    {imageFiles.length > 0 && (
                        <div className="absolute -top-[180%] w-full pr-14 flex gap-3 justify-end overflow-x-auto bg-transparent">
                            {imageFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-xl border bg-primary p-2 shadow"
                                >
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow"
                                        disabled={loading}
                                    >
                                        <X size={14} />
                                    </button>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="h-24 w-24 rounded-lg object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <form onSubmit={handleSendMessage}>
                        <div className="flex items-center gap-2 py-4">
                            <label
                                className={`cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    disabled={loading}
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setImageFiles((prev) => [
                                                ...prev,
                                                ...Array.from(e.target.files!),
                                            ]);
                                        }
                                    }}
                                />
                                <Image className="text-gray-500 hover:text-gray-700" />
                            </label>

                            <input
                                name="content"
                                value={message}
                                onChange={handleOnChange}
                                placeholder="Type a message..."
                                className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300"
                            />
                            <button
                                type="submit"
                                disabled={loading || (!message.trim() && !imageFiles.length)}
                                className="bg-primary p-2 rounded-full disabled:opacity-50"
                            >
                                <Send className="w-4 h-4 text-black" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

function ChatBubble({ msg }: { msg: any }) {
    // ✅ Optimistic messages show with a subtle opacity while pending
    const isPending = msg._id?.toString().startsWith("optimistic-");

    if (msg.senderRole === "SYSTEM") {
        return (
            <div className="flex justify-center">
                <div className="bg-[#D4AF370D] border border-[#E6C97A]/30 rounded-xl px-4 py-2 text-xs text-gray-300">
                    {msg.message}
                </div>
            </div>
        );
    }

    return (
        <div
            className={`flex flex-col ${msg?.isMine ? "items-end" : "items-start"} ${isPending ? "opacity-60" : "opacity-100"} transition-opacity duration-200`}
        >
            {msg?.images?.length > 0 && (
                <div className="flex items-center gap-2 mb-1">
                    {msg.images.map((img: string, i: number) => (
                        <Grid size={{ xs: 4, md: 4 }} key={i}>
                            <MuiImageViewer
                                src={`${getImageUrl()}${img}`}
                                alt={`Image ${i + 1}`}
                                height={100}
                                style={{ borderRadius: 8, objectFit: "cover" }}
                            />
                        </Grid>
                    ))}
                </div>
            )}
            <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg?.isMine
                    ? "bg-[#E6C97A] text-black rounded-br-md"
                    : "bg-[#1A1A1A] text-gray-300 rounded-bl-md border border-white/10"
                    }`}
            >
                {!msg?.isMine && (
                    <p className="text-[10px] text-gray-400 mb-1">{msg.senderAlias}</p>
                )}
                {msg.content}
                <p className="text-[9px] text-gray-500 mt-1 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                    {/* ✅ Pending indicator */}
                    {isPending && <span className="italic">· sending…</span>}
                </p>
            </div>
        </div>
    );
}

export default ConversationPanel;