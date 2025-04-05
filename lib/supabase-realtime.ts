import { createClient } from "@supabase/supabase-js";

export const supabaseRealtime = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
    auth: {
      persistSession: false, // sin sesión
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);
