import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, MailOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageTitle } from "@/components/paden/Shells";
import { OpportunityCard } from "@/components/paden/OpportunityCard";
import { Pill } from "@/components/paden/Badges";
import { compatibility, getCompany, getOpportunity, opportunities } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Início do creator | PADEN" },
      {
        name: "description",
        content: "Seu painel PADEN: oportunidades compatíveis, convites, candidaturas e visualizações.",
      },
      { property: "og:title", content: "Início do creator | PADEN" },
      { property: "og:description", content: "Oportunidades que combinam com o seu conteúdo." },
    ],
  }),
  component: CreatorHome,
});

function CreatorHome() {
  const {
    currentCreator,
    applications,
    applicationLimit,
    applicationsUsed,
    invites,
    answerInvite,
    plan,
    trialDaysLeft,
  } = usePaden();

  const feed = opportunities
    .filter((o) => !o.closed)
    .map((o) => ({ o, score: compatibility(currentCreator, o).score }))
    .sort((a, b) => b.score - a.score);

  const pending = invites.filter((i) => i.status === "pendente");
  const remaining = Math.max(0, applicationLimit - applicationsUsed);

  return (
    <div className="space-y-8">
      <PageTitle
        title={`Olá, ${currentCreator.name.split(" ")[0]} 👋`}
        subtitle={`${feed.length} oportunidades combinam com você`}
        action={
          plan === "pro-trial" ? (
            <Pill tone="accent">Período PRO grátis — {trialDaysLeft} dias restantes</Pill>
          ) : plan === "pro" ? (
            <Pill tone="primary">Assinatura PADEN PRO ativa</Pill>
          ) : (
            <Button asChild variant="brand" size="sm">
              <Link to="/planos">Assinar PADEN PRO</Link>
            </Button>
          )
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">Perfil</p>
          <p className="font-display text-2xl font-extrabold">91% completo</p>
          <Progress value={91} className="mt-3" />
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" /> Visualizações
          </p>
          <p className="font-display text-2xl font-extrabold">34</p>
          <p className="text-xs text-muted-foreground">+23% vs. período anterior</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MailOpen className="h-4 w-4" /> Convites
          </p>
          <p className="font-display text-2xl font-extrabold">{pending.length}</p>
          <p className="text-xs text-muted-foreground">aguardando resposta</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <Target className="h-4 w-4" /> Candidaturas
          </p>
          <p className="font-display text-2xl font-extrabold">
            {remaining}/{applicationLimit}
          </p>
          <p className="text-xs text-muted-foreground">
            {remaining === 0 ? "Limite mensal atingido" : "disponíveis neste mês"}
          </p>
        </div>
      </div>

      {pending.map((invite) => {
        const opp = getOpportunity(invite.opportunityId);
        const company = getCompany(invite.companyId);
        if (!opp) return null;
        return (
          <div
            key={invite.id}
            className="animate-rise rounded-3xl border border-primary/30 bg-gradient-soft p-6"
          >
            <p className="text-sm font-bold">✨ Uma marca quer trabalhar com você</p>
            <h2 className="mt-1 font-display text-xl font-extrabold">
              {company.name} convidou você para: {opp.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/app/oportunidade/$id" params={{ id: opp.id }}>
                  VER OPORTUNIDADE
                </Link>
              </Button>
              <Button variant="brand" size="sm" onClick={() => answerInvite(invite.id, true)}>
                ACEITAR
              </Button>
              <Button variant="ghost" size="sm" onClick={() => answerInvite(invite.id, false)}>
                RECUSAR
              </Button>
            </div>
          </div>
        );
      })}

      <section>
        <h2 className="mb-4 font-display text-xl font-extrabold">🔥 Oportunidades para você</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {feed.slice(0, 6).map(({ o }) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/app/oportunidades">Ver todas as oportunidades</Link>
        </Button>
        <p className="mt-4 text-xs text-muted-foreground">
          Você tem {applications.length} candidatura(s) ativa(s). Retirar uma candidatura não devolve
          a cota do mês.
        </p>
      </section>
    </div>
  );
}
