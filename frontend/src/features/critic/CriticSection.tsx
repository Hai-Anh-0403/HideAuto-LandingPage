import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";

type CriticSectionProps = Readonly<{
  content: LandingContent["critic"];
}>;

export function CriticSection({ content }: CriticSectionProps) {
  return (
    <section className="bg-blueprint-grid relative border-b border-[var(--color-divider)] py-20 sm:py-28" id="critic">
      <Container>
        {/* Header & Gauge summary */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[var(--color-divider)] bg-[#14171c] px-3 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-accent)]">
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
              {content.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-neutral-400)] sm:text-lg">
              {content.description}
            </p>
          </div>

          {/* Threshold Blueprint Badge */}
          <div className="blueprint flex flex-col justify-between border border-[var(--color-accent)] bg-[#13171d] p-6 text-left">
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />

            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-accent)]">
              APPROVAL THRESHOLD
            </span>
            <div className="my-2 flex items-baseline gap-2">
              <span className="font-[var(--font-barlow-condensed)] text-5xl font-bold text-white">
                {content.scoreThresholdValue}
              </span>
              <span className="font-[var(--font-mono)] text-xs text-[var(--color-neutral-400)]">
                / 100 PTS MINIMUM
              </span>
            </div>
            <p className="font-[var(--font-mono)] text-[11px] text-emerald-400">
              BUILD GATE: AUTOMATIC REJECTION BELOW 85
            </p>
          </div>
        </div>

        {/* 4 Pillars Category Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.categories.map((cat, i) => (
            <div
              className="blueprint flex flex-col justify-between border border-[var(--color-divider)] bg-[#13171d] p-5 transition-colors hover:border-[var(--color-neutral-400)]"
              key={cat.id}
            >
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="font-[var(--font-mono)] text-[10px] text-[var(--color-accent)]">
                    {`0${i + 1}`} · AUDIT VECTOR
                  </span>
                  <span className="size-1.5 bg-[var(--color-accent)]" />
                </div>
                <h3 className="mt-2 font-[var(--font-barlow-condensed)] text-xl font-bold text-white">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-neutral-400)]">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[var(--color-divider)] pt-3">
                <span className="font-[var(--font-mono)] text-[9px] uppercase text-[var(--color-neutral-600)]">
                  VÍ DỤ RỦI RO / EXAMPLE RISK:
                </span>
                <p className="mt-1 font-[var(--font-mono)] text-[10px] text-red-300">
                  {cat.riskExample}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Simulation of Profile 217 Bug Detection */}
        <div className="blueprint mt-10 overflow-hidden border border-red-500/30 bg-[#141113] p-6 sm:p-8">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-red-500/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="border border-red-500/50 bg-red-500/10 px-2.5 py-0.5 font-[var(--font-mono)] text-xs font-semibold text-red-400">
                {content.liveDemo.status}
              </span>
              <span className="font-[var(--font-mono)] text-xs text-white">
                {content.liveDemo.targetProfile}
              </span>
            </div>
            <span className="font-[var(--font-mono)] text-xs text-[var(--color-neutral-400)]">
              STATIC GRAPH AUDIT LOG
            </span>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <p className="font-[var(--font-mono)] text-[11px] font-semibold text-red-400">
                LỖI BỊ BẮT / DETECTED ANOMALY:
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-neutral-300)]">
                {content.liveDemo.caughtError}
              </p>
            </div>

            <div className="border-t border-red-500/20 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
              <p className="font-[var(--font-mono)] text-[11px] font-semibold text-emerald-400">
                KHUYẾN NGHỊ KHẮC PHỤC / FIX RECOMMENDATION:
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-neutral-300)]">
                {content.liveDemo.fixSuggestion}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
