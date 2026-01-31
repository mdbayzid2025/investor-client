import Link from 'next/link'
import React from 'react'

const JoinTheTeam = () => {
  return (
    <div className="p-12 max-w-4xl mt-20 mx-auto rounded-lg mb-20 bg-[#111111] border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)] relative overflow-hidden">
      <h2 className="text-3xl font-serif text-white mb-6 text-center">
        Join the <span className='text-primary'>Network</span>
      </h2>
      <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-center">
        Be part of South Africa's most exclusive investment community.
        Access opportunities that others never see.
      </p>
      <div className="flex justify-center">
        <Link href="/login"> <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-white transition-colors">
          Apply for Membership
        </button></Link>
      </div>
    </div>
  )
}

export default JoinTheTeam

