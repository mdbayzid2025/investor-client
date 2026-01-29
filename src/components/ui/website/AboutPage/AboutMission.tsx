import React from 'react'

const AboutMission = () => {
    return (
        <section className="py-20 bg-[#111111] border-y border-[#D4AF37]/10">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                            Our Mission
                        </h2>
                        <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                            <p>
                                Traditional property portals are noisy, crowded, and public. For sophisticated investors and
                                sellers dealing with high-value assets, this transparency is often a liability, not an asset.
                            </p>
                            <p>
                                <strong className="text-white">Our mission is simple:</strong> To create the most trusted, secure, and efficient
                                marketplace for off-market property opportunities in South Africa.
                            </p>
                            <p>
                                We believe that privacy fosters better deals. By verifying every member and strictly
                                controlling information flow, we ensure that only serious parties connect.
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
            </div>
        </section>
    )
}

export default AboutMission