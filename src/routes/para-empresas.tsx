import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Filter, Search, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { CompatScore, MetricsBadge, Pill, VerifiedBadge } from "@/components/paden/Badges";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";
import { HowItWorksBusiness } from "@/components/paden/HowItWorks";
import { compatibility, creators, formatFollowers, opportunities } from "@/data/paden";

export const Route = createFileRoute("/para-empresas")({
  head: () => ({
    meta: [
      { title: "Encontre creators que combinam com sua marca | PADEN Empresas" },
      {
        name: "description",
        content:
          "Publique oportunidades, encontre perfis compatíveis e conecte-se com creators de São Paulo. Candidatos, compatibilidade, avaliações e Match.",
      },
      { property: "og:title", content: "Encontre creators que combinam com sua marca | PADEN" },
      {
        property: "og:description",
        content: "Busca de creators com filtros, campanhas e Match — foco em São Paulo capital.",
      },
    ],
  }),
  component: BusinessLanding,
});

function BusinessLanding() {
  const opp = opportunities[0]!;
  const top = creators
    .map((c) => ({ c, score: compatibility(c, opp).score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" aria-label="PADEN">
          <PadenLogo />
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/empresa">Já tenho conta</Link>
          </Button>
          <Button asChild variant="brand" size="sm">
            <Link to="/cadastro-empresa">ENCONTRAR CREATORS</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gradient-soft opacity-70 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
          <div className="animate-rise space-y-5">
            <Pill tone="primary">
              <Users className="h-3.5 w-3.5" /> 1 oportunidade grátis por 15 dias
            </Pill>
            <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Encontre creators que combinam com{" "}
              <span className="text-gradient-brand">sua marca.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Publique oportunidades, encontre perfis compatíveis e conecte-se com creators de São
              Paulo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link to="/cadastro-empresa">
                  ENCONTRAR CREATORS <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/planos">Ver planos</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground">
                <Search className="h-4 w-4" /> Buscar creators de Gastronomia em Jardins
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="outline">
                  <Filter className="h-3.5 w-3.5" /> 10–50 mil seguidores
                </Pill>
                <Pill tone="outline">Engajamento 4%+</Pill>
                <Pill tone="outline">Aceita permuta</Pill>
              </div>
              <div className="mt-4 space-y-3">
                {top.map(({ c, score }) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-muted/50 p-3">
                    <InitialsAvatar name={c.name} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.niches.join(" • ")} — {formatFollowers(c.followers)} seguidores
                      </p>
                    </div>
                    <CompatScore score={score} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <VerifiedBadge />
              <MetricsBadge />
              <Pill tone="muted">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" /> Avaliações reais de parcerias
              </Pill>
            </div>
          </div>
        </div>
      </section>

      <HowItWorksBusiness />


      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-border bg-gradient-soft p-6 md:p-8">
          <h2 className="font-display text-2xl font-extrabold">
            Comece com 1 oportunidade grátis por até 15 dias
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-foreground/80">
            Publique, receba candidatos, selecione creators e realize Matches. Depois disso é preciso
            assinar para publicar novas oportunidades. Busca ativa e convites são recursos dos planos
            pagos.
          </p>
          <Button asChild variant="brand" size="lg" className="mt-5">
            <Link to="/cadastro-empresa">CRIAR CONTA DA EMPRESA</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
