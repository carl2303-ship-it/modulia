import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/crm/auth";

export default async function VendedorPage() {
  const profile = await getCurrentProfile();

  if (!profile || !profile.active) {
    redirect("/login?next=/vendedor");
  }

  redirect("/vendedor/configurar");
}
