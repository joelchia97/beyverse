import type { Metadata } from "next";
import { LocalizedPolicyPage } from "@/components/localized/trust-pages";
import { trustTranslations } from "@/lib/trust-translations";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "BEYBUKU 中文隐私政策，说明隐私、分析工具、广告和联系信息处理方式。"
};

export default function ChinesePrivacyPage() {
  return <LocalizedPolicyPage copy={trustTranslations.zh.privacy} />;
}
