import Image from 'next/image'
import React from 'react'
import { Button } from '../../button'

const WhatIsInvestorHub = () => {

    return (
        <section className="py-24 bg-[#0A0A0A] border-t border-[#D4AF37]/10 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="max-w-4xl mx-auto px-6 text-start">
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-8">
                        About Us
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
                    What Is <span className='text-primary'>Investors Hub?</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                        Investors Hub is a <strong className="text-white">paid, private investor platform</strong> that connects
                        serious property investors and developers with <strong className="text-white">off-market opportunities</strong> that
                        never reach public listing portals.
                    </p>
                    <p>
                        This is <strong className="text-[#D4AF37]">not a traditional property portal</strong>. We focus exclusively on
                        discretion, verified members, and high-value deals that require confidentiality.
                    </p>
                    <p className="text-gray-400 text-base italic">
                        For serious investors who value privacy, early access, and direct connections.
                    </p>
                </div>
                <div className="md:mt-6 mb-6 flex items-center gap-3">
                <Button size="xs" className=" whitespace-nowrap  bg-primary/10 border border-primary/30 rounded-full text-primary! hover:text-white!  font-medium mb-8">
                    Off Market Focus
                </Button>
                <Button size="xs" className=" whitespace-nowrap  bg-primary/10 border border-primary/30 rounded-full text-primary! hover:text-white! font-medium mb-8">
                    Verified Investor  Only
                </Button>
                <Button size="xs" className=" whitespace-nowrap  bg-primary/10 border border-primary/30 rounded-full text-primary! hover:text-white! text-sm font-medium mb-8">
                    Complete Discretion
                </Button>
            </div>
            </div>
            <div className="">
                <Image src="/growth.png" height={400} width={500} className='h-full w-full object-cover' alt='growth' />
            </div>
            
        </section>
    )
}

export default WhatIsInvestorHub