import { useGetRequestsQuery } from '@/redux/slice/requestApi';
import { getImageUrl } from '@/utils/baseUrl';
import getStringToAvater from '@/utils/getStringToAvater';
import Avatar from '@mui/material/Avatar';
import { BookmarkCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { formatChatTime } from '../Shared/FormatChatTime ';
import RequestConversationModal from '../Shared/Chatting/RequestConversationModal';
import { toast } from 'sonner';
import { useCreateChatMutation } from '@/redux/slice/chatApi';
import RequestCard from './RequestCard';

const AllRequestList = () => {
    const { data: requestsData, isLoading } = useGetRequestsQuery({});    
    const [openConversation, setOpenConversation] = useState(false);
    const [selectRequest, setSelectRequest] = useState(null);

    const [createChat] = useCreateChatMutation();

    const handleViewConversation = async (req: any) => {
        try {
            const response = await createChat({ ownerId: req?.createdBy?._id, id: req?._id })?.unwrap()
            if (response?.success) {
                toast.success(response?.message)
            }
            setOpenConversation(true);
            setSelectRequest(req)
        } catch (error: any) {
            toast.error(error?.data?.message)
        }
    }
    return (
        <div className="space-y-6">
            {requestsData?.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-white/30 rounded-xl">
                    <div className="w-14 h-14 rounded-full bg-[#E6C97A]/10 flex items-center justify-center mb-4">
                        <BookmarkCheck className="w-6 h-6 text-[#E6C97A]/60" />
                    </div>
                    <p className="text-gray-400 text-sm">
                        No requests found for this category.
                    </p>
                </div>
            ) : (
                requestsData?.data?.map((req: any, i: any) =>
                    <RequestCard key={i} req={req} handleViewConversation={handleViewConversation} setSelectRequest={setSelectRequest} />)
            )}
            <RequestConversationModal request={selectRequest} open={openConversation} onClose={() => setOpenConversation(false)} />
        </div>
    )
}

export default AllRequestList