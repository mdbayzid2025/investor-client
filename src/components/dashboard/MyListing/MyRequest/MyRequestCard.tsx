import { getImageUrl } from '@/utils/baseUrl';
import getStringToAvater from '@/utils/getStringToAvater';
import { Avatar } from '@mui/material';
import { MessageCircleMore, Eye, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
import { formatChatTime } from '../../Shared/FormatChatTime ';

const MyRequestCard = ({ req, setOpenConversation, setSelectRequest, onView, onEdit, setOpenUpdateModal, setDeleteModal, setDetailModal, }: any) => {

  return (
    <div
      className="bg-[#111111] border border-[#D4AF371A] rounded-xl p-5 sm:p-6 hover:border-[#E6C97A]/40 transition"
    >
      {/* Top Row */}
      <div className="flex flex-row items-start  sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 ">

          {req?.createdBy?.image ? <Image height={100} width={100} className="h-12 w-12 rounded-full border-2 border-gray-400/30 shrink-0!"
            src={getImageUrl() + req?.createdBy?.image} alt="Profile" /> :
            <Avatar  {...getStringToAvater(req?.createdBy?.name, { height: 50, width: 50 })} />
          }
          <div>
            <p className="text-sm font-medium">{req?.createdBy?.name}</p>
            <p className="text-xs text-gray-500">{formatChatTime(req?.createdAt)}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-xs border border-[#D4AF3733] text-primary bg-[#D4AF371A] w-fit">
            {req?.topic}
          </span>
          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setDetailModal(true); setSelectRequest(req) }}
              title="View"
              className="p-1.5 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 border border-transparent hover:border-blue-400/20 transition-all duration-200 cursor-pointer"
            >
              <Eye size={15} />
            </button>
            <button
              onClick={() => { setOpenUpdateModal(true); setSelectRequest(req) }}
              title="Edit"
              className="p-1.5 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 border border-transparent hover:border-yellow-400/20 transition-all duration-200 cursor-pointer"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => { setDeleteModal(true);  setSelectRequest(req) }}
              title="Delete"
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 border border-transparent hover:border-red-400/20 transition-all duration-200 cursor-pointer"
            >
              <Trash2 size={15} />
            </button>
          </div>
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
          onClick={() => { setOpenConversation(true); setSelectRequest(req) }}
          className="text-sm text-primary hover:underline w-fit cursor-pointer flex items-center gap-1"
        >
          <MessageCircleMore /> View Conversation
        </button>
      </div>
    </div>
  )
}

export default MyRequestCard