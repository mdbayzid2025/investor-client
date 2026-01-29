import Container from '@/components/shared/Container/Container'
import React from 'react'
import StepSection from './StepSection'
import PrivacySection from './PrivacySection'

const HowItWorks = () => {
    return (
        <div>
            <Container>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-serif text-white mb-6">
                        How Investors Hub Works
                    </h1>
                    <p className="text-xl text-gray-300">
                        A simple, secure process designed for sophisticated investors
                    </p>
                </div>
                <StepSection />
                <PrivacySection />
            </Container>

        </div>
    )
}

export default HowItWorks