import type { Metadata } from "next";
import { LocalizedPolicyPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "服务条款",
  description: "BeyVerse 中文服务条款和粉丝站免责声明。"
};

export default function ChineseTermsPage() {
  return <LocalizedPolicyPage copy={trustTranslations.zh.terms} />;
}
