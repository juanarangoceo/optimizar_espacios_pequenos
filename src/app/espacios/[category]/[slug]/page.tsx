import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { client } from '@/lib/sanity/client'
import { ArticleHero } from '@/components/article-hero'
import { ArticleContent } from '@/components/article-content'
import { ArticleNewsletter } from '@/components/article-newsletter'
import { ProductCarousel } from '@/components/product-carousel'
import { Breadcrumb } from '@/components/breadcrumb'
import { JsonLd } from '@/components/json-ld'
import { urlFor } from '@/lib/sanity/client'

export const revalidate = 3600 // ISR: Revalidate every hour

interface Props {
  params: Promise<{
    category: string
    slug: string
  }>
}

async function getCategory(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, title')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}


import { Metadata } from 'next'

// ... existing imports

async function getPost(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      description,
      body,
      mainImage,
      publishedAt,
      author->{name, image, bio},
      categories[]->{title}
    }`,
    { slug }
  )
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado',
      description: 'El artículo que buscas no existe.'
    }
  }

  const ogImage = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : '/images/og-default.jpg'

  return {
    title: post.title,
    description: post.description || post.excerpt || `Lee sobre ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'Optimizacion Espacios'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.excerpt,
      images: [ogImage],
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params

  // 1. Validate Category via Supabase
  const categoryData = await getCategory(category)
  if (!categoryData) {
    notFound()
  }

  // 2. Fetch Post via Sanity
  const post = await getPost(slug)
  if (!post) {
    notFound()
  }

  // 3. Render
  return (
    <article className="min-h-screen bg-background text-foreground pb-20">
      <JsonLd post={post} categorySlug={category} />
      {/* Hero with Main Image */}
      <ArticleHero image={post.mainImage} title={post.title} />

      <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-10 bg-background rounded-t-3xl pt-10 md:pt-14 shadow-lg border border-border/50">
        
        {/* Breadcrumb */}
        <div className="mb-8">
           <Breadcrumb items={[
             { label: 'Espacios', href: '/' }, // Or /espacios if exists
             { label: categoryData.title, href: `/espacios/${category}` },
             { label: 'Artículo' }
           ]} />
        </div>

        {/* Main Content (Title, Author, Body) */}
        <ArticleContent post={post} />

        {/* Newsletter & Products */}
        <div className="max-w-2xl mx-auto space-y-16 pb-12">
            <ArticleNewsletter />
            <ProductCarousel />
        </div>

      </div>
    </article>
  )
}
