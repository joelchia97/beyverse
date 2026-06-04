import type { Metadata } from "next";
import { LocalizedPolicyPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "Polisi Privasi",
  description: "Polisi privasi BeyVerse Bahasa Melayu untuk privasi, analitik, iklan dan mesej pengguna."
};

export default function MalayPrivacyPage() {
  return <LocalizedPolicyPage copy={trustTranslations.ms.privacy} />;
}
