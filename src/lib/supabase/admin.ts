import { createClient } from "@supabase/supabase-js";

/**
 * Client Admin (service role) — server-only.
 * Nécessaire pour créer des utilisateurs Auth depuis le backoffice.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquante. Ajoutez-la dans .env.local (Settings > API > service_role).",
    );
  }
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
