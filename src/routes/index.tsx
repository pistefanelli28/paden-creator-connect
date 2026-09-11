import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Play, Sparkles, Users } from "lucide-react";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { HowItWorksCreator, HowItWorksBusiness } from "@/components/paden/HowItWorks";

import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PADEN — Creators encontram marcas. Marcas encontram creators." },
      {
        name: "description",
        content:
          "A PADEN conecta creators digitais e marcas de São Paulo: descubra oportunidades, demonstre interesse, dê Match e negocie direto.",
      },
      { property: "og:title", content: "PADEN — Creators encontram marcas" },
      {
        property: "og:description",
        content: "Marketplace de collabs, permutas e campanhas entre creators e marcas de São Paulo.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { setRole } = usePaden();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-gradient-soft opacity-70 blur-3xl" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center px-4 py-12">
        <header className="mb-12 flex items-center justify-between">
          <PadenLogo />
          <Link
            to="/admin"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Admin
          </Link>
        </header>

        <div className="animate-rise max-w-2xl space-y-4">
          <PadenLogo variant="full" className="mb-1 w-full max-w-md" />
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" /> São Paulo capital
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
            Onde grandes <span className="text-gradient-brand">collabs</span> começam.
          </h1>
          <p className="text-base text-muted-foreground">
            Marketplace que conecta creators digitais a marcas e empresas de São Paulo. Encontre,
            demonstre interesse, dê Match e negocie direto.
          </p>
        </div>

        <div className="mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground shadow-soft hover:bg-surface-raised"
          >
            <Play className="h-4 w-4 text-primary" /> Como funciona
          </a>
        <Link
        to="/planos"
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground shadow-soft hover:bg-surface-raised"
      >
        Planos
      </Link>
      <Link
        to="/Significado da PADEN"
        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground shadow-soft hover:bg-surface-raised"
      >
        O que significa cada coisa
      </Link>
        </div>

        <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
          <Link
            to="/cadastro"
            onClick={() => setRole("creator")}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-brand px-6 py-4 text-sm font-bold text-primary-foreground shadow-brand transition-transform hover:scale-[1.02]"
          >
            <Users className="h-5 w-5" /> Criar conta como Creator
          </Link>
          <Link
            to="/cadastro-empresa"
            onClick={() => setRole("empresa")}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-accent px-6 py-4 text-sm font-bold text-accent-foreground shadow-accent transition-transform hover:scale-[1.02]"
          >
            <Building2 className="h-5 w-5" /> Criar conta como Empresa
          </Link>
        </div>

        <p className="mt-10 max-w-xl text-xs text-muted-foreground">
          A PADEN não é agência e não participa da negociação comercial. Depois do Match, creator e
          empresa negociam diretamente.
        </p>
      </div>

      <section id="como-funciona" className="scroll-mt-20 border-t border-border/50">
        <HowItWorksCreator />
        <HowItWorksBusiness />
      </section>
    </div>
  );
}
