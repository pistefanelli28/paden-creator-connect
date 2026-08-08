import { cn } from "@/lib/utils";
import padenMark from "@/assets/paden-mark.png";
import padenLogoHero from "@/assets/paden-logo-hero.png";

/**
 * Marca PADEN: o símbolo oficial (bicho-preguiça sorrindo sobre a ponte),
 * recortado com fundo transparente para assentar em qualquer superfície.
 */
export function PadenMark({ className }: { className?: string | undefined }) {
  return (
    <img
      src={padenMark}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={cn("h-9 w-9 shrink-0 object-contain", className)}
    />
  );
}

/**
 * Logo completo. `variant="full"` mostra a arte oficial inteira com fundo
 * transparente (hero, rodapé). O padrão combina marca + wordmark para navs.
 */
export function PadenLogo({
  className,
  markClassName,
  variant = "compact",
  withTagline = false,
}: {
  className?: string | undefined;
  markClassName?: string | undefined;
  variant?: "compact" | "full";
  withTagline?: boolean;
}) {
  if (variant === "full") {
    return (
      <img
        src={padenLogoHero}
        alt="PADEN — where great collabs begin"
        className={cn("h-auto w-full max-w-md object-contain", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <PadenMark className={markClassName} />
      <span className="inline-flex flex-col leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight">
          <span className="text-primary">PA</span>
          <span className="text-accent">DEN</span>
        </span>
        {withTagline ? (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Where great collabs begin
          </span>
        ) : null}
      </span>
    </span>
  );
}
