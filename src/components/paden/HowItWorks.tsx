import type { ReactNode } from "react";
import {
  BadgeCheck,
  Bell,
  Gift,
  Heart,
  Lock,
  Mail,
  Search,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { Pill } from "@/components/paden/Badges";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";

/* ---------- mini mockup primitives ---------- */

function Screen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-deep p-3 shadow-soft">
      <div className="mb-2.5 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-primary/60" />
        <span className="h-2 w-2 rounded-full bg-accent/60" />
        <span className="ml-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({
  name,
  meta,
  right,
  initials,
}: {
  name: string;
  meta: string;
  right?: ReactNode;
  initials?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-card p-2.5">
      <InitialsAvatar name={initials ?? name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold">{name}</p>
        <p className="truncate text-[11px] text-muted-foreground">{meta}</p>
      </div>
      {right}
    </div>
  );
}

function ScorePill({ value }: { value: number }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gradient-brand px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
      <Sparkles className="h-3 w-3" /> {value}%
    </span>
  );
}

function FakeButton({
  children,
  tone = "brand",
}: {
  children: ReactNode;
  tone?: "brand" | "soft" | "muted";
}) {
  const cls =
    tone === "brand"
      ? "bg-gradient-brand text-primary-foreground"
      : tone === "soft"
        ? "bg-primary/15 text-primary"
        : "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-wide ${cls}`}
    >
      {children}
    </span>
  );
}

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-card p-2.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold">{label}</span>
        <span className="font-bold text-primary">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

/* ---------- step wrapper ---------- */

type Step = { title: string; desc: string; screen: ReactNode };

function Steps({ steps }: { steps: Step[] }) {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <article
          key={s.title}
          className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft"
        >
          <div>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-extrabold text-primary">
              {i + 1}
            </span>
            <h3 className="mt-3 font-display text-base font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
          </div>
          <div className="mt-auto">{s.screen}</div>
        </article>
      ))}
    </div>
  );
}

/* ---------- creator flow ---------- */

