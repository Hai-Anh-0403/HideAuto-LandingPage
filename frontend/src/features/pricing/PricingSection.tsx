import type { LandingContent, Locale } from "@/content";
import { type Release } from "@/features/downloads";

type PricingSectionProps = Readonly<{
  content: LandingContent["pricing"];
  locale: Locale;
  release: Release | null;
}>;

export function PricingSection({ content }: PricingSectionProps) {
  return (
    <section id="pricing" className="px-4 pt-20 pb-0 md:px-[34px] lg:pt-24">
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-[60px]">
        {/* Left Column: Heading, Description & Beta Note */}
        <div>
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.13em] text-[var(--color-accent)]">
            {content.eyebrow}
          </p>

          <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[56px]">
            {content.title}
          </h2>

          <p className="mt-[18px] max-w-[560px] text-[16px] leading-[1.62] text-[var(--color-neutral-400)] sm:text-[17px] text-pretty">
            {content.description}
          </p>

          {content.subNote ? (
            <p className="mt-[22px] font-[var(--font-mono)] text-[11px] leading-[1.9] text-[var(--color-neutral-400)] whitespace-pre-line">
              {content.subNote}
            </p>
          ) : null}
        </div>

        {/* Right Column: Blueprint Pricing Card */}
        <div className="blueprint relative border border-[var(--color-divider)] p-7 sm:p-[32px_34px]">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          <p className="font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
            {content.planName}
          </p>

          <p className="mt-3.5 font-[var(--font-barlow-condensed)] text-[64px] font-semibold leading-[0.86] tracking-[-0.03em] text-white sm:text-[76px]">
            {content.planPrice}
            <span className="text-[28px] text-[var(--color-neutral-400)]">
              {content.priceUnit ?? "đ"}
            </span>
          </p>

          <p className="mt-2 text-[14px] text-[var(--color-neutral-400)]">
            {content.planSub}
          </p>

          {/* Checklist */}
          <ul className="mt-[26px] flex flex-col gap-[11px] text-[14.5px]">
            {content.features.map((feature) => (
              <li key={feature} className="flex items-baseline gap-2.5">
                <span className="text-[var(--color-accent)] font-medium">✓</span>
                <span className="text-[var(--color-text)]">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Download CTA Button */}
          <a
            href="#download"
            className="mt-7 block bg-[var(--color-accent)] py-3 text-center font-[var(--font-barlow-condensed)] text-[17px] font-semibold tracking-[0.02em] text-[#0f1114] transition-opacity hover:opacity-90"
          >
            {content.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
