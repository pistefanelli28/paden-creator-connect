import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { Pill } from "@/components/paden/Badges";
import { NICHES, REGIONS } from "@/data/paden";

export const Route = createFileRoute("/cadastro-empresa")({
  head: () => ({
    meta: [
      { title: "Criar conta da empresa | PADEN Empresas" },
      {
        name: "description",
        content:
          "Cadastro da empresa em etapas: conta, dados da marca e verificação. Sua primeira oportunidade é grátis por 15 dias.",
      },
      { property: "og:title", content: "Criar conta da empresa | PADEN" },
      {
        property: "og:description",
        content: "Publique sua primeira oportunidade grátis e encontre creators em São Paulo.",
      },
    ],
  }),
  component: CompanyOnboarding,
});

const STEPS = ["Conta", "Sobre a marca", "Verificação"];

function CompanyOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Link to="/para-empresas" aria-label="PADEN">
          <PadenLogo />
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toast.success("Progresso salvo", { description: "Continue quando quiser." })}
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
              <h1 className="font-display text-2xl font-extrabold">Crie a conta da empresa</h1>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail corporativo</Label>
                <Input id="email" type="email" placeholder="parcerias@suamarca.com.br" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input id="senha" type="password" placeholder="mínimo 8 caracteres" />
              </div>
              <Pill tone="primary">1 oportunidade grátis por até 15 dias</Pill>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-extrabold">Sobre a marca</h1>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da empresa</Label>
                  <Input id="nome" placeholder="Burger House" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" placeholder="00.000.000/0000-00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Segmento</Label>
                <div className="flex flex-wrap gap-2">
                  {NICHES.map((n) => (
                    <Pill key={n} tone="outline">
                      {n}
                    </Pill>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Região principal</Label>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((r) => (
                    <Pill key={r} tone="outline">
                      {r}
                    </Pill>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sobre">Sobre a empresa</Label>
                <Textarea id="sobre" rows={3} placeholder="O que sua marca faz?" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h1 className="font-display text-2xl font-extrabold">Verificação</h1>
              <div className="rounded-2xl border border-border p-4">
                <p className="font-bold">PADEN Verified</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Envie comprovante de CNPJ para verificar a empresa. A análise é manual.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Upload className="h-4 w-4" /> Enviar documento
                </Button>
              </div>
              <Pill tone="muted">Empresa em verificação</Pill>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
            {step < STEPS.length - 1 ? (
              <Button variant="brand" onClick={() => setStep(step + 1)}>
                Continuar <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="brand"
                onClick={() => {
                  toast.success("Conta criada!", {
                    description: "Publique sua primeira oportunidade grátis.",
                  });
                  navigate({ to: "/empresa" });
                }}
              >
                <Check className="h-4 w-4" /> IR PARA O DASHBOARD
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
