import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PadenLogo } from "@/components/paden/PadenLogo";
import {
  CompatReasons,
  CompatScore,
  MetricsBadge,
  Pill,
  ProLockedValue,
  VerifiedBadge,
} from "@/components/paden/Badges";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";
import { HowItWorksCreator } from "@/components/paden/HowItWorks";
import {
  compatibility,
  creators,
  formatFollowers,
  getCompany,
  opportunities,
} from "@/data/paden";

export const Route = createFileRoute("/para-creators")({
  head: () => ({
    meta: [
      { title: "Sua próxima collab pode estar aqui | PADEN Creators" },
      {
        name: "description",
        content:
          "Descubra marcas e oportunidades que combinam com o seu conteúdo: compatibilidade, Match, perfil profissional, avaliações e PADEN PRO.",
      },
      { property: "og:title", content: "Sua próxima collab pode estar aqui | PADEN" },
      {
        property: "og:description",
        content: "Oportunidades de collab, permuta e cachê com marcas de São Paulo.",
      },
    ],
  }),
  component: CreatorLanding,
});

function CreatorLanding() {
  const creator = creators[0]!;
  const opp = opportunities[0]!;
  const company = getCompany(opp.companyId);
  const { score, reasons } = compatibility(creator, opp);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" aria-label="PADEN">
          <PadenLogo />
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/app">Já tenho conta</Link>
          </Button>
          <Button asChild variant="brand" size="sm">
            <Link to="/cadastro">CRIAR MEU PERFIL</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-gradient-soft opacity-80 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:py-16">
          <div className="animate-rise space-y-5">
            <Pill tone="accent">
              <Sparkles className="h-3.5 w-3.5" /> 14 dias de PADEN PRO grátis
            </Pill>
            <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Sua próxima collab pode estar <span className="text-gradient-brand">aqui.</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Descubra marcas e oportunidades que combinam com o seu conteúdo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg">
                <Link to="/cadastro">
                  CRIAR MEU PERFIL <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/app/oportunidades">Ver oportunidades</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
              <span>+100 creators em SP</span>
              <span>•</span>
              <span>Gastronomia, Moda, Beleza, Fitness e mais</span>
            </div>
          </div>

          <div className="space-y-4">
            <article className="animate-pop rounded-3xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    🔥 Para você
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {opp.niche} • {opp.region} — São Paulo
                  </p>
                </div>
                <CompatScore score={score} />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Pill tone="outline">{opp.dealType}</Pill>
                <ProLockedValue />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{opp.deliverables}</p>
              <div className="mt-4 rounded-2xl bg-muted/60 p-4">
                <p className="mb-2 text-sm font-bold">Por que combina com você?</p>
                <CompatReasons reasons={reasons} />
              </div>
            </article>

            <article className="rounded-3xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-4">
                <InitialsAvatar name={creator.name} size="lg" />
                <div>
                  <p className="font-display text-lg font-bold">{creator.name} ✓</p>
                  <p className="text-sm text-muted-foreground">{creator.niches.join(" • ")}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFollowers(creator.followers)} seguidores • {creator.engagement}%
                    engajamento
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <VerifiedBadge />
                <MetricsBadge />
                <Pill tone="muted">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" /> 4,8 — 3 avaliações
                </Pill>
              </div>
            </article>
          </div>
        </div>
      </section>

      <HowItWorksCreator />


      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-xl font-bold">Creator FREE</h3>
            <p className="mt-1 font-display text-3xl font-extrabold">R$0</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>✓ Perfil ativo e feed personalizado</li>
              <li>✓ 3 candidaturas por mês</li>
              <li>✓ Até 3 oportunidades salvas</li>
              <li>🔒 Valores das oportunidades bloqueados</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-gradient-soft p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold">PADEN PRO</h3>
              <Pill tone="accent">14 dias grátis</Pill>
            </div>
            <p className="mt-1 font-display text-3xl font-extrabold">R$29,90/mês</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li>✓ 30 candidaturas por mês</li>
              <li>✓ Até 20 oportunidades salvas</li>
              <li>✓ Vê os valores das oportunidades</li>
              <li>✓ Prioridade, perfil destacado e analytics</li>
            </ul>
            <Button asChild variant="brand" className="mt-5 w-full">
              <Link to="/cadastro">CRIAR MEU PERFIL</Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Depois dos 14 dias você volta automaticamente para o FREE. Sem cobrança escondida.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
