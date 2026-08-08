import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BusinessShell } from "@/components/paden/Shells";

export const Route = createFileRoute("/empresa")({
  component: () => (
    <BusinessShell>
      <Outlet />
    </BusinessShell>
  ),
});
