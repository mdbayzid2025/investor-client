import React from 'react'

const TermsContent = () => {
    return (
        <div className="bg-[#111111] border border-primary/10 rounded-xl p-8 md:p-12 prose prose-invert max-w-none mb-14">

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-400 leading-relaxed">
                    By accessing or using the Investors Hub platform, you agree to be bound by these Terms and Conditions
                    and our Privacy Policy. If you do not agree to these terms, you may not access or use the platform.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">2. Eligibility & Verification</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    To use Investors Hub, you must:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                    <li>Be at least 18 years of age.</li>
                    <li>Provide accurate, current, and complete information during registration.</li>
                    <li>Pass our verification process (KYC/FICA) if required for specific access levels.</li>
                    <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">3. User Conduct</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                    <li>Using the platform for any illegal purpose or in violation of any local, state, national, or international law.</li>
                    <li>Harassing, threatening, or defrauding other users.</li>
                    <li>Attempting to circumvent the anonymity features of the platform (e.g., soliciting direct contact information in initial messages).</li>
                    <li>Posting false or misleading listing information.</li>
                    <li>Interfering with security-related features of the platform.</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">4. Membership & Fees</h2>
                <p className="text-gray-400 leading-relaxed">
                    Investors Hub offers paid membership tiers. Fees are billed in advance on a monthly or annual basis and are non-refundable
                    unless otherwise stated. We reserve the right to change our fees upon notice to you.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">5. Intellectual Property</h2>
                <p className="text-gray-400 leading-relaxed">
                    The platform and its original content, features, and functionality are owned by Investors Hub and are protected by
                    international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">6. Disclaimer of Warranties</h2>
                <p className="text-gray-400 leading-relaxed">
                    The platform is provided on an "AS IS" and "AS AVAILABLE" basis. Investors Hub makes no representation or warranty
                    of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness
                    of any information on the site. We do not act as an estate agent or financial advisor.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-400 leading-relaxed">
                    In no event shall Investors Hub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable
                    for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of
                    profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to
                    access or use the platform.
                </p>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-serif text-white mb-4">8. Governing Law</h2>
                <p className="text-gray-400 leading-relaxed">
                    These Terms shall be governed and construed in accordance with the laws of South Africa, without regard to its
                    conflict of law provisions.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-serif text-white mb-4">9. Changes to Terms</h2>
                <p className="text-gray-400 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material
                    we will try to provide at least 30 days' notice prior to any new terms taking effect.
                </p>
            </div>

        </div>
    )
}

export default TermsContent