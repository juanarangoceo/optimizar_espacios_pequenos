
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { client } from '@/lib/sanity/client'
import Link from 'next/link'
import { Breadcrumb } from '@/components/breadcrumb'

export const revalidate = 3600 // ISR: Revalidate every hour

interface Props {
  params: Promise<{
    category: string
  }>
}

async function getCategory(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('id, title, slug')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

async function getCategoryPosts(categorySlug: string) {
  // Fetch posts from Sanity that match this category
  // For now, we'll fetch all posts and filter client-side or add category reference in Sanity
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      mainImage,
      "excerpt": body[0].children[0].text
    }`
  )
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params

  // 1. Validate Category via Supabase
  const categoryData = await getCategory(category)
  if (!categoryData) {
    notFound()
  }

  // 2. Fetch Posts
  const posts = await getCategoryPosts(category)

  // 3. Render
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="container mx-auto px-4 max-w-5xl py-10">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb items={[
            { label: 'Inicio', href: '/' },
            { label: categoryData.title }
          ]} />
        </div>

        {/* Category Header */}
        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {categoryData.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            Explora artículos sobre {categoryData.title.toLowerCase()}
          </p>
        </header>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No hay artículos disponibles en esta categoría aún.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.slug.current}
                href={`/espacios/${category}/${post.slug.current}`}
                className="group"
              >
                <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Placeholder for image */}
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Imagen</span>
                  </div>
                  
                  <div className="p-4">
                    <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt || 'Sin descripción disponible'}
                    </p>
                    <time className="text-xs text-muted-foreground mt-2 block">
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
