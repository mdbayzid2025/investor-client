'use client'
import { useGetMyStocksQuery } from '@/redux/slice/stocksApi';
import { BookmarkCheck } from 'lucide-react';
import UserStockCard from './UserStockCard';

const StockPage = () => {
    const { data: stocksData } = useGetMyStocksQuery({});
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                    Exclusive Stock
                </h1>
                <p className="text-sm sm:text-base text-gray-400">
                    Curated off-market opportunities.
                </p>
            </div>

            <div className="space-y-4">
                {stocksData?.data?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-white/30 rounded-xl">
                        <div className="w-14 h-14 rounded-full bg-[#E6C97A]/10 flex items-center justify-center mb-4">
                            <BookmarkCheck className="w-6 h-6 text-[#E6C97A]/60" />
                        </div>
                        <p className="text-gray-400 text-sm">
                            No requests found for this category.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                        {stocksData?.data?.map((stock: any) =>
                            <UserStockCard key={stock.id} item={stock} canExpressInterest={false} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default StockPage