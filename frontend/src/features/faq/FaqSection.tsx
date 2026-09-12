"use client";

import { useState } from "react";
import type { LandingContent } from "@/content";

type FaqSectionProps = Readonly<{
  content: LandingContent["faq"];
}>;

export function FaqSection({ content }: FaqSectionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0]));

  function toggleItem(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section id="faq" className="px-4 pt-20 pb-0 md:px-[34px] lg:pt-24">
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-[60px]">
        {/* Left Column: Heading & Description */}
        <div>
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.13em] text-[var(--color-accent)]">
            {content.eyebrow}
          </p>

          <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[48px]">
            {content.title}
          </h2>

          {content.description ? (
            <p className="mt-4 text-[15.5px] leading-[1.62] text-[var(--color-neutral-400)] text-pretty">
              {content.description}
            </p>
          ) : null}
        </div>

        {/* Right Column: Sleek Hairline-Separated FAQ List */}
        <div className="border-b border-[var(--color-divider-subtle)]">
          {content.items.map((item, idx) => {
            const isOpen = openIndices.has(idx);

            return (
              <div
                key={item.question}
                className="border-t border-[var(--color-divider-subtle)]"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left bg-transparent border-0 cursor-pointer font-[var(--font-barlow-condensed)] text-[22px] font-semibold text-white transition-colors hover:text-[var(--color-accent)]"
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 font-[var(--font-mono)] text-[18px] text-[var(--color-accent)] transition-transform duration-150 inline-block ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen ? (
                  <p
                    id={`faq-answer-${idx}`}
                    className="pb-[22px] max-w-[760px] text-[15.5px] leading-[1.65] text-[var(--color-neutral-400)] text-pretty"
                  >
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
