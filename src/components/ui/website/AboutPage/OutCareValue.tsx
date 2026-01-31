import { Shield, Target, Users } from 'lucide-react';

const OutCareValue = () => {
    return (
        <section className="py-24 bg-[#0A0A0A]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Our <span className='text-primary'>Core Values</span></h2>
                    <p className="text-gray-400">The principles that guide every feature we build.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Shield,
                            title: 'Absolute Privacy',
                            description: 'We prioritize user anonymity above all else. Your identity is your asset, and we help you protect it.'
                        },
                        {
                            icon: Target,
                            title: 'Precision & Quality',
                            description: 'We focus on high-quality, verified opportunities. We prioritize relevance over volume.'
                        },
                        {
                            icon: Users,
                            title: 'Community Trust',
                            description: 'We foster a community of professionals. Verification is mandatory to maintain our high standards.'
                        }
                    ].map((value, index) => (
                        <div key={index} className="bg-[#111111] p-8 rounded-xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-300 group">
                            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
                                <value.icon className="w-7 h-7 text-[#D4AF37] group-hover:text-black transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-serif text-white mb-3">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default OutCareValue