import React from 'react'
import PricingCard from './PricingCard'
import MoneyBackGuarantee from './MoneyBackGuarantee'

const PricePage = () => {
  return (
    <div>
        <section className="py-20 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-serif text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300">
            One plan with everything you need to succeed
          </p>
        </div>
      </section>
      <MoneyBackGuarantee />
      <PricingCard />
    </div>
  )
}

export default PricePage