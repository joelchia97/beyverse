import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = { title: "Contact", description: "Contact BeyVerse for corrections, guide ideas, and database suggestions." };

export default function ContactPage() {
  return (
    <main>
      <PageHeading title="Contact" description="Send corrections, new part suggestions, combo notes, or guide requests." />
      <section className="container-page max-w-2xl">
        <Card>
          <CardHeader><CardTitle>Message BeyVerse</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Message" />
            <Button>Send Message</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
