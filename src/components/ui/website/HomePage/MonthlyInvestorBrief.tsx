import { FileText } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const MonthlyInvestorBrief = () => {
  return (
    <section className="py-10 md:py-24 bg-[#0A0A0A]">      
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
        <div className="">
          <div className="text-center mb-8">
            
            <h2 className="text-4xl text-start font-serif text-white">
              Monthly <span className='text-primary'>Investor Brief</span> 
            </h2>
            <p className="text-xl text-start text-gray-400">
              High-value insights delivered to your inbox
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4AF37] font-medium">1</span>
              </div>
              <div>
                <h4 className="text-lg font-serif text-white mb-2">New Off-Market Listings</h4>
                <p className="text-gray-400">Curated selection of the month's most promising opportunities, with full details and context.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4AF37] font-medium">2</span>
              </div>
              <div>
                <h4 className="text-lg font-serif text-white mb-2">Development Pipeline Updates</h4>
                <p className="text-gray-400">Upcoming projects and developments from verified sources. Get ahead of the market.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#D4AF37] font-medium">3</span>
              </div>
              <div>
                <h4 className="text-lg font-serif text-white mb-2">Market Insights & Trends</h4>
                <p className="text-gray-400">Data-driven analysis of investment patterns, pricing trends, and emerging opportunities.</p>
              </div>
            </div>
          </div>

        </div>
        <div className="relative h-full">
          <Image src="/investorBrief.png" height={700} width={550} className='w-full h-full object-cover rounded-2xl' alt='growth' />
        </div>
        </div>              
    </section>
  )
}

export default MonthlyInvestorBrief