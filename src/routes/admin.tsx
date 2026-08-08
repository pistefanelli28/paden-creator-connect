import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { Pill } from "@/components/paden/Badges";
import { companies, creators, opportunities } from "@/data/paden";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo | PADEN" },
      {
        name: "description",
        content: "Painel PADEN: creators, empresas, oportunidades, verificações, métricas, denúncias e assinaturas.",
      },
      { property: "og:title", content: "Painel administrativo | PADEN" },
      { property: "og:description", content: "Gestão manual e simples da operação PADEN." },
    ],
  }),
  component: Admin,
});

const MENU = [
  "Creators",
  "Empresas",
  "Oportunidades",
  "Verificações",
  "Métricas",
  "Denúncias",
  "Assinaturas",
] as const;

function Admin() {
  const [tab, setTab] = useState<string>(MENU[0]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" aria-label="PADEN">
          <PadenLogo />
        </Link>
        <Pill tone="primary">Admin PADEN</Pill>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 md:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {MENU.map((m) => (
            <button
              key={m}
              onClick={() => setTab(m)}
              className={cn(
                "w-full rounded-2xl px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                tab === m ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted",
              )}
            >
              {m}
            </button>
          ))}
        </nav>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h1 className="font-display text-2xl font-extrabold">{tab}</h1>

          {tab === "Creators" && (
            <div className="mt-5 space-y-3">
              {creators.map((c) => (
                <Row
                  key={c.id}
                  title={`${c.name} • ${c.region}`}
                  subtitle={`${c.niches.join(", ")} — ${c.followers} seguidores`}
                  actions={["Suspender", "Banir"]}
                />
              ))}
            </div>
          )}

          {tab === "Empresas" && (
            <div className="mt-5 space-y-3">
              {companies.map((e) => (
                <Row
                  key={e.id}
                  title={`${e.name} • ${e.region}`}
                  subtitle={`${e.segment} — plano ${e.plan}`}
                  actions={["Suspender", "Banir"]}
                />
              ))}
            </div>
          )}

          {tab === "Oportunidades" && (
            <div className="mt-5 space-y-3">
              {opportunities.map((o) => (
                <Row
                  key={o.id}
                  title={o.title}
                  subtitle={`${o.niche} — ${o.candidates} candidatos — ${o.closed ? "encerrada" : "ativa"}`}
                  actions={["Encerrar"]}
                />
              ))}
            </div>
          )}

          {tab === "Verificações" && (
            <div className="mt-5 space-y-3">
              {creators
                .filter((c) => !c.verified)
                .map((c) => (
                  <Row
                    key={c.id}
                    title={`${c.name} — identidade pendente`}
                    subtitle={
                      c.guardianStatus ? `Responsável legal ${c.guardianStatus}` : "Documento enviado"
                    }
                    actions={["Aprovar", "Recusar"]}
                  />
                ))}
            </div>
          )}

          {tab === "Métricas" && (
            <div className="mt-5 space-y-3">
              {creators
                .filter((c) => !c.metricsVerified)
                .map((c) => (
                  <Row
                    key={c.id}
                    title={`${c.name} — prints de Insights`}
                    subtitle={`Informou ${c.followers} seguidores e ${c.engagement}% engajamento`}
                    actions={["Verificar métricas", "Recusar"]}
                  />
                ))}
            </div>
          )}

          {tab === "Denúncias" && (
            <div className="mt-5 space-y-3">
              <Row
                title="Suspeita de golpe/fraude — Loja Reverso"
                subtitle="Relato de creator: pediu conteúdo antes de acordo."
                actions={["Arquivar", "Suspender"]}
              />
              <Row
                title="Informações falsas — Rafa Nogueira"
                subtitle="Métricas divergentes dos prints enviados."
                actions={["Arquivar", "Suspender"]}
              />
            </div>
          )}

          {tab === "Assinaturas" && (
            <div className="mt-5 space-y-3">
              {companies.map((e) => (
                <Row
                  key={e.id}
                  title={`${e.name} — ${e.plan}`}
                  subtitle={e.plan === "Grátis" ? "Oportunidade grátis em uso" : "Assinatura ativa"}
                  actions={["Ver detalhes"]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions: string[];
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-muted/50 p-4">
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        {actions.map((a) => (
          <Button key={a} size="sm" variant="outline" onClick={() => toast.success(`${a} — ok`)}>
            {a}
          </Button>
        ))}
      </div>
    </div>
  );
}
