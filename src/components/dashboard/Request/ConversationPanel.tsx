import MuiImageViewer from "@/components/shared/MuiImageViewer";
import { useGetMessagesQuery, useSendMessageMutation } from "@/redux/slice/chatApi";
import { getImageUrl } from "@/utils/baseUrl";
import Grid from "@mui/material/Grid";
import { ArrowLeft, Image, Loader, MessageCircleMore, OctagonX, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function ConversationPanel({ conversationId, setSelectedConversationId }: { conversationId: string; setSelectedConversationId?: any }) {

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [loading, setLoading] = useState(false);
    const [message, setMesage] = useState("")

    const { data, isLoading } = useGetMessagesQuery(conversationId);
    const [sendMessage] = useSendMessageMutation()
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [data]);

    const removeImage = (index: number) => {
        setImageFiles((prev) => prev.filter((_, i) => i !== index))
    }

    // Message Send
    const handleSendMessage = async (e: any) => {
        e.preventDefault();


        const payload = new FormData();
        payload.append("data", JSON.stringify({ content: message }));

        if (imageFiles?.length) {
            imageFiles?.map(img => {
                payload.append("images", img)
            })
        }
        try {
            const response = await sendMessage({ id: conversationId, payload })?.unwrap();

            if (response?.success) {
                toast.success(response?.message);
                setImageFiles([]);
                setMesage("");
            }
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            {isLoading ? <p className="p-4 text-gray-400 animate-bounce"><Loader /></p>
                : data?.conversation?.myAlias === "Post Owner" &&
                <div onClick={() => setSelectedConversationId("")} className="flex items-center gap-3 px-6 py-4 border-b border-white/10 cursor-pointer">
                    <button className="text-gray-400 hover:text-white">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <p className="text-white font-semibold">Back </p>
                </div>}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {data?.messages?.length ? data?.messages.map((msg: any) => (
                    <ChatBubble key={msg._id} msg={msg} />
                )) :
                    <>
                        {/* Empty Messages */}
                        <div className="flex-1 flex h-[calc(100%-100px)] items-center justify-center px-4 py-2">
                            <div className="flex flex-col items-center gap-4 px-8 text-center">
                                <MessageCircleMore  className="w-32 h-32 text-primary" strokeWidth={1.5} />
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
                    </>
                }
                <div ref={messagesEndRef} />
            </div>

            {/* -------------- Message Footer ----------- */}
            {data?.conversation?.status === "closed" ?
                <div className="px-6 py-6 border-t border-white/10 relative flex items-center justify-center gap-2 text-slate-500">
                    <OctagonX size={20} />
                    <p className="text-center  text-sm"> This conversation has been closed by admin</p>
                </div>
                : <div className="px-6 border-t border-white/10 relative">
                    {/* Image Preview */}
                    {imageFiles.length > 0 && (
                        <div className="absolute -top-[180%] w-full pr-14  flex gap-3 justify-end overflow-x-auto bg-transparent">
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
                            {/* Image Upload */}
                            <label className={`cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
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
                                                // @ts-ignore
                                                ...Array.from(e.target.files),
                                            ])
                                        }
                                    }}
                                />
                                <Image className="text-gray-500 hover:text-gray-700" />
                            </label>

                            <input
                                name="content"
                                value={message}
                                onChange={(e)=>setMesage(e.target.value)}
                                placeholder="Message sending coming next..."
                                className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300"
                            />
                            <button type="submit" className="bg-primary p-2 rounded-full">
                                <Send className="w-4 h-4 text-black" />
                            </button>
                        </div>
                    </form>
                </div>}
            {/* Input (send API can be added later) */}

        </div>
    );
}


function ChatBubble({ msg }: { msg: any }) {
    const isOwn = msg.senderRole === "OWNER";

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
        <div className={`flex flex-col ${msg?.isMine ? "items-end" : "items-start"}`}>
            <div className="flex items-center gap-2">
                {msg?.images?.length > 0 &&
                    msg?.images?.map((img: string, i: number) =>
                        <Grid size={{ xs: 4, md: 4 }} key={i}>
                            <MuiImageViewer
                                src={`${getImageUrl()}${img}`}
                                alt={`Image ${i + 1}`}
                                height={100}
                                style={{ borderRadius: 8, objectFit: 'cover', }}
                            />
                        </Grid>
                    )
                }
            </div>
            <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${isOwn
                    ? "bg-[#E6C97A] text-black rounded-br-md"
                    : "bg-[#1A1A1A] text-gray-300 rounded-bl-md border border-white/10"
                    }`}
            >


                {!isOwn && (
                    <p className="text-[10px] text-gray-400 mb-1">
                        {msg.senderAlias}
                    </p>
                )}
                {msg.content}
                <p className="text-[9px] text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
}

export default ConversationPanel;