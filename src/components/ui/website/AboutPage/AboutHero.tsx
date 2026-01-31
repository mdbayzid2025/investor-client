import Image from 'next/image'
import React from 'react'
import { Button } from '../../button'

const AboutHero = () => {

    return (
        <section className=" py-10 lg:py-32 border-t border-[#D4AF37]/10 grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
            <div className="px-6 text-start">
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-8">
                        Our Story
                    </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                    Redefining Investment <br /> 
                    <span className='text-primary'>Privacy & Access</span>
                </h2>
                <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p className='text-justify'>
                       We built Investors Hub to solve a critical gap in the South African property market: the need for a discreet, professional platform where high-value deals can happen without public scrutiny.
                    </p>
                    
                </div>                
            </div>
            <div className="">
                <Image src="/aboutImg.png" height={400} width={500} className='h-full w-full object-cover' alt='growth' />
            </div>
            
        </section>
    )
}

export default AboutHero