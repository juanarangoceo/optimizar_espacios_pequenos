export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-serif font-bold mb-6">Términos y Condiciones</h1>
      <div className="prose dark:prose-invert">
        <p>
          Bienvenido a Optimizacion Espacios Pequeños. Al acceder a este sitio web, aceptas cumplir con estos términos y condiciones.
        </p>
        <h2>Uso del Sitio</h2>
        <p>
          El contenido de este sitio es solo para información general y uso personal. Está sujeto a cambios sin previo aviso.
        </p>
        <h2>Propiedad Intelectual</h2>
        <p>
          Este sitio web contiene material que es propiedad nuestra o licenciado para nosotros. Este material incluye, pero no se limita a, el diseño, la apariencia y los gráficos.
        </p>
        <h2>Enlaces a Otros Sitios</h2>
        <p>
          Nuestro sitio puede contener enlaces a otros sitios web de interés. Sin embargo, una vez que hayas utilizado estos enlaces para salir de nuestro sitio, debes tener en cuenta que no tenemos control sobre ese otro sitio web.
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          Última actualización: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
