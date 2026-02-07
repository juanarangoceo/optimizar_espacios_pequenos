
import Image from "next/image"
import { urlFor } from "@/lib/sanity/client"

interface ArticleHeroProps {
  image?: any
  title: string
}

export function ArticleHero({ image, title }: ArticleHeroProps) {
  const imageUrl = image?.asset ? urlFor(image).width(1200).height(800).url() : null

  return (
    <header className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-muted">
       {!imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
             <span className="text-lg">No Image Available</span>
          </div>
       ) : (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
       )}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-background opacity-90 pointer-events-none" />
    </header>
  )
}
