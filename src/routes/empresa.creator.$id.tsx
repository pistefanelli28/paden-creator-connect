import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Lock, MapPin, Send, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";
import {
  GuardianBadge,
  MetricsBadge,
  Pill,
  VerifiedBadge,
} from "@/components/paden/Badges";
import { ReportDialog } from "@/components/paden/ReportDialog";
import { MatchCelebration } from "@/components/paden/MatchCelebration";
import { formatBRL, formatFollowers, getCreator } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/empresa/creator/$id")({
  head: () => ({
    meta: [
      { title: "Perfil do creator | PADEN Empresas" },
      {
        name: "description",
        content: "Veja métricas, portfólio e avaliações do creator. Contatos liberados só após o Match.",
      },
      { property: "og:title", content: "Perfil do creator | PADEN Empresas" },
      { property: "og:description", content: "Métricas verificadas, portfólio e avaliações." },
    ],
  }),
  component: CreatorProfileForBusiness,
});

function CreatorProfileForBusiness() {
  const { id } = Route.useParams();
  const creator = getCreator(id);
  const { currentCompany, favorites, toggleFavorite, favoriteLimit } = usePaden();
  const [matchOpen, setMatchOpen] = useState(false);
  const isFav = favorites.includes(id);
  const canInvite = currentCompany.plan !== "Grátis";

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/empresa/creators">
          <ArrowLeft className="h-4 w-4" /> Voltar para busca
        </Link>
      </Button>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-start gap-5">
          <InitialsAvatar name={creator.name} size="xl" />
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-2xl font-extrabold">
              {creator.name} {creator.verified && <span className="text-primary">✓</span>}
            </h1>
            <p className="text-muted-foreground">{creator.niches.join(" • ")}</p>
            <p className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {creator.region} — SP
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {creator.verified && <VerifiedBadge />}
              {creator.metricsVerified && <MetricsBadge />}
              {creator.guardianStatus && <GuardianBadge status={creator.guardianStatus} />}
              {creator.activeRecently && <Pill tone="muted">Ativo recentemente</Pill>}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => {
                if (!isFav && favorites.length >= favoriteLimit) {
                  toast.error(`Limite de ${favoriteLimit} favoritos no plano Business`);
                  return;
                }
                toggleFavorite(creator.id);
              }}
            >
              <Heart className={isFav ? "fill-accent text-accent" : ""} />
              {isFav ? "FAVORITO" : "FAVORITAR"}
            </Button>
            <Button
              variant="brand"
              disabled={!canInvite}
              onClick={() => {
                setMatchOpen(true);
                toast.success("Convite enviado", { description: "O creator vai aceitar ou recusar." });
              }}
            >
              <Send className="h-4 w-4" /> CONVIDAR PARA OPORTUNIDADE
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            [formatFollowers(creator.followers), "seguidores"],
            [formatFollowers(creator.avgViews), "views médias"],
            [`${creator.engagement.toString().replace(".", ",")}%`, "engajamento"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-2xl bg-muted/60 p-4 text-center">
              <p className="font-display text-xl font-extrabold">{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <p>Público principal: {creator.audience}</p>
          <p>Maioria da audiência: {creator.audienceCity}</p>
          <p>{creator.formats.join(" • ")}</p>
          <p>
            {creator.partnerships} parcerias PADEN • ⭐{" "}
            {creator.rating.toString().replace(".", ",")} — {creator.reviews} avaliações
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill tone="accent">
            Cachê de referência: {formatBRL(creator.feeMin)}–{formatBRL(creator.feeMax)}
          </Pill>
          {creator.acceptsBarter && <Pill tone="outline">Aceita permuta</Pill>}
          {creator.acceptsMixed && <Pill tone="outline">Aceita cachê + permuta</Pill>}
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" /> @ do Instagram, TikTok e e-mail ficam disponíveis somente após o
          PADEN Match.
        </div>
      </div>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-lg font-bold">Portfólio</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {creator.portfolio.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Conteúdo ${i + 1} do portfólio de ${creator.name}`}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between rounded-3xl border border-border bg-card p-6 shadow-soft">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-accent text-accent" /> Avaliação média{" "}
          {creator.rating.toString().replace(".", ",")} em {creator.reviews} parcerias confirmadas.
        </p>
        <ReportDialog target={creator.name} />
      </section>

      <MatchCelebration
        open={matchOpen}
        onOpenChange={setMatchOpen}
        creatorName={creator.name.split(" ")[0]!}
        companyName={currentCompany.name}
        contacts={{
          instagram: creator.instagram,
          tiktok: creator.tiktok,
          email: creator.email,
        }}
      />
    </div>
  );
}
