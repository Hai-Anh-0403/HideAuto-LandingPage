import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";
import { OperatingLoop } from "./OperatingLoop";

type FeaturesOverviewProps = Readonly<{
  content: LandingContent["overview"];
}>;

export function FeaturesOverview({ content }: FeaturesOverviewProps) {
  return (
    <section className="border-b border-[var(--color-divider)] py-20 sm:py-24" id="features">
      <Container>
        {/* Section Header matching design */}
        <div className="max-w-[780px]">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.13em] text-[var(--color-accent)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-bold tracking-[-0.02em] leading-tight text-white sm:text-5xl lg:text-[54px]">
            {content.heading}
          </h2>
          <p className="mt-4.5 text-[17px] leading-[1.62] text-[var(--color-neutral-400)] text-pretty">
            {content.subhead}
          </p>
        </div>

        {/* 5-Step Operating Loop */}
        <OperatingLoop steps={content.steps} />
      </Container>
    </section>
  );
}

