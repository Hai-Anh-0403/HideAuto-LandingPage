import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";

type StatsBarProps = Readonly<{
  stats: LandingContent["stats"];
}>;

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="border-b border-[var(--color-divider)] bg-[#0d0f12] py-14">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((stat) => (
            <div
              className="blueprint flex flex-col justify-between border border-[var(--color-divider)] bg-[#13171d] p-5"
              key={stat.label}
            >
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />

              <div>
                <span className="font-[var(--font-barlow-condensed)] text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </span>
                <p className="mt-2 font-[var(--font-barlow-condensed)] text-base font-bold text-[var(--color-accent)]">
                  {stat.label}
                </p>
              </div>

              <p className="mt-2 font-[var(--font-mono)] text-[11px] text-[var(--color-neutral-400)]">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
