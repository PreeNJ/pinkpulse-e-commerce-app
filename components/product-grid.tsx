"use client"

import { useState } from "react"

interface ProductImage {
  imageUrl: string
  altText?: string
}

interface BackendProduct {
  id: string
  name: string
  description: string
  price: number | string
  salePrice?: number | string | null
  images?: ProductImage[]
}

interface ProductGridProps {
  products?: BackendProduct[]
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80"

export function ProductGrid({ products = [] }: ProductGridProps) {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-primary">The Collection</p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-medium text-foreground md:text-5xl">
            Considered, curated, for you.
          </h2>
        </div>
        <a
          href="#collections"
          className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          View all products
        </a>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const rawImg = product.images?.[0]?.imageUrl
          const initialSrc = rawImg
            ? rawImg.startsWith("http")
              ? rawImg
              : `http://localhost:5000${rawImg.startsWith("/") ? "" : "/"}${rawImg}`
            : FALLBACK_IMAGE

          const price = Number(product.salePrice ?? product.price)

          return (
            <article key={product.id} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-secondary">
                <img
                  src={initialSrc}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = FALLBACK_IMAGE
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-x-3 bottom-3 translate-y-3 rounded-md bg-background/90 py-2.5 text-sm font-medium text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  aria-label={`Add ${product.name} to bag`}
                >
                  Add to bag
                </button>
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                    {product.description}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-medium text-foreground">
                  KSh {price.toLocaleString()}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}