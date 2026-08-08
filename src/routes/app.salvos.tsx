import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/paden/Shells";
import { OpportunityCard } from "@/components/paden/OpportunityCard";
import { opportunities } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/app/salvos")({
  head: () => ({
    meta: [
      { title: "Oportunidades salvas | PADEN" },
      { name: "description", content: "As oportunidades que você salvou para decidir depois." },
      { property: "og:title", content: "Oportunidades salvas | PADEN" },
      { property: "og:description", content: "Sua lista de oportunidades favoritas na PADEN." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { saved, savedLimit } = usePaden();
  const list = opportunities.filter((o) => saved.includes(o.id));

  return (
    <div>
      <PageTitle title="Salvos" subtitle={`${saved.length} de ${savedLimit} no seu plano`} />
      {list.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-10 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-bold">Nada salvo ainda</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Salve oportunidades para decidir com calma.
          </p>
          <Button asChild variant="brand" className="mt-5">
            <Link to="/app/oportunidades">Ver oportunidades</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      )}
    </div>
  );
}
