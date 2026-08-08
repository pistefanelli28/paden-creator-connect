import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/paden/Shells";
import { BoostedBadge, ExclusiveBadge, Pill } from "@/components/paden/Badges";
import { opportunities } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/empresa/")({
  head: () => ({
    meta: [
      { title: "Dashboard da empresa | PADEN" },
      {
        name: "description",
        content: "Acompanhe oportunidades ativas, candidatos, Matches e avaliações da sua marca.",
      },
      { property: "og:title", content: "Dashboard da empresa | PADEN" },
      { property: "og:description", content: "Suas campanhas e candidatos em um só lugar." },
    ],
  }),
  component: BusinessHome,
});

function BusinessHome() {
  const { currentCompany } = usePaden();
  const mine = opportunities.filter((o) => o.companyId === currentCompany.id);
  const active = mine.filter((o) => !o.closed);

  return (
    <div className="space-y-8">
      <PageTitle
        title={`Olá, ${currentCompany.name} 👋`}
        subtitle="Empresa ativa recentemente"
        action={<Pill tone="primary">Plano {currentCompany.plan} ativo</Pill>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [String(active.length), "oportunidades ativas"],
          [String(mine.reduce((s, o) => s + o.newCandidates, 0)), "novos candidatos"],
          [String(mine.reduce((s, o) => s + o.matches, 0)), "Matches"],
          [currentCompany.rating.toString().replace(".", ","), "avaliação média"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <p className="font-display text-2xl font-extrabold">{v}</p>
            <p className="text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold">Suas oportunidades</h2>
          <Button asChild variant="brand" size="sm">
            <Link to="/empresa/nova-oportunidade">+ CRIAR OPORTUNIDADE</Link>
          </Button>
        </div>
        <div className="space-y-4">
          {mine.map((o) => (
            <div
              key={o.id}
              className="flex flex-wrap items-center gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft"
            >
              <img
                src={o.cover}
                alt={`Capa de ${o.title}`}
                loading="lazy"
                className="h-20 w-28 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-2">
                  {o.exclusive && <ExclusiveBadge />}
                  {o.boosted && <BoostedBadge />}
                  {o.closed && <Pill tone="muted">Encerrada</Pill>}
                </div>
                <h3 className="mt-1 font-bold">{o.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {o.candidates} candidatos • {o.newCandidates} novos • {o.matches} Matches
                </p>
              </div>
              <Button asChild variant="brandSoft" size="sm">
                <Link to="/empresa/candidatos/$id" params={{ id: o.id }}>
                  VER CANDIDATOS
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <Star className="h-5 w-5 fill-accent text-accent" /> Avaliações recebidas
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          ⭐ {currentCompany.rating.toString().replace(".", ",")} — {currentCompany.reviews} avaliações
          de creators com parceria confirmada.
        </p>
      </section>
    </div>
  );
}
