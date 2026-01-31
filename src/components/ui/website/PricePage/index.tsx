import PricingCard from './PricingCard'

const PricePage = () => {
  return (
    <div>
        <section className="pt-24 md:pt-36 bg-gradient-to-b from-black to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
            Simple, <span className='text-primary'>Transparent Pricing</span>
          </h1>
          <p className="text-xl text-gray-300">
            One plan with everything you need to succeed
          </p>
        </div>
      </section>      
      <PricingCard />
    </div>
  )
}

export default PricePage