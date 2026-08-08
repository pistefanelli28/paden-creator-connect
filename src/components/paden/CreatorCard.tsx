import { Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";
import { MetricsBadge, Pill, VerifiedBadge } from "@/components/paden/Badges";
import { formatBRL, formatFollowers, type Creator } from "@/data/paden";

export function CreatorCard({ creator, compat }: { creator: Creator; compat?: number | undefined }) {
  return (
    <article className="card-hover overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start gap-4">
        <InitialsAvatar name={creator.name} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-bold">{creator.name}</h3>
            {creator.verified && <span className="text-primary">✓</span>}
            {compat !== undefined && (
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary">
                {compat}% compatível
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{creator.niches.join(" • ")}</p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {creator.region} — SP
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-muted/60 p-3 text-center">
        <div>
          <p className="font-display text-base font-bold">{formatFollowers(creator.followers)}</p>
          <p className="text-[11px] text-muted-foreground">seguidores</p>
        </div>
        <div>
          <p className="font-display text-base font-bold">{formatFollowers(creator.avgViews)}</p>
          <p className="text-[11px] text-muted-foreground">views médias</p>
        </div>
        <div>
          <p className="font-display text-base font-bold">
            {creator.engagement.toString().replace(".", ",")}%
          </p>
          <p className="text-[11px] text-muted-foreground">engajamento</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {creator.verified && <VerifiedBadge />}
        {creator.metricsVerified && <MetricsBadge />}
        {creator.acceptsBarter && <Pill tone="outline">Aceita permuta</Pill>}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-semibold">
          {formatBRL(creator.feeMin)}–{formatBRL(creator.feeMax)}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          {creator.reviews ? `${creator.rating.toString().replace(".", ",")} — ${creator.reviews} avaliações` : "Sem avaliações"}
        </span>
      </div>

      <Button asChild variant="brandSoft" className="mt-4 w-full">
        <Link to="/empresa/creator/$id" params={{ id: creator.id }}>
          VER PERFIL
        </Link>
      </Button>
    </article>
  );
}
