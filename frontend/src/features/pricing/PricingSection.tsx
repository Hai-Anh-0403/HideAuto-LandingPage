import type { LandingContent, Locale } from "@/content";
import { type Release } from "@/features/downloads";
import { Container } from "@/shared/components/Container";
import { SectionHeading } from "@/shared/components/SectionHeading";

type PricingSectionProps = Readonly<{
  content: LandingContent["pricing"];
  locale: Locale;
  release: Release | null;
}>;

export function PricingSection({ content }: PricingSectionProps) {
  return (
    <section className="bg-blueprint-grid relative border-b border-[var(--color-divider)] py-20 sm:py-28" id="pricing">
      <Container>
        {/* Header */}
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        {/* Pricing Card */}
        <div className="mt-12 max-w-2xl">
          <div className="blueprint border border-[var(--color-accent)] bg-[#13171d] p-6 sm:p-10">
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />

            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--color-divider)] pb-6">
              <div>
                <span className="border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2.5 py-1 font-[var(--font-mono)] text-xs font-semibold text-[var(--color-accent)]">
                  {content.planName}
                </span>
                <p className="mt-2 text-xs text-[var(--color-neutral-400)]">
                  {content.planSub}
                </p>
              </div>

              <div className="text-right">
                <span className="font-[var(--font-barlow-condensed)] text-5xl font-bold text-white sm:text-6xl">
                  {content.planPrice}
                </span>
                <span className="ml-2 font-[var(--font-mono)] text-xs text-[var(--color-neutral-400)]">
                  / TOÀN BỘ BETA
                </span>
              </div>
            </div>

            {/* Included Features List */}
            <div className="mt-8 space-y-3.5 text-sm text-[var(--color-neutral-300)]">
              {content.features.map((feature) => (
                <div className="flex items-start gap-3" key={feature}>
                  <span className="mt-0.5 text-emerald-400">✔</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <a
                className="blueprint inline-flex min-h-12 w-full items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 font-[var(--font-barlow-condensed)] text-lg font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
                href="#download"
              >
                <i className="corner tl" />
                <i className="corner tr" />
                <i className="corner bl" />
                <i className="corner br" />
                <span>{content.cta}</span>
              </a>
            </div>

            {/* Guarantee / Disclaimer */}
            <p className="mt-4 text-center font-[var(--font-mono)] text-xs text-[var(--color-neutral-400)]">
              {content.guarantee}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
