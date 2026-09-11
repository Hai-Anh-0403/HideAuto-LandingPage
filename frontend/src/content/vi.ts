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
    items: [
      {
        value: "300+",
        label: "Profile song song ổn định",
        sub: "Tối ưu hóa RAM, không rò rỉ bộ nhớ",
      },
      {
        value: "< 120ms",
        label: "Độ trễ xử lý mỗi bước",
        sub: "Engine native phản hồi tức thì",
      },
      {
        value: "0 MB",
        label: "Dữ liệu gửi lên cloud",
        sub: "Tuân thủ nghiêm ngặt chuẩn local-first",
      },
      {
        value: "85+",
        label: "Điểm Critic bắt buộc",
        sub: "Đảm bảo chất lượng trước khi bấm Run",
      },
    ],
  },
  comparison: {
    eyebrow: "SO SÁNH CÔNG NGHỆ",
    title: "Script tự viết chạy được. Đến tháng thứ hai thì không.",
    description:
      "Bảng so sánh đối chiếu giữa HideAuto và các giải pháp tự động hóa trình duyệt thông thường trên thị trường.",
    columns: ["Tính năng & Khía cạnh", "HideAuto", "Script Puppeteer / Playwright", "SaaS No-code thông thường"],
    rows: [
      {
        feature: "Canvas trực quan & 8 nhóm node",
        hideAuto: "Có sẵn, kéo thả mượt mà kèm biểu thức JS",
        script: "Không, phải viết mã lệnh và setup môi trường",
        saas: "Có, nhưng giới hạn logic và bị gò bó",
        isHighlight: true,
      },
      {
        feature: "Cửa kiểm soát tĩnh Critic (Gate)",
        hideAuto: "Chấm điểm 4 trụ cột, chặn lỗi trước khi bấm Run",
        script: "Không có, phải tự test thủ công từng profile",
        saas: "Không có, chạy xong mới phát hiện lỗi",
        isHighlight: true,
      },
      {
        feature: "Quản lý Profile Anti-detect",
        hideAuto: "Tích hợp sẵn hàng trăm profile, cô lập tuyệt đối",
        script: "Phải tự tìm mua và tích hợp thư viện ngoài",
        saas: "Tính phí thêm theo profile rất đắt đỏ",
      },
      {
        feature: "Lịch sử thay đổi & Visual Diff",
        hideAuto: "Lưu commit nội bộ, so sánh đồ thị trực quan",
        script: "Dùng git code thuần, khó hình dung đồ thị",
        saas: "Chỉ lưu bản mới nhất, không có diff",
      },
      {
        feature: "Bảo mật & Quyền riêng tư",
        hideAuto: "100% Cục bộ — dữ liệu ở lại trên máy bạn",
        script: "Cục bộ (tùy thuộc cách bạn cấu hình)",
        saas: "Lưu flow và cookies trên cloud bên thứ ba",
        isHighlight: true,
      },
      {
        feature: "Đóng gói file .exe độc lập",
        hideAuto: "Xuất 1-click cho đồng đội chạy ngay không cần cài đặt",
        script: "Phải cài Node.js, npm, dependencies phức tạp",
        saas: "Phải tạo thêm tài khoản và mua thêm user seat",
      },
    ],
  },
  pricing: {
    eyebrow: "MINH BẠCH & MIỄN PHÍ BETA",
    title: "Miễn phí trong suốt beta.",
    description:
      "Chúng tôi tập trung lắng nghe phản hồi của người dùng để hoàn thiện core engine và Critic. Toàn bộ tính năng cao cấp đều được mở khóa miễn phí.",
    planName: "BETA UNLIMITED",
    planPrice: "0₫",
    planSub: "Toàn quyền sử dụng trong suốt giai đoạn beta",
    features: [
      "Không giới hạn số lượng workflow & node trên canvas",
      "Toàn quyền sử dụng Critic Static Analyzer với 42 quy tắc",
      "Chạy song song không giới hạn profile (tùy thuộc RAM máy bạn)",
      "Lưu lịch sử thay đổi workflow không giới hạn số commit",
      "Đóng gói workflow thành file .exe chạy độc lập",
      "Nhận các bản cập nhật tính năng và vá lỗi sớm nhất",
    ],
    cta: "Tải bản beta ngay — Miễn phí",
    guarantee: "Không cần thẻ tín dụng · Không thu thập dữ liệu cá nhân · Cài đặt trực tiếp trên Windows",
  },
  faq: {
    eyebrow: "GIẢI ĐÁP",
    title: "Câu hỏi thường gặp",
    items: [
      {
        question: "HideAuto có gửi dữ liệu duyệt web của tôi lên server không?",
        answer:
          "Tuyệt đối không. HideAuto tuân thủ nguyên tắc local-first 100%. Mọi workflow, cookies, profile anti-detect và file kết quả đều được lưu trữ trực tiếp trên ổ cứng máy của bạn dưới định dạng SQLite và JSON chuẩn. Không có bất kỳ telemetry nào chứa dữ liệu nhạy cảm được gửi ra bên ngoài.",
      },
      {
        question: "Critic là gì và tại sao lại quan trọng?",
        answer:
          "Critic là công cụ phân tích tĩnh (static analyzer) tích hợp sẵn trong HideAuto. Khi bạn dựng flow, Critic sẽ quét toàn bộ cấu trúc đồ thị để tìm các lỗi tiềm ẩn như selector dễ vỡ, thiếu xử lý lỗi mạng, hoặc thao tác chuột/phím có nguy cơ bị phát hiện bot, sau đó chấm điểm từ 0 đến 100. Điểm đạt từ 85 trở lên mới được khuyến nghị bấm Run.",
      },
      {
        question: "Máy tính của tôi cần cấu hình như thế nào để chạy?",
        answer:
          "HideAuto hỗ trợ Windows 10 và Windows 11 (64-bit). Với tác vụ thông thường (1-5 profile), máy cần tối thiểu 8GB RAM và chip Intel Core i3 / Ryzen 3 trở lên. Để chạy song song hàng chục đến hàng trăm profile, khuyến nghị máy tính trang bị từ 16GB đến 64GB RAM và ổ cứng SSD.",
      },
      {
        question: "HideAuto có hỗ trợ proxy riêng cho từng profile không?",
        answer:
          "Có. Bạn có thể gán proxy HTTP/SOCKS5 riêng biệt cho từng profile trình duyệt, hoặc thiết lập danh sách proxy xoay vòng tự động trực tiếp trong các node của workflow.",
      },
      {
        question: "Sau khi hết giai đoạn beta, dữ liệu của tôi có bị mất không?",
        answer:
          "Không. Toàn bộ file workflow và dữ liệu lưu trên máy tính của bạn thuộc quyền sở hữu 100% của bạn. Bạn luôn có thể mở, chỉnh sửa và xuất dữ liệu mà không bị phụ thuộc vào bất kỳ máy chủ nào.",
      },
      {
        question: "Làm thế nào để đóng gói workflow thành file .exe cho người khác chạy?",
        answer:
          "HideAuto tích hợp tính năng Export Standalone App. Bạn chỉ cần chọn workflow và bấm Export, hệ thống sẽ tạo một file .exe độc lập kèm giao diện người dùng tối giản để người nhận chỉ cần bấm Chạy mà không cần biết cấu hình kỹ thuật.",
      },
    ],
  },
  downloads: {
    eyebrow: "BẮT ĐẦU NGAY",
    title: "Dựng flow đầu tiên, để Critic soát, rồi chạy 300 profile.",
    description:
      "Tải bản cài đặt HideAuto cho Windows x64. Miễn phí sử dụng không giới hạn trong thời gian thử nghiệm beta.",
    version: "v0.8.4-beta",
    os: "Windows 10 / 11 (64-bit)",
    installerName: "HideAuto-Setup-0.8.4.exe",
    installerSize: "84.2 MB",
    portableName: "HideAuto-0.8.4-portable.zip",
    portableSize: "92.5 MB",
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    ctaDownload: "Tải bản cài đặt (.exe)",
    ctaPortable: "Tải bản Portable (.zip)",
    betaSignup: {
      title: "Nhận thông báo khi có bản cập nhật mới",
      description: "Đăng ký email để nhận thông tin về các bản vá, tính năng mới và lời mời tham gia cộng đồng kín.",
      placeholder: "Nhập địa chỉ email của bạn...",
      buttonText: "Đăng ký nhận tin",
      successMessage: "Đã ghi nhận email của bạn! Chúng tôi sẽ gửi thông báo bản cập nhật sớm nhất.",
    },
  },
  footer: {
    description: "Nền tảng automation trình duyệt local-first với cửa kiểm Critic chuyên dụng.",
    navigationLabel: "Điều hướng",
    localeLabel: "Ngôn ngữ",
    copyright: "© 2026 HideAuto. Bảo lưu mọi quyền.",
    disclaimer: "HideAuto là phần mềm chạy cục bộ trên máy người dùng, không lưu trữ hay xử lý dữ liệu trình duyệt trên đám mây.",
  },
};
