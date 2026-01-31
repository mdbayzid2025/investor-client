import Image from 'next/image'
import React from 'react'
import { Button } from '../../button'

const WhatIsInvestorHub = () => {

    return (
        <section className=" py-10 lg:py-24 bg-[#0A0A0A] border-t border-[#D4AF37]/10 grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
            <div className="px-6 text-start">
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-8">
                        About Us
                    </span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
                    What Is <span className='text-primary'>Investors Hub?</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p className='text-justify'>
                       Investors Hub is a paid, private investment platform exclusively for serious property and business investors. This is not a traditional listing portal it's a discreet network where verified investors access off-market opportunities and connect anonymously.
                    </p>
                    
                </div>
                <div className="md:mt-6 mb-6 mt-3 flex items-center flex-wrap gap-3 ">
                <Button size="xs" className=" whitespace-nowrap  bg-primary/10 border border-primary/30 rounded-full text-primary! hover:text-white!  font-medium md:mb-8">
                    Off Market Focus
                </Button>
                <Button size="xs" className=" whitespace-nowrap  bg-primary/10 border border-primary/30 rounded-full text-primary! hover:text-white! font-medium md:mb-8">
                    Verified Investor  Only
                </Button>
                <Button size="xs" className=" whitespace-nowrap  bg-primary/10 border border-primary/30 rounded-full text-primary! hover:text-white! text-sm font-medium md:mb-8">
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