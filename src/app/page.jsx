"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "@/components/countdown-timer";
import CommitNotifications from "@/components/commit-notifications";
import { fetchGithubCommits } from "@/lib/github";

export default function Home() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fecha de finalización del evento (una semana desde ahora)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);

  useEffect(() => {
    const loadInitialCommits = async () => {
      try {
        const initialCommits = await fetchGithubCommits();
        setCommits(initialCommits);
      } catch (error) {
        console.error("Error fetching commits:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialCommits();

    // Polling para nuevos commits cada 30 segundos
    const interval = setInterval(async () => {
      try {
        const newCommits = await fetchGithubCommits();
        setCommits((prev) => {
          // Filtrar commits que ya tenemos
          const existingIds = new Set(prev.map((commit) => commit.id));
          const uniqueNewCommits = newCommits.filter(
            (commit) => !existingIds.has(commit.id)
          );

          if (uniqueNewCommits.length > 0) {
            // Añadir animación de entrada a los nuevos commits
            const animatedNewCommits = uniqueNewCommits.map((commit) => ({
              ...commit,
              isNew: true,
            }));
            return [...animatedNewCommits, ...prev];
          }

          return prev;
        });
      } catch (error) {
        console.error("Error polling commits:", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <header className="mb-8 border-b border-[#333] pb-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tighter relative inline-block">
            <span className="relative z-10">EVENTO_HACKATHON</span>
            <span className="absolute -bottom-1 left-0 h-1 w-1/2 bg-[#0ff] blur-sm"></span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          <section className="flex flex-col">
            <h2 className="text-xl mb-4 text-[#0ff] tracking-wider">
              TIEMPO RESTANTE
            </h2>
            <div className="bg-[#111] border border-[#333] rounded-md p-6 shadow-lg relative overflow-hidden flex-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0ff]/5 to-transparent pointer-events-none"></div>
              <CountdownTimer targetDate={endDate} />
            </div>
          </section>

          <section className="flex flex-col">
            <h2 className="text-xl mb-4 text-[#f0f] tracking-wider">
              ACTIVIDAD_RECIENTE
            </h2>
            <div className="bg-[#111] border border-[#333] rounded-md p-6 shadow-lg relative overflow-hidden flex-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0f]/5 to-transparent pointer-events-none"></div>
              <CommitNotifications commits={commits} loading={loading} />
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-[#333] py-4 text-center text-xs text-[#666]">
        <div className="container mx-auto px-4">
          <p>SISTEMA_MONITOREO v1.0.7 // EJECUTANDO EN MODO SEGURO</p>
        </div>
      </footer>
    </main>
  );
}
