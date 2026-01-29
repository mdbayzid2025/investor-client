import React from 'react'

const OffMarketOpportunities = () => {
    return (
        <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-black">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        What "Off-Market" Actually Means
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Properties and opportunities that are not publicly advertised. Early access before traditional marketing begins.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            title: 'Development Land',
                            description: 'Zoned land parcels available before public tender or listing. Direct from landowners and developers.',
                            examples: ['Residential developments', 'Commercial sites', 'Mixed-use opportunities']
                        },
                        {
                            title: 'Property Portfolios',
                            description: 'Multi-property packages sold as a single transaction. Often from estate settlements or corporate divestments.',
                            examples: ['Residential portfolios', 'Commercial buildings', 'Retail centers']
                        },
                        {
                            title: 'Confidential Sales',
                            description: 'High-value properties requiring discretion. Private sales without public marketing campaigns.',
                            examples: ['Luxury estates', 'Corporate assets', 'Distressed opportunities']
                        }
                    ].map((category, index) => (
                        <div
                            key={index}
                            className="bg-[#111111] border border-[#D4AF37]/20 rounded-xl p-8"
                        >
                            <h3 className="text-2xl font-serif text-white mb-4">{category.title}</h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">{category.description}</p>
                            <div className="space-y-2">
                                {category.examples.map((example, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                                        <span>{example}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-6 max-w-2xl">
                        <p className="text-gray-300 leading-relaxed">
                            <strong className="text-[#D4AF37]">Early access advantage:</strong> See these opportunities
                            weeks or months before they reach public listing portals, giving you time to evaluate,
                            negotiate, and secure deals before competition increases.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OffMarketOpportunities