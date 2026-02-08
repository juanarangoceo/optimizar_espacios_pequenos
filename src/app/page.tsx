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

export const revalidate = 60 // Revalidate every minute

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
    <div className="flex flex-col pb-20 md:pb-0">
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
      <BottomNav />
    </div>
  )
}
