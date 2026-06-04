import type { Metadata } from "next";
import { LocalizedAboutPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "关于 BeyVerse",
  description: "BeyVerse 中文版关于页面，说明网站目的、编辑方式和粉丝站免责声明。"
};

export default function ChineseAboutPage() {
  return <LocalizedAboutPage copy={trustTranslations.zh.about} />;
}
