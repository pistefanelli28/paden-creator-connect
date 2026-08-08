import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/paden/Shells";
import { CreatorCard } from "@/components/paden/CreatorCard";
import { Input } from "@/components/ui/input";
import { NICHES, REGIONS, creators } from "@/data/paden";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/empresa/creators")({
  head: () => ({
    meta: [
      { title: "Encontrar creators | PADEN Empresas" },
      {
        name: "description",
        content: "Busque creators por região, nicho, seguidores, engajamento, plataforma e faixa de cachê.",
      },
      { property: "og:title", content: "Encontrar creators | PADEN Empresas" },
      { property: "og:description", content: "Busca de creators de São Paulo com filtros." },
    ],
  }),
  component: FindCreators,
});

function FindCreators() {
  const [niche, setNiche] = useState("Todos");
  const [region, setRegion] = useState("Todas");
  const [minFollowers, setMinFollowers] = useState(0);
  const [deal, setDeal] = useState("Todos");

  const list = creators.filter(
    (c) =>
      (niche === "Todos" || c.niches.includes(niche as never)) &&
      (region === "Todas" || c.region === region) &&
      c.followers >= minFollowers &&
      (deal === "Todos" ||
        (deal === "Permuta" && c.acceptsBarter) ||
        (deal === "Cachê + Permuta" && c.acceptsMixed) ||
        deal === "Cachê"),
  );

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
      active
        ? "border-primary bg-primary-soft text-primary"
        : "border-border text-muted-foreground hover:bg-muted",
    );

  return (
    <div>
      <PageTitle title="Encontrar creators" subtitle={`${list.length} creators em São Paulo`} />

      <div className="mb-6 space-y-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
        <div className="flex flex-wrap gap-2">
          {["Todos", ...NICHES].map((n) => (
            <button key={n} className={chip(niche === n)} onClick={() => setNiche(n)}>
              {n}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {["Todas", ...REGIONS].map((r) => (
            <button key={r} className={chip(region === r)} onClick={() => setRegion(r)}>
              {r}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {["Todos", "Cachê", "Permuta", "Cachê + Permuta"].map((d) => (
            <button key={d} className={chip(deal === d)} onClick={() => setDeal(d)}>
              {d}
            </button>
          ))}
        </div>
        <div className="max-w-xs">
          <Input
            type="number"
            placeholder="Mínimo de seguidores"
            onChange={(e) => setMinFollowers(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <CreatorCard key={c.id} creator={c} />
        ))}
      </div>
    </div>
  );
}
