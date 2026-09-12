import type { LandingContent } from "./content.types";

export const viContent: LandingContent = {
  locale: "vi",
  siteName: "HideAuto",
  navigation: {
    features: "Tính năng",
    critic: "Critic",
    compare: "So sánh",
    pricing: "Giá",
    faq: "FAQ",
    download: "Tải bản beta",
  },
  hero: {
    eyebrow: "BETA · WINDOWS · CHẠY CỤC BỘ, DỮ LIỆU Ở LẠI MÁY BẠN",
    titlePrefix: "Automation trình duyệt có ",
    titleAccent: "cửa kiểm",
    titleSuffix: " trước khi chạy thật.",
    description:
      "Kéo-thả node thành workflow, chạy song song trên hàng trăm profile anti-detect. Trước khi ship, Critic soát cả flow, chấm điểm và chặn build nếu còn lỗi — không phải phát hiện lúc 300 profile đã chạy sai.",
    ctaPrimary: "Tải bản beta — miễn phí",
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
      title: "Bảng thông số kỹ thuật cốt lõi",
      items: [
        {
          label: "Kiến trúc Engine",
          value: "Local-First Native (Windows x64)",
          detail: "Xây dựng trên nền Chromium hardened, không dùng container cồng kềnh, tiêu thụ ít hơn 40% RAM.",
        },
        {
          label: "Fingerprint Anti-detect",
          value: "Hardware & Canvas Masking",
          detail: "Tách biệt độc lập WebGL, AudioContext, Canvas, Fonts và WebRTC trên từng profile riêng biệt.",
        },
        {
          label: "Cơ chế Critic Gate",
          value: "Static Graph Analysis",
          detail: "Quét 42 luật an toàn tĩnh, mô phỏng rủi ro DOM mutation và phát hiện nghẽn mạng trước khi chạy.",
        },
        {
          label: "Lưu trữ & Bảo mật",
          value: "100% Cục bộ (SQLite & JSON)",
          detail: "Không có telemetry gửi cookies hay flows lên cloud. Toàn bộ credential được mã hóa bằng DPAPI.",
        },
      ],
    },
    gate: {
      score: 92,
      verdict: "BUILD APPROVED — READY FOR PRODUCTION",
      summary: "Đã vượt qua 42/42 quy tắc an toàn. Ngưỡng phê duyệt tối thiểu: 85 điểm.",
      rules: [
        {
          id: "RES-01",
          name: "Độ bền Selector DOM",
          status: "pass",
          message: "Tất cả các phần tử click/type đều có selector bền vững, không phụ thuộc class sinh tự động.",
        },
        {
          id: "ANT-03",
          name: "Mô phỏng hành vi người dùng",
          status: "pass",
          message: "Đã kích hoạt bezier mouse trajectory và jitter ngẫu nhiên 30-140ms khi nhập văn bản.",
        },
        {
          id: "DAT-02",
          name: "Bảo vệ thông tin đăng nhập",
          status: "pass",
          message: "Biến môi trường và cookie được mã hóa cục bộ, không xuất ra log console hay plain text.",
        },
        {
          id: "RAT-04",
          name: "Kiểm soát nhịp độ Request",
          status: "warn",
          message: "Phát hiện 2 node vòng lặp liên tiếp có khoảng nghỉ < 500ms; đề xuất thêm backoff jitter.",
        },
      ],
    },
  },
  platforms: {
    drivesLabel: "Điều khiển được",
    drives: [
      { name: "Hidemium" },
      { name: "GPM-Login" },
      { name: "AdsPower" },
      { name: "Chromium", tag: "built-in" },
      { name: "Firefox", tag: "built-in" },
      { name: "CDP", tag: "external" },
    ],
    title: "Nền tảng công nghệ sẵn sàng cho quy mô lớn",
    items: [
      {
        icon: "monitor",
        title: "Windows 10 / 11 Native",
        description: "Tối ưu hóa x64 & ARM64 với hiệu năng cao, không cần Docker hay WSL.",
      },
      {
        icon: "shield-check",
        title: "Chromium Hardened",
        description: "Cô lập fingerprint từng profile: WebGL, Canvas, Audio, WebRTC, Timezone.",
      },
      {
        icon: "hard-drive",
        title: "100% Chạy Cục Bộ",
        description: "Dữ liệu ở lại máy bạn. Không gửi flow, cookie hay log thực thi lên server bên ngoài.",
      },
      {
        icon: "database",
        title: "Lưu trữ SQLite & JSON",
        description: "Toàn quyền sở hữu dữ liệu, dễ dàng backup, versioning bằng git và chuyển đổi máy.",
      },
    ],
  },
  overview: {
    eyebrow: "Vòng lặp vận hành",
    heading: "Dựng · soát · chạy hàng loạt · commit.",
    subhead:
      "Bốn việc bạn làm mỗi ngày, trong một app chạy cục bộ. Không tab trình duyệt, không script rời, không chỗ nào dữ liệu rời khỏi máy.",
    steps: [
      {
        number: "01",
        tag: "Canvas & node",
        title: "Tám nhóm node, một canvas vô hạn",
        description:
          "Kéo node từ palette, nối bằng hai cổng ra — success và error. Rẽ nhánh với IF / IF-ELSE / Element exists, lặp với Loop, dừng với Stop. Biến dùng chung xuyên suốt bằng cú pháp hai ngoặc nhọn.",
        bullets: [
          "Selector theo id / css / xpath, xuyên shadow DOM và iframe",
          "Chuột human-like và find-by-image cho chỗ selector không tới được",
          "Undo/redo, copy cụm node, canh hàng, dàn bài theo thứ tự chạy",
          "Cần code? Node Run JS, HTTP request và Run command nằm ngay trong flow",
        ],
      },
      {
        number: "02",
        tag: "Critic & gate",
        title: "Critic đọc flow trước khi flow chạm production",
        description:
          "Bảy rule tĩnh chạy trên chính graph mà runner sẽ thực thi — không gọi model, nên cùng một flow luôn cho cùng một kết quả. Finding gắn thẳng lên node và lên bảng Problems ở dock đáy.",
        bullets: [
          "Điểm 0–100, ngưỡng mặc định 85, chỉnh được",
          "Một finding mức error là chặn, bất kể điểm còn lại",
          "Hai rule có nút Apply sửa tự động; còn lại cần bạn quyết",
          "Miễn trừ phải kèm lý do và được ghi lại — người quyết, không phải agent",
        ],
      },
      {
        number: "03",
        tag: "Profile, lịch & quy mô",
        title: "Hàng trăm profile, chạy theo lịch",
        description:
          "Mỗi profile là một danh tính trình duyệt độc lập: fingerprint riêng (UA, WebGL, canvas, font, media device), proxy riêng, bộ nhớ riêng. Chọn profile, đặt maxConcurrency, để engine lo phần còn lại.",
        bullets: [
          "Màn Profiles: lọc, tìm, phân trang, mở/đóng hàng loạt",
          "Lịch cron, batch có tiến độ, worklog từng profile",
          "Kiểm proxy trước khi chạy — IP, quốc gia, độ trễ",
          "Mất điện, đóng app: lịch được khôi phục khi mở lại",
        ],
      },
      {
        number: "04",
        tag: "Lịch sử & git",
        title: "Workflow có lịch sử, không chỉ có bản mới nhất",
        description:
          "Mỗi workflow là một file trên đĩa, commit bằng git thật. Xem diff dưới dạng graph (node nào thêm, sửa, xoá) hoặc dạng text. Cấu hình origin thì backup và pull được, có màn giải quyết xung đột.",
        bullets: [
          "Badge số workflow chưa commit ngay trên thanh điều hướng",
          "Tab Lịch sử ở dock đáy — xem commit ngay trong lúc sửa",
          "Ai đó sửa file ngoài app: hộp thoại hỏi trước khi ghi đè",
          "Undo/redo trong phiên là một chuyện; commit là chuyện khác",
        ],
      },
      {
        number: "05",
        tag: "Dữ liệu, file & đóng gói",
        title: "Dữ liệu vào, dữ liệu ra, rồi thành app riêng",
        description:
          "Đọc/ghi Excel và Google Sheets, đọc file, ghi txt/csv/json, gửi và đọc mail, lấy mã 2FA, gọi HTTP API giữa flow. Xong rồi đóng gói cả workflow thành một .exe độc lập, đổi icon, mã hoá, có sha256 để đối chiếu.",
        bullets: [
          "Biến toàn cục có màn riêng — sửa một chỗ, mọi flow theo",
          "Log JSONL từng bước, tail được ngay trong lúc chạy",
          "Cửa Critic là một bước trong pipeline build — chặn được",
          "Launcher tự cập nhật, không phải tải lại tay từng bản",
        ],
      },
    ],
    nodeGroupsHeading: "8 Nhóm Node Toàn Diện",
    nodeGroupsSubhead: "Được thiết kế chuẩn hóa cho mọi thao tác tự động hóa từ cơ bản đến nâng cao.",
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
    eyebrow: "Vì sao cần cửa kiểm",
    title: "Lỗi automation không hiện lúc bạn test.\nNó hiện ở profile thứ 217.",
    description:
      "Một selector bám vị trí, một cổng error để trống, một ô delay bị đặt về 0 — chạy thử một lượt thì không thấy gì. Chạy 300 profile theo lịch lúc 2 giờ sáng thì thấy hết, và lúc đó dữ liệu đã sai rồi.",
    pillars: [
      {
        id: "resilience",
        label: "resilience",
        description: "Chạy được một lần không có nghĩa là chạy được lần thứ hai.",
      },
      {
        id: "anti-detect",
        label: "anti-detect",
        description: "Dấu vết máy móc: nhịp truy cập, thứ tự, thời gian dừng.",
      },
      {
        id: "data-safety",
        label: "data-safety",
        description: "Mất dữ liệu, hoặc báo thành công khi thật ra đã hỏng.",
      },
      {
        id: "cost",
        label: "cost",
        description: "Tiền và thời gian: gọi thừa, ghi thừa, chạy thừa.",
      },
    ],
    scoreRules: {
      title: "Cách tính điểm",
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
      explanationPrefix: "Điểm nói flow đang ở đâu. Chặn ship là do ",
      explanationHighlight: "đếm lỗi error",
      explanationSuffix: ", không do điểm — nên một lỗi thật không lọt chỉ vì phần còn lại quá sạch.",
    },
    scoreThresholdText: "Ngưỡng tối thiểu để duyệt ship flow:",
    scoreThresholdValue: 85,
    categories: [
      {
        id: "resilience",
        name: "Độ Bền (Resilience)",
        description: "Phát hiện selector phụ thuộc vị trí DOM tuyệt đối (/div[3]/span), thiếu fallback khi giao diện web thay đổi nhẹ, hoặc thiếu cơ chế retry khi mạng trễ.",
        riskExample: "Selector `div.css-19v8 > div > button` đổi class hash trên bản cập nhật trang đích.",
      },
      {
        id: "anti-detect",
        name: "Ẩn Danh (Anti-Detect)",
        description: "Bắt các hành vi bot dễ nhận diện: gõ phím với tốc độ đều tăm tắp, chuyển động chuột đi đường thẳng tuyệt đối, hoặc dùng chung canvas fingerprint trên nhiều tài khoản.",
        riskExample: "Nhập mật khẩu trong 12ms kích hoạt ngay hệ thống bot protection của Cloudflare / Akamai.",
      },
      {
        id: "data-safety",
        name: "An Toàn Dữ Liệu",
        description: "Cảnh báo thao tác ghi đè file đích mà không kiểm tra, thiếu validate schema dữ liệu đầu vào, hoặc nguy cơ để lộ token/password dạng plain text trong log.",
        riskExample: "Ghi đè file `customers.csv` rỗng khi bước trích xuất dữ liệu trả về mảng rỗng do lỗi mạng.",
      },
      {
        id: "rate-limits",
        name: "Kiểm Soát Tần Suất",
        description: "Phát hiện vòng lặp vô tận, thiếu khoảng nghỉ (backoff delay) giữa các request liên tiếp, nguy cơ làm nghẽn server và gây ban dải IP proxy.",
        riskExample: "Gửi 120 request GET/phút trên cùng 1 IP dân cư gây đưa IP vào danh sách đen.",
      },
    ],
    liveDemo: {
      title: "Mô phỏng phát hiện lỗi tự động của Critic",
      status: "BLOCKED BY CRITIC (Score: 68/100)",
      targetProfile: "Profile #217 (Batch Run Simulation)",
      caughtError: "Phát hiện selector `//div[@id='btn-wrap']/button` bị mất khi website render trễ trên proxy có ping cao. Thiếu cấu hình retry + timeout dự phòng.",
      fixSuggestion: "Đề xuất sửa: Thay bằng CSS selector tương đối `button[data-action='submit']` và thêm node Retry Policy (tối đa 3 lần, delay 1.5s).",
    },
  },
  stats: {
    eyebrow: "Số liệu sản phẩm",
    placeholderTag: "[chỗ trống — chờ số thật]",
    items: [
      {
        value: "79",
        label: "node có handler thật",
      },
      {
        value: "10.000",
        label: "bước tối đa mỗi lượt chạy",
      },
      {
        value: "7",
        label: "rule Critic, 4 nhóm",
      },
      {
        value: "0",
        label: "byte workflow gửi lên server",
      },
    ],
  },
  comparison: {
    eyebrow: "So sánh",
    title: "Script tự viết chạy được. Đến tháng thứ hai thì không.",
    description:
      "Không phải vì code tệ, mà vì không ai soát nó, không ai biết ai sửa gì, và không có chỗ nào cho biết lượt chạy thứ 217 đã dừng ở đâu.",
    columns: ["", "HideAuto", "Script tự viết", "Công cụ automation phổ thông"],
    rows: [
      {
        feature: "Dựng trực quan, không cần code",
        hideAuto: "●",
        script: "—",
        saas: "●",
      },
      {
        feature: "Profile anti-detect có fingerprint riêng",
        hideAuto: "●",
        script: "tự lo",
        saas: "—",
      },
      {
        feature: "Cửa kiểm chặn build khi flow còn lỗi",
        hideAuto: "●",
        script: "—",
        saas: "—",
      },
      {
        feature: "Git commit & diff dạng graph cho từng flow",
        hideAuto: "●",
        script: "git, nhưng diff là text",
        saas: "—",
      },
      {
        feature: "Lịch chạy + batch nhiều profile song song",
        hideAuto: "●",
        script: "cron + tự viết",
        saas: "một phần",
      },
      {
        feature: "Log từng bước, chỉ ra chính xác chỗ dừng",
        hideAuto: "●",
        script: "console.log",
        saas: "một phần",
      },
      {
        feature: "Đóng gói flow thành .exe có sha256",
        hideAuto: "●",
        script: "—",
        saas: "—",
      },
      {
        feature: "Chạy cục bộ — dữ liệu không rời khỏi máy",
        hideAuto: "●",
        script: "●",
        saas: "thường là cloud",
      },
    ],
  },
  pricing: {
    eyebrow: "Giá",
    title: "Miễn phí trong suốt beta.",
    description:
      "Không giới hạn workflow, không giới hạn profile, không cần thẻ. Khi có bảng giá chính thức, người dùng beta được báo trước — và những gì bạn đã dựng vẫn là file trên máy bạn.",
    subNote:
      "Bản beta hiện tại tập trung vào: workflow · Critic · lịch chạy · profile · version control.\nAI agent dựng workflow và command palette đang tắt trong bản này.",
    planName: "Beta",
    planPrice: "0",
    priceUnit: "đ",
    planSub: "/ tháng, trong giai đoạn beta",
    features: [
      "Không giới hạn workflow & profile",
      "Critic, gate và bảng Problems",
      "Lịch chạy & batch song song",
      "Version control & graph diff",
      "Đóng gói workflow thành .exe",
    ],
    cta: "Tải bản beta",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Câu hỏi thường gặp",
    description: "Còn thắc mắc gì khác, hỏi trực tiếp — bản beta thay đổi nhanh.",
    items: [
      {
        question: "Tôi có cần biết code không?",
        answer:
          "Không. Mọi thứ dựng bằng cách kéo-thả và nối node. Khi cần đi xa hơn, có node Run JS, HTTP request và Run command để chèn logic riêng — nhưng đó là lựa chọn, không phải điều kiện.",
      },
      {
        question: "Critic có gọi AI không? Có tốn tiền token?",
        answer:
          "Không. Critic v1 là bộ lint tĩnh chạy trên graph, ngay trên máy bạn — không gọi model nào, không tốn token, không gửi flow đi đâu. Vì thế cùng một flow luôn cho cùng một điểm.",
      },
      {
        question: "Cửa kiểm có chặn tôi lại khi tôi biết rõ mình đang làm gì?",
        answer:
          "Miễn trừ được, nhưng phải kèm lý do và được ghi lại. Tắt hẳn một rule cho flow đó cũng được. Điểm chung: người quyết định miễn trừ, không phải agent nào.",
      },
      {
        question: "Điều khiển được trình duyệt nào?",
        answer:
          "Hidemium, GPM-Login và AdsPower qua provider riêng, hoặc Chromium và Firefox tích hợp sẵn trong app. Trình duyệt anti-detect khác thì kết nối qua CDP.",
      },
      {
        question: "Workflow của tôi lưu ở đâu?",
        answer:
          "Trên máy bạn: nội dung flow là file trên đĩa, danh sách và lịch nằm trong SQLite mã hoá cùng máy. Muốn có bản sao ngoài thì tự cấu hình origin git — không có bước nào bắt buộc gửi lên server.",
      },
      {
        question: "Chạy được trên nền tảng nào?",
        answer:
          "Bản beta chạy trên Windows, cài qua launcher tự cập nhật nên không phải tải tay từng bản mới. Giao diện song ngữ Việt / Anh, đổi ngay trong app.",
      },
    ],
  },
  downloads: {
    eyebrow: "BẮT ĐẦU NGAY",
    title: "Dựng flow đầu tiên, để Critic soát, rồi chạy 300 profile.",
    description:
      "Miễn phí trong beta. Chạy cục bộ trên Windows. Không cần thẻ, không cần tài khoản cloud.",
    version: "v0.8.4-beta",
    os: "Windows 10 / 11 (64-bit)",
    installerName: "HideAuto-Setup-0.8.4.exe",
    installerSize: "84.2 MB",
    portableName: "HideAuto-0.8.4-portable.zip",
    portableSize: "92.5 MB",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    ctaDownload: "Tải HideAuto cho Windows",
    ctaPortable: "Tải bản Portable (.zip)",
    ctaReview: "Xem lại tính năng",
    subNote: "Launcher tự cập nhật · Song ngữ VI / EN · Dữ liệu ở lại máy bạn",
    betaSignup: {
      title: "Nhận thông báo khi có bản cập nhật mới",
      description: "Đăng ký email để nhận thông tin về các bản vá, tính năng mới và lời mời tham gia cộng đồng kín.",
      placeholder: "Nhập địa chỉ email của bạn...",
      buttonText: "Đăng ký nhận tin",
      successMessage: "Đã ghi nhận email của bạn! Chúng tôi sẽ gửi thông báo bản cập nhật sớm nhất.",
    },
  },
  footer: {
    description: "Automation trình duyệt trực quan, chạy cục bộ, có cửa kiểm trước khi ship.",
    navigationLabel: "Điều hướng",
    localeLabel: "Ngôn ngữ",
    productLabel: "Sản phẩm",
    resourcesLabel: "Tài nguyên",
    copyright: "© 2026 HideAuto",
    disclaimer: "HideAuto là phần mềm chạy cục bộ trên máy người dùng, không lưu trữ hay xử lý dữ liệu trình duyệt trên đám mây.",
    note: "Bản beta · nội dung dựng từ source hiện tại",
  },
};
