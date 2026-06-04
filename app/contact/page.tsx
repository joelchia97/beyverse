import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = { title: "Contact", description: "Contact BEYBUKU for corrections, guide ideas, and database suggestions." };

export default function ContactPage() {
  return (
    <main>
      <PageHeading title="Contact" description="Send corrections, new part suggestions, combo notes, or guide requests." />
      <section className="container-page grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader><CardTitle>Message BEYBUKU</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Message" />
            <Button>Send Message</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>What to Send</CardTitle></CardHeader>
          <CardContent className="space-y-4 leading-7 text-slate-300">
            <p>Useful messages include correction requests, missing product details, combo testing notes, guide ideas, and image permission questions.</p>
            <p>Please include the Beyblade name, part name, or page URL when reporting an issue. That makes it easier to review and update the encyclopedia accurately.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
