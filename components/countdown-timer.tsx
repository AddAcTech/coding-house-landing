"use client"

import { useState, useEffect } from "react"
import { formatTimeUnit } from "@/lib/time-utils"

interface CountdownTimerProps {
  targetDate: Date
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
        <TimeUnit value={timeLeft.days} label="DAYS" />
        <TimeUnit value={timeLeft.hours} label="HOURS" />
        <TimeUnit value={timeLeft.minutes} label="MINUTES" />
        <TimeUnit value={timeLeft.seconds} label="SEC" />
      </div>
    </div>
  )
}

interface TimeUnitProps {
  value: number
  label: string
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#0a0a0a] border border-[#333] rounded-md p-2 w-full aspect-square flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#222] to-transparent opacity-20"></div>
        <span className="text-2xl md:text-4xl font-bold relative z-10 text-[#0ff] tabular-nums">
          {formatTimeUnit(value)}
        </span>
      </div>
      <span className="text-xs mt-2 text-[#888]">{label}</span>
    </div>
  )
}

