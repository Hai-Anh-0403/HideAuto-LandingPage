import type { LandingContent } from "@/content";
import { Container } from "@/shared/components/Container";

type ComparisonSectionProps = Readonly<{
  content: LandingContent["comparison"];
}>;

export function ComparisonSection({ content }: ComparisonSectionProps) {
  return (
    <section className="border-b border-[var(--color-divider)] py-20 sm:py-28" id="compare">
      <Container>
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-[var(--color-divider)] bg-[#14171c] px-3 py-1 font-[var(--font-mono)] text-[11px] text-[var(--color-accent)]">
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="mt-4 font-[var(--font-barlow-condensed)] text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            {content.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-neutral-400)] sm:text-lg">
            {content.description}
          </p>
        </div>

        {/* Technical Matrix Table */}
        <div className="blueprint mt-12 overflow-hidden border border-[var(--color-divider)] bg-[#13171d]">
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />

          <div
            aria-label="So sánh chi tiết các công nghệ automation"
            className="overflow-x-auto"
            role="region"
            tabIndex={0}
          >
            <table className="min-w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--color-divider)] bg-[#0f1217] font-[var(--font-mono)] text-[11px] uppercase tracking-wider">
                  <th className="p-4 sm:w-1/3" scope="col">
                    {content.columns[0]}
                  </th>
                  <th
                    className="border-x border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-4 text-[var(--color-accent)] sm:w-1/4"
                    scope="col"
                  >
                    {content.columns[1]}
                  </th>
                  <th className="p-4 text-[var(--color-neutral-400)] sm:w-1/4" scope="col">
                    {content.columns[2]}
                  </th>
                  <th className="p-4 text-[var(--color-neutral-400)] sm:w-1/4" scope="col">
                    {content.columns[3]}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-divider)]">
                {content.rows.map((row) => (
                  <tr
                    className="transition-colors hover:bg-[#181d24]"
                    key={row.feature}
                  >
                    <th
                      className="p-4 font-[var(--font-barlow-condensed)] text-base font-bold text-white"
                      scope="row"
                    >
                      {row.feature}
                    </th>
                    <td className="border-x border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-4 font-semibold text-emerald-300">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400">✔</span>
                        <span>{row.hideAuto}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--color-neutral-400)]">
                      <div className="flex items-start gap-2">
                        <span className="text-slate-500">—</span>
                        <span>{row.script}</span>
                      </div>
                    </td>
                    <td className="p-4 text-[var(--color-neutral-400)]">
                      <div className="flex items-start gap-2">
                        <span className="text-slate-500">—</span>
                        <span>{row.saas}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
