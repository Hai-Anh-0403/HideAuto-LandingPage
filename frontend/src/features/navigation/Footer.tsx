import type { LandingContent } from "@/content";
import type { Release } from "@/features/downloads";

type FooterProps = Readonly<{
  content: LandingContent;
  release: Release | null;
}>;

export function Footer({ content }: FooterProps) {
  return (
    <footer
      data-screen-label="Footer"
      className="mt-[88px] border-t border-[var(--color-divider-subtle)] px-4 py-[44px] md:px-[34px]"
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-start justify-between gap-12">
        {/* Brand & Tagline */}
        <div>
          <div className="flex items-center gap-[9px]">
            <svg
              aria-hidden="true"
              className="h-[22px] w-[22px] text-white"
              fill="none"
              viewBox="0 0 40 40"
            >
              <rect height="39" stroke="currentColor" width="39" x=".5" y=".5" />
              <rect fill="var(--color-accent)" height="22" width="4" x="11" y="9" />
              <rect fill="var(--color-accent)" height="22" width="4" x="25" y="9" />
              <rect fill="var(--color-accent)" height="4" width="18" x="11" y="18" />
            </svg>
            <span className="font-[var(--font-barlow-condensed)] text-[19px] font-semibold text-white">
              HideAuto
            </span>
          </div>
          <p className="mt-3 max-w-[400px] text-[14px] leading-[1.6] text-[var(--color-neutral-400)]">
            {content.footer.description}
          </p>
        </div>

        {/* Links Columns */}
        <nav aria-label={content.footer.navigationLabel} className="flex flex-wrap gap-14">
          <div>
            <p className="font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.13em] text-[var(--color-muted)]">
              {content.footer.productLabel ?? (content.locale === "vi" ? "Sản phẩm" : "Product")}
            </p>
            <div className="mt-3.5 flex flex-col gap-[9px] text-[14px]">
              <a
                href="#features"
                className="text-[var(--color-neutral-400)] transition-colors hover:text-white"
              >
                {content.navigation.features}
              </a>
              <a
                href="#critic"
                className="text-[var(--color-neutral-400)] transition-colors hover:text-white"
              >
                Critic & gate
              </a>
              <a
                href="#pricing"
                className="text-[var(--color-neutral-400)] transition-colors hover:text-white"
              >
                {content.navigation.pricing}
              </a>
            </div>
          </div>

          <div>
            <p className="font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.13em] text-[var(--color-muted)]">
              {content.footer.resourcesLabel ?? (content.locale === "vi" ? "Tài nguyên" : "Resources")}
            </p>
            <div className="mt-3.5 flex flex-col gap-[9px] text-[14px]">
              <a
                href="#faq"
                className="text-[var(--color-neutral-400)] transition-colors hover:text-white"
              >
                {content.navigation.faq}
              </a>
              <a
                href="#compare"
                className="text-[var(--color-neutral-400)] transition-colors hover:text-white"
              >
                {content.navigation.compare}
              </a>
              <a
                href="#download"
                className="text-[var(--color-neutral-400)] transition-colors hover:text-white"
              >
                {content.navigation.download}
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-8 flex max-w-[1280px] flex-wrap items-center justify-between gap-5 border-t border-[var(--color-divider-subtle)] pt-5 font-[var(--font-mono)] text-[10px] tracking-[0.05em] text-[var(--color-muted)]">
        <span>{content.footer.copyright}</span>
        <span>
          {content.footer.note ??
            (content.locale === "vi"
              ? "Bản beta · nội dung dựng từ source hiện tại"
              : "Beta · copy derived from the current source")}
        </span>
      </div>
    </footer>
  );
}
