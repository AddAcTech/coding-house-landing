"use client"

import { useRef, useEffect } from "react"
import type { Commit } from "@/types/github"
import { formatTimeAgo } from "@/lib/time-utils"

interface CommitNotificationsProps {
  commits: Commit[]
  loading: boolean
}

export default function CommitNotifications({ commits, loading }: CommitNotificationsProps) {
  const listRef = useRef<HTMLDivElement>(null)

  // Efecto para animar nuevos commits
  useEffect(() => {
    if (commits.length > 0 && listRef.current) {
      const newCommitElements = listRef.current.querySelectorAll('.commit-item[data-new="true"]')

      newCommitElements.forEach((element, index) => {
        // Eliminar la marca de nuevo después de la animación
        setTimeout(() => {
          element.setAttribute("data-new", "false")
        }, 1000)
      })
    }
  }, [commits])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex space-x-2">
          <div className="h-2 w-2 bg-[#f0f] rounded-full"></div>
          <div className="h-2 w-2 bg-[#f0f] rounded-full animation-delay-200"></div>
          <div className="h-2 w-2 bg-[#f0f] rounded-full animation-delay-400"></div>
        </div>
      </div>
    )
  }

  if (commits.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-[#666]">
        <p>NO_HAY_DATOS_DISPONIBLES</p>
      </div>
    )
  }

  return (
    <div
      ref={listRef}
      className="h-full overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent"
      style={{ scrollBehavior: "smooth" }}
    >
      {commits.map((commit) => (
        <div
          key={commit.id}
          className="commit-item border border-[#333] bg-[#0a0a0a]/80 rounded-md p-3 transition-all duration-300 hover:border-[#f0f]/50 relative overflow-hidden"
          data-new={commit.isNew ? "true" : "false"}
        >
          {/* Efecto de brillo para nuevos commits */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f0f]/20 to-transparent opacity-0 commit-glow"></div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <img
                src={commit.author.avatar_url || "/placeholder.svg"}
                alt={commit.author.login}
                className="w-10 h-10 rounded-md border border-[#333] object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold truncate text-[#0ff]">{commit.author.login}</h3>
                <span className="text-xs text-[#666]">{formatTimeAgo(new Date(commit.commit.author.date))}</span>
              </div>

              <p className="text-sm mb-2 break-words">{commit.commit.message}</p>

              <div className="flex items-center text-xs">
                <span className="px-2 py-1 rounded-md bg-[#222] text-[#f0f] border border-[#444]">
                  {commit.branch || "main"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

