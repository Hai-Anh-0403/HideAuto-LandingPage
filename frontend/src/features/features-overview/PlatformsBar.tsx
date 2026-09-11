import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";

type PlatformsBarProps = Readonly<{
  platforms: LandingContent["platforms"];
}>;

export function PlatformsBar({ platforms }: PlatformsBarProps) {
  return (
    <section className="border-b border-[var(--color-divider)] bg-[#0d0f12] py-8">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.items.map((item) => (
            <div
              className="blueprint border border-[var(--color-divider)] bg-[#13171d] p-4 transition-colors hover:border-[var(--color-neutral-400)]"
              key={item.title}
            >
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />

              <div className="flex items-center gap-2 text-[var(--color-accent)]">
                <span className="size-1.5 bg-[var(--color-accent)]" />
                <span className="font-[var(--font-barlow-condensed)] text-base font-bold text-white">
                  {item.title}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-neutral-400)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
