import type { Metadata } from "next";
import { LocalizedGuidesList } from "@/components/localized/localized-guide-page";

export const metadata: Metadata = {
  title: "中文攻略文章",
  description: "BEYBUKU 中文攻略文章，包含 Beyblade X 发射控制、类型说明和新手购买指南。"
};

export default function ChineseGuidesPage() {
  return <LocalizedGuidesList locale="zh" />;
}
