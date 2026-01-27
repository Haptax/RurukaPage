import { PressBar } from "@/components/press-bar"
import { OrganizationsBar } from "@/components/organizations-bar"
import { BlogSection } from "@/components/blog-section"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProcessSection } from "@/components/process-section"
// import { ProjectsSection } from "@/components/projects-section"
// import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ParticlesBackground } from "@/components/particles-background"

export default function Home() {
  return (
    <div className="bg-gray-50 bg-pattern">
      <ParticlesBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProcessSection />
  {/* <ProjectsSection /> */}
  {/* <TestimonialsSection /> */}
  <PressBar />
  <OrganizationsBar />
  <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
