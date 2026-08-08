import { Instagram, Mail, Music2, PartyPopper } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PadenMark } from "@/components/paden/PadenLogo";

export function MatchCelebration({
  open,
  onOpenChange,
  creatorName,
  companyName,
  contacts,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  creatorName: string;
  companyName: string;
  contacts: { instagram: string; tiktok: string; email: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-none bg-gradient-match p-0 text-primary-foreground sm:max-w-lg">
        <div className="animate-pop space-y-5 p-8 text-center">
          <div className="flex justify-center">
            <span className="rounded-2xl bg-background/95 p-2">
              <PadenMark className="h-10 w-10" />
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">
              <PartyPopper className="mr-1 inline h-4 w-4" /> deu paden match
            </p>
            <h2 className="font-display text-3xl font-extrabold">
              {companyName} + {creatorName}
            </h2>
            <p className="text-sm opacity-90">
              Vocês querem trabalhar juntos. Contatos liberados agora.
            </p>
          </div>

          <div className="animate-rise space-y-2 rounded-2xl bg-background/95 p-4 text-left text-foreground">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contatos liberados
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Instagram className="h-4 w-4 text-primary" /> {contacts.instagram}
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Music2 className="h-4 w-4 text-primary" /> {contacts.tiktok}
            </p>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Mail className="h-4 w-4 text-primary" /> {contacts.email}
            </p>
            <p className="pt-1 text-xs text-muted-foreground">
              A negociação acontece direto entre vocês, fora da PADEN.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
