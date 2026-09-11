"use client";

import { useState } from "react";
import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";
import { SectionHeading } from "@/shared/components/SectionHeading";

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
    <section className="border-b border-[var(--color-divider)] py-20 sm:py-28" id="faq">
      <Container>
        {/* Header */}
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
        />

        {/* Accordion List */}
        <div className="mt-12 space-y-3">
          {content.items.map((item, idx) => {
            const isOpen = openIndices.has(idx);
            return (
              <div
                className="blueprint border border-[var(--color-divider)] bg-[#13171d] transition-colors hover:border-[var(--color-neutral-400)]"
                key={item.question}
              >
                <i className="corner tl" />
                <i className="corner tr" />
                <i className="corner bl" />
                <i className="corner br" />

                <button
                  aria-controls={`faq-content-${idx}`}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                  id={`faq-header-${idx}`}
                  onClick={() => toggleItem(idx)}
                  type="button"
                >
                  <span className="font-[var(--font-barlow-condensed)] text-lg font-bold text-white sm:text-xl">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center border border-[var(--color-divider)] font-[var(--font-mono)] text-sm text-[var(--color-accent)]"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div
                    aria-labelledby={`faq-header-${idx}`}
                    className="border-t border-[var(--color-divider)] p-5 pt-3 text-sm leading-relaxed text-[var(--color-neutral-400)] sm:text-base"
                    id={`faq-content-${idx}`}
                    role="region"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
