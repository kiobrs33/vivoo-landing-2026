import HeroSection from '../components/HeroSection'
import PlansSection from '../components/PlansSection'
import CoverageSection from '../components/CoverageSection'
import ResidentialBenefitsSection from '../components/ResidentialBenefitsSection'
import ResidentialServicesSection from '../components/ResidentialServicesSection'
import InstallSection from '../components/InstallSection'
import TestimonialsSection from '../components/TestimonialsSection'
import ContactSection from '../components/ContactSection'
import UserInfoSection from '../components/UserInfoSection'

/** Recorrido residencial: qué es → planes → cobertura → beneficios → servicios → instalación → contacto. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlansSection />
      <CoverageSection />
      <ResidentialBenefitsSection />
      <ResidentialServicesSection />
      <InstallSection />
      <TestimonialsSection />
      <ContactSection />
      <UserInfoSection />
    </>
  )
}
