import type { LandingContent } from "@/content";

type ComparisonSectionProps = Readonly<{
  content: LandingContent["comparison"];
}>;

function renderCell(val: string) {
  if (val === "●" || val === "dot") {
    return (
      <span className="font-[var(--font-mono)] text-[12px] text-[var(--color-accent)] leading-none">
        ●
      </span>
    );
  }
  if (val === "—" || val === "dash" || val === "-") {
    return (
      <span className="font-[var(--font-mono)] text-[12px] text-[var(--color-neutral-400)] leading-none">
        —
      </span>
    );
  }
  return (
    <span className="text-[12.5px] text-[var(--color-neutral-400)] leading-normal">
      {val}
    </span>
  );
}

export function ComparisonSection({ content }: ComparisonSectionProps) {
  return (
    <section id="compare" className="px-4 pt-20 pb-0 md:px-[34px] lg:pt-24">
      <div className="mx-auto max-w-[1280px]">
        {/* Section Heading */}
        <div className="max-w-[760px]">
          <p className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.13em] text-[var(--color-accent)]">
            {content.eyebrow}
          </p>
          <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[52px]">
            {content.title}
          </h2>
          <p className="mt-[18px] text-[16px] leading-[1.62] text-[var(--color-neutral-400)] sm:text-[17px] text-pretty">
            {content.description}
          </p>
        </div>

        {/* Blueprint Comparison Table */}
        <div className="blueprint relative mt-9 border border-[var(--color-divider)]">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          <div
            aria-label={content.title}
            className="overflow-x-auto min-w-full"
            role="region"
            tabIndex={0}
          >
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--color-divider)] bg-[rgba(231,232,234,0.03)] font-[var(--font-mono)] text-[9.5px] uppercase tracking-[0.11em] text-[var(--color-neutral-400)]">
                  <th className="py-3.5 pl-6 pr-4 font-normal" scope="col">
                    <span className="sr-only">Features</span>
                  </th>
                  <th
                    className="w-[150px] py-3.5 px-4 font-normal text-white"
                    scope="col"
                  >
                    {content.columns[1]}
                  </th>
                  <th
                    className="w-[190px] py-3.5 px-4 font-normal text-[var(--color-neutral-400)]"
                    scope="col"
                  >
                    {content.columns[2]}
                  </th>
                  <th
                    className="w-[210px] py-3.5 pl-4 pr-6 font-normal text-[var(--color-neutral-400)]"
                    scope="col"
                  >
                    {content.columns[3]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-divider-subtle)] text-[14.5px]">
                {content.rows.map((row) => (
                  <tr
                    key={row.feature}
                    className="transition-colors hover:bg-[rgba(231,232,234,0.02)]"
                  >
                    <td className="py-3.5 pl-6 pr-4 font-normal text-white">
                      {row.feature}
                    </td>
                    <td className="w-[150px] py-3.5 px-4">
                      {renderCell(row.hideAuto)}
                    </td>
                    <td className="w-[190px] py-3.5 px-4">
                      {renderCell(row.script)}
                    </td>
                    <td className="w-[210px] py-3.5 pl-4 pr-6">
                      {renderCell(row.saas)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
