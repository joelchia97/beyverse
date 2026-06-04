import type { Metadata } from "next";
import { LocalizedContactPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi BEYBUKU untuk pembetulan data, cadangan parts, nota combo atau idea panduan."
};

export default function MalayContactPage() {
  return <LocalizedContactPage copy={trustTranslations.ms.contact} />;
}
