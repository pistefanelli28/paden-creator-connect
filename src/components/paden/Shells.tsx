import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Bookmark,
  Building2,
  Heart,
  Home,
  LayoutDashboard,
  Megaphone,
  Plus,
  Search,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PadenLogo } from "@/components/paden/PadenLogo";
import { InitialsAvatar } from "@/components/paden/InitialsAvatar";
import { usePaden } from "@/lib/paden-store";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof Home };

const creatorNav: NavItem[] = [
  { to: "/app", label: "Início", icon: Home },
  { to: "/app/oportunidades", label: "Oportunidades", icon: Megaphone },
  { to: "/app/salvos", label: "Salvos", icon: Bookmark },
  { to: "/app/matches", label: "Matches", icon: Sparkles },
];

const businessNav: NavItem[] = [
  { to: "/empresa", label: "Dashboard", icon: LayoutDashboard },
  { to: "/empresa/creators", label: "Creators", icon: Search },
  { to: "/empresa/oportunidades", label: "Oportunidades", icon: Megaphone },
  { to: "/empresa/favoritos", label: "Favoritos", icon: Heart },
];

function NotificationBell({ audience }: { audience: "creator" | "empresa" }) {
  const { notifications, markNotificationsRead } = usePaden();
  const [open, setOpen] = useState(false);
  const list = notifications.filter((n) => n.audience === audience);
  const unread = list.filter((n) => !n.read).length;

  return (
    <Popover
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) markNotificationsRead(audience);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notificações">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 rounded-2xl p-2">
        <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Notificações
        </p>
        <div className="space-y-1">
          {list.map((n) => (
            <div key={n.id} className="rounded-xl p-2 hover:bg-muted">
              <p className="text-sm font-semibold">
                {n.icon} {n.title}
              </p>
              <p className="text-xs text-muted-foreground">{n.text}</p>
            </div>
          ))}
          {list.length === 0 && (
            <p className="p-2 text-sm text-muted-foreground">Nada por aqui ainda.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TopBar({
  nav,
  audience,
  right,
}: {
  nav: NavItem[];
  audience: "creator" | "empresa";
  right: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
        <Link to={(audience === "creator" ? "/app" : "/empresa") as never} aria-label="PADEN">
          <PadenLogo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to as never}
              activeOptions={{ exact: item.to === "/app" || item.to === "/empresa" }}
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {right}
          <NotificationBell audience={audience} />
        </div>
      </div>
    </header>
  );
}

function BottomNav({ nav }: { nav: NavItem[] }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 pb-safe backdrop-blur md:hidden">
      <div className="flex items-stretch justify-around">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to as never}
            activeOptions={{ exact: item.to === "/app" || item.to === "/empresa" }}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-foreground data-[status=active]:text-primary"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function CreatorShell({ children }: { children: ReactNode }) {
  const { currentCreator, plan, trialDaysLeft } = usePaden();
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <TopBar
        nav={creatorNav}
        audience="creator"
        right={
          <>
            {plan === "pro-trial" && (
              <Link
                to="/planos"
                className="hidden rounded-full bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent sm:block"
              >
                PRO grátis — {trialDaysLeft} dias
              </Link>
            )}
            <Link to="/app/perfil" aria-label="Meu perfil">
              <InitialsAvatar name={currentCreator.name} size="sm" />
            </Link>
          </>
        }
      />
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">{children}</main>
      <BottomNav nav={creatorNav} />
    </div>
  );
}

export function BusinessShell({ children }: { children: ReactNode }) {
  const { currentCompany } = usePaden();
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <TopBar
        nav={businessNav}
        audience="empresa"
        right={
          <>
            <Button asChild variant="brand" size="sm" className="hidden sm:inline-flex">
              <Link to="/empresa/nova-oportunidade">
                <Plus className="h-4 w-4" /> CRIAR OPORTUNIDADE
              </Link>
            </Button>
            <span className="hidden items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold md:inline-flex">
              <Building2 className="h-3.5 w-3.5" /> {currentCompany.name}
            </span>
          </>
        }
      />
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">{children}</main>
      <BottomNav nav={businessNav} />
    </div>
  );
}

export function PageTitle({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h1 className="font-display text-2xl font-extrabold md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export const AvatarIcon = UserRound;
export const UsersIcon = Users;
