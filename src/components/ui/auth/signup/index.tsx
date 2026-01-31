
import { Shield, User } from 'lucide-react';
import { SignupForm } from './SignupForm';
import Container from '@/components/shared/Container/Container';
const Signup = () => {
  return (
    <div className='min-h-screen flex items-center justify-center "'>
      <Container>
      <div className="flex md:flex-row flex-col items-center gap-5 p-5">
        <div className="hidden lg:block w-2/5 lg:w-3/5">
          <div className="text-center mb-8">

            <h2 className="text-4xl lg:text-5xl  text-start font-serif text-primary">
              Connect with verified investors <span className='text-white'>Anonymously.</span>
            </h2>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <Shield size={30}  className="text-[#D4AF37]! font-medium" />
               
              </div>
              <div>
                <h4 className="text-lg font-serif text-white mb-2">KYC Verified</h4>
                <p className="text-gray-400">All members are verified investors.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                <User size={30} className="text-[#D4AF37] font-medium" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-white mb-2">Anonymous Chat</h4>
                <p className="text-gray-400">Share insights without revealing your identity.</p>
              </div>
            </div>
          </div>
        </div>
        <SignupForm />
      </div>
      </Container>
    </div>
  )
}

export default Signup