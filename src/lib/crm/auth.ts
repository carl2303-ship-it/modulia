import { createClient } from "@/lib/supabase/server";
import type { Profile, UserRole } from "@/lib/crm/types";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return data as Profile;
}

export function canAccessBackoffice(profile: Profile | null): boolean {
  return Boolean(profile?.active && ["owner", "showroom", "agent"].includes(profile.role));
}

export function isOwner(profile: Profile | null): boolean {
  return profile?.role === "owner" && profile.active;
}

export function isShowroom(profile: Profile | null): boolean {
  return profile?.role === "showroom" && profile.active;
}

export function requireRole(profile: Profile | null, roles: UserRole[]): boolean {
  return Boolean(profile?.active && roles.includes(profile.role));
}
