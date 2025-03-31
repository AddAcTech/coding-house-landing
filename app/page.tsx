import CountdownTimer from "@/components/countdown-timer";
import CommitNotifications from "@/components/commit-notifications";
import type { Commit } from "@/types/github";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: commits } = await supabase
    .from("commits")
    .select("commit")
    .order("time_stamps", { ascending: false });
  const endDate = new Date("2025-04-20T03:58:52.552Z");

  console.log(endDate);
  endDate.setDate(endDate.getDate() + 7);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        <header className="mb-8 border-b border-[#333] pb-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tighter relative inline-block">
            <span className="relative z-10">CODING_HOUSE</span>
            <span className="absolute -bottom-1 left-0 h-1 w-1/2 bg-[#0ff] blur-sm"></span>
          </h1>
        </header>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col sticky">
            <h2 className="text-xl mb-4 text-[#0ff] tracking-wider">
              EL RETO COMIENZA EN:
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
              <CommitNotifications
                commits={
                  (commits?.map(({ commit }) => commit) as Commit[]) || []
                }
                loading={false}
              />
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
