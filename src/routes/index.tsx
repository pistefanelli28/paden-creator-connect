import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Sparkles, Users } from "lucide-react";
import { PadenLogo } from "@/components/paden/PadenLogo";
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
  component: RoleChoice,
});

function RoleChoice() {
  const { setRole } = usePaden();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-gradient-soft opacity-70 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-12">
        <header className="mb-10 flex items-center justify-between">
          <PadenLogo />
          <Link
            to="/admin"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Admin
          </Link>
        </header>

        <div className="animate-rise max-w-2xl space-y-3">
          <PadenLogo variant="full" className="mb-2 w-full max-w-lg" />
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" /> São Paulo capital
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
            Como você quer usar a <span className="text-gradient-brand">PADEN</span>?
          </h1>
          <p className="text-base text-muted-foreground">
            Creators encontram marcas. Marcas encontram creators. Descobrir → Conectar → Dar Match.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link
            to="/para-creators"
            onClick={() => setRole("creator")}
            className="card-hover group rounded-3xl border border-border bg-card p-7 shadow-soft"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Users className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-extrabold">SOU CREATOR</h2>
            <p className="mt-2 text-muted-foreground">
              Quero encontrar marcas e oportunidades.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Continuar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            to="/para-empresas"
            onClick={() => setRole("empresa")}
            className="card-hover group rounded-3xl border border-border bg-card p-7 shadow-soft"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Building2 className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-extrabold">SOU EMPRESA</h2>
            <p className="mt-2 text-muted-foreground">
              Quero encontrar creators para minha marca.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent">
              Continuar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>

        <p className="mt-10 max-w-xl text-xs text-muted-foreground">
          A PADEN não é agência e não participa da negociação comercial. Depois do Match, creator e
          empresa negociam diretamente.
        </p>
      </div>
    </div>
  );
}
