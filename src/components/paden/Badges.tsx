import { BadgeCheck, BarChart3, Flame, Lock, ShieldAlert, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CompatReason } from "@/data/paden";

export function Pill({
  children,
  tone = "muted",
  className,
}: {
  children: React.ReactNode;
  tone?: "muted" | "primary" | "accent" | "success" | "destructive" | "outline" | undefined;
  className?: string | undefined;
}) {
  const tones = {
    muted: "bg-muted text-muted-foreground",
    primary: "bg-primary-soft text-primary",
    accent: "bg-accent-soft text-accent-foreground",
    success: "bg-success-soft text-success",
    destructive: "bg-destructive/10 text-destructive",
    outline: "border border-border text-muted-foreground",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export const VerifiedBadge = () => (
  <Pill tone="primary">
    <BadgeCheck className="h-3.5 w-3.5" /> PADEN Verified
  </Pill>
);

export const MetricsBadge = () => (
  <Pill tone="success">
    <BarChart3 className="h-3.5 w-3.5" /> Métricas verificadas
  </Pill>
);

export const ExclusiveBadge = () => (
  <Pill tone="accent">
    <Zap className="h-3.5 w-3.5" /> EXCLUSIVA PADEN
  </Pill>
);

export const BoostedBadge = () => (
  <Pill tone="accent">
    <Flame className="h-3.5 w-3.5" /> Impulsionada
  </Pill>
);

export const ProLockedValue = () => (
  <Pill tone="primary">
    <Lock className="h-3.5 w-3.5" /> Exclusivo PADEN PRO
  </Pill>
);

export const GuardianBadge = ({ status }: { status: "pendente" | "verificado" }) =>
  status === "verificado" ? (
    <Pill tone="success">
      <ShieldAlert className="h-3.5 w-3.5" /> Responsável legal verificado
    </Pill>
  ) : (
    <Pill tone="destructive">
      <ShieldAlert className="h-3.5 w-3.5" /> Responsável legal pendente
    </Pill>
  );

export function CompatScore({ score, className }: { score: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold text-primary-foreground shadow-soft",
        className,
      )}
    >
      <Sparkles className="h-3.5 w-3.5" />
      {score}% compatível
    </span>
  );
}

export function CompatReasons({ reasons }: { reasons: CompatReason[] }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {reasons.map((r) => (
        <li
          key={r.label}
          className={cn("flex items-center gap-2", r.ok ? "text-foreground" : "text-muted-foreground")}
        >
          <span className={cn("font-bold", r.ok ? "text-success" : "text-muted-foreground")}>
            {r.ok ? "✓" : "–"}
          </span>
          {r.label}
        </li>
      ))}
    </ul>
  );
}
