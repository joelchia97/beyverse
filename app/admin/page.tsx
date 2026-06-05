import { AdminDashboardClient } from "@/components/admin-dashboard-client";
import { PageHeading } from "@/components/page-heading";
import { getBeyblades, getGuides, getParts, getTierList } from "@/lib/content";

export default async function AdminDashboardPage() {
  const [beyblades, parts, guides, tierList] = await Promise.all([getBeyblades(), getParts(), getGuides(), getTierList()]);

  return (
    <main>
      <PageHeading
        title="Admin Dashboard"
        description="Manage BEYBUKU encyclopedia entries, parts, guides, and tier list records with Supabase-backed publishing."
      />
      <AdminDashboardClient beyblades={beyblades} parts={parts} guides={guides} tierList={tierList} />
    </main>
  );
}
