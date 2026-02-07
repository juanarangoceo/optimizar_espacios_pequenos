
import Image from "next/image"
import { Timer } from "lucide-react"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/lib/sanity/client"

// Custom components for PortableText
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(value).fit('max').auto('format').url()}
            alt={value.alt || 'Article Image'}
            fill
            className="object-cover"
          />
        </div>
      )
    },
    // Add custom block type 'callout' if defined in schema, or style standard blocks
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-base leading-7 text-foreground/90 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
       <div className="my-10 border border-primary bg-primary/5 p-6 rounded relative">
          <div className="absolute -top-3 left-6 bg-background px-2 text-primary">
            <Timer className="h-6 w-6" />
          </div>
          <p className="italic text-foreground text-sm leading-relaxed pt-2">
            {children}
          </p>
        </div>
    )
  },
}

interface ArticleContentProps {
  post: {
    title: string
    author?: {
      name: string
      image?: any
      bio?: string
    }
    categories?: {
      title: string
    }[]
    body: any
    publishedAt: string
  }
}

export function ArticleContent({ post }: ArticleContentProps) {
  const authorImage = post.author?.image ? urlFor(post.author.image).width(100).height(100).url() : null
  const readTime = "5 min de lectura" // Placeholder or calculate based on word count

  return (
    <div className="mb-12">
      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {post.categories && post.categories.length > 0 && (
             <span className="px-2.5 py-1 text-xs font-bold tracking-wider uppercase bg-primary text-primary-foreground rounded">
               {post.categories[0].title}
             </span>
          )}
          <span className="text-xs font-medium text-muted-foreground">
            {readTime}
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-foreground mb-6 text-balance">
          {post.title}
        </h1>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary relative">
             {authorImage ? (
                <Image
                  src={authorImage}
                  alt={post.author?.name || "Author"}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
             ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[8px] bg-muted">
                    {post.author?.name?.charAt(0) || "A"}
                 </div>
             )}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Por {post.author?.name || "Redacción"}</p>
            <p className="text-xs text-muted-foreground">
              {/* post.author?.bio || */ "Editora de Interiores"}
            </p>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-none">
         {post.body ? (
            <PortableText value={post.body} components={ptComponents} />
         ) : (
            <p className="text-muted-foreground italic">Contenido no disponible.</p>
         )}
      </article>
    </div>
  )
}
