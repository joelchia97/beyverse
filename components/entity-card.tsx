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
  visualType?: "Attack" | "Defense" | "Stamina" | "Balance";
};

export function EntityCard({ href, title, badge, description, meta, visualType }: EntityCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition hover:border-sky-400/60 hover:bg-slate-900">
        {visualType ? <BeybladeVisual name={title} type={visualType} className="m-4 mb-0" /> : null}
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle>{title}</CardTitle>
            <Badge>{badge}</Badge>
          </div>
          {meta ? <p className="text-sm text-slate-400">{meta}</p> : null}
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm leading-6 text-slate-300">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
