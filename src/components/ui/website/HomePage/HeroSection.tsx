import React from 'react'
import { Button } from '../../button'
import Link from 'next/link'
import { Eye, Lock, Shield } from 'lucide-react'
import Image from 'next/image'
import { playFairDisplay } from '@/constants/playFairDisplay'



const HeroSection = () => {
  return (
    <section className="relative lg:py-0 py-20 lg:h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0A0A0A] to-black/30" />
      
      {/* Subtle grid pattern overlay */}
      {/* <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} /> */}
       <div className="absolute top-0 left-0 w-full h-full inset-0 pointer-events-none -z-10">
        <Image
          src="/hero banner.jpg"
          alt="background"
          fill
          className="object-cover"
          priority
          quality={75}
        />
      </div>

      <div className="relative z-10  text-center pt-20">
       
        <div className="mb-6">
          <h1 className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-8">
            South Africa's Premier Off-Market Network
          </h1>
        </div>        

        <h1 className={`${playFairDisplay?.className} text-3xl md:text-5xl lg:text-7xl font-serif mb-8 text-white leading-[1.1] tracking-tight`}>
          South Africa's Off-Market<br />
          <span className="text-[#D4AF37]"> Property & Investment Network</span><br />
          
        </h1>

        <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          Access off-market listings, anonymous investor chat,<br />
          and exclusive opportunities for <span className="text-primary font-medium">R99/month</span>
        </p>

        <p className="text-lg text-gray-400 mb-12 font-light">
          Discreet. Verified. Investor-focused.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/signup"><Button
            size="lg"
            className="text-lg px-10 py-7 bg-gradient-to-br from-primary  to-yellow-700"
          >
            Get Full Access
          </Button></Link>
          <Link href="/login"><Button
            size="lg"
            variant="secondary"
            className="text-lg bg-black! border-primary border text-primary px-10 py-7 "
          >
            Join the investor network
          </Button></Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span className='text-white'>Verified Network</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <span className='text-white'>100% Anonymous</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#D4AF37]" />
            <span className='text-white'>Off-Market Only</span>
          </div>
        </div>
      </div>
    </section>

  )
}

export default HeroSection