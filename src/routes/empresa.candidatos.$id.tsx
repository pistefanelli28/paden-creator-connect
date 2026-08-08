import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/paden/Shells";
import { CreatorCard } from "@/components/paden/CreatorCard";
import { Pill } from "@/components/paden/Badges";
import { MatchCelebration } from "@/components/paden/MatchCelebration";
import { compatibility, creators, getOpportunity } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/empresa/candidatos/$id")({
  head: () => ({
    meta: [
      { title: "Candidatos da oportunidade | PADEN Empresas" },
      {
        name: "description",
        content: "Veja e ordene os candidatos por compatibilidade, seguidores, engajamento ou data.",
      },
      { property: "og:title", content: "Candidatos da oportunidade | PADEN Empresas" },
      { property: "og:description", content: "Selecione creators e dê Match." },
    ],
  }),
  component: CandidatesPage,
});

const SORTS = ["Mais compatíveis", "Mais recentes", "Mais seguidores", "Maior engajamento"] as const;

function CandidatesPage() {
  const { id } = Route.useParams();
  const opp = getOpportunity(id);
  const { currentCompany } = usePaden();
  const [sort, setSort] = useState<string>(SORTS[0]);
  const [match, setMatch] = useState<string | null>(null);

  if (!opp) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-10 text-center">
        <p className="font-bold">Oportunidade não encontrada</p>
      </div>
    );
  }

  const scored = creators
    .slice(0, 8)
    .map((c) => ({ c, score: compatibility(c, opp).score }));

  const sorted = [...scored].sort((a, b) => {
    if (sort === "Mais seguidores") return b.c.followers - a.c.followers;
    if (sort === "Maior engajamento") return b.c.engagement - a.c.engagement;
    if (sort === "Mais recentes") return a.c.id.localeCompare(b.c.id);
    return b.score - a.score;
  });

  const recommended = [...scored].sort((a, b) => b.score - a.score).slice(0, 3);
  const isPro = currentCompany.plan === "Business PRO";
  const matchCreator = creators.find((c) => c.id === match);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/empresa/oportunidades">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <PageTitle
        title={opp.title}
        subtitle={`${opp.candidates} candidatos • ${opp.newCandidates} novos • ${opp.matches} Matches`}
      />

      {isPro && (
        <section className="rounded-3xl border border-primary/30 bg-gradient-soft p-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold">
            <Sparkles className="h-5 w-5" /> RECOMENDADOS PELA PADEN
          </h2>
          <p className="mt-1 text-sm text-foreground/80">
            Ordenados pelos maiores percentuais de compatibilidade já calculados.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {recommended.map(({ c, score }) => (
              <div key={c.id} className="rounded-2xl bg-card p-4 shadow-soft">
                <p className="font-bold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.niches.join(" • ")}</p>
                <Pill tone="primary" className="mt-2">
                  {score}% compatível
                </Pill>
                <Button
                  variant="brand"
                  size="sm"
                  className="mt-3 w-full"
                  onClick={() => {
                    setMatch(c.id);
                    toast.success("PADEN MATCH criado!");
                  }}
                >
                  DAR MATCH
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        {SORTS.map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              sort === s
                ? "border-primary bg-primary-soft text-primary"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map(({ c, score }) => (
          <div key={c.id} className="space-y-2">
            <CreatorCard creator={c} compat={score} />
            <Button
              variant="brand"
              className="w-full"
              onClick={() => {
                setMatch(c.id);
                toast.success("PADEN MATCH criado!", { description: "Contatos liberados." });
              }}
            >
              DAR MATCH
            </Button>
          </div>
        ))}
      </div>

      {matchCreator && (
        <MatchCelebration
          open={!!match}
          onOpenChange={(v) => setMatch(v ? match : null)}
          creatorName={matchCreator.name.split(" ")[0]!}
          companyName={currentCompany.name}
          contacts={{
            instagram: matchCreator.instagram,
            tiktok: matchCreator.tiktok,
            email: matchCreator.email,
          }}
        />
      )}
    </div>
  );
}
