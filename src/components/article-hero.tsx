
import Image from "next/image"

export function ArticleHero() {
  return (
    <header className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden bg-muted">
       <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <span className="text-lg">Article Hero Image</span>
       </div>
      {/*
      <Image
        src="/images/article-hero.jpg"
        alt="Estudio minimalista luminoso"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-background opacity-90 pointer-events-none" />
    </header>
  )
}
