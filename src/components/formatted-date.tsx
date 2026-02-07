"use client"

import { useEffect, useState } from "react"

export function FormattedDate({ dateString }: { dateString: string }) {
  const [formatted, setFormatted] = useState("")

  useEffect(() => {
    setFormatted(
      new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    )
  }, [dateString])

  if (!formatted) return <span className="opacity-0">Loading...</span>

  return <>{formatted}</>
}
