
import Image from "next/image"
import { Timer } from "lucide-react"

export function ArticleContent() {
  return (
    <div className="mb-12">
      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 text-xs font-bold tracking-wider uppercase bg-primary text-primary-foreground rounded">
            Optimizacion
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            5 min de lectura
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] text-foreground mb-6 text-balance">
          {"Psicologia del Espacio: Como vivir en 30m"}{String.fromCharCode(178)}{" sin perder la calma"}
        </h1>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary relative">
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-[8px]">
                Author
             </div>
            {/*
            <Image
              src="/images/author-sofia.jpg"
              alt="Sofia M."
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
            */}
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Por Sofia M.</p>
            <p className="text-xs text-muted-foreground">
              Editora de Interiores
            </p>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="max-w-none">
        <p className="text-base leading-7 text-foreground/90 mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-[-6px]">
          Vivir en un espacio reducido no significa sacrificar tu paz mental. La
          clave no esta en tener menos cosas, sino en curar tu entorno para que
          cada objeto tenga un proposito y un lugar definido. La psicologia del
          espacio nos ensena que el orden visual se traduce directamente en calma
          mental.
        </p>

        <p className="text-base leading-7 text-foreground/90 mb-8">
          Cuando entras en una habitacion pequena abarrotada, tu cerebro procesa
          cada objeto como un estimulo individual. Esto genera un ruido visual
          constante que, aunque imperceptible al principio, agota tus reservas de
          energia. En un estudio de 30m{String.fromCharCode(178)}, el vacio es tan importante como el
          mobiliario.
        </p>

        {/* Callout Box */}
        <div className="my-10 border border-primary bg-primary/5 p-6 rounded relative">
          <div className="absolute -top-3 left-6 bg-background px-2 text-primary">
            <Timer className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-primary mb-3 uppercase text-xs tracking-[0.15em] pt-2">
            El Sistema de 10 Minutos
          </h3>
          <p className="italic text-foreground text-sm leading-relaxed">
            {'"Antes de dormir, configura un temporizador por 10 minutos. Devuelve cada objeto que hayas usado a su \'casa\'. Si un objeto no tiene casa, es una senal de que quizas no pertenece a tu espacio. Este ritual reinicia tu entorno para el dia siguiente."'}
          </p>
        </div>

        <p className="text-base leading-7 text-foreground/90 mb-6">
          La iluminacion tambien juega un papel crucial. Evita una unica fuente
          de luz en el techo que aplana el espacio. En su lugar, crea
          {' "islas de luz" '} con lamparas de mesa y pie para zonificar
          actividades: lectura, trabajo, descanso. Esto engana al ojo
          percibiendo multiples espacios dentro de uno solo.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">
          Zonificacion Vertical
        </h2>

        <p className="text-base leading-7 text-foreground/90 mb-8">
          Cuando el suelo se acaba, mira hacia arriba. Las paredes son bienes
          raices infravalorados. Estanterias flotantes altas no solo ofrecen
          almacenamiento, sino que obligan a levantar la mirada, acentuando la
          altura del techo y reduciendo la sensacion de claustrofobia.
        </p>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4">
          Mobiliario Inteligente
        </h2>

        <p className="text-base leading-7 text-foreground/90 mb-6">
          Invierte en piezas que sirvan para mas de un proposito. Un escritorio
          plegable de pared libera metros cuadrados durante el fin de semana. Una
          cama abatible convierte tu dormitorio en un estudio de yoga. Cada metro
          cuadrado debe justificar su existencia.
        </p>
      </article>
    </div>
  )
}
