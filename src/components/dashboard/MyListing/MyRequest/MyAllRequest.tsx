'use client'
import { useDeleteRequestMutation, useGetMyRequestsQuery } from '@/redux/slice/requestApi';
import { getImageUrl } from '@/utils/baseUrl';
import getStringToAvater from '@/utils/getStringToAvater';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'
import { BookmarkCheck, Eye, Pencil, Trash2 } from 'lucide-react';
import UpdateRequestModal from './Updaterequestmodal';
import { toast } from 'sonner';
import DeleteConfirmModal from '../../Shared/DeleteConfirmModal';
import MyRequestDetailModal from './MyRequestDetailModal';
import MyRequestCard from './MyRequestCard';
import RequestConversationModal from '../../Shared/Chatting/RequestConversationModal';

const MyAllRequest = () => {
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false);
    
    const [detailModal, setDetailModal] = useState(false);


    const [openConversation, setOpenConversation] = useState(false);
    const [selectRequest, setSelectRequest] = useState(null);

    const { data: myRequestData, isLoading } = useGetMyRequestsQuery({});
    const [deleteRequest] = useDeleteRequestMutation()



    // handleDelete
    const handleDelete = async () => {
        try {
            const response = await deleteRequest((selectRequest as any)?._id).unwrap();
            if (response?.message) {
                toast.success(response?.message);
                setDeleteModal(false);    
                setSelectRequest(null)            
            }
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Failed to delete");
        }
    };
    
    return (
        <div className="space-y-4">
            {myRequestData?.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-white/30 rounded-xl">
                    <div className="w-14 h-14 rounded-full bg-[#E6C97A]/10 flex items-center justify-center mb-4">
                        <BookmarkCheck className="w-6 h-6 text-[#E6C97A]/60" />
                    </div>
                    <p className="text-gray-400 text-sm">
                        No requests found for this category.
                    </p>
                </div>
            ) : (
                myRequestData?.data?.map((req: any, i: any) => <MyRequestCard req={req} setOpenConversation={setOpenConversation} setSelectRequest={setSelectRequest} setOpenUpdateModal={setOpenUpdateModal} setDeleteModal={setDeleteModal} setDetailModal={setDetailModal} />)
            )}
            <UpdateRequestModal open={openUpdateModal} onClose={() => { setOpenUpdateModal(false); setSelectedRequest(null) }} request={selectRequest} />

            <DeleteConfirmModal
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleDelete}
                itemName={(selectRequest as any)?.title}
            />
            <MyRequestDetailModal
                open={detailModal}
                onClose={() => setDetailModal(false)}
                listing={selectRequest}
            />
            <RequestConversationModal request={selectRequest} open={openConversation} onClose={() => setOpenConversation(false)} />
        </div>
    )
}

export default MyAllRequest