
"use client"

import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  return (
    <section className="px-6 pb-12 max-w-5xl mx-auto">
      <div className="bg-foreground rounded p-6 md:p-8 text-center relative overflow-hidden">
        <Mail className="h-10 w-10 mb-4 text-primary mx-auto" />
        <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-card">
          Unete al Club Premium
        </h3>
        <p className="text-sm text-card/70 mb-5 max-w-sm mx-auto leading-relaxed">
          Recibe guias de optimizacion exclusivas cada semana.
        </p>
        <form
          className="flex gap-2 max-w-sm mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Tu correo electronico
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo"
            className="w-full bg-card/10 border border-card/20 rounded px-3 py-2.5 text-sm placeholder-card/50 focus:outline-none focus:border-primary text-card"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            Entrar
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </section>
  )
}
