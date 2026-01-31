import React from 'react'
import { Button } from '../../button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

const UnLockMarket = () => {
  return (
    <section className="py-32 bg-[#0A0A0A] border-t border-[#D4AF37]/10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
          Unlock Off-Market {' '}
          <span className="text-[#D4AF37]">Opportunities</span>
        </h2>

        <p className="text-lg text-gray-400 mb-12"> Join South Africa's most exclusive investor network
          Full access to off-market listings, anonymous chat, and monthly insights for just <span className="text-[#D4AF37] font-medium">R99/month</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/signup"><Button
            size="lg"
            className="text-lg px-10 py-7 bg-gradient-to-br from-primary  to-yellow-700"
          >
            Get Full Access
          </Button></Link>
        </div>

      </div>
    </section>
  )
}

export default UnLockMarket