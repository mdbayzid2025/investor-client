import React from 'react'

const AboutHero = () => {
    return (
        <section className="relative py-24 bg-gradient-to-b from-black to-[#0A0A0A] overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[150px] opacity-5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D4AF37] rounded-full blur-[100px] opacity-5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <div className="inline-block px-4 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-6">
                    Our Story
                </div>
                <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 leading-tight">
                    Redefining Investment <br />
                    <span className="text-[#D4AF37]">Privacy & Access</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                    We built Investors Hub to solve a critical gap in the South African property market:
                    the need for a discreet, professional platform where high-value deals can happen
                    without public scrutiny.
                </p>
            </div>
        </section>
    )
}

export default AboutHero