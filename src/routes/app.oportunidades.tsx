import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/paden/Shells";
import { OpportunityCard } from "@/components/paden/OpportunityCard";
import { NICHES, compatibility, opportunities } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades para creators | PADEN" },
      {
        name: "description",
        content: "Todas as oportunidades abertas de marcas de São Paulo, ordenadas por compatibilidade.",
      },
      { property: "og:title", content: "Oportunidades para creators | PADEN" },
      { property: "og:description", content: "Cachê, permuta e cachê + permuta com marcas de SP." },
    ],
  }),
  component: OpportunitiesPage,
});

function OpportunitiesPage() {
  const { currentCreator } = usePaden();
  const [niche, setNiche] = useState<string>("Todos");

  const list = opportunities
    .filter((o) => !o.closed)
    .filter((o) => niche === "Todos" || o.niche === niche)
    .map((o) => ({ o, score: compatibility(currentCreator, o).score }))
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <PageTitle title="Oportunidades" subtitle={`${list.length} abertas em São Paulo`} />
      <div className="mb-6 flex flex-wrap gap-2">
        {["Todos", ...NICHES].map((n) => (
          <button
            key={n}
            onClick={() => setNiche(n)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              niche === n
                ? "border-primary bg-primary-soft text-primary"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map(({ o }) => (
          <OpportunityCard key={o.id} opportunity={o} />
        ))}
      </div>
    </div>
  );
}
