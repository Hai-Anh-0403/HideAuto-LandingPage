import type { ReactNode } from "react";

type SectionHeadingProps = Readonly<{
  description?: ReactNode;
  eyebrow?: string;
  id?: string;
  title: ReactNode;
}>;

export function SectionHeading({
  description,
  eyebrow,
  id,
  title,
}: SectionHeadingProps) {
  return (
    <header>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {description ? <p className="section-description">{description}</p> : null}
    </header>
  );
}
