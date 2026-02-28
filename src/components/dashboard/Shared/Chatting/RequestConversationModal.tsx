import { useGetMyConversationQuery, useGetOwnerConversationQuery } from "@/redux/slice/chatApi";
import { useGetRequestByIdQuery } from "@/redux/slice/requestApi";
import { useGetProfileQuery } from "@/redux/slice/userApi";
import {
  MessageSquare,
  X
} from "lucide-react";
import { useState } from "react";
import ConversationPanel from "./ConversationPanel";
import { useSearchParams } from "next/navigation";

// ───────────────── Types ─────────────────

type OwnerConversation = {
  _id: string;
  initiatorAlias: string;
  status: "active" | "closed";
  lastMessage: string;
  lastMessageAt: string;
  postId: {
    _id: string;
    title: string;
  };
};

// ───────────────── Chat List (Owner) ─────────────────

function ChatListPanel({
  onSelect,
  requestId
}: {
  onSelect: (conversationId: string) => void;
  requestId: string;
}) {
  const { data, isLoading } = useGetOwnerConversationQuery(requestId);

  if (isLoading) {
    return <p className="p-4 text-gray-400">Loading conversations...</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-[#E6C97A]" />
        <h3 className="text-sm font-semibold text-white">
          Conversations
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-white/5">
        {data?.data.map((c: OwnerConversation) => (
          <button
            key={c._id}
            onClick={() => onSelect(c._id)}
            className="w-full flex gap-3 px-6 py-4 hover:bg-white/5 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-[#E6C97A] flex items-center justify-center font-bold text-black">
              {c.initiatorAlias.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <p className="text-sm font-semibold text-white truncate">
                  {c.initiatorAlias}
                </p>
                <span className="text-[10px] text-gray-500">
                  {new Date(c.lastMessageAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-gray-400 truncate">
                {c.lastMessage}
              </p>

              <p className="text-[10px] text-[#E6C97A] mt-1">
                {c.postId.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ───────────────── User Conversation Panel ─────────────────

function UserConversationWrapper({ requestId }: { requestId: string }) {
  const { data, isLoading } = useGetMyConversationQuery(requestId);


  if (isLoading) {
    return <p className="p-4 text-gray-400">Loading conversation...</p>;
  }

  const conversationId = data?.data?._id;

  if (!conversationId) {
    return <p className="p-4 text-gray-400">No conversation found.</p>;
  }

  return <ConversationPanel conversationId={conversationId} />;
}

// ───────────────── Main Modal ─────────────────

export default function RequestConversationModal({
  open,
  onClose,
  request
}: {
  open: boolean;
  onClose: () => void;
  request: any;
}) {
  const [selectedConversationId, setSelectedConversationId] =
    useState<string | null>(null);

  const { data: profileData } = useGetProfileQuery({});
  const { data: requestData, isLoading } = useGetRequestByIdQuery(request?._id);
  const searchParams = useSearchParams()

  const search = searchParams.get('search')
  if (!open) return null;

  const owner = profileData?._id?.toString() === requestData?.createdBy?._id?.toString();


  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[90vh] bg-[#0D0D0D] border border-[#E6C97A]/30 rounded-2xl overflow-hidden flex flex-col">

        {/* Top Header */}
        <div className="flex justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Request Conversation
            </h2>
            <p className="text-xs text-gray-400">
              {owner ? "Owner conversation panel" : "Your conversation"}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedConversationId(null);
              onClose();
            }}
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <p className="p-4 text-gray-400">Loading...</p>
          ) : !owner ? (
            <UserConversationWrapper requestId={request?._id} />
          ) : (
            selectedConversationId ? (
              <ConversationPanel
                conversationId={selectedConversationId}
                setSelectedConversationId={setSelectedConversationId}
              />
            ) : (
              <ChatListPanel
                onSelect={setSelectedConversationId}
                requestId={request?._id}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}