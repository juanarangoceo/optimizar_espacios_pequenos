import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-xl font-bold tracking-tight">
              Optimizacion
              <span className="block text-xs font-sans text-muted-foreground font-normal mt-1">
                Espacios Pequeños, Grandes Ideas
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Transformamos hogares compactos en santuarios de funcionalidad y estilo con biohacking y diseño inteligente.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Explorar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/espacios/sistemas-de-organizacion" className="hover:text-foreground transition-colors">Organización</Link></li>
              <li><Link href="/espacios/curaduria-de-espacios" className="hover:text-foreground transition-colors">Curaduría</Link></li>
              <li><Link href="/espacios/mobiliario-inteligente" className="hover:text-foreground transition-colors">Mobiliario</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/legal/privacidad" className="hover:text-foreground transition-colors">Privacidad</Link></li>
              <li><Link href="/legal/terminos" className="hover:text-foreground transition-colors">Términos</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} Optimizacion Espacios Pequeños.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Social Icons could go here */}
          </div>
        </div>
      </div>
    </footer>
  )
}
