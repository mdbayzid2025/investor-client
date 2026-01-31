import { CheckCircle, Lock, Shield } from 'lucide-react'
import React from 'react'

const TrustAndConfidentiality = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Trust & <span className='text-primary'>Confidentiality</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Your privacy and security are our highest priorities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-8">
            <Lock className="w-12 h-12 text-[#D4AF37] mb-6" />
            <h3 className="text-2xl font-serif text-white mb-4">Secure Platform Communication</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              All messages, documents, and data are encrypted and secured. Your conversations
              remain private and are never shared or monitored except for platform safety.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>End-to-end encrypted messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Secure document sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>No data sold to third parties</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-8">
            <Shield className="w-12 h-12 text-[#D4AF37] mb-6" />
            <h3 className="text-2xl font-serif text-white mb-4">Confidential Seller Information</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Sellers can list opportunities without revealing their identity. We facilitate
              professional introductions only when both parties are ready to proceed.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Anonymous listing options</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Controlled information release</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Professional facilitation</span>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </section>
  )
}

export default TrustAndConfidentiality