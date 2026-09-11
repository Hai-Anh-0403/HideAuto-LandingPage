import Link from "next/link";

import type { LandingContent } from "@/content";
import { type Release } from "@/features/downloads";
import { Container } from "@/shared/components/Container";

type FooterProps = Readonly<{
  content: LandingContent;
  release: Release | null;
}>;

const NAVIGATION_TARGETS = [
  { key: "features", href: "#features" },
  { key: "critic", href: "#critic" },
  { key: "compare", href: "#compare" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
  { key: "download", href: "#download" },
] as const;

export function Footer({ content, release }: FooterProps) {
  const alternateLocale = content.locale === "vi" ? "en" : "vi";

  return (
    <footer className="border-t border-[var(--color-divider)] bg-[#0d0f12] text-[var(--color-neutral-400)]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand & Mission */}
          <div>
            <Link
              aria-label="HideAuto Home"
              className="flex items-center gap-2.5 text-white"
              href={`/${content.locale}`}
            >
              <svg
                aria-hidden="true"
                className="size-6 text-[var(--color-accent)]"
                fill="none"
                viewBox="0 0 40 40"
              >
                <rect height="39" stroke="currentColor" strokeWidth="1.5" width="39" x=".5" y=".5" />
                <rect fill="currentColor" height="22" width="4" x="11" y="9" />
                <rect fill="currentColor" height="22" width="4" x="25" y="9" />
                <rect fill="currentColor" height="4" width="18" x="11" y="18" />
              </svg>
              <span className="font-[var(--font-barlow-condensed)] text-2xl font-bold tracking-tight">
                HideAuto
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-neutral-400)]">
              {content.footer.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 font-[var(--font-mono)] text-[11px] text-[var(--color-neutral-400)]">
              <span className="border border-[var(--color-divider)] bg-[#14171c] px-2 py-0.5">LOCAL-FIRST</span>
              <span className="border border-[var(--color-divider)] bg-[#14171c] px-2 py-0.5">WINDOWS X64</span>
              <span className="border border-[var(--color-divider)] bg-[#14171c] px-2 py-0.5">ANTI-DETECT CORE</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-wider text-white">
              {content.footer.navigationLabel}
            </p>
            <nav aria-label={content.footer.navigationLabel} className="mt-3 flex flex-col gap-2 text-sm">
              {NAVIGATION_TARGETS.map(({ key, href }) => {
                const label = content.navigation[key as keyof typeof content.navigation];
                if (!label) return null;
                return (
                  <a
                    className="transition-colors hover:text-white"
                    href={href}
                    key={key}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Locale & Specs */}
          <div>
            <p className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-wider text-white">
              {content.footer.localeLabel}
            </p>
            <div className="mt-3 inline-flex border border-[var(--color-divider)]">
              <Link
                className="px-3 py-1 font-[var(--font-mono)] text-xs uppercase hover:text-white"
                href={`/${alternateLocale}`}
              >
                {alternateLocale.toUpperCase()}
              </Link>
            </div>

            <p className="mt-6 text-xs text-[var(--color-neutral-600)]">
              {content.footer.disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[var(--color-divider)] pt-6 text-xs sm:flex-row">
          <span>{content.footer.copyright}</span>
          <span className="mt-2 font-[var(--font-mono)] text-[var(--color-neutral-600)] sm:mt-0">
            ENGINE: HARDENED CHROMIUM · RUNTIME: NATIVE
          </span>
        </div>
      </Container>
    </footer>
  );
}
