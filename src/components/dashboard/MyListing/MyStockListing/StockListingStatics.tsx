'use client'

import { useOwnerStockAnalyticsQuery } from "@/redux/slice/stocksApi";

const StockListingStatics = () => {
      const { data: stocksStaticData } = useOwnerStockAnalyticsQuery({});  
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stocksStaticData?.data && stocksStaticData?.data?.analysis?.map((data: any, i: number) =>
                <div className="bg-[#111111] border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">{data?.status}</p>
                    <p className="text-2xl text-white font-serif">{data?.count}</p>
                </div>)}
        </div>
    )
}

export default StockListingStatics