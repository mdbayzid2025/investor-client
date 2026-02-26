import { getImageUrl } from '@/utils/baseUrl';
import getStringToAvater from '@/utils/getStringToAvater';
import { Avatar } from '@mui/material';
import { MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import { formatChatTime } from '../Shared/FormatChatTime ';

const RequestCard = ({req,  handleViewConversation, setSelectRequest}: any) => {

  
  return (
    <div      
      className="bg-[#111111] border border-[#D4AF371A] rounded-xl p-5 sm:p-6 hover:border-[#E6C97A]/40 transition"
    >
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">

          {req?.createdBy?.image ? <Image height={100} width={100} className="h-12 w-12 rounded-full border-2 border-gray-400/30 shrink-0!"
            src={getImageUrl() + req?.createdBy?.image} alt="Profile" /> :
            <Avatar  {...getStringToAvater(req?.createdBy?.name, { height: 50, width: 50 })} />
          }
          <div>
            <p className="text-sm font-medium">{req?.createdBy?.name}</p>
            <p className="text-xs text-gray-500">{formatChatTime(req?.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs border border-[#D4AF3733] text-primary bg-[#D4AF371A] w-fit">
            {req?.topic}
          </span>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-lg sm:text-xl font-semibold mb-2">
        {req?.title}
      </h2>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">
        {req?.description}
      </p>

      {/* Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 rounded bg-[#1A1A1A] border border-white/10">
            Budget: {req?.budgetRange}
          </span>
          <span
            className={`px-3 py-1 rounded border ${req?.urgency?.toLowerCase() === "high"
              ? "border-red-500/40 text-red-400"
              : req?.urgency?.toLowerCase() === "medium"
                ? "border-yellow-500/40 text-yellow-400"
                : "border-green-500/40 text-green-400"
              }`}
          >
            Urgency: {req?.urgency}
          </span>
          <span className="px-3 py-1 rounded bg-[#1A1A1A] border border-white/10">
            {req?.responses} Responses
          </span>
        </div>
        <button
          onClick={() => {setSelectRequest(req); handleViewConversation(req)}}
          className="text-sm text-primary hover:underline w-fit cursor-pointer flex items-center gap-1"
        >
          <MessageCircleMore /> Start Conversation
        </button>
      </div>
    </div>
  )
}

export default RequestCard