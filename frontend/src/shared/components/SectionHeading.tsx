import type { ReactNode } from "react";

export type SectionHeadingProps = Readonly<{
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  id?: string;
  title: ReactNode;
  titleClassName?: string;
}>;

export function SectionHeading({
  className = "",
  description,
  eyebrow,
  id,
  title,
  titleClassName = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`.trim()}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 border border-[var(--color-divider)] bg-[#14171c] px-3 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-accent)]">
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2
        id={id}
        className={`mt-4 font-[var(--font-barlow-condensed)] text-3xl font-bold uppercase leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl ${titleClassName}`.trim()}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-neutral-400)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
