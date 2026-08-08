import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { creators, companies, type Creator, type Company } from "@/data/paden";

export type Role = "creator" | "empresa" | null;
export type Plan = "free" | "pro-trial" | "pro";

export type Invite = {
  id: string;
  opportunityId: string;
  companyId: string;
  status: "pendente" | "aceito" | "recusado";
};

export type MatchItem = {
  id: string;
  opportunityId: string;
  creatorId: string;
  companyId: string;
  daysAgo: number;
  outcome?: "fechamos" | "conversando" | "nao-rolou" | undefined;
  confirmed?: boolean | undefined;
  rated?: boolean | undefined;
};

export type Notification = {
  id: string;
  audience: "creator" | "empresa";
  icon: string;
  title: string;
  text: string;
  read?: boolean | undefined;
};

type State = {
  role: Role;
  plan: Plan;
  trialDaysLeft: number;
  applications: string[];
  applicationsUsed: number;
  saved: string[];
  matches: MatchItem[];
  invites: Invite[];
  favorites: string[];
  notifications: Notification[];
  referralDays: number;
  onboardingStep: number;
};

const initial: State = {
  role: null,
  plan: "pro-trial",
  trialDaysLeft: 14,
  applications: ["o3"],
  applicationsUsed: 1,
  saved: ["o2"],
  matches: [
    {
      id: "m1",
      opportunityId: "o1",
      creatorId: "c1",
      companyId: "e1",
      daysAgo: 5,
    },
  ],
  invites: [{ id: "i1", opportunityId: "o1", companyId: "e1", status: "pendente" }],
  favorites: ["c2", "c4"],
  notifications: [
    {
      id: "n1",
      audience: "creator",
      icon: "✨",
      title: "Uma marca quer trabalhar com você",
      text: "Burger House convidou você para Lançamento Nova Unidade Jardins.",
    },
    {
      id: "n2",
      audience: "creator",
      icon: "⏳",
      title: "Oportunidade salva encerrando",
      text: "Nova linha de cafés de verão encerra em 2 dias.",
    },
    {
      id: "n3",
      audience: "empresa",
      icon: "👥",
      title: "7 novos candidatos",
      text: "Lançamento Nova Unidade Jardins recebeu 7 candidaturas hoje.",
    },
    {
      id: "n4",
      audience: "empresa",
      icon: "⭐",
      title: "Nova avaliação",
      text: "Lucas Ferreira avaliou sua empresa com 5 estrelas.",
    },
  ],
  referralDays: 7,
  onboardingStep: 0,
};

type Ctx = State & {
  currentCreator: Creator;
  currentCompany: Company;
  applicationLimit: number;
  isPro: boolean;
  setRole: (r: Role) => void;
  setPlan: (p: Plan) => void;
  apply: (id: string) => void;
  withdraw: (id: string) => void;
  toggleSave: (id: string) => void;
  savedLimit: number;
  toggleFavorite: (id: string) => void;
  favoriteLimit: number;
  answerInvite: (id: string, accept: boolean) => void;
  setMatchOutcome: (id: string, outcome: MatchItem["outcome"]) => void;
  rateMatch: (id: string) => void;
  markNotificationsRead: (audience: "creator" | "empresa") => void;
  setOnboardingStep: (n: number) => void;
};

const PadenContext = createContext<Ctx | null>(null);
const KEY = "paden-state-v1";

export function PadenProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const patch = useCallback((p: Partial<State>) => setState((s) => ({ ...s, ...p })), []);

  const isPro = state.plan !== "free";
  const applicationLimit = isPro ? 30 : 3;
  const savedLimit = isPro ? 20 : 3;
  const favoriteLimit = 8;

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      currentCreator: creators[0]!,
      currentCompany: companies[0]!,
      isPro,
      applicationLimit,
      savedLimit,
      favoriteLimit,
      setRole: (role) => patch({ role }),
      setPlan: (plan) => patch({ plan }),
      apply: (id) =>
        setState((s) =>
          s.applications.includes(id)
            ? s
            : {
                ...s,
                applications: [...s.applications, id],
                applicationsUsed: s.applicationsUsed + 1,
              },
        ),
      // Retirar candidatura NÃO devolve a cota mensal.
      withdraw: (id) =>
        setState((s) => ({ ...s, applications: s.applications.filter((a) => a !== id) })),
      toggleSave: (id) =>
        setState((s) => ({
          ...s,
          saved: s.saved.includes(id)
            ? s.saved.filter((x) => x !== id)
            : s.saved.length >= (s.plan === "free" ? 3 : 20)
              ? s.saved
              : [...s.saved, id],
        })),
      toggleFavorite: (id) =>
        setState((s) => ({
          ...s,
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((x) => x !== id)
            : s.favorites.length >= 8
              ? s.favorites
              : [...s.favorites, id],
        })),
      answerInvite: (id, accept) =>
        setState((s) => {
          const invite = s.invites.find((i) => i.id === id);
          const invites = s.invites.map((i) =>
            i.id === id ? { ...i, status: accept ? ("aceito" as const) : ("recusado" as const) } : i,
          );
          if (!accept || !invite) return { ...s, invites };
          const exists = s.matches.some((m) => m.opportunityId === invite.opportunityId);
          return {
            ...s,
            invites,
            matches: exists
              ? s.matches
              : [
                  ...s.matches,
                  {
                    id: `m-${invite.opportunityId}`,
                    opportunityId: invite.opportunityId,
                    creatorId: "c1",
                    companyId: invite.companyId,
                    daysAgo: 0,
                  },
                ],
          };
        }),
      setMatchOutcome: (id, outcome) =>
        setState((s) => ({
          ...s,
          matches: s.matches.map((m) =>
            m.id === id ? { ...m, outcome, confirmed: outcome === "fechamos" } : m,
          ),
        })),
      rateMatch: (id) =>
        setState((s) => ({
          ...s,
          matches: s.matches.map((m) => (m.id === id ? { ...m, rated: true } : m)),
        })),
      markNotificationsRead: (audience) =>
        setState((s) => ({
          ...s,
          notifications: s.notifications.map((n) =>
            n.audience === audience ? { ...n, read: true } : n,
          ),
        })),
      setOnboardingStep: (onboardingStep) => patch({ onboardingStep }),
    }),
    [state, patch, isPro, applicationLimit, savedLimit, favoriteLimit],
  );

  return <PadenContext.Provider value={value}>{children}</PadenContext.Provider>;
}

export function usePaden() {
  const ctx = useContext(PadenContext);
  if (!ctx) throw new Error("usePaden precisa estar dentro de PadenProvider");
  return ctx;
}
