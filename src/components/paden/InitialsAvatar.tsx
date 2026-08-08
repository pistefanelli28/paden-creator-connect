import { cn } from "@/lib/utils";

const palettes = [
  "from-primary to-primary-glow",
  "from-accent to-primary",
  "from-primary-glow to-accent",
];

export function InitialsAvatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl" | undefined;
  className?: string | undefined;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  const idx = name.charCodeAt(0) % palettes.length;
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display font-bold text-primary-foreground",
        palettes[idx],
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
