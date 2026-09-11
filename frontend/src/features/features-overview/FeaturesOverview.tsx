import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";
import { NodeCanvas } from "./NodeCanvas";
import { OperatingLoop } from "./OperatingLoop";

type FeaturesOverviewProps = Readonly<{
  content: LandingContent["overview"];
}>;

export function FeaturesOverview({ content }: FeaturesOverviewProps) {
  return (
    <section className="border-b border-[var(--color-divider)] py-20 sm:py-28" id="features">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-[var(--color-divider)] bg-[#14171c] px-3 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-accent)]">
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            {content.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-neutral-400)] sm:text-lg">
            {content.subhead}
          </p>
        </div>

        {/* 5-Step Operating Loop */}
        <div className="mt-12">
          <OperatingLoop steps={content.steps} />
        </div>

        {/* 8 Node Groups Canvas Showcase */}
        <NodeCanvas
          heading={content.nodeGroupsHeading}
          nodeGroups={content.nodeGroups}
          subhead={content.nodeGroupsSubhead}
        />
      </Container>
    </section>
  );
}
