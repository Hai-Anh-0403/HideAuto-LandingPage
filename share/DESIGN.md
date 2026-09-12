# Design Frontend — Landing Page (Dark Only)

> Tài liệu phong cách giao diện (Design System) dành riêng cho **Landing Page**.
> Lấy cảm hứng từ hệ thiết kế **"Industry"** — kỹ thuật, tối giản, chính xác, chuyên nghiệp.
>
> **Theme duy nhất: Dark Mode.** Không triển khai Light Mode, không có theme switch, không phụ thuộc theme của hệ điều hành.

---

## 1. Mục tiêu thiết kế

Landing page phải tạo cảm giác:

- **Technical / Industrial** — giống giao diện của một sản phẩm kỹ thuật cao cấp.
- **Premium nhưng tiết chế** — không dùng gradient rực, glassmorphism hoặc shadow dày.
- **Conversion-first** — nội dung, CTA và social proof phải nổi bật hơn trang trí.
- **Fast to scan** — người dùng hiểu sản phẩm, lợi ích và CTA chính trong vài giây đầu.
- **Dark native** — toàn bộ màu sắc, hình ảnh, border, hover và typography được thiết kế trực tiếp cho nền tối.

### Nguyên tắc cốt lõi

| Nguyên tắc | Mô tả |
|---|---|
| **Precision** | Mọi thành phần đều có mục đích, căn chỉnh rõ ràng, không trang trí thừa. |
| **Flat & Sharp** | Góc vuông (`border-radius: 0`) cho button, card, input và container. |
| **Monochrome Steel** | Một họ steel-blue làm accent chính trên nền graphite/black. |
| **Conversion-first** | Hero, proof, benefit và CTA được ưu tiên theo thứ tự thị giác. |
| **Blueprint aesthetic** | Dùng grid, hairline border, registration corner và nhãn mono để tạo cảm giác kỹ thuật. |
| **Data-backed** | Ưu tiên con số, thông số, kết quả, khách hàng, benchmark và proof thực tế. |
| **Controlled motion** | Animation ít, có chủ đích, phục vụ hierarchy thay vì trang trí. |

### Không sử dụng

- Light Mode hoặc theme switch.
- Gradient nhiều màu / rainbow gradient.
- Glassmorphism blur dày.
- Card bo tròn kiểu SaaS phổ thông.
- Shadow lớn cho card.
- Blob, wave, abstract decoration không liên quan.
- Quá nhiều màu semantic cùng lúc.
- Hero chứa quá nhiều CTA ngang hàng.
- Carousel tự chạy cho nội dung quan trọng.

---

## 2. Dark Theme Foundation

### 2.1 Steel Ramp

```css
--steel-100: #eef6ff;
--steel-200: #d6ebff;
--steel-300: #b5d9fd;
--steel-400: #94bce3;
--steel-500: #749dc4;
--steel-600: #597ea3;
--steel-700: #416180;
--steel-800: #2c455d;
--steel-900: #1d2d3d;
```

### 2.2 Dark Surfaces

```css
--surface-base:        #0b0d10; /* body / vùng tối nhất */
--surface-primary:     #101318; /* section chính */
--surface-secondary:   #161a20; /* card / navbar / feature */
--surface-tertiary:    #1d222a; /* hover / muted / input */
--surface-elevated:    #222832; /* popover / dropdown */
--surface-inset:       #080a0d; /* code / preview / visual frame */
```

### 2.3 Text

```css
--text-primary:        #f0f2f4;
--text-secondary:      #a3a8ae;
--text-tertiary:       #6f757d;
--text-inverse:        #0b0d10;
```

### 2.4 Brand & Semantic

```css
--brand-primary:       #7ba2ca;
--brand-hover:         #94bce3;
--brand-strong:        #b5d9fd;
--brand-tint:          rgba(123, 162, 202, 0.12);
--brand-tint-strong:   rgba(123, 162, 202, 0.20);
--brand-tint-text:     #b5d9fd;

--success:             #7ba2ca;
--danger:              #d98d86;
--warning:             #b09a72;
--info:                #a8c3dc;
```

### 2.5 Border

```css
--border-subtle:       rgba(255, 255, 255, 0.08);
--border-default:      rgba(255, 255, 255, 0.11);
--border-emphasis:     rgba(255, 255, 255, 0.17);
--border-brand:        rgba(123, 162, 202, 0.55);
--border-width:        1px;
--border-hairline:     0.5px;
```

### 2.6 Background treatment

Body mặc định:

```css
html {
  color-scheme: dark;
  background: var(--surface-base);
}

body {
  background: var(--surface-base);
  color: var(--text-primary);
}
```

Có thể dùng **technical grid rất nhẹ** cho Hero hoặc CTA:

```css
background-image:
  linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
background-size: 32px 32px;
```

Grid chỉ là texture nền. Không để độ tương phản cao hơn nội dung.

---

## 3. Typography

### 3.1 Font Stack

| Vai trò | Font | Fallback | Sử dụng |
|---|---|---|---|
| **Chính (Primary / Sans / Heading)** | `Barlow Condensed` | `"Barlow Condensed Fallback", "Barlow", "Barlow Fallback", sans-serif` | Toàn bộ dự án web: Header, Hero, tiêu đề H1-H6, nội dung body, mô tả, nút bấm, navigation |
| **Mono** | `JetBrains Mono` | `ui-monospace, "SF Mono", Menlo, monospace` | Eyebrow kỹ thuật, metric label, technical data, Critic scanner |

Stack chuẩn dự án:
```css
--font-sans: var(--font-barlow-condensed), "Barlow Condensed", "Barlow Condensed Fallback", var(--font-barlow), "Barlow", "Barlow Fallback", sans-serif;
--font-heading: var(--font-barlow-condensed), "Barlow Condensed", "Barlow Condensed Fallback", var(--font-barlow), "Barlow", "Barlow Fallback", sans-serif;
--font-mono: var(--font-jetbrains-mono), ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace;
```

