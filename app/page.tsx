import { HomePageContent } from "@/components/home-page-content";
import { homeTranslations } from "@/lib/home-translations";

export default function HomePage() {
  return <HomePageContent copy={homeTranslations.en} />;
}
