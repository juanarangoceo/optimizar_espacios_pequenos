
"use client"

import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export function ArticleNewsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="relative overflow-hidden bg-card rounded p-6 md:p-8 shadow-sm border border-border">
      <div className="relative z-10">
        <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">
          Weekly Digest
        </span>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
          El Objeto del Deseo
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-md">
          Recibe cada domingo una seleccion curada de objetos que transforman
          espacios pequenos en hogares funcionales.
        </p>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <label htmlFor="article-newsletter-email" className="sr-only">
              Tu correo electronico
            </label>
            <input
              id="article-newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground text-foreground"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded text-sm transition-colors flex items-center justify-center gap-2 group"
          >
            Suscribirse
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      </div>
    </section>
  )
}