### 3.2 Font Weight

```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

### 3.3 Landing Page Type Scale

```css
--text-display:        clamp(48px, 7vw, 88px);
--text-hero:           clamp(42px, 6vw, 72px);
--text-h1:             clamp(42px, 6vw, 72px);
--text-h2:             clamp(30px, 3.8vw, 48px); /* text-3xl sm:text-4xl lg:text-5xl chuẩn thống nhất cho tất cả các section */
--text-h3:             clamp(22px, 2.5vw, 28px);
--text-card-title:     18px;
--text-lead:           clamp(17px, 1.6vw, 20px);
--text-body:           15px;
--text-body-compact:   13px;
--text-label:          12px;
--text-caps:           10px;
--text-fine:           11px;
--text-kpi:            clamp(30px, 4vw, 48px);
--text-code:           12px;
```

### 3.4 Line Height & Tracking

```css
--leading-display: 0.94;
--leading-heading: 1.05;
--leading-body: 1.65;
--tracking-display: -0.035em;
--tracking-heading: -0.02em;
--tracking-caps: 0.12em;
```

### 3.5 Quy tắc typography

- Hero title dùng `Barlow Condensed`, weight `600–700`, line-height `0.94–1.0`.
- Không viết toàn bộ hero title bằng uppercase nếu câu dài.
- Section heading tối đa khoảng `10–12 từ`.
- Paragraph chính trong hero tối đa khoảng `2–3 dòng` trên desktop.
- Body không nhỏ hơn `14px`.
- Eyebrow / section label dùng mono uppercase, `10px`, tracking rộng.
- KPI dùng số lớn, label nhỏ mono.
- Chỉ highlight một cụm từ trong heading bằng `brand-primary` hoặc `brand-strong`.
- Không dùng nhiều weight và nhiều màu trong cùng một heading.

---

## 4. Layout System

### 4.1 Container

```css
--container-max: 1200px;
--container-wide: 1360px;
--container-padding-mobile: 20px;
--container-padding-tablet: 32px;
--container-padding-desktop: 48px;
```

Quy tắc:

```css
.landing-container {
  width: min(100% - 40px, 1200px);
  margin-inline: auto;
}
```

Desktop lớn có thể dùng `1360px` cho visual showcase, nhưng text chính vẫn giới hạn khoảng `1200px`.

### 4.2 Section Spacing

```css
--section-y-sm: 72px;
--section-y-md: 96px;
--section-y-lg: 128px;
--section-y-xl: 160px;
```

Khuyến nghị:

- Mobile: `72–88px`.
- Tablet: `88–112px`.
- Desktop: `112–144px`.
- Hero: tối thiểu `calc(100svh - navbar)` nếu nội dung phù hợp.
- CTA cuối trang có thể dùng `120–160px`.

### 4.3 Content Width

```css
--content-narrow:  620px;
--content-medium:  760px;
--content-wide:    960px;
```

- Paragraph dài không vượt quá `680–720px`.
- Hero text column thường `560–680px`.
- Centered section header thường tối đa `760px`.

### 4.4 Grid

```css
--grid-gap-sm: 12px;
--grid-gap-md: 18px;
--grid-gap-lg: 24px;
--grid-gap-xl: 32px;
```

Desktop:

- 12-column grid.
- Hero split: `5/7`, `6/6` hoặc `7/5`.
- Features: `3 x 1`, `2 x 2`, hoặc bento có logic.
- Metrics: `4 columns`.
- Testimonials: `3 columns`.
- Footer: `4–5 columns`.

---

## 5. Shape & Visual Language

### 5.1 Radius

```css
--radius-none: 0px;
--radius-pill: 9999px;
```

Quy tắc:

- Button: `0px`.
- Card: `0px`.
- Input: `0px`.
- Image frame: `0px`.
- Modal: `0px`.
- Badge / tag / status chip nhỏ: được phép `9999px`.

### 5.2 Blueprint Corners

Khung quan trọng như hero visual, pricing CTA, demo window hoặc featured card có thể dùng dấu registration (4 góc):

```text
┌─            ─┐
│              │
│   CONTENT    │
│              │
└─            ─┘
```

Dấu góc:

- Kích thước: `8–14px`.
- Màu chuẩn cho hiệu ứng ở 4 góc của các nút và section: `color-mix(in srgb, #e7e8ea 55%, transparent)` (hoặc `color-mix(in srgb, var(--steel-line, #e7e8ea) 55%, transparent)`).
- Không sử dụng cho mọi card.
- Tối đa `1–3` khung nổi bật trên một viewport.

### 5.3 Divider

Section divider:

```css
border-top: 1px solid var(--border-subtle);
```

Có thể thêm section index bên cạnh divider:

```text
01 / PRODUCT
02 / FEATURES
03 / PROOF
04 / CTA
```

---

## 6. Navbar

Navbar landing page thay cho app header/sidebar.

### 6.1 Desktop Navbar

```text
[LOGO]             Product  Features  Pricing  Docs       [Login] [PRIMARY CTA]
```

Style:

```css
height: 64px;
background: rgba(11, 13, 16, 0.88);
border-bottom: 1px solid var(--border-subtle);
backdrop-filter: blur(10px);
```

Quy tắc:

- Sticky ở top.
- Logo trái.
- Navigation ở giữa hoặc bên phải.
- Chỉ có **một CTA primary**.
- Link nav: `13–14px`, medium.
- Active/hover dùng `text-primary` + underline/hairline hoặc tint rất nhẹ.
- Không dùng theme toggle vì website chỉ có Dark Mode.

### 6.2 Mobile Navbar

```text
[LOGO]                         [MENU]
```

- Cao `56–60px`.
- Menu mở dạng panel từ top/right.
- Panel dùng `surface-secondary`, border hairline.
- CTA primary đặt cuối danh sách.
- Không dùng full-screen animation phức tạp.

---

## 7. Hero Section

Hero là phần quan trọng nhất của landing page.

### 7.1 Cấu trúc khuyến nghị

```text
[SECTION LABEL / STATUS]

Main headline with
one clear value proposition.

Short supporting paragraph explaining
what it is + for whom + why it matters.

[PRIMARY CTA] [SECONDARY CTA]

[PROOF / TRUST / METRIC]

                    [PRODUCT VISUAL / DASHBOARD / DEVICE / DEMO]
```

### 7.2 Hero Content

Headline:

- Tập trung vào **kết quả hoặc giá trị chính**.
- Tối đa khoảng `2–4 dòng` trên desktop.
- Tránh câu khẩu hiệu mơ hồ.
- Có thể highlight `1 cụm` bằng steel accent.

Supporting text:

- `17–20px`.
- Màu `text-secondary`.
- Tối đa khoảng `620px`.
- Nói rõ sản phẩm làm gì.

CTA:

- Primary: hành động chuyển đổi chính.
- Secondary: xem demo / docs / learn more.
- Không có CTA thứ ba cạnh hai CTA đầu.

Proof row:

- Rating.
- Số khách hàng.
- Uptime.
- Download.
- Performance metric.
- Company logos.

### 7.3 Hero Visual

Ưu tiên visual thật của sản phẩm:

- Screenshot dashboard.
- Device/app preview.
- Browser frame.
- Product rendering.
- Data visualization.
- Technical illustration liên quan trực tiếp.

Không dùng ảnh stock chung chung nếu sản phẩm là software/tool.

Khung visual:

```css
background: var(--surface-inset);
border: 1px solid var(--border-default);
```

Có thể thêm:

- Blueprint corners (màu `color-mix(in srgb, #e7e8ea 55%, transparent)`).
- Grid nền.
- Mono labels.
- Floating metric nhỏ.
- Scanline cực nhẹ.

#### Cockpit Flow Editor (Section mô phỏng Hero)

Section mô phỏng quy trình tự động hóa trình duyệt (Flow Editor Cockpit) tuân thủ bộ quy chuẩn:

- **Bố cục & Chiều cao**:
  - Toolbar trên cùng thu gọn: Title bar `28px`, Tabs bar `28px`, Action tools bar `32px`.
  - Vùng làm việc chính (Flow canvas) mở rộng tối đa vùng hiển thị luồng chạy (`grid-template-rows: 32px 1fr 180px`).
  - Bottom dock cao `180px`, mặc định mở ở tab **`LOG`**.
  - Right inspector panel: Mặc định hiển thị danh sách **`OUTLINE`** (10 bước tự động hóa). Nhãn `Variables` chỉ cần có mặt tĩnh (`cursor: default`), không cần tương tác/bấm vào.
- **Màu sắc & Typography của Outline và Status**:
  - Trạng thái kết nối: `DISCONNECTED` mang màu `#a8b1ba` (`--cockpit-disconnected-color`).
  - Danh sách Outline:
    - Tên bước (`.outline-step-name` / `.outline-step-item`): **Bắt buộc đồng bộ chính xác với màu chữ `DISCONNECTED`** (`#a8b1ba`), không dùng màu xanh cyan.
    - Số thứ tự bước (`.outline-step-num`): `#6d7075` (mono kỹ thuật, độ sáng vừa phải).
    - Trạng thái hover: Tên bước sáng lên `#ffffff`, số thứ tự sáng lên `#9da7b0`.
    - Tab Outline active: Thanh chỉ báo active `#7ba2ca` dày 2px nằm áp sát hoàn toàn mép đáy (`bottom: -1px`), không có khe hở đẩy lên; chữ màu trắng `#ffffff` (`font-weight: 600`). Nhãn `Variables` mang màu xám `#6d7885`.
- **Hiệu ứng chuột di chuyển mô phỏng (Simulated Mouse Cursor)**:
  - **Điểm xuất phát thực tế**: Bắt đầu từ vùng canvas làm việc (`x: 175px, y: 135px`) di chuyển lên nút Run, thay vì chỉ nhích một đoạn ngắn từ mép trái nút bấm.
  - **Quỹ đạo đường cong tự nhiên (`human-mouse-approach`)**: Đường cong mượt mà dài 1.9s với gia tốc tự nhiên (tăng tốc ở giữa, giảm tốc nhẹ nhàng khi tiếp cận mục tiêu - Fitts's law).
  - **Con trỏ thực tế (OS Pointer)**: Con trỏ mũi tên trắng đặc ruột (`fill="#ffffff"`) có viền tối tương phản và drop-shadow, giống con trỏ hệ điều hành thật.
  - **Phản hồi nút bấm & Cảm giác nhấn (Tactile Click)**:
    - Khi chuột vừa chạm tới: Nút Run chuyển sang trạng thái hover sáng viền và đổi nền (`.is-hovered`).
    - Khi nhấn: Nút thụt nhẹ (`.is-pressed` scale 0.96), con trỏ nghiêng nhẹ và co lại, kích hoạt vòng sóng xung kích lan tỏa (`.demo-click-ripple`), sau đó con trỏ mờ dần và luồng chạy bắt đầu.

### 7.4 Hero Background

Cho phép:

- Technical grid.
- Radial light rất nhẹ bằng `brand-primary`.
- Thin vertical/horizontal guide.
- Noise texture cực nhẹ.

Không cho phép:

- Aurora nhiều màu.
- Neon bloom mạnh.
- Gradient tím/xanh kiểu SaaS phổ thông.
- Particle animation dày.

---

## 8. Buttons & CTA

### 8.1 Primary

```css
background: var(--brand-primary);
color: var(--text-inverse);
border: 1px solid var(--brand-primary);
height: 44px;
padding-inline: 20px;
font-family: var(--font-heading);
font-weight: 600;
```

Hover:

```css
background: var(--brand-hover);
border-color: var(--brand-hover);
```

### 8.2 Secondary

```css
background: transparent;
color: var(--text-primary);
border: 1px solid var(--border-emphasis);
height: 44px;
padding-inline: 20px;
```

Hover:

```css
background: var(--surface-tertiary);
border-color: var(--border-brand);
```

### 8.3 Ghost

- Không nền.
- Không border mặc định.
- Hover → `brand-tint`.
- Dùng cho navbar hoặc action phụ.

### 8.4 Button Sizes

```css
--button-sm-h: 36px;
--button-md-h: 44px;
--button-lg-h: 50px;
```

Hero CTA mặc định dùng `44–50px`.

### 8.5 CTA Rules

- Một section chỉ có một hành động primary.
- CTA text dùng động từ rõ ràng.
- Primary và Secondary phải phân cấp thị giác rõ.
- Focus visible bắt buộc.
- Không dùng glow quanh button.

---

## 9. Section Header Pattern

Pattern chuẩn cho mỗi section:

```text
01 / FEATURES

Built for reliability,
not decoration.

Short paragraph describing the section.
```

### Style

Eyebrow:

```css
font-family: var(--font-mono);
font-size: 10px;
text-transform: uppercase;
letter-spacing: 0.12em;
color: var(--brand-primary);
```

Heading:

```css
font-family: var(--font-heading);
font-size: var(--text-h2);
line-height: 1.05;
letter-spacing: -0.02em;
```

Description:

```css
font-size: 15px;
line-height: 1.65;
color: var(--text-secondary);
```

Section header có thể:

- Left aligned — mặc định.
- Centered — dùng cho CTA/pricing/social proof nếu phù hợp.
- Split header — heading trái, paragraph phải trên desktop.

---

## 10. Logo / Social Proof Strip

Mục tiêu: tạo trust ngay sau hero.

```text
TRUSTED BY TEAMS AT
[LOGO] [LOGO] [LOGO] [LOGO] [LOGO]
```

Style:

- Logo monochrome.
- Opacity mặc định `45–65%`.
- Hover có thể tăng opacity.
- Không dùng logo carousel auto-play.
- Border top/bottom hairline nếu cần.
- Padding khoảng `32–48px`.

Nếu không có logo thật, dùng metrics/testimonial thay thế. Không tạo logo giả.

---

## 11. Feature Sections

### 11.1 Feature Grid

```text
[01] Feature
Short benefit-focused description.

[02] Feature
Short benefit-focused description.

[03] Feature
Short benefit-focused description.
```

Card:

```css
background: var(--surface-secondary);
border: 1px solid var(--border-subtle);
padding: 24px;
```

Desktop:

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 1px;
```

Có thể dùng `gap: 1px` với parent background là border để tạo technical matrix.

### 11.2 Feature Split

```text
[TEXT 5 cols]      [VISUAL 7 cols]
```

Section tiếp theo có thể đảo:

```text
[VISUAL 7 cols]    [TEXT 5 cols]
```

Feature split phù hợp với tính năng cần screenshot/demo lớn.

### 11.3 Feature Card Content

Mỗi card nên có:

- Index hoặc icon.
- Title.
- Benefit.
- Optional metric / technical detail.
- Optional "Learn more".

Không nhồi quá nhiều icon decoration.

### 11.4 The Operating Loop (Vòng lặp vận hành - Section `#features`)

Section Vòng lặp vận hành (Operating Loop) thể hiện 5 pha khép kín trong quy trình tự động hóa:

- **Section Header**:
  - Eyebrow: `font-mono text-[10px] uppercase tracking-[0.13em] text-[var(--color-accent)]` (`The operating loop` / `Vòng lặp vận hành`).
  - Heading: Sentence case `Build · review · run at scale · commit.` (không viết hoa toàn bộ, dùng dấu chấm giữa các từ `·`, font `Barlow Condensed`, bold, `text-4xl sm:text-5xl lg:text-[54px]`).
  - Subhead: Max width `780px`, `17px`, `line-height: 1.62`, màu `var(--color-neutral-400)`.
- **Thanh 5 Tab ngang**:
  - 5 nút tab: `Canvas & nodes` | `Critic & gate` | `Profiles, schedule & scale` | `History & git` | `Data, files & packaging`.
  - Font: `Barlow Condensed 15.5px`, `font-weight: 600`, `letter-spacing: .02em`.
  - Tab active: Nền xanh accent `bg-[var(--color-accent)]`, chữ tối `#0f1114`.
  - Tab inactive: Viền `border-[var(--color-divider)]`, chữ sáng `#e7e8ea`, hover đổi màu border.
- **Bố cục nội dung 2 cột**:
  - Cột trái (`minmax(0, 430px)`): Tiêu đề H3 (`32px`), đoạn mô tả (`15.5px`), và danh sách 4 gạch đầu dòng đánh số `01`, `02`, `03`, `04` với số màu accent mono.
  - Cột phải (`minmax(0, 1fr)`): Khung blueprint có 4 dấu góc (`corner tl/tr/bl/br`):
    - **Tab 0 (Build)**: Bảng node 8 nhóm (Browser, Tab, Element, Keyboard, Mouse, Data, Debug, Control) dạng lưới 4x2 với điểm màu định danh từng nhóm.
    - **Tab 1 (Critic)**: Bảng 7 rule tĩnh kiểm duyệt flow (invalid-node, no-start-node, unreachable-node, positional-selector, error-port-unwired, zero-dwell, write-inside-loop) với mức độ lỗi (error, warn, hint).
    - **Tab 2 (Scale)**: Bảng thông số fingerprint độc lập từng profile (UA, WebGL, Canvas, Fonts, Media devices, Proxy, Mouse, Dwell).
    - **Tab 3 (Git)**: Card so sánh graph diff (+ / ~ / −) và trạng thái git commit/conflict.
    - **Tab 4 (Data/Package)**: Pipeline đóng gói 5 bước và mã băm SHA256 của file binary `.exe` độc lập.

### 11.5 Why a Gate / Critic (Section `#critic`)

Section giải thích lý do vì sao cần cổng kiểm duyệt Critic tĩnh trước khi đưa flow vào chạy hàng loạt:

- **Khung Blueprint**:
  - Box blueprint bao trùm với viền hairline và 4 dấu góc kỹ thuật (`corner tl/tr/bl/br`).
  - Nền tối kỹ thuật `#0d1015/90`, padding `p-8 sm:p-12 lg:p-14`.
- **Cột trái**:
  - Eyebrow: `font-mono text-[10.5px] uppercase tracking-[0.13em] text-[var(--color-accent)]` (`WHY A GATE` / `VÌ SAO CẦN CỬA KIỂM`).
  - Heading H2: `Automation bugs do not show up in your test run.\nThey show up on profile 217.` (`text-3xl sm:text-4xl lg:text-[46px] font-bold text-white leading-[1.05] tracking-[-0.02em]`).
  - Paragraph: Mô tả nguyên do lỗi tiềm ẩn (`16px`, `line-height: 1.65`, `color: var(--color-neutral-400)`).
  - Lưới 4 trụ cột (`2x2`):
    - `RESILIENCE`: `Running once does not mean running twice.`
    - `ANTI-DETECT`: `Machine traces: cadence, ordering, dwell time.`
    - `DATA-SAFETY`: `Losing data, or reporting success when it actually broke.`
    - `COST`: `Money and time: redundant calls, writes, runs.`
- **Cột phải (Card: HOW THE SCORE WORKS)**:
  - Khung viền kỹ thuật `border-[var(--color-divider)]` với tiêu đề `HOW THE SCORE WORKS` (VI: `CÁCH TÍNH ĐIỂM`).
  - Bảng thang điểm 5 dòng font mono (`max: 100`, `error: −15`, `warn: −5`, `hint: −1`, `threshold: 85`).
  - Chú thích cốt lõi: Chặn ship là do **đếm lỗi error** (`count of errors`), không do điểm số — đảm bảo flow an toàn tuyệt đối.

---

## 12. Metrics / Results

Metrics là motif quan trọng của style Industry.

Ví dụ:

```text
99.99%        <120ms        10k+          24/7
UPTIME        LATENCY       USERS         SUPPORT
```

Style:

- Number: `text-kpi`, heading/sans bold.
- Label: mono uppercase `10px`.
- Divider dọc/ngang bằng hairline.
- Có thể đặt trong grid 2x2 mobile, 4x1 desktop.
- Không animate số nếu animation không mang ý nghĩa.

Metrics phải là dữ liệu thật nếu landing page public.

---

## 13. Product / Demo Showcase

Showcase cho phép landing page hiển thị giao diện hoặc sản phẩm ở kích thước lớn.

### Browser / App Frame

```text
┌─────────────────────────────────────────────────────────┐
│ ●  PRODUCT / LIVE PREVIEW                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   PRODUCT UI                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

Style:

```css
background: var(--surface-inset);
border: 1px solid var(--border-default);
```

Quy tắc:

- Không mô phỏng browser chrome quá chi tiết nếu không cần.
- Frame title dùng mono.
- Screenshot phải sắc nét.
- Nếu screenshot có nền sáng, đặt trong frame riêng; không đổi toàn site sang sáng.
- Dùng `overflow: hidden`, radius `0`.

---

## 14. Testimonials

Testimonial card:

```text
"Specific result or experience from a real user."

NAME / ROLE
COMPANY
```

Style:

```css
background: var(--surface-secondary);
border: 1px solid var(--border-subtle);
padding: 24px;
```

Quy tắc:

- Quote text `15–17px`.
- Name: medium.
- Role/company: mono/fine hoặc text-secondary.
- Avatar là optional.
- Không dùng slider nếu chỉ có 3–6 testimonials.
- Không tạo testimonial giả.

---

## 15. Pricing / Offer Section

Nếu landing page có pricing:

Desktop:

```text
[PLAN] [PLAN / FEATURED] [PLAN]
```

Featured plan:

- Border `brand-primary`.
- Có `RECOMMENDED` badge nhỏ.
- Không scale card lớn hơn các card còn lại.
- Không glow.

Price:

- Heading lớn.
- Billing period nhỏ, text-secondary.
- Feature list rõ ràng.
- CTA cùng vị trí giữa các plan.

Nếu chỉ có một offer, dùng **single conversion panel** thay cho 3 pricing cards.

---

## 16. Final CTA

Final CTA phải mạnh hơn các section card thông thường.

Cấu trúc:

```text
[SECTION LABEL]

One decisive conversion headline.

Short reassurance / friction reducer.

[PRIMARY CTA] [OPTIONAL SECONDARY LINK]
```

Style:

```css
background: var(--surface-secondary);
border: 1px solid var(--border-emphasis);
padding: clamp(40px, 7vw, 80px);
```

Cho phép:

- Blueprint corners.
- Technical grid nền nhẹ.
- Một metric/proof nhỏ.
- Steel accent line.

Không dùng:

- Gradient rực.
- Illustration không liên quan.
- Nhiều CTA cạnh tranh nhau.

---

## 17. Footer

Desktop:

```text
[LOGO + short description]    Product    Resources    Company    Legal
──────────────────────────────────────────────────────────────────────
© YEAR COMPANY                                    STATUS / SOCIAL LINKS
```

Style:

- Background `surface-base` hoặc `surface-primary`.
- Border-top hairline.
- Heading group dùng mono caps hoặc heading condensed nhỏ.
- Link dùng `text-secondary`, hover → `text-primary`.
- Footer không cần card.

---

## 18. Forms

Dùng cho newsletter, waitlist, contact hoặc lead generation.

Input:

```css
height: 44px;
background: var(--surface-tertiary);
border: 1px solid var(--border-default);
color: var(--text-primary);
padding-inline: 14px;
border-radius: 0;
```

Focus:

```css
border-color: var(--brand-primary);
outline: 2px solid rgba(123, 162, 202, 0.22);
outline-offset: 1px;
```

Placeholder:

```css
color: var(--text-tertiary);
```

Validation:

- Error border/text dùng `danger`.
- Success state không được phụ thuộc chỉ vào màu; dùng icon/text.
- Label đặt phía trên input.
- Không dùng floating label.

---

## 19. Badge / Chip / Status

```css
display: inline-flex;
align-items: center;
gap: 6px;
min-height: 24px;
padding-inline: 9px;
border-radius: 9999px;
background: var(--brand-tint);
color: var(--brand-tint-text);
font-size: 11px;
font-weight: 500;
```

Status dot:

```css
width: 6px;
height: 6px;
border-radius: 50%;
background: currentColor;
```

Badge chỉ dùng cho:

- New.
- Live.
- Recommended.
- Version.
- Availability.
- Verified status.

Không dùng badge cho mọi label.

---

## 20. Icons

- Thư viện ưu tiên: **Lucide React**.
- Stroke: `1.5px`.
- Default: `16–18px`.
- Feature icon: `20–24px`.
- Hero icon/logo mark có thể lớn hơn.
- Icon dùng `currentColor`.
- Tránh icon chứa trong square rounded background.
- Nếu cần icon container, dùng border square `0px radius`.

Ví dụ:

```css
.icon-frame {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border-default);
  color: var(--brand-primary);
}
```

---

## 21. Image & Media Direction

### Product screenshots

- Ưu tiên screenshot thật.
- Bảo đảm readable ở retina.
- Không kéo giãn sai ratio.
- Có thể crop nhưng không che phần quan trọng.

### Photography

Nếu landing page cần ảnh người/sản phẩm:

- Tone tối, trung tính, contrast kiểm soát.
- Không dùng overlay gradient nhiều màu.
- Frame vuông.
- Tránh stock photo quá generic.

### Video

- Không autoplay có âm thanh.
- Poster image phải có.
- Play button đơn giản.
- Video nằm trong frame có border.

---

## 22. Motion

### 22.1 Default Motion

```css
--motion-fast: 160ms;
--motion-base: 220ms;
--motion-slow: 420ms;
--ease-standard: cubic-bezier(.2, .8, .2, 1);
```

### 22.2 Allowed

- Color transition.
- Border transition.
- Opacity fade.
- Small `translateY(8–16px)` reveal.
- Hero visual fade/slide nhẹ.
- Stagger nhỏ giữa các thành phần hero.
- Hover media zoom tối đa khoảng `1.01–1.02`.

### 22.3 Page Entrance

Landing page có thể dùng sequence:

1. Background/grid xuất hiện ngay.
2. Navbar fade in.
3. Eyebrow → headline → description → CTA xuất hiện lần lượt.
4. Hero visual xuất hiện sau content khoảng `100–200ms`.

Không để animation làm người dùng phải chờ đọc nội dung.

### 22.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 23. Hover & Interaction

### Links

```css
color: var(--text-secondary);
transition: color 160ms ease;
```

Hover:

```css
color: var(--text-primary);
```

Brand link:

```css
color: var(--brand-primary);
```

### Cards

Card chỉ hover khi nó thực sự clickable:

```css
border-color: var(--border-emphasis);
background: var(--surface-tertiary);
```

Không dùng:

```css
transform: translateY(-8px);
box-shadow: huge;
```

### Focus

Mọi button/link/input interactive phải có focus visible.

```css
outline: 2px solid rgba(123, 162, 202, 0.65);
outline-offset: 2px;
```

---

## 24. Scrollbar

```css
html {
  scrollbar-width: thin;
  scrollbar-color: rgba(163,168,174,.45) transparent;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(163,168,174,.34);
  border: 2px solid transparent;
  border-radius: 8px;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(163,168,174,.55);
  border: 2px solid transparent;
  background-clip: padding-box;
}
```

Scrollbar được phép bo tròn vì là native utility, không phải component giao diện chính.

---

## 25. Responsive

### Breakpoints tham khảo

```css
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;
```

### Mobile `< 768px`

- Hero chuyển thành 1 cột.
- Text hero lên trước visual.
- Hero title dùng `42–52px` tùy chiều rộng.
- CTA có thể full width nếu phù hợp.
- Grid feature → 1 cột.
- Metrics → 2 cột.
- Footer → 1–2 cột.
- Section padding giảm.
- Navbar dùng menu button.
- Không ẩn nội dung chính chỉ để giữ layout đẹp.

### Tablet `768–1023px`

- Hero có thể 1 cột hoặc split tùy content.
- Feature grid 2 cột.
- Metrics 2–4 cột.
- Container padding `32px`.

### Desktop `>= 1024px`

- Hero ưu tiên split layout.
- 12-column grid.
- Feature 3 cột.
- Metrics 4 cột.
- Navbar đầy đủ.
- Section spacing rộng hơn.

---

## 26. Accessibility

Bắt buộc:

- Contrast text/body đạt WCAG AA khi có thể.
- Body text không dùng `text-tertiary`.
- Focus visible.
- Keyboard navigation hoạt động đầy đủ.
- `aria-label` cho icon-only button.
- Image có `alt`.
- Decorative image dùng `alt=""`.
- Heading hierarchy đúng: `h1 → h2 → h3`.
- Không dùng màu là tín hiệu trạng thái duy nhất.
- Không autoplay media gây gián đoạn.
- Tôn trọng `prefers-reduced-motion`.

---

## 27. Landing Page Information Architecture

Thứ tự mặc định:

```text
01. Sticky Navbar
02. Hero
03. Logo / Social Proof
04. Core Benefits / Features
05. Product Showcase
06. Metrics / Results
07. Secondary Feature Sections
08. Testimonials / Customer Proof
09. Pricing / Offer (nếu có)
10. FAQ (nếu cần)
11. Final CTA
12. Footer
```

Không bắt buộc phải dùng tất cả section.

### Quy tắc chọn section

Nếu landing page ngắn:

```text
Navbar
Hero
Proof
Features
Showcase
Final CTA
Footer
```

Nếu landing page dài:

```text
Navbar
Hero
Proof
Problem / Context
Features
Showcase
Metrics
Use Cases
Testimonials
Pricing
FAQ
Final CTA
Footer
```

---

## 28. Recommended Section Rhythm

Để landing page không giống một chuỗi card:

```text
Hero                      → open / visual
Proof strip               → compact
Feature grid              → structured
Feature split             → spacious
Metrics                   → compact
Showcase                   → large visual
Testimonials              → structured
Final CTA                 → focused
Footer                    → compact
```

Luân phiên surface:

```text
surface-base
surface-primary
surface-base
surface-primary
```

Không cần mỗi section có màu nền khác nhau. Divider và spacing là đủ.

---

## 29. FAQ

Nếu dùng FAQ:

- Accordion đơn giản.
- Không card riêng cho từng câu hỏi nếu danh sách dài.
- Dùng border-bottom hairline.
- Header câu hỏi `15–16px`.
- Body `14–15px`, text-secondary.
- Icon plus/minus Lucide.
- Animation mở `180–220ms`.

---

## 30. SEO / Performance UI Rules

Landing page cần ưu tiên tốc độ:

- Hero media phải có kích thước cố định để tránh CLS.
- Dùng `next/image` nếu là Next.js.
- Lazy-load image/video dưới fold.
- Không lazy-load LCP image của hero.
- Font self-host và preload font cần thiết.
- Tránh animation JS nếu CSS đủ.
- Không tải thư viện animation lớn chỉ cho fade-in.
- Không dùng video nền nặng mặc định.
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`.

---

## 31. Implementation Rules for Codex

Khi dùng tài liệu này để generate code, Codex phải tuân thủ:

1. **Dark-only:** không tạo Light Mode, theme provider, theme toggle hoặc `prefers-color-scheme` để đổi theme.
2. Root luôn dùng `color-scheme: dark`.
3. Dùng CSS variables từ tài liệu này; không tự thêm palette tím/hồng/xanh neon.
4. Button/card/input mặc định `border-radius: 0`.
5. Badge/tag nhỏ mới được dùng pill radius.
6. Không dùng shadow cho card/section/navbar.
7. Landing page dùng container centered, không dùng app sidebar.
8. Hero phải có một `h1` duy nhất và CTA primary rõ ràng.
9. Section phải có spacing lớn, không dùng mật độ UI kiểu dashboard.
10. UI copy nên tập trung vào benefit/result, không dùng placeholder marketing sáo rỗng nếu đã có content thật.
11. Nếu thiếu hình ảnh thật, dựng frame placeholder có cấu trúc thay vì tự tạo stock-photo giả.
12. Responsive mobile-first.
13. Mọi interactive state phải có hover/focus.
14. Tôn trọng `prefers-reduced-motion`.
15. Không thêm component chỉ để trang trí nếu không phục vụ content/hierarchy.

---

## 32. CSS Variables Reference — Dark Only

```css
:root {
  color-scheme: dark;

  /* Font */
  --font-sans: Barlow, system-ui, -apple-system, sans-serif;
  --font-heading: 'Barlow Condensed', Barlow, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Steel */
  --steel-100: #eef6ff;
  --steel-200: #d6ebff;
  --steel-300: #b5d9fd;
  --steel-400: #94bce3;
  --steel-500: #749dc4;
  --steel-600: #597ea3;
  --steel-700: #416180;
  --steel-800: #2c455d;
  --steel-900: #1d2d3d;

  /* Surface — Dark Only */
  --surface-base: #0b0d10;
  --surface-primary: #101318;
  --surface-secondary: #161a20;
  --surface-tertiary: #1d222a;
  --surface-elevated: #222832;
  --surface-inset: #080a0d;

  /* Text */
  --text-primary: #f0f2f4;
  --text-secondary: #a3a8ae;
  --text-tertiary: #6f757d;
  --text-inverse: #0b0d10;

  /* Brand */
  --brand-primary: #7ba2ca;
  --brand-hover: #94bce3;
  --brand-strong: #b5d9fd;
  --brand-tint: rgba(123, 162, 202, 0.12);
  --brand-tint-strong: rgba(123, 162, 202, 0.20);
  --brand-tint-text: #b5d9fd;

  /* Border */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.11);
  --border-emphasis: rgba(255, 255, 255, 0.17);
  --border-brand: rgba(123, 162, 202, 0.55);
  --border-width: 1px;
  --border-hairline: 0.5px;

  /* Status */
  --success: #7ba2ca;
  --danger: #d98d86;
  --warning: #b09a72;
  --info: #a8c3dc;

  /* Shape */
  --radius-none: 0px;
  --radius-pill: 9999px;

  /* Container */
  --container-max: 1200px;
  --container-wide: 1360px;

  /* Section */
  --section-y-sm: 72px;
  --section-y-md: 96px;
  --section-y-lg: 128px;
  --section-y-xl: 160px;

  /* Gap */
  --gap-xs: 4px;
  --gap-sm: 8px;
  --gap-md: 12px;
  --gap-lg: 18px;
  --gap-xl: 24px;
  --gap-2xl: 32px;
  --gap-3xl: 48px;

  /* Typography */
  --text-display: clamp(48px, 7vw, 88px);
  --text-hero: clamp(42px, 6vw, 72px);
  --text-h1: clamp(36px, 5vw, 56px);
  --text-h2: clamp(30px, 4vw, 44px);
  --text-h3: clamp(22px, 2.5vw, 28px);
  --text-card-title: 18px;
  --text-lead: clamp(17px, 1.6vw, 20px);
  --text-body: 15px;
  --text-body-compact: 13px;
  --text-label: 12px;
  --text-caps: 10px;
  --text-fine: 11px;
  --text-kpi: clamp(30px, 4vw, 48px);
  --text-code: 12px;

  /* Motion */
  --motion-fast: 160ms;
  --motion-base: 220ms;
  --motion-slow: 420ms;
  --ease-standard: cubic-bezier(.2, .8, .2, 1);
}
```

---

## 33. Base CSS Reference

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  color-scheme: dark;
  background: var(--surface-base);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--surface-base);
  color: var(--text-primary);
  font-family: var(--font-sans);
  font-size: var(--text-body);
  line-height: 1.65;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  border-radius: 0;
}

