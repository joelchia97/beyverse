import Link from "next/link";
import { BeybladeVisual } from "@/components/beyblade-visual";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EntityCardProps = {
  href: string;
  title: string;
  badge: string;
  description: string;
  meta?: string;
  details?: string[];
  visualType?: "Attack" | "Defense" | "Stamina" | "Balance";
  imageUrl?: string;
};

export function EntityCard({ href, title, badge, description, meta, details, visualType, imageUrl }: EntityCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition hover:border-sky-400/60 hover:bg-slate-900">
        {visualType ? <BeybladeVisual name={title} type={visualType} imageUrl={imageUrl} className="m-4 mb-0" /> : null}
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle>{title}</CardTitle>
            <Badge>{badge}</Badge>
          </div>
          {meta ? <p className="text-sm text-slate-400">{meta}</p> : null}
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm leading-6 text-slate-300">{description}</p>
          {details && details.length > 0 ? (
            <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400">
              {details.map((detail) => (
                <p key={detail} className="rounded-sm border border-slate-800 bg-slate-950/50 px-3 py-2">{detail}</p>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}
