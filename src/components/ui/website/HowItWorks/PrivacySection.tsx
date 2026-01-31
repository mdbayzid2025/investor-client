import React from 'react'
import { Button } from '../../button'
import Link from 'next/link'

const PrivacySection = () => {
    return (
        <div className="p-12 max-w-4xl mt-20 mx-auto rounded-lg mb-20 bg-[#111111] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden">
            <h2 className="text-3xl font-serif text-white mb-6 text-center">
                Your Privacy is <span className='text-primary'>Our Priority</span>
            </h2>
            <p className="text-gray-500 text-center mb-8 max-w-3xl mx-auto">
                We understand the importance of discretion in high-net-worth investing.
                Our platform is built with advanced privacy features that protect your identity
                until you're ready to reveal it.
            </p>
            <div className="flex justify-center">
                <Link href="/signup"><Button
                    size="lg"
                    className="text-lg px-10 py-7 bg-gradient-to-br from-primary  to-yellow-700"
                >
                    Get Started Today
                </Button></Link>
            </div>
        </div>
    )
}

export default PrivacySection