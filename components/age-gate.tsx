"use client"

import { useEffect, useState } from "react"

export function AgeGate() {
  const [verified, setVerified] = useState(true)

  useEffect(() => {
    const ok = window.sessionStorage.getItem("lumiere-age-verified")
    if (ok !== "yes") setVerified(false)
  }, [])

  if (verified) return null

  function confirm() {
    window.sessionStorage.setItem("lumiere-age-verified", "yes")
    setVerified(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 text-center shadow-2xl">
        <p className="font-serif text-3xl font-medium text-card-foreground">Lumière</p>
        <h2 className="mt-6 text-lg font-medium text-card-foreground">Before you enter</h2>
        <p className="mx-auto mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          This site contains intimate wellness products intended for adults. Please confirm
          you are 18 years or older to continue.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <button
            onClick={confirm}
            className="w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            I am 18 or older — Enter
          </button>
          <a
            href="https://www.google.com"
            className="w-full rounded-md border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Leave
          </a>
        </div>
      </div>
    </div>
  )
}
