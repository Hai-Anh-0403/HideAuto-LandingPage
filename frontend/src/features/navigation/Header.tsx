"use client";

import Link from "next/link";
import { useState } from "react";

import type { LandingContent, Locale } from "@/content";

type HeaderProps = Readonly<{
  locale: Locale;
  navigation: LandingContent["navigation"];
}>;

const NAVIGATION_TARGETS = [
  { key: "features", href: "#features" },
  { key: "critic", href: "#critic" },
  { key: "compare", href: "#compare" },
  { key: "pricing", href: "#pricing" },
  { key: "faq", href: "#faq" },
] as const;

export function Header({ locale, navigation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-divider-subtle)] bg-[var(--navbg)] backdrop-blur-md">
      <div className="flex h-14 items-center gap-5 px-4 lg:px-6">
        {/* Brand */}
        <Link
          aria-label="HideAuto Home"
          className="flex items-center gap-2 text-[var(--color-text)] transition-colors hover:opacity-90"
          href={`/${locale}`}
        >
          <svg
            aria-hidden="true"
            className="size-6 text-[var(--color-text)]"
            fill="none"
            viewBox="0 0 40 40"
          >
            <rect height="39" stroke="currentColor" strokeWidth="1" width="39" x=".5" y=".5" />
            <rect fill="var(--color-accent)" height="22" width="4" x="11" y="9" />
            <rect fill="var(--color-accent)" height="22" width="4" x="25" y="9" />
            <rect fill="var(--color-accent)" height="4" width="18" x="11" y="18" />
          </svg>
          <span className="font-[var(--font-barlow-condensed)] text-[19px] font-semibold tracking-[0.01em] text-[var(--color-text)]">
            HideAuto
          </span>
        </Link>

        {/* Navigation Tabs - Docked right beside the brand logo */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-5 font-[var(--font-barlow-condensed)] text-[13.5px] font-semibold text-[var(--text-secondary)] md:flex"
        >
          {NAVIGATION_TARGETS.map(({ key, href }) => {
            const label = navigation[key as keyof typeof navigation];
            if (!label) return null;
            return (
              <a
                className="transition-colors hover:text-[var(--color-text)]"
                href={href}
                key={key}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* Flexible spacer pushing actions to the right */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex border border-[var(--color-divider)]">
            <Link
              className={`px-2 py-1 font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.06em] uppercase transition-colors ${
                locale === "vi"
                  ? "bg-white text-black hover:text-black"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
              href="/vi"
            >
              VI
            </Link>
            <Link
              className={`border-l border-[var(--color-divider)] px-2 py-1 font-[var(--font-mono)] text-[11px] font-semibold tracking-[0.06em] uppercase transition-colors ${
                locale === "en"
                  ? "bg-white text-black hover:text-black"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
              href="/en"
            >
              EN
            </Link>
          </div>

          {/* CTA Beta Download Button */}
          {navigation.download && (
            <a
              className="blueprint hidden items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-2 font-[var(--font-barlow-condensed)] text-[14px] font-semibold tracking-[0.02em] text-[var(--on-ac)] transition-opacity hover:opacity-90 sm:inline-flex"
              href="#download"
            >
              <i className="corner tl" />
              <i className="corner tr" />
              <i className="corner bl" />
              <i className="corner br" />
              <span>{navigation.download}</span>
            </a>
          )}

          {/* Mobile Menu Toggle */}
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label="Open navigation"
            className="flex size-9 items-center justify-center border border-[var(--color-divider)] text-[var(--text-secondary)] hover:text-[var(--color-text)] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
          >
            <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[var(--color-divider)] bg-[var(--color-bg)] px-4 py-4 font-[var(--font-barlow-condensed)] md:hidden"
          id="mobile-navigation"
        >
          <div className="flex flex-col gap-3">
            {NAVIGATION_TARGETS.map(({ key, href }) => {
              const label = navigation[key as keyof typeof navigation];
              if (!label) return null;
              return (
                <a
                  className="py-1.5 text-[14px] font-semibold text-[var(--text-secondary)] transition-colors hover:text-[var(--color-text)]"
                  href={href}
                  key={key}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </a>
              );
            })}
            {navigation.download && (
              <div className="pt-2">
                <a
                  className="blueprint flex w-full items-center justify-center border border-[var(--color-accent)] bg-[var(--color-accent)] py-1.5 font-[var(--font-barlow-condensed)] text-[14px] font-semibold text-[var(--on-ac)]"
                  href="#download"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="corner tl" />
                  <i className="corner tr" />
                  <i className="corner bl" />
                  <i className="corner br" />
                  <span>{navigation.download}</span>
                </a>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
