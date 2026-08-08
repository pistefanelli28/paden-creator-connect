import { cn } from "@/lib/utils";
import padenLogo from "@/assets/paden-logo.png.asset.json";

/**
 * Marca PADEN: recorte do símbolo oficial (o "D" que abraça a bicho-preguiça
 * sobre a ponte roxo→laranja) usado como ícone compacto.
 */
export function PadenMark({ className }: { className?: string | undefined }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-surface-deep",
        className,
      )}
      aria-hidden="true"
    >
      <img
        src={padenLogo.url}
        alt=""
        className="h-full w-full scale-[3.6] object-cover object-[62%_46%]"
        loading="lazy"
      />
    </span>
  );
}

/**
 * Logo completo. `variant="full"` mostra a arte oficial inteira (hero, rodapé,
 * telas de boas-vindas). O padrão combina marca + wordmark para barras de nav.
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
      <span className={cn("inline-flex flex-col items-start", className)}>
        <img
          src={padenLogo.url}
          alt="PADEN — where great collabs begin"
          className="h-auto w-full max-w-md object-contain"
        />
      </span>
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
