export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-serif font-bold mb-6">Política de Privacidad</h1>
      <div className="prose dark:prose-invert">
        <p>
          En Optimizacion Espacios Pequeños, valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
        </p>
        <h2>Recopilación de Información</h2>
        <p>
          Recopilamos información que nos proporcionas directamente, como cuando te suscribes a nuestro boletín o nos contactas.
        </p>
        <h2>Uso de la Información</h2>
        <p>
          Usamos la información para enviarte actualizaciones, responder a tus consultas y mejorar nuestro sitio web.
        </p>
        <h2>Protección de Datos</h2>
        <p>
          Tomamos medidas razonables para proteger tu información personal contra pérdida, robo y uso no autorizado.
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
