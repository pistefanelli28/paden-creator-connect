import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, Check, Heart, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  BoostedBadge,
  CompatReasons,
  CompatScore,
  ExclusiveBadge,
  Pill,
  ProLockedValue,
} from "@/components/paden/Badges";
import { ReportDialog } from "@/components/paden/ReportDialog";
import { MatchCelebration } from "@/components/paden/MatchCelebration";
import {
  blockingRequirements,
  compatibility,
  getCompany,
  getOpportunity,
  offerLabel,
} from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/app/oportunidade/$id")({
  head: () => ({
    meta: [
      { title: "Detalhe da oportunidade | PADEN" },
      {
        name: "description",
        content: "Veja requisitos, entregas, oferta e compatibilidade antes de se candidatar.",
      },
      { property: "og:title", content: "Detalhe da oportunidade | PADEN" },
      { property: "og:description", content: "Requisitos, entregas e compatibilidade da collab." },
    ],
  }),
  component: OpportunityDetail,
});

function OpportunityDetail() {
  const { id } = Route.useParams();
  const opp = getOpportunity(id);
  const {
    currentCreator,
    isPro,
    applications,
    apply,
    withdraw,
    saved,
    toggleSave,
    applicationLimit,
    applicationsUsed,
    matches,
  } = usePaden();
  const [matchOpen, setMatchOpen] = useState(false);

  if (!opp) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-10 text-center">
        <p className="font-bold">Oportunidade não encontrada</p>
        <Button asChild variant="brand" className="mt-4">
          <Link to="/app/oportunidades">Voltar para oportunidades</Link>
        </Button>
      </div>
    );
  }

  const company = getCompany(opp.companyId);
  const { score, reasons } = compatibility(currentCreator, opp);
  const blocks = blockingRequirements(currentCreator, opp);
  const applied = applications.includes(opp.id);
  const isSaved = saved.includes(opp.id);
  const limitReached = applicationsUsed >= applicationLimit && !applied;
  const matched = matches.some((m) => m.opportunityId === opp.id);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/app/oportunidades">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </Button>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <img
          src={opp.cover}
          alt={`Capa da oportunidade ${opp.title}`}
          className="h-56 w-full object-cover"
        />
        <div className="space-y-5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-2">
                {opp.exclusive && <ExclusiveBadge />}
                {opp.boosted && <BoostedBadge />}
                {opp.closed && <Pill tone="muted">Oportunidade encerrada</Pill>}
              </div>
              <h1 className="mt-2 font-display text-2xl font-extrabold md:text-3xl">{opp.title}</h1>
              <p className="text-sm text-muted-foreground">
                {company.name} {company.verified && "✓"} • {opp.niche}
              </p>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {opp.region} — São Paulo
              </p>
            </div>
            <CompatScore score={score} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-xs uppercase text-muted-foreground">Tipo de parceria</p>
              <p className="mt-1 font-bold">{opp.dealType}</p>
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-xs uppercase text-muted-foreground">Oferta</p>
              {isPro ? (
                <p className="mt-1 font-bold">{offerLabel(opp)}</p>
              ) : (
                <div className="mt-1">
                  <ProLockedValue />
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-muted/60 p-4">
              <p className="text-xs uppercase text-muted-foreground">Prazo</p>
              <p className="mt-1 flex items-center gap-1 font-bold">
                <CalendarClock className="h-4 w-4" />
                {opp.closed ? "Encerrada" : `Encerra em ${opp.deadlineDays} dias`}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Entregas esperadas</h2>
            <p className="mt-1 text-sm text-muted-foreground">{opp.deliverables}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {opp.slots} creators estimados nesta campanha.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Descrição</h2>
            <p className="mt-1 text-sm text-muted-foreground">{opp.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border p-4">
              <p className="font-bold">Requisitos obrigatórios</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {opp.requirements.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="font-bold">Preferências</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {opp.preferences.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">
                Preferências não impedem a candidatura, apenas influenciam a compatibilidade.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-primary-soft/60 p-4">
            <p className="mb-2 font-bold">Por que combina com você?</p>
            <CompatReasons reasons={reasons} />
          </div>

          {blocks.length > 0 && (
            <div className="rounded-2xl bg-destructive/10 p-4 text-sm text-destructive">
              <p className="font-bold">Você ainda não cumpre os requisitos obrigatórios:</p>
              <ul className="mt-1 space-y-1">
                {blocks.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          )}

          {limitReached && (
            <Pill tone="destructive">
              Limite de candidaturas do mês atingido ({applicationLimit})
            </Pill>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {matched ? (
              <Button variant="brand" onClick={() => setMatchOpen(true)}>
                ✨ VER PADEN MATCH
              </Button>
            ) : applied ? (
              <>
                <Pill tone="success">
                  <Check className="h-3.5 w-3.5" /> Candidatura enviada
                </Pill>
                <Button
                  variant="outline"
                  onClick={() => {
                    withdraw(opp.id);
                    toast("Candidatura retirada", {
                      description: "Ela continua contando no seu limite mensal.",
                    });
                  }}
                >
                  RETIRAR CANDIDATURA
                </Button>
              </>
            ) : (
              <Button
                variant="brand"
                size="lg"
                disabled={blocks.length > 0 || limitReached || !!opp.closed}
                onClick={() => {
                  apply(opp.id);
                  toast.success("✓ Candidatura enviada", {
                    description: "A marca vai avaliar seu perfil.",
                  });
                }}
              >
                QUERO PARTICIPAR
              </Button>
            )}
            <Button variant="outline" onClick={() => toggleSave(opp.id)}>
              <Heart className={isSaved ? "fill-accent text-accent" : ""} />
              {isSaved ? "SALVA" : "SALVAR"}
            </Button>
            <ReportDialog target={company.name} />
          </div>
        </div>
      </div>

      <MatchCelebration
        open={matchOpen}
        onOpenChange={setMatchOpen}
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
}
