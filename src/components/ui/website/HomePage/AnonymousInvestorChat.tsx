import { CheckCircle, Lock } from 'lucide-react'
import React from 'react'

const AnonymousInvestorChat = () => {
  return (
       <section className="py-24">        
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-6">
                Key Feature
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Anonymous <span className='text-primary'>Investor Chat</span> 
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Connect with verified investors and sellers while maintaining complete anonymity 
                until you're ready to reveal your identity.
              </p>
              
              <div className="space-y-4">
                {[
                  'Auto-generated investor names (Investor001, Investor002, etc.)',
                  'No phone numbers or email addresses required',
                  'Platform-mediated introductions when both parties agree',
                  'Moderated and professional environment',
                  'Share contact details only when you choose'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-8">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Example Chat Preview</div>
                <div className="space-y-4">
                  <div className="bg-[#1A1A1A] rounded-lg p-4">
                    <div className="text-[#D4AF37] text-sm font-medium mb-1">Investor047</div>
                    <p className="text-gray-300 text-sm">Interested in your Sandton development. Can you share more details about the IRR projections?</p>
                  </div>
                  <div className="bg-[#D4AF37]/10 rounded-lg p-4 ml-8">
                    <div className="text-[#D4AF37] text-sm font-medium mb-1">You (Investor152)</div>
                    <p className="text-gray-300 text-sm">Happy to discuss. Projected IRR is 18-22% over 3 years. I can share the full breakdown via our secure platform.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#D4AF37]/10 text-sm text-gray-500">
                <Lock className="w-4 h-4 inline mr-2" />
                All conversations are private and encrypted
              </div>
            </div>
          </div>        
      </section>
  )
}

export default AnonymousInvestorChat