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
import { client } from "@/lib/sanity/client"
import { Post } from "@/types/sanity"

async function getPostsByCategory(categorySlug: string, limit = 3) {
  return client.fetch<Post[]>(
    `*[_type == "post" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      description,
      mainImage,
      publishedAt,
      "author": author->{name, image},
      "category": categories[0]->{title, "slug": slug.current}
    }`,
    { categorySlug, limit }
  )
}

async function getLatestPost() {
  return client.fetch<Post | null>(
    `*[_type == "post"] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      description,
      mainImage,
      publishedAt,
      "author": author->{name, image},
      "category": categories[0]->{title, "slug": slug.current}
    }`
  )
}

export default async function Home() {
  // Parallel data fetching
  const [
    latestPost,
    organizationPosts,
    curaduriaPosts,
    biohackingPosts,
    hacksPosts,
    furniturePosts,
    diyPosts
  ] = await Promise.all([
    getLatestPost(),
    getPostsByCategory('sistemas-de-organizacion'),
    getPostsByCategory('curaduria-de-espacios'),
    getPostsByCategory('biohacking-del-hogar'),
    getPostsByCategory('hacks', 4), // Hacks section layout supports 4
    getPostsByCategory('mobiliario-inteligente'),
    getPostsByCategory('proyectos-diy', 1) // DIY section focuses on one featured project
  ])

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground pb-20 md:pb-0">
      <Header />
      <main className="flex-1">
        <HeroSection post={latestPost} />
        <OrganizationSection posts={organizationPosts} />
        <Divider />
        <CuraduriaSection posts={curaduriaPosts} />
        <Divider />
        <BiohackingSection posts={biohackingPosts} />
        <Divider />
        <HacksSection posts={hacksPosts} />
        <Divider />
        <FurnitureSection posts={furniturePosts} />
        <Divider />
        <DiySection posts={diyPosts} />
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
