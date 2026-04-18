import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAdminDashboard(projectSlug: string) {
  return useQuery({
    queryKey: ["admin-dashboard", projectSlug],
    queryFn: async () => {
      const res = await axios.get(
        `/api/projects/${projectSlug}/admin`
      );
      return res.data;
    }
  });
}