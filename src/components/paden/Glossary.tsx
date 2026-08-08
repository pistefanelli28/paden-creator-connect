import {
  BadgeCheck,
  BarChart3,
  Flame,
  Gift,
  Heart,
  Lock,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";

const items = [
  {
    icon: BadgeCheck,
    tone: "primary" as const,
    label: "PADEN Verified",
    text: "Selo dado a quem confirmou identidade e redes sociais. Mostra que o perfil é real e que os links pertencem mesmo à pessoa ou à marca.",
  },
  {
    icon: BarChart3,
    tone: "success" as const,
    label: "Métricas verificadas",
    text: "Seguidores, alcance e engajamento comprovados por print do painel da rede social. Sem número inflado no chute.",
  },
  {
    icon: Sparkles,
    tone: "primary" as const,
    label: "% de compatibilidade",
    text: "Nota calculada entre creator e oportunidade: nicho, região, faixa de seguidores e engajamento. Quanto maior, mais a fit faz sentido para os dois lados.",
  },
  {
    icon: Zap,
    tone: "accent" as const,
    label: "Exclusiva PADEN",
    text: "Oportunidade que a marca publicou só aqui — não está circulando em outros canais.",
  },
  {
    icon: Flame,
    tone: "accent" as const,
    label: "Impulsionada",
    text: "A empresa pagou para a oportunidade aparecer no topo do feed por alguns dias. Mais visibilidade, mesmo processo.",
  },
  {
    icon: Heart,
    tone: "accent" as const,
    label: "Favoritos e salvos",
    text: "Creator salva oportunidades para decidir depois; empresa favorita creators e monta listas para campanhas futuras.",
  },
  {
    icon: Send,
    tone: "primary" as const,
    label: "Inscrição e convite",
    text: "Inscrição é o creator demonstrando interesse. Convite é a empresa chamando o creator. Os dois caminhos levam ao Match.",
  },
  {
    icon: Sparkles,
    tone: "primary" as const,
    label: "Match",
    text: "Acontece quando os dois lados dizem sim. Só aí o contato é liberado e a negociação segue direto entre creator e empresa.",
  },
  {
    icon: Gift,
    tone: "success" as const,
    label: "Indicações",
    text: "Convide creators ou marcas com seu link. Quando entram e se verificam, você ganha dias de PRO gratuitos.",
  },
  {
    icon: Lock,
    tone: "primary" as const,
    label: "PADEN PRO",
    text: "Plano pago que libera inscrições ilimitadas, ver quem visitou seu perfil, filtros avançados e lista de recomendados.",
  },
];

const tones = {
  primary: "bg-primary-soft text-primary",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
} as const;

export function Glossary() {
  return (
    <section id="glossario" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-extrabold md:text-3xl">
          O que significa cada coisa na PADEN
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Selos, porcentagens e etapas explicados em uma linha — sem letrinha miúda.
        </p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {items.map(({ icon: Icon, tone, label, text }) => (
          <div
            key={label}
            className="rounded-3xl border border-border bg-card p-5 shadow-soft card-hover"
          >
            <dt className="flex items-center gap-2">
              <span className={`inline-flex rounded-xl p-2 ${tones[tone]}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-display font-bold">{label}</span>
            </dt>
            <dd className="mt-2 text-sm text-muted-foreground">{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
