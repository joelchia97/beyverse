import type { Metadata } from "next";
import { LocalizedPolicyPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "Terma Perkhidmatan",
  description: "Terma perkhidmatan BeyVerse Bahasa Melayu dan penafian laman peminat."
};

export default function MalayTermsPage() {
  return <LocalizedPolicyPage copy={trustTranslations.ms.terms} />;
}
