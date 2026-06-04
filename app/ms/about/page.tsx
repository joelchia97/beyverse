import type { Metadata } from "next";
import { LocalizedAboutPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "Tentang BEYBUKU",
  description: "Halaman tentang BEYBUKU Bahasa Melayu, termasuk tujuan laman, pendekatan editorial dan penafian laman peminat."
};

export default function MalayAboutPage() {
  return <LocalizedAboutPage copy={trustTranslations.ms.about} />;
}
