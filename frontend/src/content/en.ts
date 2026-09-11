import type { LandingContent } from "./content.types";

export const enContent: LandingContent = {
  locale: "en",
  siteName: "HideAuto",
  navigation: {
    features: "Features",
    critic: "Critic",
    compare: "Compare",
    pricing: "Pricing",
    faq: "FAQ",
    download: "Get Beta",
  },
  hero: {
    eyebrow: "BETA · WINDOWS · LOCAL RUNTIME, LOCAL DATA",
    titlePrefix: "Browser automation with a ",
    titleAccent: "gate",
    titleSuffix: " before it runs for real.",
    description:
      "Drag-and-drop nodes into workflows, run hundreds of anti-detect profiles in parallel. Before shipping, Critic scans the entire flow, scores it, and blocks builds if bugs remain — not after 300 profiles have already failed.",
    ctaPrimary: "Get the beta — free",
    ctaSecondary: "GitHub",
    variantLabels: {
      cockpit: "1 · COCKPIT",
      specsheet: "2 · SPEC SHEET",
      gate: "3 · GATE",
    },
    cockpit: {
      statusPill: "CRITIC GATE: PASS (92/100)",
      activeFlow: "ecom_checkout_pipeline.flow",
      nodeCount: "34 nodes",
      profilesRunning: "300 profiles active",
      criticScore: "92 / 100",
      logs: [
        "[09:42:01] Ingested 1,200 account targets from CSV",
        "[09:42:04] Critic Audit passed: zero DOM-index selectors, humanized typing enabled",
        "[09:42:07] Launching 300 isolated Chromium instances...",
        "[09:42:15] Batch 1 (Profiles #001-#100): Navigation complete. Latency 84ms",
        "[09:42:22] Batch 2 (Profiles #101-#200): Cloudflare challenge solved locally",
        "[09:42:28] Step 'Place Order': Success rate 99.7% — zero IP ban detected",
      ],
    },
    specsheet: {
      title: "Core Technical Specifications",
      items: [
        {
          label: "Engine Architecture",
          value: "Local-First Native (Windows x64)",
          detail: "Built on hardened Chromium, avoids bulky containerization, consumes 40% less memory.",
        },
        {
          label: "Anti-detect Fingerprint",
          value: "Hardware & Canvas Masking",
          detail: "Independently isolates WebGL, AudioContext, Canvas, Fonts, and WebRTC per profile.",
        },
        {
          label: "Critic Gate Mechanism",
          value: "Static Graph Analysis",
          detail: "Scans 42 static safety rules, simulates DOM mutations, and catches network bottlenecks prior to execution.",
        },
        {
          label: "Storage & Security",
          value: "100% Local (SQLite & JSON)",
          detail: "Zero telemetry uploading cookies or flows to the cloud. All credentials encrypted via DPAPI.",
        },
      ],
    },
    gate: {
      score: 92,
      verdict: "BUILD APPROVED — READY FOR PRODUCTION",
      summary: "Passed 42/42 safety rules. Minimum approval threshold: 85 points.",
      rules: [
        {
          id: "RES-01",
          name: "DOM Selector Resilience",
          status: "pass",
          message: "All click/type target elements use robust selectors with zero dependence on dynamic hash classes.",
        },
        {
          id: "ANT-03",
          name: "Human Behavioral Emulation",
          status: "pass",
          message: "Enabled bezier mouse trajectories and 30-140ms randomized keyboard input jitter.",
        },
        {
          id: "DAT-02",
          name: "Credential & Token Privacy",
          status: "pass",
          message: "Environment variables and session cookies are encrypted locally, never leaked to console logs.",
        },
        {
          id: "RAT-04",
          name: "Request Rate Pacing",
          status: "warn",
          message: "Detected 2 back-to-back loop nodes with delay < 500ms; recommended adding backoff jitter.",
        },
      ],
    },
  },
  platforms: {
    title: "Technology Stack Engineered for Scale",
    items: [
      {
        icon: "monitor",
        title: "Windows 10 / 11 Native",
        description: "Optimized x64 & ARM64 execution with low latency, no Docker or WSL overhead required.",
      },
      {
        icon: "shield-check",
        title: "Hardened Chromium",
        description: "Strict isolation across WebGL, Canvas, Audio, WebRTC, and Timezone fingerprints.",
      },
      {
        icon: "hard-drive",
        title: "100% Local Runtime",
        description: "Data never leaves your workstation. No flows, cookies, or logs sent to external servers.",
      },
      {
        icon: "database",
        title: "Local SQLite & JSON Storage",
        description: "Total ownership of backups, git version control, and effortless portability between machines.",
      },
    ],
  },
  overview: {
    eyebrow: "OPERATING LOOP",
    heading: "Build · review · run at scale · commit.",
    subhead:
      "A closed 5-step engineering loop ensuring browser workflows scale across hundreds of accounts without unexpected mid-run failures.",
    steps: [
      {
        number: "01",
        tag: "INFINITE CANVAS",
        title: "Eight node groups, one infinite canvas",
        description:
          "Visual drag-and-drop authoring. Every node accepts parameters, JavaScript expressions, branching logic, loop constructs, retry policies, and granular error handlers.",
      },
      {
        number: "02",
        tag: "CRITIC GATE",
        title: "Critic reads the flow before touching production",
        description:
          "Automated gate audits flow across 4 core risk vectors: selector resilience, anti-detect hygiene, data integrity, and request pacing. Fails build if score drops below 85.",
      },
      {
        number: "03",
        tag: "PARALLEL SCALE",
        title: "Hundreds of profiles, running on schedule",
        description:
          "High-throughput multi-threaded coordination. Assign dedicated proxies per profile, schedule automated cron triggers, and smoothly recover sessions after network glitches.",
      },
      {
        number: "04",
        tag: "GIT VERSIONING",
        title: "Workflows have a history, not just a latest version",
        description:
          "All modifications are preserved as internal git commits. Inspect visual diffs between graph revisions before merging, with instant rollback on regression.",
      },
      {
        number: "05",
        tag: "STANDALONE .EXE",
        title: "Data in, data out, then its own app",
        description:
          "Ingest inputs from CSV/Excel/Database sources and emit cleansed structured outputs. Package workflows into standalone .exe binaries for 1-click execution.",
      },
    ],
    nodeGroupsHeading: "8 Standardized Node Groups",
    nodeGroupsSubhead: "Designed for any browser task, from straightforward scrapers to multi-step enterprise workflows.",
    nodeGroups: [
      {
        name: "Browser & Session",
        badge: "CORE",
        nodes: ["Open Browser", "Switch Context", "Set Proxy", "Manage Cookies", "Fingerprint Profile", "Close Browser"],
      },
      {
        name: "Navigation & Page",
        badge: "PAGE",
        nodes: ["Goto URL", "Wait For Load", "Scroll Page", "Capture Screenshot", "New Tab", "Reload"],
      },
      {
        name: "Elements & DOM",
        badge: "DOM",
        nodes: ["Click Element", "Type Text", "Hover", "Select Dropdown", "Upload File", "Drag & Drop", "Shadow DOM Query"],
      },
      {
        name: "Keyboard & Mouse",
        badge: "HUMAN",
        nodes: ["Humanized Typing", "Random Delay", "Mouse Trajectory", "Hotkey Combo", "Press Key", "Mouse Wheel"],
      },
      {
        name: "Data & Transform",
        badge: "DATA",
        nodes: ["Extract Table", "Regex Match", "JSON Parse", "CSV Export", "Transform Variable", "Evaluate JS"],
      },
      {
        name: "Flow Control",
        badge: "LOGIC",
        nodes: ["If / Else Branch", "For Each Loop", "While Condition", "Try / Catch", "Parallel Split", "Break / Continue"],
      },
      {
        name: "Critic & Assert",
        badge: "GATE",
        nodes: ["Assert Visible", "Assert Text", "Verify Score", "Flag Brittle Selector", "Alert On Error", "Check Fingerprint"],
      },
      {
        name: "System & OS",
        badge: "OS",
        nodes: ["Read File", "Write File", "Run CLI Command", "Read Clipboard", "Write Clipboard", "Desktop Notification"],
      },
    ],
  },
  critic: {
    eyebrow: "WHY A GATE MATTERS",
    title: "Automation bugs do not show up in your test run. They show up on profile 217.",
    description:
      "Critic is the first static analyzer built exclusively for browser automation. It identifies brittle selectors, missing retries, fingerprint anomalies, and unsafe data flows before launching batches.",
    scoreThresholdText: "Minimum score required to approve build:",
    scoreThresholdValue: 85,
    categories: [
      {
        id: "resilience",
        name: "Resilience",
        description: "Catches absolute DOM-position selectors (/div[3]/span), missing fallbacks when websites change, and omitted network timeout retries.",
        riskExample: "Selector `div.css-19v8 > div > button` breaks when the target site updates hashed class names.",
      },
      {
        id: "anti-detect",
        name: "Anti-Detect",
        description: "Identifies detectable bot patterns: linear typing cadence, robotic straight-line cursor movements, or identical canvas fingerprints across profiles.",
        riskExample: "Typing passwords in 12ms instantly triggers Cloudflare / Akamai bot challenges.",
      },
      {
        id: "data-safety",
        name: "Data Safety",
        description: "Flags unvalidated file overwrites, missing input schema validations, or plaintext credentials printed into execution logs.",
        riskExample: "Overwriting `customers.csv` with empty data when network disconnects return zero rows.",
      },
      {
        id: "rate-limits",
        name: "Rate Pacing",
        description: "Detects infinite loops, lack of backoff delays between requests, and sudden request bursts causing residential IP bans.",
        riskExample: "Sending 120 GET requests/min on a single residential proxy flags and blacklists the IP.",
      },
    ],
    liveDemo: {
      title: "Critic Live Risk Detection Simulation",
      status: "BLOCKED BY CRITIC (Score: 68/100)",
      targetProfile: "Profile #217 (Batch Run Simulation)",
      caughtError: "Selector `//div[@id='btn-wrap']/button` failed to resolve due to slow rendering on high-ping proxy. Missing retry + fallback timeout.",
      fixSuggestion: "Fix recommendation: Switch to semantic CSS selector `button[data-action='submit']` and insert a Retry Policy node (3 attempts, 1.5s delay).",
    },
  },
  stats: {
    items: [
      {
        value: "300+",
        label: "Stable Parallel Profiles",
        sub: "Memory-optimized with zero RAM leaks",
      },
      {
        value: "< 120ms",
        label: "Per-Step Execution Latency",
        sub: "Native engine with instant dispatch",
      },
      {
        value: "0 MB",
        label: "Data Uploaded to Cloud",
        sub: "Strict adherence to local-first privacy",
      },
      {
        value: "85+",
        label: "Required Critic Gate Score",
        sub: "Guaranteed quality before production run",
      },
    ],
  },
  comparison: {
    eyebrow: "TECHNICAL BENCHMARK",
    title: "A hand-written script works. By month two it does not.",
    description:
      "A head-to-head comparison between HideAuto and standard web automation approaches in the industry.",
    columns: ["Capability & Feature", "HideAuto", "Puppeteer / Playwright Script", "Standard No-code SaaS"],
    rows: [
      {
        feature: "Visual Canvas & 8 Node Groups",
        hideAuto: "Built-in visual canvas with inline JS expressions",
        script: "None, requires coding and environment maintenance",
        saas: "Yes, but restricted flexibility and rigid blocks",
        isHighlight: true,
      },
      {
        feature: "Static Quality Gate (Critic)",
        hideAuto: "Pre-run static analysis across 4 core risk vectors",
        script: "None, requires manual testing per profile",
        saas: "None, failures only discovered post-run",
        isHighlight: true,
      },
      {
        feature: "Isolated Anti-detect Profiles",
        hideAuto: "Built-in management for hundreds of isolated fingerprints",
        script: "Requires custom libraries and third-party setups",
        saas: "Expensive monthly add-on pricing per profile",
      },
      {
        feature: "Revision History & Visual Diff",
        hideAuto: "Internal git commits with visual graph diffs",
        script: "Code diffs in git, difficult to visualize logic flows",
        saas: "Usually stores latest version only, no diffs",
      },
      {
        feature: "100% Local-First Privacy",
        hideAuto: "Runs on your workstation — data never leaves",
        script: "Local (dependent on your custom infrastructure)",
        saas: "Uploads session cookies and data to cloud servers",
        isHighlight: true,
      },
      {
        feature: "Standalone .EXE Packaging",
        hideAuto: "1-click export for colleagues to run without installation",
        script: "Requires installing Node.js, npm, and dependencies",
        saas: "Requires inviting users and paying extra seat fees",
      },
    ],
  },
  pricing: {
    eyebrow: "TRANSPARENT & FREE BETA",
    title: "Free for the whole beta.",
    description:
      "We are focused on community feedback to refine the core engine and Critic. All advanced features are fully unlocked without charge.",
    planName: "BETA UNLIMITED",
    planPrice: "$0",
    planSub: "Unrestricted access throughout the beta testing window",
    features: [
      "Unlimited workflows and canvas nodes",
      "Full access to Critic Static Analyzer with all 42 rules",
      "Unlimited parallel profile execution (limited only by your RAM)",
      "Unlimited commit history and revision rollback",
      "Export standalone .exe application binaries",
      "Priority early access to patches and feature updates",
    ],
    cta: "Get the beta now — Free",
    guarantee: "No credit card required · Zero cloud tracking · Direct install on Windows",
  },
  faq: {
    eyebrow: "QUESTIONS & ANSWERS",
    title: "Frequently asked questions",
    items: [
      {
        question: "Does HideAuto transmit my browsing data or credentials to external servers?",
        answer:
          "Absolutely not. HideAuto strictly follows a 100% local-first principle. Workflows, session cookies, anti-detect profiles, and output artifacts are stored on your local disk in standard SQLite and JSON formats. There is zero telemetry capturing sensitive data.",
      },
      {
        question: "What is Critic and how does it work?",
        answer:
          "Critic is an integrated static graph analyzer tailored for browser automation. As you construct workflows, Critic checks for brittle selectors, missing error handlers, or bot-like mouse/keyboard cadences, outputting a safety score from 0 to 100. A score of 85 or above is required before execution.",
      },
      {
        question: "What hardware specifications are recommended to run HideAuto?",
        answer:
          "HideAuto requires Windows 10 or Windows 11 (64-bit). For modest workloads (1-5 profiles), 8GB of RAM and an Intel Core i3 or Ryzen 3 CPU are sufficient. To run dozens or hundreds of concurrent profiles, 16GB to 64GB of RAM with an SSD is recommended.",
      },
      {
        question: "Can I assign dedicated proxies to individual profiles?",
        answer:
          "Yes. You can assign unique HTTP/SOCKS5 proxies to each browser profile, or configure automated proxy rotation within workflow nodes.",
      },
      {
        question: "Will my workflows remain accessible once the beta period concludes?",
        answer:
          "Yes. All workflow files and databases remain exclusively on your local computer. You retain permanent ownership to open, run, and export your data without dependency on our servers.",
      },
      {
        question: "How does the standalone .exe export work?",
        answer:
          "HideAuto features an Export Standalone App capability. Select your workflow and click Export; the system packages a self-contained .exe with a streamlined launcher so teammates can execute tasks with 1-click and zero setup.",
      },
    ],
  },
  downloads: {
    eyebrow: "GET STARTED",
    title: "Build your first flow, let Critic review it, then run 300 profiles.",
    description:
      "Download the HideAuto desktop package for Windows x64. Free and unlimited usage throughout the beta period.",
    version: "v0.8.4-beta",
    os: "Windows 10 / 11 (64-bit)",
    installerName: "HideAuto-Setup-0.8.4.exe",
    installerSize: "84.2 MB",
    portableName: "HideAuto-0.8.4-portable.zip",
    portableSize: "92.5 MB",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    ctaDownload: "Download Installer (.exe)",
    ctaPortable: "Download Portable (.zip)",
    betaSignup: {
      title: "Stay updated on new releases",
      description: "Subscribe to receive release notes, security patches, and early invites to community workshops.",
      placeholder: "Enter your email address...",
      buttonText: "Subscribe",
      successMessage: "Your email has been recorded! We'll keep you posted on upcoming builds.",
    },
  },
  footer: {
    description: "Local-first browser automation platform with a purpose-built Critic quality gate.",
    navigationLabel: "Navigation",
    localeLabel: "Language",
    copyright: "© 2026 HideAuto. All rights reserved.",
    disclaimer: "HideAuto runs locally on user hardware. No browsing session data is stored or processed on external cloud infrastructure.",
  },
};
