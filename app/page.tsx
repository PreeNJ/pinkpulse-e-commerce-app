// app/page.tsx
import { getProducts } from "@/lib/api"
import { AgeGate } from "@/components/age-gate"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Promise } from "@/components/promise"
import { Newsletter } from "@/components/newsletter"
import { SiteFooter } from "@/components/site-footer"

export default async function HomePage() {
  let products = []
  try {
    products = await getProducts()
  } catch (error) {
    console.error("Backend fetch error:", error)
  }

  return (
    <>
      <AgeGate />
      <SiteHeader />
      <main>
        <Hero />
        <ProductGrid products={products} />
        <Promise />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}