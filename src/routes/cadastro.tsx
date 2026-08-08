import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ShieldAlert, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { GuardianBadge, Pill } from "@/components/paden/Badges";
import { FORMATS, NICHES, REGIONS } from "@/data/paden";
import { cn } from "@/lib/utils";
import { usePaden } from "@/lib/paden-store";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar meu perfil de creator | PADEN" },
      {
        name: "description",
        content:
          "Cadastro do creator em etapas: conta, sobre você, redes, métricas, portfólio e verificação. Salve e continue depois.",
      },
      { property: "og:title", content: "Criar meu perfil de creator | PADEN" },
      {
        property: "og:description",
        content: "Monte seu perfil PADEN em 6 etapas e receba oportunidades compatíveis.",
      },
    ],
  }),
  component: CreatorOnboarding,
});

const STEPS = ["Conta", "Sobre você", "Redes", "Métricas", "Portfólio", "Verificação"];

function CreatorOnboarding() {
  const navigate = useNavigate();
  const { onboardingStep, setOnboardingStep } = usePaden();
  const [step, setStep] = useState(Math.min(onboardingStep, 5));
  const [niches, setNiches] = useState<string[]>(["Gastronomia"]);
  const [formats, setFormats] = useState<string[]>(["Reels"]);
  const [birth, setBirth] = useState("2001-04-12");
  const [barter, setBarter] = useState(true);
  const [mixed, setMixed] = useState(true);

  const age = Math.floor((Date.now() - new Date(birth).getTime()) / 31557600000);
  const isMinor = age >= 16 && age < 18;

  const toggle = (list: string[], set: (v: string[]) => void, value: string, max: number) =>
    set(
      list.includes(value)
        ? list.filter((x) => x !== value)
        : list.length >= max
          ? list
          : [...list, value],
    );

  const go = (next: number) => {
    setStep(next);
    setOnboardingStep(next);
  };

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Link to="/para-creators" aria-label="PADEN">
          <PadenLogo />
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setOnboardingStep(step);
            toast.success("Progresso salvo", { description: "Você pode continuar depois." });
          }}
        >
          Salvar e continuar depois
        </Button>
      </header>

      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>
              Etapa {step + 1} de {STEPS.length} — {STEPS[step]}
            </span>
            <span>{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
          </div>
          <Progress value={((step + 1) / STEPS.length) * 100} />
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-extrabold">Crie sua conta</h1>
              <p className="text-sm text-muted-foreground">
                Por enquanto usamos apenas e-mail e senha.
              </p>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="voce@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="mínimo 8 caracteres" />
              </div>
              <Pill tone="accent">Você começa com 14 dias de PADEN PRO grátis</Pill>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h1 className="font-display text-2xl font-extrabold">Sobre você</h1>
              <div className="flex items-center gap-4">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <Upload className="h-5 w-5" />
                </span>
                <Button variant="outline" size="sm">
                  Enviar foto de perfil
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome / nome artístico</Label>
                  <Input id="nome" placeholder="Lucas Ferreira" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nasc">Data de nascimento</Label>
                  <Input
                    id="nasc"
                    type="date"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
              </div>
              {isMinor && (
                <div className="space-y-2 rounded-2xl bg-accent-soft p-4">
                  <GuardianBadge status="pendente" />
                  <p className="text-sm text-accent">
                    A PADEN aceita creators a partir de 16 anos. Com 16 ou 17 anos é necessário o
                    fluxo de autorização do responsável legal antes de participar de oportunidades.
                  </p>
                  <Button variant="outline" size="sm">
                    <ShieldAlert className="h-4 w-4" /> Enviar autorização do responsável
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                <Label>Localização</Label>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((r) => (
                    <Pill key={r} tone="outline">
                      {r}
                    </Pill>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Área inicial da PADEN: São Paulo capital.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Nichos (até 3)</Label>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggle(niches, setNiches, n, 3)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                        niches.includes(n)
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-extrabold">Suas redes</h1>
              <p className="text-sm text-muted-foreground">
                Seus @ ficam visíveis para a marca somente depois do Match.
              </p>
              <div className="space-y-2">
                <Label htmlFor="ig">Instagram</Label>
                <Input id="ig" placeholder="@seuperfil" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tt">TikTok</Label>
                <Input id="tt" placeholder="@seuperfil" />
              </div>
              <div className="space-y-2">
                <Label>Formatos de conteúdo</Label>
                <div className="flex flex-wrap gap-2">
                  {FORMATS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggle(formats, setFormats, f, 5)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                        formats.includes(f)
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-extrabold">Suas métricas</h1>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="seg">Número de seguidores</Label>
                  <Input id="seg" type="number" placeholder="18700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="views">Média de visualizações</Label>
                  <Input id="views" type="number" placeholder="12400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eng">Engajamento (%)</Label>
                  <Input id="eng" type="number" step="0.1" placeholder="4.8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pub">Público predominante</Label>
                  <Input id="pub" placeholder="18–34 anos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min">Cachê mínimo (R$)</Label>
                  <Input id="min" type="number" placeholder="300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max">Cachê máximo (R$)</Label>
                  <Input id="max" type="number" placeholder="800" />
                </div>
              </div>
              <div className="space-y-3 rounded-2xl bg-muted/60 p-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="permuta">Aceito permuta</Label>
                  <Switch id="permuta" checked={barter} onCheckedChange={setBarter} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="misto">Aceito cachê + permuta</Label>
                  <Switch id="misto" checked={mixed} onCheckedChange={setMixed} />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-extrabold">Portfólio</h1>
              <p className="text-sm text-muted-foreground">
                Adicione até 6 conteúdos que representam seu trabalho.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:bg-muted"
                  >
                    <Upload className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio curta</Label>
                <Textarea id="bio" rows={3} placeholder="Conte em 2 linhas o que você faz." />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-extrabold">Verificação</h1>
              <div className="rounded-2xl border border-border p-4">
                <p className="font-bold">PADEN Verified</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Envie um documento com foto para confirmar sua identidade.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Upload className="h-4 w-4" /> Enviar documento
                </Button>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <p className="font-bold">Métricas verificadas</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Envie prints dos Insights. Nossa equipe confere manualmente.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Upload className="h-4 w-4" /> Enviar prints
                </Button>
              </div>
              <Pill tone="muted">Perfil em verificação — você já pode navegar no feed</Pill>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              disabled={step === 0}
              onClick={() => go(Math.max(0, step - 1))}
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
            {step < STEPS.length - 1 ? (
              <Button variant="brand" onClick={() => go(step + 1)}>
                Continuar <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="brand"
                onClick={() => {
                  toast.success("Perfil criado!", {
                    description: "Seus 14 dias de PADEN PRO começaram agora.",
                  });
                  navigate({ to: "/app" });
                }}
              >
                <Check className="h-4 w-4" /> CONCLUIR CADASTRO
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
