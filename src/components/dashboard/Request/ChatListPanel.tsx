import { MessageSquare } from "lucide-react";

function ChatListPanel({
  participants,
  onSelect,
}: {
  participants: any[];
  onSelect: (p: any) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Panel Header */}
      <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#E6C97A]" />
          <h3 className="text-sm font-semibold text-white">Conversations</h3>
          <span className="ml-auto text-[10px] bg-[#E6C97A]/10 text-[#E6C97A] border border-[#E6C97A]/30 rounded-full px-2 py-0.5">
            {participants.length} participants
          </span>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5">
        {participants.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className="w-full flex items-start gap-3 px-4 sm:px-6 py-3 sm:py-4 hover:bg-white/5 transition text-left group"
          >
            {/* Avatar */}
            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#E6C97A] to-[#C4A962] flex items-center justify-center text-sm font-bold text-black">
              {p.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#E6C97A] transition">
                    {p.author}
                  </p>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 border border-white/10 rounded-full px-1.5 py-0.5">
                    {p.role}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-500 shrink-0 ml-2">{p.lastTime}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 truncate">{p.lastMessage}</p>
            </div>

            {/* Unread badge */}
            {p.unread > 0 && (
              <div className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#E6C97A] flex items-center justify-center">
                <span className="text-[9px] sm:text-[10px] font-bold text-black">{p.unread}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChatListPanel;