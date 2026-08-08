import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CreatorShell } from "@/components/paden/Shells";

export const Route = createFileRoute("/app")({
  component: () => (
    <CreatorShell>
      <Outlet />
    </CreatorShell>
  ),
});
