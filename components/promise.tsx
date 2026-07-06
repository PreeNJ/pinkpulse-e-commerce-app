import { Package, ShieldCheck, Leaf, Truck } from "lucide-react"

const promises = [
  {
    icon: Package,
    title: "Discreet by default",
    body: "Plain, unbranded packaging and a neutral charge on your statement. Always.",
  },
  {
    icon: ShieldCheck,
    title: "Body-safe materials",
    body: "Medical-grade, non-porous silicone. Free from phthalates and toxins.",
  },
  {
    icon: Leaf,
    title: "Considered design",
    body: "Quiet motors, intuitive controls, and forms made to feel beautiful in hand.",
  },
  {
    icon: Truck,
    title: "Free, fast delivery",
    body: "Complimentary carbon-neutral shipping on every order over $75.",
  },
]

export function Promise() {
  return (
    <section id="promise" className="border-y border-border/60 bg-secondary/50">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-primary">Our promise</p>
          <h2 className="mt-3 text-balance font-serif text-4xl font-medium text-foreground md:text-5xl">
            Sophistication, in every detail.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item) => (
            <div key={item.title}>
              <item.icon className="size-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-medium text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
