import Container from '@/components/shared/Container/Container'
import React from 'react'

const AboutMission = () => {
    return (
        <section className="py-20 bg-[#111111] border-y border-[#D4AF37]/10">
            <Container>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                            Our <span className='text-primary'>Mission</span>
                        </h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                Traditional property portals are crowded and public. For serious investors and sellers handling high-value assets, that level of exposure is often a risk  not an advantage. 
                            </p>
                            <p>
                                Investors Hub is a private, subscription-based platform built for off-market property opportunities in South Africa. We enable discreet, secure connections between verified participants, protecting confidentiality while maintaining professional standards. 
                            </p>
                            <p>
                               Our mission is simple to create the most trusted and efficient off-market investment network in South Africa
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-[#0A0A0A] p-8 rounded-xl border border-[#D4AF37]/20 text-center hover:border-[#D4AF37]/50 transition-colors">
                            <div className="text-4xl font-serif text-[#D4AF37] mb-2">R5B+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Property Value</div>
                        </div>
                        <div className="bg-[#0A0A0A] p-8 rounded-xl border border-[#D4AF37]/20 text-center hover:border-[#D4AF37]/50 transition-colors">
                            <div className="text-4xl font-serif text-[#D4AF37] mb-2">1.2k+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Verified Investors</div>
                        </div>
                        <div className="bg-[#0A0A0A] p-8 rounded-xl border border-[#D4AF37]/20 text-center hover:border-[#D4AF37]/50 transition-colors">
                            <div className="text-4xl font-serif text-[#D4AF37] mb-2">100%</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Private & Secure</div>
                        </div>
                        <div className="bg-[#0A0A0A] p-8 rounded-xl border border-[#D4AF37]/20 text-center hover:border-[#D4AF37]/50 transition-colors">
                            <div className="text-4xl font-serif text-[#D4AF37] mb-2">24/7</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Deal Flow</div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default AboutMission