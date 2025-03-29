export function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, "0")
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) {
    return Math.floor(interval) + "y"
  }

  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + "m"
  }

  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + "d"
  }

  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + "h"
  }

  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + "min"
  }

  return Math.floor(seconds) + "s"
}

