import type { Metadata } from "next";
import { LocalizedGuidesList } from "@/components/localized/localized-guide-page";

export const metadata: Metadata = {
  title: "Panduan Strategi",
  description: "Panduan BeyVerse Bahasa Melayu untuk launch control, jenis Beyblade dan panduan membeli Beyblade X."
};

export default function MalayGuidesPage() {
  return <LocalizedGuidesList locale="ms" />;
}
