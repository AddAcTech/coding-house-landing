"use client";

import { useRef, useEffect, useState } from "react";
import type { Commit } from "@/types/github";
import { TimeAgo } from "./TimeAgo";
import { supabaseRealtime } from "@/lib/supabase-realtime"; // importa el cliente ligero

interface CommitNotificationsProps {
  commits: Commit[];
  loading: boolean;
}

export default function CommitNotifications({
  commits: initialCommits,
  loading,
}: CommitNotificationsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [commits, setCommits] = useState<Commit[]>(initialCommits);

  // Efecto para animar nuevos commits
  useEffect(() => {
    if (commits.length > 0 && listRef.current) {
      console.log(commits)
      const newCommitElements = listRef.current.querySelectorAll(
        '.commit-item[data-new="true"]'
      );

      newCommitElements.forEach((element) => {
        setTimeout(() => {
          element.setAttribute("data-new", "false");
        }, 1000);
      });
    }
  }, [commits]);

  // Suscripción a nuevos commits
  useEffect(() => {
    const channel = supabaseRealtime
      .channel("commits-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "commits",
        },
        (payload) => {
          const newCommit = payload.new as Commit;
          console.log(newCommit)
          setCommits((prev) => [{ ...newCommit.commit, isNew: true }, ...prev]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse flex space-x-2">
          <div className="h-2 w-2 bg-[#f0f] rounded-full"></div>
          <div className="h-2 w-2 bg-[#f0f] rounded-full animation-delay-200"></div>
          <div className="h-2 w-2 bg-[#f0f] rounded-full animation-delay-400"></div>
        </div>
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-[#666]">
        <p>NO_HAY_DATOS_DISPONIBLES</p>
      </div>
    );
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
          className="commit-item border border-[#333] bg-[#0a0a0a]/80 rounded-md p-3 transition-all duration-300 hover:border-[#f0f]/50 relative overflow-hidden font-mono"
          // data-new={commit.isNew ? "true" : "false"}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#f0f]/20 to-transparent opacity-0 commit-glow"></div>

          <div className="flex items-center justify-between mb-2 text-xs text-[#666] border-b border-[#333] pb-1">
            <div className="flex items-center">
              <span className="text-[#0ff] mr-1">$</span>
              <span>git_commit_info</span>
            </div>
            <div className="flex items-center gap-1">
              <TimeAgo date={new Date(commit.date)} />
              <span className="px-1.5 py-0.5 rounded bg-[#222] text-[#f0f] ml-1">
                {commit.branch || "main"}
              </span>
            </div>
          </div>

          {/* JSON styled content */}
          <div className="text-xs leading-relaxed overflow-x-auto">
            <code>
              <span className="text-[#666]">// Commit: {commit.id}</span>
              <br />
              {`{`}
              <br />
              <span className="pl-4">
                <span className="text-[#0ff]">"author"</span>: {`{`}
                <br />
                <span className="pl-4">
                  <span className="text-[#0ff]">"login"</span>:{" "}
                  <span className="text-[#0f0]">"{commit.author}"</span>,
                  <br />
                  <span className="text-[#0ff]">"avatar"</span>:{" "}
                  <span className="text-[#0f0]">"{commit.avatar}"</span>
                  <br />
                </span>
                {`}`},
                <br />
                <span className="text-[#0ff]">"commit"</span>: {`{`}
                <br />
                <span className="pl-4">
                  <span className="text-[#0ff]">"message"</span>:{" "}
                  <span className="text-[#0f0]">"{commit.commit_message}"</span>
                  ,
                  <br />
                  <span className="text-[#0ff]">"date"</span>:{" "}
                  <span className="text-[#ff0]">"{commit.date}"</span>
                  <br />
                </span>
                {`}`},
                <br />
                <span className="text-[#0ff]">"branch"</span>:{" "}
                <span className="text-[#0f0]">"{commit.branch || "main"}"</span>
                <br />
              </span>
              {`}`}
            </code>
          </div>

          <div className="absolute top-3 right-3">
            <img
              src={commit.avatar || "/placeholder.svg?height=150&width=150"}
              alt={commit.author}
              className="w-8 h-8 rounded-md border border-[#333] object-cover shadow-lg"
              width={32}
              height={32}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
