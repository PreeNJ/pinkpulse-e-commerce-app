"use client"

import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"

const nav = [
  { label: "Shop", href: "#shop" },
  { label: "Collections", href: "#collections" },
  { label: "Our Promise", href: "#promise" },
  { label: "Journal", href: "#journal" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.slice(0, 2).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="font-serif text-2xl font-medium tracking-tight text-foreground">
          Lumière
        </a>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Secondary">
            {nav.slice(2).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            className="relative flex items-center text-foreground transition-colors hover:text-primary"
            aria-label="Open cart"
          >
            <ShoppingBag className="size-5" />
            <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              0
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border/60 bg-background px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
