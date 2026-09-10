import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      return json({ error: "Configuration Supabase manquante" }, 500);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Non authentifié" }, 401);
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();
    if (userError || !user) {
      return json({ error: "Session invalide" }, 401);
    }

    const { data: profile } = await userClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role !== "owner") {
      return json({ error: "Réservé aux propriétaires" }, 403);
    }

    const body = (await req.json().catch(() => ({}))) as {
      id?: string;
      password?: string;
    };
    const id = String(body.id ?? "").trim();
    const password = String(body.password ?? "");

    if (!id) {
      return json({ error: "id requis" }, 400);
    }
    if (password.length < 8) {
      return json({ error: "Mot de passe: 8 caractères minimum" }, 400);
    }

    const { data: target } = await userClient
      .from("profiles")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (!target) {
      return json({ error: "Compte introuvable" }, 404);
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error: updateError } = await admin.auth.admin.updateUserById(id, {
      password,
    });
    if (updateError) {
      return json({ error: updateError.message }, 400);
    }

    return json({ ok: true });
  } catch (e) {
    return json(
      { error: e instanceof Error ? e.message : "Erreur serveur" },
      500,
    );
  }
});

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
