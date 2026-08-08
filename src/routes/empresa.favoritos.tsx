import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/paden/Shells";
import { CreatorCard } from "@/components/paden/CreatorCard";
import { Pill } from "@/components/paden/Badges";
import { creators } from "@/data/paden";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/empresa/favoritos")({
  head: () => ({
    meta: [
      { title: "Creators favoritos | PADEN Empresas" },
      {
        name: "description",
        content: "Seus creators favoritos e listas personalizadas para campanhas futuras.",
      },
      { property: "og:title", content: "Creators favoritos | PADEN Empresas" },
      { property: "og:description", content: "Salve creators e organize por listas." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, currentCompany, favoriteLimit } = usePaden();
  const isPro = currentCompany.plan === "Business PRO";
  const list = creators.filter((c) => favorites.includes(c.id));

  return (
    <div>
      <PageTitle
        title="Favoritos"
        subtitle={
          isPro
            ? "Favoritos ilimitados + listas personalizadas"
            : `${favorites.length} de ${favoriteLimit} favoritos no plano Business`
        }
      />

      {isPro && (
        <div className="mb-6 flex flex-wrap gap-2">
          {["Gastronomia", "Moda", "Campanha Natal", "Creators Jardins"].map((l) => (
            <Pill key={l} tone="outline">
              {l}
            </Pill>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-10 text-center">
          <Heart className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 font-bold">Nenhum creator favoritado</p>
          <Button asChild variant="brand" className="mt-5">
            <Link to="/empresa/creators">Encontrar creators</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </div>
  );
}
