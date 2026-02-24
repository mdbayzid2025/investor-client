import { useGetMessagesQuery } from "@/redux/slice/chatApi";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useRef } from "react";

function ConversationPanel({
  conversationId,  
}: {
  conversationId: string;
  
}) {
  const { data, isLoading } =
    useGetMessagesQuery(conversationId);

    console.log("messages", data);
    
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (isLoading) {
    return <p className="p-4 text-gray-400">Loading messages...</p>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
        <button  className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <p className="text-white font-semibold">
          {data?.data?.initiatorAlias}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {data?.data?.messages.map((msg: any) => (
          <ChatBubble key={msg._id} msg={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input (send API can be added later) */}
      <div className="px-6 py-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            disabled
            placeholder="Message sending coming next..."
            className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400"
          />
          <button
            disabled
            className="bg-[#E6C97A] p-2 rounded-full opacity-50"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
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
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
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