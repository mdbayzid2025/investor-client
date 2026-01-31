import Container from '@/components/shared/Container/Container'
import React from 'react'
import StepSection from './StepSection'
import PrivacySection from './PrivacySection'

const HowItWorks = () => {
    return (
        <div className='relative'>
            <Container>
                <div className="max-w-4xl mx-auto md:px-6 text-center py-32 ">
                    <h1 className="text-5xl font-serif text-white mb-3">
                        How <span className='text-primary'>Investors Hub Works</span>
                    </h1>
                    <p className="text-lg text-gray-300">
                        A simple, secure process designed for sophisticated investors
                    </p>
                </div>
                <StepSection />
                <PrivacySection />
            </Container>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[128px] -translate-x-1/2" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[128px] translate-x-1/2" />
            </div>
        </div>
    )
}

export default HowItWorks