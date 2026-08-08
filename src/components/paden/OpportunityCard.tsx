import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BoostedBadge,
  CompatScore,
  ExclusiveBadge,
  Pill,
  ProLockedValue,
} from "@/components/paden/Badges";
import { cn } from "@/lib/utils";
import { compatibility, getCompany, offerLabel, type Opportunity } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const { currentCreator, isPro, saved, toggleSave, applications, savedLimit } = usePaden();
  const company = getCompany(opportunity.companyId);
  const { score } = compatibility(currentCreator, opportunity);
  const isSaved = saved.includes(opportunity.id);
  const applied = applications.includes(opportunity.id);
  const saveBlocked = !isSaved && saved.length >= savedLimit;

  return (
    <article className="card-hover group overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="relative">
        <img
          src={opportunity.cover}
          alt={`Capa da oportunidade ${opportunity.title}`}
          loading="lazy"
          className="h-40 w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {opportunity.exclusive && <ExclusiveBadge />}
          {opportunity.boosted && <BoostedBadge />}
        </div>
        <div className="absolute bottom-3 right-3">
          <CompatScore score={score} />
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {company.name} • {opportunity.niche}
          </p>
          <h3 className="text-lg font-bold leading-snug">{opportunity.title}</h3>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {opportunity.region} — São Paulo
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="outline">{opportunity.dealType}</Pill>
          {isPro ? (
            <Pill tone="accent">{offerLabel(opportunity)}</Pill>
          ) : (
            <ProLockedValue />
          )}
        </div>

        <p className="text-sm text-muted-foreground">{opportunity.deliverables}</p>

        <div className="flex items-center gap-2 pt-1">
          <Button asChild variant="brand" className="flex-1">
            <Link to="/app/oportunidade/$id" params={{ id: opportunity.id }}>
              {applied ? "CANDIDATURA ENVIADA" : "QUERO PARTICIPAR"}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={isSaved ? "Remover dos salvos" : "Salvar oportunidade"}
            disabled={saveBlocked}
            onClick={() => toggleSave(opportunity.id)}
          >
            <Heart className={cn("h-4 w-4", isSaved && "fill-accent text-accent")} />
          </Button>
        </div>
        {saveBlocked && (
          <p className="text-xs text-muted-foreground">
            Limite de {savedLimit} oportunidades salvas no seu plano.
          </p>
        )}
      </div>
    </article>
  );
}
