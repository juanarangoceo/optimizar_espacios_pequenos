
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OrganizationSection } from "@/components/organization-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <OrganizationSection />
        {/* Placeholder for other sections */}
        <section className="py-12 px-6 text-center text-muted-foreground">
           <p>More sections coming soon...</p>
        </section>
      </main>
      <footer className="py-6 text-center border-t border-border mt-auto">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Optimizacion. All rights reserved.</p>
      </footer>
    </div>
  )
}
