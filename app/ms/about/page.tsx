import type { Metadata } from "next";
import { LocalizedAboutPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "Tentang BeyVerse",
  description: "Halaman tentang BeyVerse Bahasa Melayu, termasuk tujuan laman, pendekatan editorial dan penafian laman peminat."
};

export default function MalayAboutPage() {
  return <LocalizedAboutPage copy={trustTranslations.ms.about} />;
}
