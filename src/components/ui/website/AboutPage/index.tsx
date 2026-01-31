import React from 'react'
import AboutHero from './AboutHero'
import AboutMission from './AboutMission'
import OutCareValue from './OutCareValue'
import JoinTheTeam from './JoinTheTeam'
import Container from '@/components/shared/Container/Container'

const AboutPage = () => {
  return (
    <div>
      <Container>
        <AboutHero />
        </Container>
        
        <AboutMission />
        <Container>
        <OutCareValue />
        <JoinTheTeam />
        </Container>
    </div>
  )
}

export default AboutPage