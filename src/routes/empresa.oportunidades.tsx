import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/paden/Shells";
import { BoostedBadge, ExclusiveBadge, Pill } from "@/components/paden/Badges";
import { offerLabel, opportunities } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/empresa/oportunidades")({
  head: () => ({
    meta: [
      { title: "Minhas oportunidades | PADEN Empresas" },
      {
        name: "description",
        content: "Gerencie oportunidades ativas e encerradas, renove prazos e impulsione campanhas.",
      },
      { property: "og:title", content: "Minhas oportunidades | PADEN Empresas" },
      { property: "og:description", content: "Campanhas ativas, histórico e renovações." },
    ],
  }),
  component: MyOpportunities,
});

function MyOpportunities() {
  const { currentCompany } = usePaden();
  const mine = opportunities.filter((o) => o.companyId === currentCompany.id);
  const active = mine.filter((o) => !o.closed);
  const closed = mine.filter((o) => o.closed);

  return (
    <div className="space-y-8">
      <PageTitle
        title="Minhas oportunidades"
        subtitle={`${active.length} ativas — plano ${currentCompany.plan} permite até ${currentCompany.plan === "Business PRO" ? 10 : 3} simultâneas`}
        action={
          <Button asChild variant="brand" size="sm">
            <Link to="/empresa/nova-oportunidade">+ CRIAR OPORTUNIDADE</Link>
          </Button>
        }
      />

      <div className="space-y-4">
        {active.map((o) => (
          <div key={o.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-2">
                  {o.exclusive && <ExclusiveBadge />}
                  {o.boosted && <BoostedBadge />}
                  <Pill tone="success">Ativa — encerra em {o.deadlineDays} dias</Pill>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold">{o.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {o.dealType} • {offerLabel(o)} • {o.candidates} candidatos • {o.matches} Matches
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="brandSoft" size="sm">
                  <Link to="/empresa/candidatos/$id" params={{ id: o.id }}>
                    VER CANDIDATOS
                  </Link>
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => toast.success("Oportunidade impulsionada por 7 dias — R$29,90")}
                >
                  <Flame className="h-4 w-4" /> IMPULSIONAR
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-muted/60 p-3 text-sm">
              <span className="font-semibold">Renovar prazo:</span>
              <Button size="sm" variant="outline" onClick={() => toast.success("+7 dias adicionados")}>
                +7 dias — R$19,90
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("+15 dias adicionados")}>
                +15 dias — R$29,90
              </Button>
              <span className="text-xs text-muted-foreground">
                Prazo máximo por publicação: 30 dias.
              </span>
            </div>
          </div>
        ))}
      </div>

      {closed.length > 0 && (
        <section>
          <h2 className="mb-3 font-display text-lg font-bold">Histórico</h2>
          <div className="space-y-3">
            {closed.map((o) => (
              <div
                key={o.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-card p-5 opacity-80"
              >
                <div>
                  <Pill tone="muted">Encerrada</Pill>
                  <h3 className="mt-1 font-bold">{o.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {o.candidates} candidatos • {o.matches} Matches
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.success("+7 dias — R$19,90")}>
                  RENOVAR
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
