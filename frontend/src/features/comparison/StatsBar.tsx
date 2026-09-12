import type { LandingContent } from "@/content";

type StatsBarProps = Readonly<{
  stats: LandingContent["stats"];
}>;

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section aria-label={stats.eyebrow} className="px-4 pt-[76px] pb-0 md:px-[34px]">
      <div className="mx-auto max-w-[1280px]">
        {/* Eyebrow and placeholder badge */}
        <div className="flex items-baseline gap-3">
          <p className="font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
            {stats.eyebrow}
          </p>
          <p className="font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.06em] text-[#d98d86]">
            {stats.placeholderTag}
          </p>
        </div>

        {/* 4 Stats columns with vertical dividers - zero bottom borders */}
        <div className="mt-[22px] grid grid-cols-2 border-t border-[var(--color-divider)] md:grid-cols-4">
          {stats.items.map((stat, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === stats.items.length - 1;
            const isEvenColInTwoColGrid = idx % 2 === 0;

            return (
              <div
                key={stat.label}
                className={`py-[26px] px-3 sm:px-6 ${
                  isFirst ? "md:pl-0 md:pr-6" : isLast ? "md:pl-6 md:pr-0" : "md:px-6"
                } ${
                  isEvenColInTwoColGrid
                    ? "border-r border-[var(--color-divider-subtle)]"
                    : "border-r-0"
                } ${
                  !isLast
                    ? "md:border-r md:border-[var(--color-divider-subtle)]"
                    : "md:border-r-0"
                }`}
              >
                <p className="font-[var(--font-barlow-condensed)] text-[44px] font-semibold leading-[0.9] tracking-[-0.02em] text-white sm:text-[52px]">
                  {stat.value}
                </p>
                <p className="mt-[9px] text-[14px] leading-normal text-[var(--color-neutral-400)]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
