import { client } from "@/lib/sanity/client"
import { Post } from "@/types/sanity"
import { SearchBar } from "@/components/search-bar"
import Link from "next/link"
import { urlFor } from "@/lib/sanity/client"
import { FormattedDate } from "@/components/formatted-date"

export const revalidate = 60 // ISR: Revalidate every minute

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getPosts(query: string) {
  const sanityQuery = query 
    ? `*[_type == "post" && title match $searchTerm + "*"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage,
        publishedAt,
        "author": author->{name, image},
        "category": categories[0]->{title, "slug": slug.current}
      }`
    : `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        description,
        mainImage,
        publishedAt,
        "author": author->{name, image},
        "category": categories[0]->{title, "slug": slug.current}
      }`

  const params = { searchTerm: query }
  return client.fetch<Post[]>(sanityQuery, params)
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const query = typeof params.q === 'string' ? params.q : ''
  const posts = await getPosts(query)

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="container mx-auto px-4 max-w-5xl py-10">
        
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Explora todos nuestros artículos y consejos.
          </p>
          
          <SearchBar />
        </header>

        {/* Results */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No se encontraron artículos para "{query}".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/espacios/${post.category?.slug || 'general'}/${post.slug.current}`}
                className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  {post.mainImage ? (
                    <img 
                      src={urlFor(post.mainImage).width(600).height(450).url()} 
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  {post.category && (
                     <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full shadow-sm">
                        {post.category.title}
                     </span>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {post.description || 'Sin descripción.'}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <FormattedDate dateString={post.publishedAt} />
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-2">
                        {post.author.image && (
                          <img 
                            src={urlFor(post.author.image).width(24).height(24).url()} 
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        <span className="text-xs font-medium">{post.author.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
