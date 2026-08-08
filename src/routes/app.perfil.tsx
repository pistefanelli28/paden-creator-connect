import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Gift, MapPin, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/paden/Shells";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";
import { MetricsBadge, Pill, VerifiedBadge } from "@/components/paden/Badges";
import { formatBRL, formatFollowers } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/app/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil de creator | PADEN" },
      {
        name: "description",
        content: "Seu perfil profissional PADEN: métricas, portfólio, avaliações, analytics e indicações.",
      },
      { property: "og:title", content: "Meu perfil de creator | PADEN" },
      { property: "og:description", content: "Perfil profissional do creator na PADEN." },
    ],
  }),
  component: CreatorProfile,
});

function CreatorProfile() {
  const { currentCreator: c, isPro, referralDays } = usePaden();

  return (
    <div className="space-y-6">
      <PageTitle
        title="Meu perfil"
        subtitle="É assim que as marcas veem você — seus contatos só aparecem após o Match."
        action={
          <Button variant="accent" size="sm" onClick={() => toast.success("Perfil destacado por 7 dias — R$14,90")}>
            <Flame className="h-4 w-4" /> DESTACAR MEU PERFIL
          </Button>
        }
      />

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-start gap-5">
          <InitialsAvatar name={c.name} size="xl" />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-2xl font-extrabold">
              {c.name} {c.verified && <span className="text-primary">✓</span>}
            </h2>
            <p className="text-muted-foreground">{c.niches.join(" • ")}</p>
            <p className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {c.region} — SP
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.verified && <VerifiedBadge />}
              {c.metricsVerified && <MetricsBadge />}
              {c.activeRecently && <Pill tone="muted">Ativo recentemente</Pill>}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            [`${formatFollowers(c.followers)}`, "seguidores"],
            [`${formatFollowers(c.avgViews)}`, "views médias"],
            [`${c.engagement.toString().replace(".", ",")}%`, "engajamento"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-muted/60 p-4 text-center">
              <p className="font-display text-xl font-extrabold">{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <p>Público principal: {c.audience}</p>
          <p>Maioria da audiência: {c.audienceCity}</p>
          <p>{c.formats.join(" • ")}</p>
          <p>
            {c.partnerships} parcerias PADEN • ⭐ {c.rating.toString().replace(".", ",")} —{" "}
            {c.reviews} avaliações
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="accent">
            Cachê de referência: {formatBRL(c.feeMin)}–{formatBRL(c.feeMax)}
          </Pill>
          {c.acceptsBarter && <Pill tone="outline">Aceita permuta</Pill>}
          {c.acceptsMixed && <Pill tone="outline">Aceita cachê + permuta</Pill>}
        </div>
      </div>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-bold">Portfólio</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {c.portfolio.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Conteúdo ${i + 1} do portfólio de ${c.name}`}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Analytics</h3>
          {!isPro && <Pill tone="primary">Exclusivo PADEN PRO</Pill>}
        </div>
        {isPro ? (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["127", "visualizações"],
              ["+23%", "vs. período anterior"],
              ["18", "aparições em buscas"],
              ["7", "empresas salvaram seu perfil"],
              ["4", "convites recebidos"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-muted/60 p-4">
                <p className="font-display text-xl font-extrabold">{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Assine o PADEN PRO para ver analytics detalhados.{" "}
            <Link to="/planos" className="font-semibold text-primary">
              Ver planos
            </Link>
          </p>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          Não mostramos quais empresas apenas visualizaram ou favoritaram seu perfil.
        </p>
      </section>

      <section className="rounded-3xl border border-border bg-gradient-soft p-6">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold">
          <Gift className="h-5 w-5" /> Indique creators e ganhe PRO
        </h3>
        <p className="mt-2 text-sm text-foreground/80">
          Cada creator indicado que concluir cadastro e verificação te dá +7 dias de PADEN PRO. Limite
          de 28 dias grátis por mês. Você já ganhou {referralDays} dias.
        </p>
        <Button
          variant="brand"
          className="mt-4"
          onClick={() => toast.success("Link de indicação copiado!")}
        >
          COPIAR MEU LINK
        </Button>
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold">
          <Star className="h-5 w-5 fill-accent text-accent" /> Avaliações
        </h3>
        <div className="mt-4 space-y-3">
          {[
            ["Burger House", 5, "Entregou tudo no prazo e o Reel performou muito bem."],
            ["Café Alameda", 5, "Super profissional, ótima comunicação."],
            ["Studio Corpo", 4, "Bom conteúdo, ajustamos algumas datas."],
          ].map(([name, stars, text]) => (
            <div key={name as string} className="rounded-2xl bg-muted/60 p-4">
              <p className="font-bold">
                {name} — {"★".repeat(stars as number)}
              </p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
