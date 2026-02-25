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

const MyAllRequest = () => {
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [detailModal, setDetailModal] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);

    const [openConversation, setOpenConversation] = useState(false);
    const [selectRequest, setSelectRequest] = useState(null);

    const { data: myRequestData, isLoading } = useGetMyRequestsQuery({});
    const [deleteRequest] = useDeleteRequestMutation()

    console.log("myRequestData", myRequestData);

    // handleDelete
    const handleDelete = async () => {
        try {
            await deleteRequest(itemToDelete._id).unwrap();
            toast.success("Request deleted");
        } catch (error: any) {
            toast.error(error?.data?.message ?? "Failed to delete");
        } finally {
            setDeleteModal(false);
            setItemToDelete(null);
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
                myRequestData?.data?.map((req: any, i: any) => <MyRequestCard req={req} setOpenConversation={setOpenConversation} setSelectRequest={setSelectRequest}/>)
            )}
            <UpdateRequestModal open={openUpdateModal} onClose={() => { setOpenUpdateModal(false); setSelectedRequest(null) }} request={selectedRequest} />

            <DeleteConfirmModal
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={handleDelete}
                itemName={itemToDelete?.title}
            />
            <MyRequestDetailModal
                open={detailModal}
                onClose={() => setDetailModal(false)}
                listing={selectedListing}
            />
        </div>
    )
}

export default MyAllRequest