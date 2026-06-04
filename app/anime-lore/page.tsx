import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { characters } from "@/lib/data";

export const metadata: Metadata = {
  title: "Anime Lore",
  description: "Beyblade anime character notes, signature Beyblades, and story context."
};

export default function AnimeLorePage() {
  return (
    <main>
      <PageHeading title="Anime Lore" description="Track major bladers, signature Beyblades, and story context alongside competitive encyclopedia data." />
      <section className="container-page grid gap-4 md:grid-cols-2">
        {characters.map((character) => (
          <Card key={character.id}>
            <CardHeader>
              <CardTitle>{character.name}</CardTitle>
              <p className="text-sm text-slate-400">{character.series} / {character.signature_bey}</p>
            </CardHeader>
            <CardContent><p className="leading-7 text-slate-300">{character.description}</p></CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
