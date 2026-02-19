import HeroSection from './HeroSection'
import WhatIsInvestorHub from './WhatIsInvestorHub'
import WhatYouGet from './WhatYouGet'

import Container from '@/components/shared/Container/Container'
import AnonymousInvestorChat from './AnonymousInvestorChat'
import MonthlyInvestorBrief from './MonthlyInvestorBrief'
import OffMarketOpportunities from './OffMarketOpportunities'
import TrustAndConfidentiality from './TrustAndConfidentiality'
import UnLockMarket from './UnLockMarket'

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