import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Upload, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PageTitle } from "@/components/paden/Shells";
import { Pill } from "@/components/paden/Badges";
import { NICHES, REGIONS } from "@/data/paden";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/empresa/nova-oportunidade")({
  head: () => ({
    meta: [
      { title: "Criar oportunidade | PADEN Empresas" },
      {
        name: "description",
        content: "Publique uma oportunidade com requisitos, preferências, entregas, prazo e oferta clara.",
      },
      { property: "og:title", content: "Criar oportunidade | PADEN Empresas" },
      { property: "og:description", content: "Cachê, permuta ou cachê + permuta com valor definido." },
    ],
  }),
  component: NewOpportunity,
});

const DEALS = ["Cachê", "Permuta", "Cachê + Permuta"] as const;

function NewOpportunity() {
  const navigate = useNavigate();
  const [deal, setDeal] = useState<string>("Cachê");
  const [mode, setMode] = useState<"exato" | "faixa">("exato");
  const [exclusive, setExclusive] = useState(false);
  const [niche, setNiche] = useState<string>("Gastronomia");
  const [region, setRegion] = useState<string>("Jardins");

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
      active
        ? "border-primary bg-primary-soft text-primary"
        : "border-border text-muted-foreground hover:bg-muted",
    );

  return (
    <div className="max-w-3xl">
      <PageTitle title="Criar oportunidade" subtitle="Sua primeira oportunidade é grátis por 15 dias." />

      <div className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="space-y-2">
          <Label>Imagem de capa</Label>
          <button className="flex h-32 w-full items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground hover:bg-muted">
            <Upload className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="titulo">Título</Label>
          <Input id="titulo" placeholder="Lançamento Nova Unidade Jardins" />
        </div>

        <div className="space-y-2">
          <Label>Nicho</Label>
          <div className="flex flex-wrap gap-2">
            {NICHES.map((n) => (
              <button key={n} className={chip(niche === n)} onClick={() => setNiche(n)}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Região</Label>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button key={r} className={chip(region === r)} onClick={() => setRegion(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="qtd">Quantidade estimada de creators</Label>
            <Input id="qtd" type="number" placeholder="5" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prazo">Data de encerramento (máx. 30 dias)</Label>
            <Input id="prazo" type="date" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="req">Requisitos obrigatórios</Label>
          <Textarea id="req" rows={3} placeholder="Um por linha. Ex: mínimo 10 mil seguidores" />
          <p className="text-xs text-muted-foreground">
            Creators que não cumprem requisitos obrigatórios não conseguem se candidatar.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pref">Preferências</Label>
          <Textarea id="pref" rows={2} placeholder="Ex: público 18–34, forte no TikTok" />
          <p className="text-xs text-muted-foreground">
            Preferências não impedem candidaturas, apenas influenciam a compatibilidade.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Tipo de parceria</Label>
          <div className="flex flex-wrap gap-2">
            {DEALS.map((d) => (
              <button key={d} className={chip(deal === d)} onClick={() => setDeal(d)}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl bg-muted/60 p-4">
          <Label>Oferta</Label>
          <div className="flex gap-2">
            <button className={chip(mode === "exato")} onClick={() => setMode("exato")}>
              Valor exato
            </button>
            <button className={chip(mode === "faixa")} onClick={() => setMode("faixa")}>
              Faixa de valor
            </button>
          </div>
          {mode === "exato" ? (
            <Input type="number" placeholder="400" />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Input type="number" placeholder="300" />
              <Input type="number" placeholder="600" />
            </div>
          )}
          {deal !== "Cachê" && (
            <Input placeholder="Descreva a permuta. Ex: jantar para 2" />
          )}
          <p className="text-xs text-muted-foreground">
            Não é permitido publicar apenas “A combinar”. Informe valor exato ou faixa.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="entregas">Entregas esperadas</Label>
          <Input id="entregas" placeholder="1 Reel + 2 Stories" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Descrição</Label>
          <Textarea id="desc" rows={4} placeholder="Conte o que a marca espera da collab." />
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-accent-soft p-4">
          <div>
            <Label htmlFor="excl" className="flex items-center gap-2 font-bold">
              <Zap className="h-4 w-4" /> Marcar como EXCLUSIVA PADEN
            </Label>
            <p className="mt-1 text-xs text-accent-foreground">
              Candidaturas desta oportunidade acontecem exclusivamente pela PADEN.
            </p>
          </div>
          <Switch id="excl" checked={exclusive} onCheckedChange={setExclusive} />
        </div>

        {exclusive && <Pill tone="accent">⚡ EXCLUSIVA PADEN</Pill>}

        <Button
          variant="brand"
          size="lg"
          className="w-full"
          onClick={() => {
            toast.success("Oportunidade publicada!", {
              description: "Ela já está no feed dos creators compatíveis.",
            });
            navigate({ to: "/empresa/oportunidades" });
          }}
        >
          PUBLICAR OPORTUNIDADE
        </Button>
      </div>
    </div>
  );
}
