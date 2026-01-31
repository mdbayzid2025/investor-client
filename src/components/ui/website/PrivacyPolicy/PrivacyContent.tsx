import { Shield } from 'lucide-react'
import React from 'react'

const PrivacyContent = () => {
    return (
        <div className='mb-14'>
            <div className="text-center mb-16 pt-32">
                
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Privacy <span className='text-primary'>Policy</span></h1>
                <p className="text-gray-400 text-lg">
                    Last Updated: January 18, 2026
                </p>
            </div>
            <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-8 md:p-12 prose prose-invert max-w-none">

                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-sm font-bold">1</span>
                        Introduction
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        At Investors Hub ("we," "our," or "us"), we respect your privacy and are committed to protecting
                        your personal data. This privacy policy will inform you as to how we look after your personal data
                        when you visit our website (regardless of where you visit it from) and tell you about your privacy
                        rights and how the law protects you.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-sm font-bold">2</span>
                        Data We Collect
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="space-y-3 text-gray-400 list-disc pl-6">
                        <li><strong className="text-white">Identity Data:</strong> includes first name, last name, username or similar identifier, and verification documents.</li>
                        <li><strong className="text-white">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong className="text-white">Financial Data:</strong> includes bank account and payment card details (processed securely by our payment providers).</li>
                        <li><strong className="text-white">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                        <li><strong className="text-white">Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                    </ul>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-sm font-bold">3</span>
                        How We Use Your Data
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-4">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <div className="grid gap-4 mt-6">
                        <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#333]">
                            <h3 className="text-white font-medium mb-2">Service Provision</h3>
                            <p className="text-sm text-gray-400">To provide and manage your account, verify your identity, and facilitate anonymous communication with other users.</p>
                        </div>
                        <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#333]">
                            <h3 className="text-white font-medium mb-2">Platform Security</h3>
                            <p className="text-sm text-gray-400">To detect and prevent fraud, abuse, and security incidents. Your anonymity on the platform is maintained, but we must verify your real identity internally.</p>
                        </div>
                        <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#333]">
                            <h3 className="text-white font-medium mb-2">Communication</h3>
                            <p className="text-sm text-gray-400">To send you updates, newsletters (if subscribed), and important administrative information.</p>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-sm font-bold">4</span>
                        Data Security
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
                        used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal
                        data to those employees, agents, contractors and other third parties who have a business need to know.
                        They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-serif text-white mb-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-sm font-bold">5</span>
                        Contact Us
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                        <a href="mailto:privacy@investorshub.co.za" className="text-[#D4AF37] hover:underline ml-1">privacy@investorshub.co.za</a>.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default PrivacyContent