img,
video,
svg {
  display: block;
  max-width: 100%;
}

::selection {
  background: var(--brand-primary);
  color: var(--text-inverse);
}

.landing-container {
  width: min(calc(100% - 40px), var(--container-max));
  margin-inline: auto;
}

.section {
  padding-block: var(--section-y-lg);
  border-top: 1px solid var(--border-subtle);
}

.section-label {
  margin: 0 0 16px;
  color: var(--brand-primary);
  font-family: var(--font-mono);
  font-size: var(--text-caps);
  line-height: 1.4;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  max-width: 760px;
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.section-description {
  max-width: 680px;
  margin-top: 20px;
  color: var(--text-secondary);
}

@media (max-width: 767px) {
  .landing-container {
    width: min(calc(100% - 40px), var(--container-max));
  }

  .section {
    padding-block: var(--section-y-sm);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 34. Tổng kết phong cách

```text
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│   LANDING PAGE / DARK ONLY                                         │
│                                                                    │
│   ▸ Graphite-black surfaces + mono steel accent                    │
│   ▸ Vuông góc · Hairline borders · Hầu như không shadow            │
│   ▸ Hero typography lớn hơn app/dashboard UI                       │
│   ▸ Section spacing rộng, tập trung vào storytelling               │
│   ▸ Blueprint corners chỉ cho khung quan trọng                     │
│   ▸ UPPERCASE MONO section labels                                  │
│   ▸ Product visual và dữ liệu thật thay cho decoration rỗng         │
│   ▸ Một CTA primary rõ ràng cho mỗi conversion point               │
│   ▸ Responsive mobile-first                                        │
│   ▸ Không Light Mode · Không theme switch                          │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

Không cần tạo mọi section nếu nội dung dự án không yêu cầu. Ưu tiên **ít section nhưng rõ giá trị** hơn một landing page dài với nhiều block lặp lại.

---

## 35. Drives Bar (Browser & Runtime Compatibility Strip)

Section ngay bên dưới Hero simulation cockpit (`PlatformsBar`):

- **Vị trí**: Nằm giữa Hero Cockpit Editor và Section Features Overview (`THE OPERATING LOOP`).
- **Container**: `max-w-[1280px] mx-auto`, có đường viền trên `border-t border-[var(--color-divider-subtle)]` (`rgba(231,232,234,0.11)`), padding `pt-[26px]`.
- **Label bên trái**: Mono font `font-[var(--font-mono)]`, `text-[9.5px]`, `tracking-[0.13em]`, `uppercase`, màu `var(--color-neutral-400)` (`#9a9ca0`). (VI: `Điều khiển được`, EN: `Drives`).
- **Danh sách badge**: Hàng ngang `flex items-center gap-[10px] flex-wrap`.
- **Badge item**:
  - Border: `1px solid var(--color-divider-subtle)` (`border-[rgba(231,232,234,0.11)]`).
  - Background: `transparent` (hoặc bề mặt tối liền mạch).
  - Padding: `7px 15px` (`py-[7px] px-[15px]`).
  - Text chính: `font-[var(--font-barlow-condensed)]`, `font-weight: 600`, `text-[16px]`, `tracking-[0.03em]`, màu `#dce1e6`.
  - Tag kèm theo (`built-in`, `external`): `font-[var(--font-mono)]`, `text-[10px]`, màu `var(--color-neutral-400)` (`#9a9ca0`).
  - Danh sách chuẩn: `Hidemium`, `GPM-Login`, `AdsPower`, `Chromium (built-in)`, `Firefox (built-in)`, `CDP (external)`.
  - Hover: `hover:border-[var(--color-divider)] hover:text-white transition-colors`.

---

## 36. Quy chuẩn Tiêu đề Section Thống nhất (Unified Section Heading)

Để toàn bộ các section trên landing page đồng nhất 100% về kích thước, tỷ lệ font chữ, badge eyebrow và nhịp khoảng cách:

- **Component chuẩn**: Dùng `<SectionHeading />` từ `@/shared/components/SectionHeading`.
- **Cấu trúc**:
  1. **Eyebrow Badge**:
     - Container: `inline-flex items-center gap-2 border border-[var(--color-divider)] bg-[#14171c] px-3 py-1`
     - Font: `font-[var(--font-mono)] text-[11px] text-[var(--color-accent)]`
     - Text: Uppercase mono (ví dụ: `OPERATING LOOP`, `WHY A GATE MATTERS`, `COMPARE`, `PRICING`, `FAQ`, `DOWNLOAD`).
  2. **Tiêu đề H2 (`title`)**:
     - Font: `font-[var(--font-barlow-condensed)]`
     - Kích thước chuẩn: `text-3xl sm:text-4xl lg:text-5xl` (`clamp(30px, 3.8vw, 48px)`)
     - Cân nặng: `font-bold` (700)
     - Kiểu chữ: `uppercase`
     - Khoảng cách ký tự & dòng: `tracking-tight leading-[1.04]`
     - Màu sắc: `text-white`
     - Khoảng cách trên: `mt-4`
  3. **Mô tả (`description`)**:
     - Font: `text-base sm:text-lg leading-relaxed text-[var(--color-neutral-400)]`
     - Khoảng cách trên: `mt-4`
  4. **Giới hạn chiều rộng**: `max-w-3xl`
- **Áp dụng bắt buộc**:
  - `FeaturesOverview`
  - `CriticSection`
  - `ComparisonSection`
  - `PricingSection`
  - `FaqSection`
  - `DownloadSection`


