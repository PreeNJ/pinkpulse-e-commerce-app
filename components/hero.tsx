import Image from "next/image"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
        <div className="order-2 md:order-1">
          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
            <span className="h-px w-8 bg-primary" />
            Intimate wellness
          </p>
          <h1 className="mt-6 text-balance font-serif text-5xl font-medium leading-[1.05] text-foreground md:text-7xl">
            Pleasure, designed with intention.
          </h1>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Quietly powerful objects crafted from body-safe materials. Thoughtful design,
            discreet delivery, and a sensory experience made entirely for you.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              className="rounded-md bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Explore the collection
            </a>
            <a
              href="#promise"
              className="text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Our promise
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
            <Image
              src="/hero.png"
              alt="A sculptural rose and red wellness object resting on flowing cream silk"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
