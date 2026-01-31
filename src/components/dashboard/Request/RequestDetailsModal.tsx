import { X, Send, Paperclip, Smile } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function RequestDetailModal({ open, onClose }: {open: boolean, onClose: ()=>void}) {
  const [messages, setMessages] = useState([
    {
      author: "Agent007",
      role: "Agent",
      time: "1 hour ago",
      content:
        "I have a listing that matches this description near Mossel Bay.",
      isOwn: false,
    },
    {
      author: "Investor42",
      role: "Investor",
      time: "45 mins ago",
      content: "Please send teaser details.",
      isOwn: true,
    },
    {
      author: "Admin",
      role: "Admin",
      time: "30 mins ago",
      content: "Reminder: Share details via the secure portal only.",
      highlight: true,
      isOwn: false,
      isSystem: true,
    },
    {
      author: "Agent007",
      role: "Agent",
      time: "20 mins ago",
      content:
        "Understood. I'll prepare the documentation and share it through the portal within the next hour.",
      isOwn: false,
    },
    {
      author: "Investor42",
      role: "Investor",
      time: "10 mins ago",
      content: "Great, looking forward to reviewing it. Thanks!",
      isOwn: true,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      author: "You",
      role: "Investor",
      time: "Just now",
      content: inputValue,
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4">
      <div className="relative w-full max-w-3xl h-[95vh] sm:h-[90vh] overflow-y-auto bg-[#0D0D0D] border border-[#E6C97A]/30 rounded-xl sm:rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Fixed Header */}
        <div className="shrink-0 flex items-start justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 bg-[#0D0D0D]">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white truncate">
              Coastal Development Land Needed Request
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Investor42 • 2 hours ago
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition shrink-0 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Request Summary - Collapsible */}
        <div className="shrink-0 px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 bg-[#0D0D0D] max-h-[30vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-4">
            Looking for 50+ hectares near coastal region for luxury development.
            Budget open. Ideally looking for land with existing zoning rights or
            potential for rezoning. Access to main roads is crucial.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div>
              <p className="text-gray-500 text-[10px] sm:text-xs">
                Budget Range
              </p>
              <p className="text-[#E6C97A] font-medium">$2M – $5M</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] sm:text-xs">Urgency</p>
              <p className="text-red-400 font-medium">High</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] sm:text-xs">Status</p>
              <p className="text-green-400 font-medium">Active</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] sm:text-xs">Category</p>
              <p className="text-[#E6C97A] font-medium">Vacant Land</p>
            </div>
          </div>
        </div>

        {/* Messages - Messenger Style */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 bg-linear-to-b from-[#0D0D0D] to-[#0A0A0A]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"} ${
                msg.isSystem ? "justify-center" : ""
              }`}
            >
              {msg.isSystem ? (
                // System Message
                <div className="max-w-[90%] sm:max-w-md mx-auto">
                  <div className="bg-[#D4AF370D] border border-[#D4AF374D] rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-start">
                    <p className="text-xs text-[#E6C97A] font-medium mb-1">
                      {msg.author}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-200">
                      {msg.content}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-2">{msg.time}</p>
                  </div>
                </div>
              ) : (
                // Regular Message Bubble
                <div
                  className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%] ${msg.isOwn ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  {/* {!msg.isOwn && (
                    <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-[#E6C97A] to-[#C4A962] flex items-center justify-center text-xs font-bold text-black">
                      {msg.author.charAt(0)}
                    </div>
                  )} */}

                  <div
                    className={`flex flex-col ${msg.isOwn ? "items-end" : "items-start"}`}
                  >
                    {/* Author & Role */}
                    {!msg.isOwn && (
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <p className="text-xs font-medium text-white">
                          {msg.author}
                        </p>
                        <span className="text-[10px] text-gray-500">
                          {msg.role}
                        </span>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 ${
                        msg.isOwn
                          ? "bg-[#D4AF370D] text-[#d6d6d6] rounded-br-md"
                          : "bg-[#1A1A1A] text-[#99A1AF] border border-white/10 rounded-bl-md"
                      }`}
                    >
                      <p className="text-xs sm:text-sm leading-relaxed wrap-break-word">
                        {msg.content}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <p className={`text-[10px] text-gray-500 mt-1 px-1`}>
                      {msg.time}
                    </p>
                  </div>

                  {/* Own Avatar */}
                  {/* {msg.isOwn && (
                    <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-[#E6C97A] to-[#C4A962] flex items-center justify-center text-xs font-bold text-black">
                      {msg.author.charAt(0)}
                    </div>
                  )} */}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Messenger-Style Input Footer */}
        <div className="shrink-0 px-3 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-[#0D0D0D]">
          <div className="flex items-end gap-2 sm:gap-3">
            {/* Attachment Button */}
            <button className="text-gray-400 hover:text-[#E6C97A] transition p-1.5 sm:p-2 hidden sm:block">
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Input Field */}
            <div className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-3xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 focus-within:border-[#E6C97A] transition">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button className="text-gray-400 hover:text-primary transition hidden sm:block">
                <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              className="bg-primary text-black p-2 sm:p-2.5 rounded-full hover:bg-[#F1D98A] transition shrink-0 shadow-lg shadow-[#E6C97A]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={inputValue.trim() === ""}
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Compliance Notice */}
          <p className="text-[9px] sm:text-[10px] text-gray-500 mt-2 sm:mt-3 text-center px-2">
            🔒 All communications are monitored for compliance. Direct contact
            details will be redacted.
          </p>
        </div>
      </div>
    </div>
  );
}
