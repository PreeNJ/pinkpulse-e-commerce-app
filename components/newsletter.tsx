"use client"

import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setDone(true)
    setEmail("")
  }

  return (
    <section id="journal" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <div className="rounded-lg bg-primary px-6 py-14 text-center md:px-12 md:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70">
          The Lumière Journal
        </p>
        <h2 className="mx-auto mt-4 max-w-xl text-balance font-serif text-4xl font-medium text-primary-foreground md:text-5xl">
          Intimacy, wellbeing, and quiet luxury.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-primary-foreground/80">
          Join our list for thoughtful guides, early access to new objects, and a private
          welcome offer. Unsubscribe anytime.
        </p>

        {done ? (
          <p className="mt-8 text-sm font-medium text-primary-foreground">
            Thank you — please check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="h-12 flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
            />
            <button
              type="submit"
              className="h-12 rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
