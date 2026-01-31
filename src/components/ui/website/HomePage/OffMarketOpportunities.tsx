import React from 'react'

const OffMarketOpportunities = () => {
    return (
        <section className=" py-16 px-6 font-sans">
  <div className=" flex flex-col lg:flex-row items-center gap-12">
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-1/2 order-2 lg:order-1">
      
      <div className="bg-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-105">
        <div className="text-[#c19a33] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <p className="text-white font-medium tracking-wide">Development Land</p>
      </div>

      <div className="bg-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-105">
        <div className="text-[#c19a33] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-white font-medium tracking-wide">Property Portfolios</p>
      </div>

      <div className="bg-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-105">
        <div className="text-[#c19a33] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-white font-medium tracking-wide">Confidential Sales</p>
      </div>

      <div className="bg-[#1a1a1a] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-transform hover:scale-105">
        <div className="text-[#c19a33] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <p className="text-white font-medium tracking-wide">Pre-Market Deals</p>
      </div>
    </div>

    <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-6">      
       <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
             Off-Market {' '} <span className='text-primary'>Opportunities</span>
          </h2>
      <div className="space-y-4 text-gray-500 leading-relaxed text-lg max-w-prose">
        <p>
          Off-market means these opportunities are not publicly advertised. Sellers prefer discretion, and buyers get early access before properties hit mainstream channels.
        </p>
        <p>
          From development land and commercial portfolios to confidential residential sales—access deals that most investors never see. Get notified first, move fast, and secure opportunities before the competition.
        </p>
      </div>
    </div>

  </div>
</section>
    )
}

export default OffMarketOpportunities