import Container from '@/components/shared/Container/Container'
import { FileCheck } from 'lucide-react'
import TermsContent from './TermsContent'

const TermsCondition = () => {
    return (
        <div>
            <Container>
            <div className="text-center mb-16 pt-32">                
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Terms & <span className='text-primary'>Conditions</span> </h1>
                <p className="text-gray-400 text-lg">
                    Last Updated: January 18, 2026
                </p>
            </div>
            <TermsContent />
            </Container>
        </div>
    )
}

export default TermsCondition