export function HowItWorksCreator() {
  const steps: Step[] = [
    {
      title: "Monte seu perfil",
      desc: "Nichos, redes, métricas e portfólio. Perfil verificado aparece mais.",
      screen: (
        <Screen label="Meu perfil">
          <Row
            name="Larissa Freitas"
            meta="Gastronomia • Lifestyle — Pinheiros"
            right={<BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
          />
          <div className="flex flex-wrap gap-1.5">
            <Pill tone="muted">32,4 mil seguidores</Pill>
            <Pill tone="outline">5,1% engajamento</Pill>
          </div>
        </Screen>
      ),
    },
    {
      title: "Veja a sua % de compatibilidade",
      desc: "Cada oportunidade mostra o quanto ela combina com você e o motivo.",
      screen: (
        <Screen label="Feed para você">
          <Row name="Café Alameda" meta="Gastronomia — Pinheiros" right={<ScorePill value={98} />} />
          <Bar label="Nicho e região" value={100} />
          <Bar label="Público e engajamento" value={92} />
        </Screen>
      ),
    },
    {
      title: "Salve nos favoritos",
      desc: "Guarde o que te interessou para decidir depois, sem perder a vaga.",
      screen: (
        <Screen label="Salvos">
          <Row
            name="Loja Reverso"
            meta="Moda — Vila Madalena"
            right={<Heart className="h-4 w-4 shrink-0 fill-accent text-accent" />}
          />
          <Row
            name="Studio Corpo"
            meta="Fitness — Moema"
            right={<Heart className="h-4 w-4 shrink-0 fill-accent text-accent" />}
          />
        </Screen>
      ),
    },
    {
      title: "Faça sua inscrição",
      desc: "Um toque em QUERO PARTICIPAR. Sem textão, sem proposta longa.",
      screen: (
        <Screen label="Oportunidade">
          <div className="rounded-xl bg-card p-2.5">
            <p className="text-xs font-bold">Lançamento Nova Unidade</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <Pill tone="outline">Cachê</Pill>
              <Pill tone="muted">
                <Lock className="h-3 w-3" /> valor no PRO
              </Pill>
            </div>
          </div>
          <FakeButton>
            <Send className="h-3.5 w-3.5" /> Quero participar
          </FakeButton>
          <FakeButton tone="muted">Candidatura enviada</FakeButton>
        </Screen>
      ),
    },
    {
      title: "Receba convites de marcas",
      desc: "Empresas também te encontram na busca e chamam você direto.",
      screen: (
        <Screen label="Convites">
          <Row
            name="Clínica Lumia"
            meta="Convidou você — Beleza"
            right={<Mail className="h-4 w-4 shrink-0 text-accent" />}
          />
          <div className="grid grid-cols-2 gap-2">
            <FakeButton tone="brand">Aceitar</FakeButton>
            <FakeButton tone="muted">Recusar</FakeButton>
          </div>
        </Screen>
      ),
    },
    {
      title: "Match, avaliação e indicações",
      desc: "Match libera contatos. Depois vocês se avaliam — e indicar amigos rende PRO.",
      screen: (
        <Screen label="Match">
          <div className="rounded-xl bg-gradient-match p-2.5 text-center">
            <p className="font-display text-xs font-extrabold text-primary-foreground">
              É MATCH! Contatos liberados
            </p>
          </div>
          <Row
            name="Burger House"
            meta="Parceria concluída"
            right={
              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-accent">
                <Star className="h-3 w-3 fill-accent" /> 4,8
              </span>
            }
          />
          <div className="flex items-center gap-2 rounded-xl bg-card p-2.5 text-[11px] text-muted-foreground">
            <Gift className="h-4 w-4 shrink-0 text-primary" /> 3 indicações = 1 mês de PRO
          </div>
        </Screen>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <Pill tone="primary">Como funciona</Pill>
      <h2 className="mt-3 font-display text-3xl font-extrabold">
        Da sua vitrine ao <span className="text-gradient-brand">Match</span>
      </h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Veja exatamente como são as telas: compatibilidade, favoritos, inscrições, convites,
        avaliações e indicações.
      </p>
      <Steps steps={steps} />
    </section>
  );
}

/* ---------- business flow ---------- */

export function HowItWorksBusiness() {
  const steps: Step[] = [
    {
      title: "Publique a oportunidade",
      desc: "Cachê, permuta ou os dois — com entregas e valor claros.",
      screen: (
        <Screen label="Nova oportunidade">
          <div className="rounded-xl bg-card p-2.5">
            <p className="text-xs font-bold">Combo duplo — sábado</p>
            <p className="mt-1 text-[11px] text-muted-foreground">1 Reel + 2 Stories</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <Pill tone="outline">Cachê + Permuta</Pill>
              <Pill tone="accent">R$250 + jantar</Pill>
            </div>
          </div>
          <FakeButton>Publicar</FakeButton>
        </Screen>
      ),
    },
    {
      title: "Busque creators com filtros",
      desc: "Nicho, região, seguidores, engajamento e tipo de permuta.",
      screen: (
        <Screen label="Buscar creators">
          <div className="flex items-center gap-2 rounded-xl bg-card p-2.5 text-[11px] text-muted-foreground">
            <Search className="h-3.5 w-3.5" /> Gastronomia em Jardins
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Pill tone="outline">10–50 mil</Pill>
            <Pill tone="outline">Engaj. 4%+</Pill>
            <Pill tone="outline">Aceita permuta</Pill>
          </div>
        </Screen>
      ),
    },
    {
      title: "Compare por compatibilidade",
      desc: "A % mostra quem realmente encaixa com a campanha, não só quem tem número.",
      screen: (
        <Screen label="Candidatos">
          <Row name="Larissa Freitas" meta="32,4 mil • 5,1%" right={<ScorePill value={98} />} />
          <Row name="Bruno Tavares" meta="18,9 mil • 6,2%" right={<ScorePill value={91} />} />
          <Row name="Camila Rocha" meta="47,2 mil • 3,4%" right={<ScorePill value={74} />} />
        </Screen>
      ),
    },
    {
      title: "Favorite e monte listas",
      desc: "Salve perfis bons para chamar de novo nas próximas campanhas.",
      screen: (
        <Screen label="Favoritos">
          <Row
            name="Bruno Tavares"
            meta="Lista: Gastronomia SP"
            right={<Heart className="h-4 w-4 shrink-0 fill-accent text-accent" />}
          />
          <Row
            name="Júlia Moretti"
            meta="Lista: Verão 2026"
            right={<Heart className="h-4 w-4 shrink-0 fill-accent text-accent" />}
          />
        </Screen>
      ),
    },
    {
      title: "Envie convites diretos",
      desc: "Chame o creator sem esperar inscrição — ele aceita ou recusa.",
      screen: (
        <Screen label="Convites enviados">
          <Row
            name="Camila Rocha"
            meta="Convite enviado — aguardando"
            right={<Bell className="h-4 w-4 shrink-0 text-accent" />}
          />
          <Row
            name="Larissa Freitas"
            meta="Convite aceito"
            right={<BadgeCheck className="h-4 w-4 shrink-0 text-primary" />}
          />
        </Screen>
      ),
    },
    {
      title: "Dê Match e negocie direto",
      desc: "Contato liberado dos dois lados. Depois, avaliem a parceria.",
      screen: (
        <Screen label="Match">
          <div className="rounded-xl bg-gradient-match p-2.5 text-center">
            <p className="font-display text-xs font-extrabold text-primary-foreground">
              É MATCH! Contatos liberados
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-card p-2.5 text-[11px] text-muted-foreground">
            <Users className="h-4 w-4 shrink-0 text-primary" /> WhatsApp e e-mail visíveis
          </div>
          <Row
            name="Larissa Freitas"
            meta="Collab realizada"
            right={
              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-accent">
                <Star className="h-3 w-3 fill-accent" /> 5,0
              </span>
            }
          />
        </Screen>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <Pill tone="primary">Como funciona</Pill>
      <h2 className="mt-3 font-display text-3xl font-extrabold">
        Do anúncio ao <span className="text-gradient-brand">Match</span>
      </h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Veja as telas por dentro: filtros de busca, % de compatibilidade, candidatos, favoritos,
        convites e avaliações.
      </p>
      <Steps steps={steps} />
    </section>
  );
}
