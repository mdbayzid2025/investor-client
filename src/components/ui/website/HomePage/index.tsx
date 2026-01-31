import React from 'react'
import HeroSection from './HeroSection'
import WhatIsInvestorHub from './WhatIsInvestorHub'
import WhatYouGet from './WhatYouGet'

import AnonymousInvestorChat from './AnonymousInvestorChat'
import MonthlyInvestorBrief from './MonthlyInvestorBrief'
import TrustAndConfidentiality from './TrustAndConfidentiality'
import UnLockMarket from './UnLockMarket'
import Container from '@/components/shared/Container/Container'
import OffMarketOpportunities from './OffMarketOpportunities'

const HomePage = () => {
  return (
    <div>
        <HeroSection />
        <Container>
        <WhatIsInvestorHub />
        <WhatYouGet />
        <AnonymousInvestorChat />
        <OffMarketOpportunities />
        <MonthlyInvestorBrief />
        <TrustAndConfidentiality />
        <UnLockMarket />
        </Container>
    </div>
  )
}

export default HomePage