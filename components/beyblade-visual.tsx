import { cn } from "@/lib/utils";

type BeybladeVisualProps = {
  name: string;
  type: "Attack" | "Defense" | "Stamina" | "Balance";
  imageUrl?: string;
  className?: string;
};

const typeStyles = {
  Attack: {
    ring: "from-rose-400 via-sky-300 to-cyan-200",
    core: "bg-rose-400",
    label: "Attack"
  },
  Defense: {
    ring: "from-slate-200 via-sky-300 to-blue-500",
    core: "bg-blue-300",
    label: "Defense"
  },
  Stamina: {
    ring: "from-emerald-200 via-cyan-300 to-sky-500",
    core: "bg-emerald-300",
    label: "Stamina"
  },
  Balance: {
    ring: "from-violet-300 via-sky-300 to-slate-200",
    core: "bg-violet-300",
    label: "Balance"
  }
};

export function BeybladeVisual({ name, type, imageUrl, className }: BeybladeVisualProps) {
  const style = typeStyles[type];
  const initials = name
    .split(" ")
    .filter((word) => !/^\d/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-slate-950", className)} aria-label={`${name} visual`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.2),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.6),rgba(2,6,23,0.98))]" />
      <div className="relative flex aspect-[4/3] items-center justify-center p-5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name} original 2D fan-safe visual`}
            width={640}
            height={480}
            loading="lazy"
            decoding="async"
            className="h-full max-h-60 w-full object-contain drop-shadow-[0_0_24px_rgba(56,189,248,0.25)]"
          />
        ) : (
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-sky-200/40 bg-slate-900 shadow-glow md:h-44 md:w-44">
            <div className={cn("absolute inset-3 rounded-full bg-gradient-to-br opacity-90", style.ring)} />
            <div className="absolute inset-8 rounded-full border-4 border-slate-950/50 bg-slate-200" />
            <div className={cn("z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-950 text-lg font-black text-slate-950", style.core)}>
              {initials}
            </div>
            <div className="absolute h-4 w-40 rotate-45 rounded-full bg-slate-950/35" />
            <div className="absolute h-4 w-40 -rotate-45 rounded-full bg-slate-950/35" />
          </div>
        )}
      </div>
      <div className="relative flex items-center justify-between border-t bg-slate-950/70 px-4 py-3 text-xs">
        <span className="font-bold text-slate-200">{name}</span>
        <span className="rounded-sm border border-sky-300/30 bg-sky-300/10 px-2 py-1 text-sky-100">{style.label}</span>
      </div>
    </div>
  );
}
