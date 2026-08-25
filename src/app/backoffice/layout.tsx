import { redirect } from "next/navigation";
import { BackofficeNav } from "@/components/backoffice/BackofficeNav";
import { OwnerLeadAlerts } from "@/components/backoffice/OwnerLeadAlerts";
import { canAccessBackoffice, getCurrentProfile } from "@/lib/crm/auth";

export default async function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  if (!canAccessBackoffice(profile)) {
    redirect("/login?next=/backoffice");
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3] lg:flex">
      <BackofficeNav profile={profile!} />
      <main className="flex-1 px-4 py-8 sm:px-8">
        <OwnerLeadAlerts enabled={profile?.role === "owner"} />
        {children}
      </main>
    </div>
  );
}
