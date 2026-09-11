import { notFound } from "next/navigation";

import { getContent, isLocale } from "@/content";
import { ComparisonSection, StatsBar } from "@/features/comparison";
import { CriticSection } from "@/features/critic";
import { DownloadSection, getLatestRelease } from "@/features/downloads";
import { FaqSection } from "@/features/faq";
import { FeaturesOverview, PlatformsBar } from "@/features/features-overview";
import { HeroSection } from "@/features/hero";
import { Footer, Header } from "@/features/navigation";
import { PricingSection } from "@/features/pricing";

type LocalePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getContent(locale);
  const release = await getLatestRelease();

  return (
    <>
      <Header locale={locale} navigation={content.navigation} />
      <main id="top">
        <HeroSection content={content.hero} locale={locale} release={release} />
        <PlatformsBar platforms={content.platforms} />
        <FeaturesOverview content={content.overview} />
        <CriticSection content={content.critic} />
        <StatsBar stats={content.stats} />
        <ComparisonSection content={content.comparison} />
        <PricingSection content={content.pricing} locale={locale} release={release} />
        <FaqSection content={content.faq} />
        <DownloadSection content={content.downloads} locale={locale} release={release} />
      </main>
      <Footer content={content} release={release} />
    </>
  );
}
