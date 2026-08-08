import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { CompatReasons, CompatScore, MetricsBadge, Pill, VerifiedBadge } from "@/components/paden/Badges";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";
import { compatibility, creators, getCompany, opportunities } from "@/data/paden";

export const Route = createFileRoute("/para-creators")({
  head: () => ({
    meta: [
      { title: "Sua próxima collab pode estar aqui | PADEN Creators" },
      {
        name: "description",
        content:
          "Descubra marcas e oportunidades que combinam com o seu conteúdo. Perfil profissional, compatibilidade, Match e PADEN PRO.",
      },
      { property: "og:title", content: "Sua próxima collab pode estar aqui | PADEN" },
      {
        property: "og:description",
        content: "Oportunidades de collab, permuta e cachê com marcas de São Paulo.",
      },
    ],
  }),
  component: CreatorLanding;
});

function CreatorLanding() {
  return <div />;
}
