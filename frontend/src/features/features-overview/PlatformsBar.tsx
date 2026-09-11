import type { LandingContent } from "@/content";

type PlatformsBarProps = Readonly<{
  platforms: LandingContent["platforms"];
}>;

export function PlatformsBar({ platforms }: PlatformsBarProps) {
  const drives = platforms.drives ?? [];
  const label = platforms.drivesLabel ?? "Drives";

  return (
    <section data-screen-label="Platforms" className="px-4 sm:px-8 pt-8 sm:pt-[46px] pb-0">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-[26px] border-t border-[var(--color-divider-subtle)] pt-[26px]">
        <p className="shrink-0 select-none font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.13em] text-[var(--color-neutral-400)]">
          {label}
        </p>
        <div className="flex flex-wrap items-center gap-[10px]">
          {drives.map((drive) => (
            <span
              key={drive.name}
              className="inline-flex items-center border border-[var(--color-divider-subtle)] bg-transparent px-[15px] py-[7px] font-[var(--font-barlow-condensed)] text-[16px] font-semibold tracking-[0.03em] text-[#dce1e6] transition-colors hover:border-[var(--color-divider)] hover:text-white"
            >
              <span>{drive.name}</span>
              {drive.tag ? (
                <span className="ml-1.5 font-[var(--font-mono)] text-[10px] font-normal tracking-normal text-[var(--color-neutral-400)]">
                  {drive.tag}
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
