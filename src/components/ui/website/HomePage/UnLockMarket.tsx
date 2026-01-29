import React from 'react'
import { Button } from '../../button'
import { CheckCircle } from 'lucide-react'

const UnLockMarket = () => {
  return (
    <section className="py-32 bg-[#0A0A0A] border-t border-[#D4AF37]/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Unlock Off-Market<br />
            <span className="text-[#D4AF37]">Opportunities</span>
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Join South Africa's most exclusive investor network
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Full access to off-market listings, anonymous chat, and monthly insights for just <span className="text-[#D4AF37] font-medium">R99/month</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button  className="text-lg px-12 py-4">
              Get Full Access for R99/month
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto text-sm text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
              <span>Instant access</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
              <span>No hidden fees</span>
            </div>
          </div>
        </div>
      </section>
  )
}

export default UnLockMarket