import React from 'react'
import { UserPlus, FileText, MessageSquare, CheckCircle } from 'lucide-react';

  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up and complete our secure KYC verification process to join our exclusive investor community.'
    },
    {
      icon: FileText,
      title: 'Post Anonymously',
      description: 'Create investment posts without revealing your identity. Your contact details remain private until you choose to share them.'
    },
    {
      icon: MessageSquare,
      title: 'Connect & Communicate',
      description: 'Use our built-in messaging system to discuss opportunities while maintaining complete anonymity.'
    },
    {
      icon: CheckCircle,
      title: 'Close Deals Securely',
      description: 'When ready, share contact details and proceed with confidence in our verified network.'
    }
  ];

const StepSection = () => {
    return (
        <section className="py-24 bg-[#0A0A0A] relative overflow-hidden">
            {/* Decorative ambient glow */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[128px] -translate-x-1/2" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[128px] translate-x-1/2" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="relative">
                    {/* Vertical Connection Line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 group ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Card */}
                                <div className={`flex-1 w-full ${index % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <div className="p-8 rounded-xl bg-[#111111] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden">
                                        {/* Hover Accent Line */}
                                        <div className={`absolute top-0 bottom-0 w-1 bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${index % 2 !== 0 ? 'left-0' : 'right-0'}`} />

                                        <div className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-2 opacity-80 flex items-center gap-2 md:inline-flex">
                                            Step 0{index + 1}
                                        </div>
                                        <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">{step.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>

                                {/* Center Icon Marker */}
                                <div className="relative flex-shrink-0 z-10">
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0A0A0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500">
                                        <step.icon className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37]" />
                                    </div>
                                </div>

                                {/* Empty Spacer for Layout Balance */}
                                <div className="flex-1 w-full hidden md:block" />

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StepSection