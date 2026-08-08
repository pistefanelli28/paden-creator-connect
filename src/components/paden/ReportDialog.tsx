import { useState } from "react";
import { Flag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const CATEGORIES = [
  "Suspeita de golpe/fraude",
  "Informações falsas",
  "Comportamento inadequado",
  "Não cumprimento da parceria",
  "Spam",
  "Outro",
];

export function ReportDialog({ target }: { target: string }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]!);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Flag className="mr-1 h-4 w-4" /> Denunciar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Denunciar {target}</DialogTitle>
          <DialogDescription>
            Nossa equipe analisa cada denúncia manualmente. Nenhuma conta é banida automaticamente.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={category} onValueChange={setCategory} className="gap-2">
          {CATEGORIES.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <RadioGroupItem value={c} id={`report-${c}`} />
              <Label htmlFor={`report-${c}`} className="text-sm font-normal">
                {c}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="space-y-2">
          <Label htmlFor="report-desc">Descreva o ocorrido</Label>
          <Textarea id="report-desc" rows={4} placeholder="Conte o que aconteceu..." />
        </div>
        <Button
          variant="brand"
          onClick={() => {
            setOpen(false);
            toast.success("Denúncia enviada", {
              description: "A equipe PADEN vai analisar manualmente.",
            });
          }}
        >
          ENVIAR DENÚNCIA
        </Button>
      </DialogContent>
    </Dialog>
  );
}
