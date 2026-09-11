import { describe, expect, it } from "vitest";

import { getContent, isLocale, LOCALES } from "../index";

describe("locale content", () => {
  it("recognizes only the supported locale segments", () => {
    expect(isLocale("vi")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("provides a complete typed content object for every supported locale", () => {
    for (const locale of LOCALES) {
      const content = getContent(locale);

      expect(content.locale).toBe(locale);
      expect(content.hero.titlePrefix).not.toHaveLength(0);
      expect(content.overview.heading).not.toHaveLength(0);
      expect(content.critic.title).not.toHaveLength(0);
      expect(content.pricing.title).not.toHaveLength(0);
      expect(content.faq.items.length).toBeGreaterThan(0);
    }
  });
});
