
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OrganizationSection } from "@/components/organization-section"
import { CuraduriaSection } from "@/components/curaduria-section"
import { BiohackingSection } from "@/components/biohacking-section"
import { HacksSection } from "@/components/hacks-section"
import { FurnitureSection } from "@/components/furniture-section"
import { DiySection } from "@/components/diy-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Divider } from "@/components/divider"
import { BottomNav } from "@/components/bottom-nav"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground pb-20 md:pb-0">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <OrganizationSection />
        <Divider />
        <CuraduriaSection />
        <Divider />
        <BiohackingSection />
        <Divider />
        <HacksSection />
        <Divider />
        <FurnitureSection />
        <Divider />
        <DiySection />
        <NewsletterSection />
      </main>
      <footer className="py-8 text-center border-t border-border mt-auto bg-muted/20">
        <div className="max-w-5xl mx-auto px-6">
           <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Optimizacion Espacios Pequeños. All rights reserved.</p>
        </div>
      </footer>
      <BottomNav />
    </div>
  )
}
