import { useGetMyRequestsQuery } from '@/redux/slice/requestApi';
import getStringToAvater from '@/utils/getStringToAvater';
import Avatar from '@mui/material/Avatar';
import { BookmarkCheck, MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { getImageUrl } from '@/utils/baseUrl';
import { formatChatTime } from '../../Shared/FormatChatTime ';
import RequestDetailModal from '../RequestDetailsModal';
import RequestCard from '../RequestCard';

const MyRequest = () => {
    const { data: myRequestData, isLoading } = useGetMyRequestsQuery({});
    const [openConversation, setOpenConversation] = useState(false);
    const [selectRequest, setSelectRequest] = useState(null);


    
    

    return (
        <div className="space-y-6">
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
                myRequestData?.data?.map((req: any, i: any) => {
                    return (
                        <RequestCard key={i} req={req} setOpenConversation={setOpenConversation} setSelectRequest={setSelectRequest}/>
                    );
                })
            )}
            <RequestDetailModal request={selectRequest} open={openConversation} onClose={() => setOpenConversation(false)} />
        </div>
    )
}

export default MyRequest