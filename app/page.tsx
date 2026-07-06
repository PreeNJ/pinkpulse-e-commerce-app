import { AgeGate } from "@/components/age-gate"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Promise } from "@/components/promise"
import { Newsletter } from "@/components/newsletter"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <AgeGate />
      <SiteHeader />
      <main>
        <Hero />
        <ProductGrid />
        <Promise />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}
