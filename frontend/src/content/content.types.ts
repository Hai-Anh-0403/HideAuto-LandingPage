export const LOCALES = ["vi", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export type HeroMode = "cockpit" | "specsheet" | "gate";

export type LandingContent = Readonly<{
  locale: Locale;
  siteName: string;
  navigation: Readonly<{
    features: string;
    critic: string;
    compare: string;
    pricing: string;
    faq: string;
    download: string;
  }>;
  hero: Readonly<{
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    titleSuffix: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    variantLabels: Readonly<{
      cockpit: string;
      specsheet: string;
      gate: string;
    }>;
    cockpit: Readonly<{
      statusPill: string;
      activeFlow: string;
      nodeCount: string;
      profilesRunning: string;
      criticScore: string;
      logs: readonly string[];
    }>;
    specsheet: Readonly<{
      title: string;
      items: readonly Readonly<{
        label: string;
        value: string;
        detail: string;
      }>[];
    }>;
    gate: Readonly<{
      score: number;
      verdict: string;
      summary: string;
      rules: readonly Readonly<{
        id: string;
        name: string;
        status: "pass" | "warn" | "fail";
        message: string;
      }>[];
    }>;
  }>;
  platforms: Readonly<{
    drivesLabel: string;
    drives: readonly Readonly<{
      name: string;
      tag?: string;
    }>[];
    title?: string;
    items?: readonly Readonly<{
      icon: string;
      title: string;
      description: string;
    }>[];
  }>;
  overview: Readonly<{
    eyebrow: string;
    heading: string;
    subhead: string;
    steps: readonly Readonly<{
      number: string;
      title: string;
      description: string;
      tag: string;
      bullets?: readonly string[];
    }>[];
    nodeGroupsHeading: string;
    nodeGroupsSubhead: string;
    nodeGroups: readonly Readonly<{
      name: string;
      badge: string;
      nodes: readonly string[];
    }>[];
  }>;
  critic: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    pillars: readonly Readonly<{
      id: string;
      label: string;
      description: string;
    }>[];
    scoreRules: Readonly<{
      title: string;
      maxLabel: string;
      maxValue: string;
      rules: readonly Readonly<{
        level: "error" | "warn" | "hint";
        label: string;
        deduction: string;
      }>[];
      thresholdLabel: string;
      thresholdValue: string;
      explanationPrefix: string;
      explanationHighlight: string;
      explanationSuffix: string;
    }>;
    scoreThresholdText?: string;
    scoreThresholdValue?: number;
    categories?: readonly Readonly<{
      id: string;
      name: string;
      description: string;
      riskExample: string;
    }>[];
    liveDemo?: Readonly<{
      title: string;
      status: string;
      targetProfile: string;
      caughtError: string;
      fixSuggestion: string;
    }>;
  }>;
  stats: Readonly<{
    items: readonly Readonly<{
      value: string;
      label: string;
      sub: string;
    }>[];
  }>;
  comparison: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    columns: readonly string[];
    rows: readonly Readonly<{
      feature: string;
      hideAuto: string;
      script: string;
      saas: string;
      isHighlight?: boolean;
    }>[];
  }>;
  pricing: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    planName: string;
    planPrice: string;
    planSub: string;
    features: readonly string[];
    cta: string;
    guarantee: string;
  }>;
  faq: Readonly<{
    eyebrow: string;
    title: string;
    items: readonly Readonly<{
      question: string;
      answer: string;
    }>[];
  }>;
  downloads: Readonly<{
    eyebrow: string;
    title: string;
    description: string;
    version: string;
    os: string;
    installerName: string;
    installerSize: string;
    portableName: string;
    portableSize: string;
    sha256: string;
    ctaDownload: string;
    ctaPortable: string;
    betaSignup: Readonly<{
      title: string;
      description: string;
      placeholder: string;
      buttonText: string;
      successMessage: string;
    }>;
  }>;
  footer: Readonly<{
    description: string;
    navigationLabel: string;
    localeLabel: string;
    copyright: string;
    disclaimer: string;
  }>;
}>;
