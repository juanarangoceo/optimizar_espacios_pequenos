import { Post } from "@/types/sanity"
import { urlFor } from "@/lib/sanity/client"

interface JsonLdProps {
  post: Post
  categorySlug: string
}

export function JsonLd({ post, categorySlug }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.optimizarespaciospequenos.com'
  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : ''

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [imageUrl],
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "author": [{
      "@type": "Person",
      "name": post.author?.name || "Optimizacion Espacios",
      "url": `${baseUrl}/nosotros`
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Optimizacion Espacios Pequeños",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "description": post.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/espacios/${categorySlug}/${post.slug.current}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
