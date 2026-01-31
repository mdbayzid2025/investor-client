import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Button } from '../../button'
import ContactForm from './ContactForm'
import Container from '@/components/shared/Container/Container'

const ContactPage = () => {
    return (
        <div>
            <section className="bg-[#111111] py-28 md:py-36 border-b border-[#D4AF37]/10">
                <div className="max-w-4xl mx-auto px-6 text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Have questions about membership, listing a property, or our verification process?
                        Our team is ready to assist.
                    </p>
                </div>
                <Container>
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Information */}
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-serif text-white mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-[#D4AF37]" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">Email Us</h4>
                                            <p className="text-gray-400 mb-1">General Inquiries:</p>
                                            <a href="mailto:info@investorshub.co.za" className="text-[#D4AF37] hover:underline block">info@investorshub.co.za</a>
                                            <p className="text-gray-400 mt-2 mb-1">Support:</p>
                                            <a href="mailto:support@investorshub.co.za" className="text-[#D4AF37] hover:underline block">support@investorshub.co.za</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-[#D4AF37]" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">Call Us</h4>
                                            <p className="text-gray-400 mb-1">Mon-Fri from 8am to 5pm.</p>
                                            <a href="tel:+27111234567" className="text-[#D4AF37] hover:underline">+27 (11) 123-4567</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-[#D4AF37]" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-1">Visit Us</h4>
                                            <p className="text-gray-400">
                                                1 Sandton Drive<br />
                                                Sandton, Johannesburg<br />
                                                2196, South Africa
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#111111] p-8 rounded-xl border border-[#D4AF37]/20">
                                <h3 className="text-xl font-serif text-white mb-4">Frequently Asked Questions</h3>
                                <p className="text-gray-400 mb-6">
                                    Find quick answers to common questions about our platform, pricing, and privacy policies.
                                </p>
                                <Button className="w-full justify-center text-black">
                                    Visit Help Center
                                </Button>
                            </div>
                        </div>
                        <ContactForm />
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default ContactPage