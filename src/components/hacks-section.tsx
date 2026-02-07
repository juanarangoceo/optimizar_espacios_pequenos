
"use client"

import { Lightbulb, Clock, Zap, ArrowRight } from "lucide-react"

const hacks = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Espejos estrategicos",
    description:
      "Coloca un espejo frente a la ventana principal. Duplica la luz natural percibida y genera profundidad visual instantanea.",
    difficulty: "Facil",
    time: "10 min",
  },
  {
    icon: Clock,
    number: "02",
    title: "La regla del tercio vertical",
    description:
      "Usa el tercio superior de cada pared: estanterias flotantes, ganchos y almacenaje que libera el suelo sin perforar tu presupuesto.",
    difficulty: "Facil",
    time: "30 min",
  },
  {
    icon: Zap,
    number: "03",
    title: "Puertas como superficie util",
    description:
      "Organizadores de puerta para zapatos, especias o limpieza. Convierte cada puerta en 0.5m2 extra de almacenaje oculto.",
    difficulty: "Medio",
    time: "15 min",
  },
  {
    icon: Lightbulb,
    number: "04",
    title: "Cortinas al techo",
    description:
      "Monta la barra de cortina 15cm por encima de la ventana y hasta el suelo. El efecto optico anade 20cm de altura percibida al espacio.",
    difficulty: "Facil",
    time: "20 min",
  },
]

export function HacksSection() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Rapidos y efectivos
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mt-1">
            Hacks
          </h2>
        </div>
        <button className="text-primary text-sm font-semibold hover:underline underline-offset-4 whitespace-nowrap flex items-center gap-1">
          Ver todos
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Trucos que puedes aplicar hoy mismo sin herramientas especiales.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hacks.map((hack) => {
          const Icon = hack.icon
          return (
            <div
              key={hack.number}
              className="relative flex gap-4 p-5 bg-card rounded border border-border hover:border-primary/30 transition-all cursor-pointer group overflow-hidden"
            >
              {/* Large number watermark */}
              <span className="absolute -top-2 -right-1 text-7xl font-serif font-bold text-foreground/[0.03] select-none leading-none">
                {hack.number}
              </span>

              <div className="shrink-0 w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                  {hack.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {hack.description}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {hack.difficulty}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {hack.time}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
