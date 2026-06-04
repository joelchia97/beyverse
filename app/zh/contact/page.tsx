import type { Metadata } from "next";
import { LocalizedContactPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "联系我们",
  description: "联系 BeyVerse，提交资料修正、零件建议、组合测试笔记或攻略主题。"
};

export default function ChineseContactPage() {
  return <LocalizedContactPage copy={trustTranslations.zh.contact} />;
}
