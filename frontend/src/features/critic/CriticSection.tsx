import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";

type CriticSectionProps = Readonly<{
  content: LandingContent["critic"];
}>;

export function CriticSection({ content }: CriticSectionProps) {
  const { eyebrow, title, description, pillars, scoreRules } = content;

  return (
    <section className="border-b border-[var(--color-divider)] py-20 sm:py-24" id="critic">
      <Container>
        {/* Blueprint Box with Corner Marks matching design */}
        <div className="blueprint relative border border-[var(--color-divider)] bg-[#0d1015]/90 p-8 sm:p-12 lg:p-14">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            {/* Left Column */}
            <div>
              <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.13em] text-[var(--color-accent)] sm:text-[11px]">
                {eyebrow}
              </p>

              <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-3xl font-bold tracking-[-0.02em] leading-[1.05] text-white sm:text-4xl lg:text-[46px] whitespace-pre-line">
                {title}
              </h2>

              <p className="mt-5 max-w-[640px] text-base leading-[1.65] text-[var(--color-neutral-400)] text-pretty">
                {description}
              </p>

              {/* 4 Pillars Matrix */}
              <div className="mt-8.5 grid grid-cols-1 gap-6 border-t border-[var(--color-divider-subtle)] pt-7 sm:grid-cols-2 sm:gap-7">
                {pillars.map((pillar) => (
                  <div key={pillar.id}>
                    <p className="font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.11em] text-[var(--color-neutral-500)]">
                      {pillar.label}
                    </p>
                    <p className="mt-2 text-[14.5px] leading-[1.6] text-[var(--color-neutral-300)]">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: How The Score Works Card */}
            <div className="border border-[var(--color-divider)] bg-[#080a0d]/60 p-5.5 sm:p-6">
              <p className="font-[var(--font-mono)] text-[10.5px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
                {scoreRules.title}
              </p>

              <div className="mt-4 divide-y divide-[var(--color-divider-subtle)] font-[var(--font-mono)] text-[13px]">
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[var(--color-neutral-400)]">{scoreRules.maxLabel}</span>
                  <span className="font-medium text-white">{scoreRules.maxValue}</span>
                </div>

                {scoreRules.rules.map((rule) => {
                  const isError = rule.level === "error";
                  const isWarn = rule.level === "warn";
                  const dotColor = isError ? "bg-rose-400" : isWarn ? "bg-amber-400" : "bg-[var(--color-accent)]";
                  const textColor = isError ? "text-rose-400" : isWarn ? "text-amber-400" : "text-[var(--color-accent)]";

                  return (
                    <div className="flex items-center justify-between py-2.5" key={rule.level}>
                      <span className="flex items-center gap-2 text-[var(--color-neutral-300)]">
                        <span className={`h-2 w-2 shrink-0 ${dotColor}`} />
                        {rule.label}
                      </span>
                      <span className={textColor}>{rule.deduction}</span>
                    </div>
                  );
                })}

                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[var(--color-neutral-400)]">{scoreRules.thresholdLabel}</span>
                  <span className="font-medium text-white">{scoreRules.thresholdValue}</span>
                </div>
              </div>

              <p className="mt-4 border-t border-[var(--color-divider-subtle)] pt-3.5 text-[13px] leading-[1.6] text-[var(--color-neutral-400)] sm:text-[13.5px]">
                {scoreRules.explanationPrefix}
                <strong className="font-medium text-white">{scoreRules.explanationHighlight}</strong>
                {scoreRules.explanationSuffix}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

