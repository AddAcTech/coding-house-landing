"use client"

import { useEffect, useState } from "react"
import { formatTimeAgo } from "@/lib/time-utils"

export function TimeAgo({ date }: { date: Date }) {
  const [timeAgo, setTimeAgo] = useState("")

  useEffect(() => {
    const update = () => {
      setTimeAgo(formatTimeAgo(date))
    }

    update() // inicial
    const interval = setInterval(update, 60 * 1000) // cada minuto
    return () => clearInterval(interval)
  }, [date])

  return <span suppressHydrationWarning>{timeAgo}</span>
}
