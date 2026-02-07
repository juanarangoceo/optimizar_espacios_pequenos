
"use client"

import Image from "next/image"

const products = [
  {
    name: "Wall-Mount Fold Desk",
    material: "Roble macizo",
    price: "249",
    originalPrice: "299",
    badge: "Top Venta",
    image: "/images/product-desk-1.jpg",
  },
  {
    name: "Norden Gateleg",
    material: "Blanco Mate",
    price: "189",
    originalPrice: null,
    badge: null,
    image: "/images/product-desk-2.jpg",
  },
  {
    name: "Industrial Fold",
    material: "Acero y Nogal",
    price: "159",
    originalPrice: null,
    badge: null,
    image: "/images/product-desk-3.jpg",
  },
]

export function ProductCarousel() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Mobiliario Inteligente
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Los 5 mejores escritorios plegables
          </p>
        </div>
        <button className="text-xs font-bold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary transition-colors">
          Ver todos
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-6 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
        {products.map((product) => (
          <div
            key={product.name}
            className="group relative min-w-[220px] w-[220px] md:min-w-[240px] md:w-[240px] snap-center cursor-pointer"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded bg-secondary relative mb-3">
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="text-xs">Product Image</span>
               </div>
              {/*
              <Image
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} - escritorio plegable`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="240px"
              />
              */}
              {product.badge && (
                <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-foreground z-10">
                  {product.badge}
                </div>
              )}
            </div>
            <h3 className="font-bold text-foreground text-base leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {product.material}
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-sm">
                {product.price}
                {"EUR"}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {product.originalPrice}
                  {"EUR"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
