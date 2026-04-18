"use client";

import { useParams } from "next/navigation";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { AdminRenderer } from "@/modules/admin/AdminRenderer";

export default function AdminPage() {
  const params = useParams();
  const projectSlug = params.projectSlug as string;

  const { data, isLoading, error } = useAdminDashboard(projectSlug);

  // Loading State (Skeleton UI)
  if (isLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/4"></div>
        <div className="h-24 bg-gray-800 rounded"></div>
        <div className="h-24 bg-gray-800 rounded"></div>
      </div>
    );
  }

  //  Error State
  if (error || !data) {
    return (
      <div className="p-6 text-red-500 font-medium">
        Access denied or failed to load dashboard
      </div>
    );
  }

  // Empty State (NEXT LEVEL FEATURE)
  if (!data.config?.layout?.length) {
    return (
      <div className="p-6 text-gray-400">
        No dashboard configured for this project.
      </div>
    );
  }

  // Main UI
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">
          Config-driven UI (MongoDB controlled)
        </p>
      </div>

      <AdminRenderer
        config={data.config}
        data={data.data}
        integrations={data.integrations || { shopify: false, crm: false }}
      />
    </div>
  );
}