
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { client } from '@/lib/sanity/client'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

export const revalidate = 3600 // ISR: Revalidate every hour

interface Props {
  params: Promise<{
    category: string
    slug: string
  }>
}

async function getCategory(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, title')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

async function getPost(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      mainImage,
      publishedAt,
      "author": author->name,
      "categories": categories[]->title
    }`,
    { slug }
  )
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
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{post.title}</h1>
        <div className="flex items-center text-muted-foreground gap-4">
            <span>By {post.author}</span>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
            <span className="capitalize badge">{category}</span>
        </div>
      </header>
      
      {/* Basic Image Rendering - to be optimized in Phase 6 */}
      {/* We need a urlBuilder for Sanity images usually, but let's assume raw data for now or use a helper later */}
      
      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
