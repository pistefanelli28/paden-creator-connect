import { cn } from "@/lib/utils";

/**
 * Marca PADEN: duas formas diferentes que se encontram e se encaixam
 * (creator + marca = match). Sem câmera, coração, @ ou aperto de mãos.
 */
export function PadenMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-8 w-8 shrink-0 items-center justify-center",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="h-full w-full">
        <path
          d="M4 8h13a11 11 0 0 1 0 22H4z"
          fill="currentColor"
          className="text-primary"
          opacity="0.95"
        />
        <path
          d="M36 32H25.5a11 11 0 0 1 0-22H36z"
          fill="currentColor"
          className="text-accent"
        />
      </svg>
    </span>
  );
}

export function PadenLogo({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <PadenMark className={markClassName} />
      <span className="font-display text-xl font-extrabold tracking-tight">PADEN</span>
    </span>
  );
}
