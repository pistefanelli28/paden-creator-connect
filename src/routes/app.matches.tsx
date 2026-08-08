import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PageTitle } from "@/components/paden/Shells";
import { Pill } from "@/components/paden/Badges";
import { MatchCelebration } from "@/components/paden/MatchCelebration";
import { getCompany, getOpportunity } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/app/matches")({
  head: () => ({
    meta: [
      { title: "Meus Matches | PADEN" },
      {
        name: "description",
        content: "Seus Matches PADEN, contatos liberados, confirmação de parceria e avaliações.",
      },
      { property: "og:title", content: "Meus Matches | PADEN" },
      { property: "og:description", content: "Contatos liberados e parcerias confirmadas na PADEN." },
    ],
  }),
  component: MatchesPage,
});

function MatchesPage() {
  const { matches, currentCreator, setMatchOutcome, rateMatch } = usePaden();
  const [open, setOpen] = useState<string | null>(null);
  const [rating, setRating] = useState(5);

  return (
    <div>
      <PageTitle title="Matches" subtitle={`${matches.length} conexão(ões) liberadas`} />

      {matches.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border p-10 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-bold">Nenhum Match ainda</p>
          <Button asChild variant="brand" className="mt-5">
            <Link to="/app/oportunidades">Ver oportunidades</Link>
          </Button>
        </div>
      )}

      <div className="space-y-5">
        {matches.map((m) => {
          const company = getCompany(m.companyId);
          const opp = getOpportunity(m.opportunityId);
          return (
            <div key={m.id} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Pill tone="primary">
                    <Sparkles className="h-3.5 w-3.5" /> PADEN MATCH
                  </Pill>
                  <h2 className="mt-2 font-display text-xl font-extrabold">
                    {company.name} + {currentCreator.name.split(" ")[0]}
                  </h2>
                  <p className="text-sm text-muted-foreground">{opp?.title}</p>
                  {m.confirmed && <Pill tone="success">✓ Parceria confirmada pela PADEN</Pill>}
                </div>
                <Button variant="brand" size="sm" onClick={() => setOpen(m.id)}>
                  VER CONTATOS
                </Button>
              </div>

              {m.daysAgo >= 5 && !m.outcome && (
                <div className="mt-5 rounded-2xl bg-muted/60 p-4">
                  <p className="font-bold">E aí, deu collab? 👀</p>
                  <p className="text-sm text-muted-foreground">
                    Você e {company.name} deram Match há {m.daysAgo} dias.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="brand" onClick={() => setMatchOutcome(m.id, "fechamos")}>
                      Sim, fechamos
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setMatchOutcome(m.id, "conversando")}>
                      Ainda estamos conversando
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setMatchOutcome(m.id, "nao-rolou")}>
                      Não rolou
                    </Button>
                  </div>
                </div>
              )}

              {m.confirmed && !m.rated && (
                <div className="mt-5 space-y-3 rounded-2xl bg-muted/60 p-4">
                  <p className="font-bold">Avalie a parceria</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setRating(n)} aria-label={`${n} estrelas`}>
                        <Star
                          className={
                            n <= rating ? "h-6 w-6 fill-accent text-accent" : "h-6 w-6 text-muted-foreground"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea rows={3} placeholder="Como foi a experiência?" />
                  <Button
                    variant="brand"
                    size="sm"
                    onClick={() => {
                      rateMatch(m.id);
                      toast.success("Avaliação enviada");
                    }}
                  >
                    ENVIAR AVALIAÇÃO
                  </Button>
                </div>
              )}

              {m.rated && <Pill tone="success">Avaliação enviada</Pill>}

              <MatchCelebration
                open={open === m.id}
                onOpenChange={(v) => setOpen(v ? m.id : null)}
                creatorName={currentCreator.name.split(" ")[0]!}
                companyName={company.name}
                contacts={{
                  instagram: company.instagram,
                  tiktok: company.instagram,
                  email: company.email,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
