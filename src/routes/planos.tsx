import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { Pill } from "@/components/paden/Badges";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos PADEN — Creator PRO, Business e Business PRO" },
      {
        name: "description",
        content:
          "PADEN PRO R$29,90/mês para creators. Business a partir de R$99/mês e Business PRO a partir de R$179/mês para marcas. Pagamento por cartão ou PIX.",
      },
      { property: "og:title", content: "Planos PADEN" },
      {
        property: "og:description",
        content: "Creator PRO, Business e Business PRO — preços claros, sem dark patterns.",
      },
    ],
  }),
  component: Plans,
});

function Plans() {
  const { setPlan } = usePaden();

  const business = [
    { label: "Business Mensal", price: "R$149/mês", note: "Plano mensal — renovação a cada mês." },
    {
      label: "Business Semestral",
      price: "R$129/mês",
      note: "Plano semestral — compromisso referente ao período contratado (6 meses).",
    },
    {
      label: "Business Anual",
      price: "R$99/mês",
      note: "Plano anual — compromisso referente ao período contratado (12 meses).",
    },
  ];
  const businessPro = [
    { label: "Business PRO Mensal", price: "R$249/mês", note: "Plano mensal — renovação a cada mês." },
    {
      label: "Business PRO Semestral",
      price: "R$219/mês",
      note: "Plano semestral — compromisso referente ao período contratado (6 meses).",
    },
    {
      label: "Business PRO Anual",
      price: "R$179/mês",
      note: "Plano anual — compromisso referente ao período contratado (12 meses).",
    },
  ];

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" aria-label="PADEN">
          <PadenLogo />
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/app">Área do creator</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/empresa">Área da empresa</Link>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-16">
        <div>
          <h1 className="font-display text-3xl font-extrabold md:text-4xl">Planos PADEN</h1>
          <p className="mt-2 text-muted-foreground">
            Preços claros, sem letras miúdas. Pagamento por cartão ou PIX.
          </p>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display text-xl font-bold">Creator FREE</h2>
            <p className="mt-1 font-display text-3xl font-extrabold">R$0</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                "Perfil ativo",
                "Feed personalizado",
                "Compatibilidade",
                "3 candidaturas/mês",
                "Até 3 oportunidades salvas",
                "Visualização básica de quem viu seu perfil",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="h-4 w-4 text-success" /> {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-5 w-full" onClick={() => setPlan("free")}>
              USAR O FREE
            </Button>
          </div>

          <div className="rounded-3xl border border-primary/30 bg-gradient-soft p-6 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">PADEN PRO</h2>
              <Pill tone="accent">14 dias grátis</Pill>
            </div>
            <p className="mt-1 font-display text-3xl font-extrabold">R$29,90/mês</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              {[
                "30 candidaturas/mês",
                "Até 20 oportunidades salvas",
                "Vê os valores das oportunidades",
                "Prioridade nos resultados e maior visibilidade",
                "Perfil destacado e analytics adicionais",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="h-4 w-4 text-success" /> {f}
                </li>
              ))}
            </ul>
            <Button
              variant="brand"
              className="mt-5 w-full"
              onClick={() => {
                setPlan("pro");
                toast.success("PADEN PRO ativo");
              }}
            >
              ASSINAR PADEN PRO
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Todo novo creator recebe 14 dias grátis. Se não assinar, a conta volta automaticamente
              para o FREE — sem cobrança automática escondida.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl font-extrabold">Para empresas</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">Business</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Busca de creators e filtros",
                  "Publicar oportunidades e receber candidatos",
                  "Matches e avaliações",
                  "Até 3 oportunidades ativas simultâneas",
                  "10 convites diretos/mês",
                  "Até 8 creators favoritos",
                ].map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-3">
                {business.map((b) => (
                  <div key={b.label} className="rounded-2xl bg-muted/60 p-4">
                    <p className="font-bold">{b.label}</p>
                    <p className="font-display text-2xl font-extrabold">{b.price}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground/80">{b.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary/30 bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold">Business PRO</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Tudo do Business",
                  "Até 10 oportunidades simultâneas",
                  "30 convites diretos/mês",
                  "Creators favoritos ilimitados + listas",
                  "Filtros e recursos adicionais",
                  "Recomendados pela PADEN e maior destaque",
                ].map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-3">
                {businessPro.map((b) => (
                  <div key={b.label} className="rounded-2xl bg-primary-soft/60 p-4">
                    <p className="font-bold">{b.label}</p>
                    <p className="font-display text-2xl font-extrabold">{b.price}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground/80">{b.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
            <p className="font-bold text-foreground">Como funciona o cancelamento</p>
            <p className="mt-2">
              O cancelamento impede a renovação futura, mas o acesso permanece até o fim do período já
              contratado, respeitando os direitos obrigatórios previstos na legislação aplicável.
            </p>
            <p className="mt-2">
              Métodos de pagamento: cartão e PIX, processados por gateway externo. A PADEN não armazena
              dados sensíveis de cartão.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
