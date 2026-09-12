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
    download: "Get the Beta",
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
    drivesLabel: "Drives",
    drives: [
      { name: "Hidemium" },
      { name: "GPM-Login" },
      { name: "AdsPower" },
      { name: "Chromium", tag: "built-in" },
      { name: "Firefox", tag: "built-in" },
      { name: "CDP", tag: "external" },
    ],
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
    eyebrow: "The operating loop",
    heading: "Build · review · run at scale · commit.",
    subhead:
      "The four things you do every day, in one app that runs locally. No browser tabs, no loose scripts, no point where data leaves your machine.",
    steps: [
      {
        number: "01",
        tag: "Canvas & nodes",
        title: "Eight node groups, one infinite canvas",
        description:
          "Drag a node from the palette and wire it through two output ports — success and error. Branch with IF / IF-ELSE / Element exists, repeat with Loop, halt with Stop. Variables travel through everything in double-brace syntax.",
        bullets: [
          "Selectors by id / css / xpath, through shadow DOM and iframes",
          "Human-like mouse paths and find-by-image where selectors cannot reach",
          "Undo/redo, copy node clusters, alignment, an outline in run order",
          "Need code? Run JS, HTTP request and Run command nodes sit right in the flow",
        ],
      },
      {
        number: "02",
        tag: "Critic & gate",
        title: "Critic reads the flow before the flow touches production",
        description:
          "Seven static rules run on the exact graph the runner will execute — no model calls, so the same flow always scores the same. Findings pin onto the node and into the Problems table in the bottom dock.",
        bullets: [
          "Score 0–100, threshold 85 by default, adjustable",
          "A single error-level finding blocks, whatever the score",
          "Two rules carry an Apply auto-fix; the rest need your judgement",
          "A waiver needs a reason and is recorded — a human decides, not an agent",
        ],
      },
      {
        number: "03",
        tag: "Profiles, schedule & scale",
        title: "Hundreds of profiles, running on schedule",
        description:
          "Every profile is an isolated browser identity: its own fingerprint (UA, WebGL, canvas, fonts, media devices), its own proxy, its own storage. Pick the profiles, set maxConcurrency, let the engine handle the rest.",
        bullets: [
          "A Profiles screen: filter, search, paginate, bulk open/close",
          "Cron schedules, batches with progress, a worklog per profile",
          "Proxy check before the run — IP, country, latency",
          "Power cut, app closed: schedules recover on next launch",
        ],
      },
      {
        number: "04",
        tag: "History & git",
        title: "Workflows have a history, not just a latest version",
        description:
          "Every workflow is a file on disk, committed with real git. Read the diff as a graph — which nodes were added, changed, removed — or as text. Configure an origin and you get backup, pull, and a conflict-resolution screen.",
        bullets: [
          "A badge on the nav rail counts uncommitted workflows",
          "A History tab in the bottom dock — read commits while you edit",
          "Someone edits the file outside the app: a dialog asks before overwriting",
          "In-session undo/redo is one thing; a commit is another",
        ],
      },
      {
        number: "05",
        tag: "Data, files & packaging",
        title: "Data in, data out, then its own app",
        description:
          "Read and write Excel and Google Sheets, read files, write txt/csv/json, send and read mail, pull 2FA codes, call any HTTP API mid-flow. Then package the whole workflow into a standalone .exe — custom icon, encrypted, with a sha256 to verify.",
        bullets: [
          "Global variables get their own screen — edit once, every flow follows",
          "Per-step JSONL logs, tailed live while the run happens",
          "The Critic gate is a pipeline step in the build — it can block",
          "A self-updating launcher — no manual re-download each build",
        ],
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
    eyebrow: "Why a gate",
    title: "Automation bugs do not show up in your test run.\nThey show up on profile 217.",
    description:
      "A positional selector, an empty error port, a delay hand-set to zero — a single test run shows none of it. Three hundred scheduled profiles at 2am show all of it, and by then the data is already wrong.",
    pillars: [
      {
        id: "resilience",
        label: "resilience",
        description: "Running once does not mean running twice.",
      },
      {
        id: "anti-detect",
        label: "anti-detect",
        description: "Machine traces: cadence, ordering, dwell time.",
      },
      {
        id: "data-safety",
        label: "data-safety",
        description: "Losing data, or reporting success when it actually broke.",
      },
      {
        id: "cost",
        label: "cost",
        description: "Money and time: redundant calls, writes, runs.",
      },
    ],
    scoreRules: {
      title: "How the score works",
      maxLabel: "max",
      maxValue: "100",
      rules: [
        {
          level: "error",
          label: "error",
          deduction: "−15",
        },
        {
          level: "warn",
          label: "warn",
          deduction: "−5",
        },
        {
          level: "hint",
          label: "hint",
          deduction: "−1",
        },
      ],
      thresholdLabel: "threshold",
      thresholdValue: "85",
      explanationPrefix: "The score says where the flow stands. Shipping is blocked by the ",
      explanationHighlight: "count of errors",
      explanationSuffix: ", not by the score — so a real bug never slips through because the rest is too clean.",
    },
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
    eyebrow: "Product figures",
    placeholderTag: "[placeholder — awaiting real figures]",
    items: [
      {
        value: "79",
        label: "nodes with a real handler",
      },
      {
        value: "10.000",
        label: "step ceiling per run",
      },
      {
        value: "7",
        label: "Critic rules, 4 groups",
      },
      {
        value: "0",
        label: "bytes of workflow sent to a server",
      },
    ],
  },
  comparison: {
    eyebrow: "Compare",
    title: "A hand-written script works. By month two it does not.",
    description:
      "Not because the code is bad, but because nobody reviews it, nobody knows who changed what, and nothing tells you where run 217 stopped.",
    columns: ["", "HideAuto", "Hand-written script", "Generic automation tool"],
    rows: [
      {
        feature: "Visual building, no code required",
        hideAuto: "●",
        script: "—",
        saas: "●",
      },
      {
        feature: "Anti-detect profiles with their own fingerprint",
        hideAuto: "●",
        script: "roll your own",
        saas: "—",
      },
      {
        feature: "A gate that blocks the build while the flow has errors",
        hideAuto: "●",
        script: "—",
        saas: "—",
      },
      {
        feature: "Git commit & graph diff per flow",
        hideAuto: "●",
        script: "git, but the diff is text",
        saas: "—",
      },
      {
        feature: "Schedules + batches across profiles in parallel",
        hideAuto: "●",
        script: "cron + DIY",
        saas: "partial",
      },
      {
        feature: "Per-step logs that pinpoint where it stopped",
        hideAuto: "●",
        script: "console.log",
        saas: "partial",
      },
      {
        feature: "Package a flow as a .exe with sha256",
        hideAuto: "●",
        script: "—",
        saas: "—",
      },
      {
        feature: "Runs locally — data never leaves the machine",
        hideAuto: "●",
        script: "●",
        saas: "usually cloud",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Free for the whole beta.",
    description:
      "No workflow cap, no profile cap, no card. When real pricing lands, beta users hear it first — and everything you built is still a file on your own machine.",
    subNote:
      "This beta focuses on: workflows · critic · schedules · profiles · version control.\nThe AI workflow agent and command palette are switched off in this build.",
    planName: "Beta",
    planPrice: "0",
    priceUnit: "đ",
    planSub: "/ month, during the beta",
    features: [
      "Unlimited workflows & profiles",
      "Critic, the gate and the Problems table",
      "Schedules & parallel batches",
      "Version control & graph diff",
      "Package workflows as .exe",
    ],
    cta: "Download the beta",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked",
    description: "Anything else, just ask — the beta moves fast.",
    items: [
      {
        question: "Do I need to know how to code?",
        answer:
          "No. Everything is built by dragging and connecting nodes. When you need to go further there are Run JS, HTTP request and Run command nodes for your own logic — but that is an option, not a requirement.",
      },
      {
        question: "Does Critic call an AI? Does it cost tokens?",
        answer:
          "No. Critic v1 is a static lint over the graph, running on your machine — no model calls, no tokens, nothing sent anywhere. That is why the same flow always gets the same score.",
      },
      {
        question: "Will the gate block me when I know what I am doing?",
        answer:
          "You can waive a finding, but it needs a reason and gets recorded. You can also mute a rule for that flow entirely. The common thread: a human grants the waiver, not an agent.",
      },
      {
        question: "Which browsers can it drive?",
        answer:
          "Hidemium, GPM-Login and AdsPower through dedicated providers, or the Chromium and Firefox that ship inside the app. Other anti-detect browsers connect over CDP.",
      },
      {
        question: "Where do my workflows live?",
        answer:
          "On your machine: flow content is a file on disk, the list and schedules sit in an encrypted local SQLite. Want an off-machine copy? Configure a git origin yourself — no step ever requires sending anything to a server.",
      },
      {
        question: "Which platforms are supported?",
        answer:
          "The beta runs on Windows, installed through a self-updating launcher so you never re-download a build by hand. The interface is bilingual Vietnamese / English, switchable in-app.",
      },
    ],
  },
  downloads: {
    eyebrow: "GET STARTED",
    title: "Build your first flow, let Critic review it, then run 300 profiles.",
    description:
      "Free during the beta. Runs locally on Windows. No card, no cloud account.",
    version: "v0.8.4-beta",
    os: "Windows 10 / 11 (64-bit)",
    installerName: "HideAuto-Setup-0.8.4.exe",
    installerSize: "84.2 MB",
    portableName: "HideAuto-0.8.4-portable.zip",
    portableSize: "92.5 MB",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    ctaDownload: "Download HideAuto for Windows",
    ctaPortable: "Download Portable (.zip)",
    ctaReview: "Review the features",
    subNote: "Self-updating launcher · Bilingual VI / EN · Your data stays local",
    betaSignup: {
      title: "Stay updated on new releases",
      description: "Subscribe to receive release notes, security patches, and early invites to community workshops.",
      placeholder: "Enter your email address...",
      buttonText: "Subscribe",
      successMessage: "Your email has been recorded! We'll keep you posted on upcoming builds.",
    },
  },
  footer: {
    description: "Visual browser automation that runs locally, with a gate before you ship.",
    navigationLabel: "Navigation",
    localeLabel: "Language",
    productLabel: "Product",
    resourcesLabel: "Resources",
    copyright: "© 2026 HideAuto",
    disclaimer: "HideAuto runs locally on user hardware. No browsing session data is stored or processed on external cloud infrastructure.",
    note: "Beta · copy derived from the current source",
  },
};
