import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.xn--optimizarespaciospequeos-mlc.com'

  // Fetch all posts
  const posts = await client.fetch(`
    *[_type == "post"] {
      "slug": slug.current,
      publishedAt,
      "category": categories[0]->slug.current
    }
  `)

  // Fetch all categories
  const categories = await client.fetch(`
    *[_type == "category"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  // Static routes
  const routes = [
    '',
    '/espacios',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  // Category routes
  const categoryRoutes = categories.map((category: any) => ({
    url: `${baseUrl}/espacios/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Post routes
  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/espacios/${post.category}/${post.slug}`,
    lastModified: post.publishedAt || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...categoryRoutes, ...postRoutes]
}
