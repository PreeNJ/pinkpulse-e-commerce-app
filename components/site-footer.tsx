const columns = [
  {
    title: "Shop",
    links: ["Massagers", "Wands", "Wellness", "Accessories", "Gift cards"],
  },
  {
    title: "Support",
    links: ["Contact", "Shipping & returns", "Discreet delivery", "FAQ", "Care guide"],
  },
  {
    title: "Company",
    links: ["Our story", "Sustainability", "Journal", "Press", "Careers"],
  },
]

export function SiteFooter() {
  return (
    <footer id="collections" className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <p className="font-serif text-2xl font-medium text-foreground">Lumière</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Intimate wellness objects designed with care, delivered with discretion.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-medium text-foreground">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Lumière. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
