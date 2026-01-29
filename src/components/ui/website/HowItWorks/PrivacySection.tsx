import React from 'react'
import { Button } from '../../button'
import Link from 'next/link'

const PrivacySection = () => {
    return (
        <div className="bg-[#111111] p-12 rounded-lg border border-[#D4AF37]/20">
            <h2 className="text-3xl font-serif text-white mb-6 text-center">
                Your Privacy is Our Priority
            </h2>
            <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
                We understand the importance of discretion in high-net-worth investing.
                Our platform is built with advanced privacy features that protect your identity
                until you're ready to reveal it.
            </p>
            <div className="flex justify-center">
               <Link href="/signup"> <Button >
                    Get Started Today
                </Button></Link>
            </div>
        </div>
    )
    }
    
    export default PrivacySection