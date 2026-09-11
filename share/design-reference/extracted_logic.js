
class Component extends DCLogic {
  constructor(props) {
    super(props)
    this.root = React.createRef()
  }

  get el() {
    return this.root.current || document.querySelector('[data-l][data-hero]')
  }

  componentDidMount() {
    const el = this.el
    if (el) {
      const saved = this.readLang()
      if (saved) el.dataset.l = saved
      const theme = this.read('hideauto.landing.theme', ['light', 'dark']) || this.props.theme
      if (theme) el.dataset.theme = theme
      if (this.props.heroVariant) el.dataset.hero = String(this.props.heroVariant)
      // Only an explicit, non-default pick overrides the theme's own accent —
      // writing the default inline would beat [data-theme="dark"]{--ac}.
      if (this.props.accent && this.props.accent !== '#5980a6') {
        el.style.setProperty('--ac-override', this.props.accent)
      }
      if (this.props.cornerMarks === false) el.dataset.marks = 'off'
    }
    this.drawIcons()
    this.fitFrame()
    this.startSim()
    this.onResize = () => this.fitFrame()
    window.addEventListener('resize', this.onResize)
  }

  /* The app window is authored at its real 1280px so every panel width, node
     position and table column matches the screenshots; it is then scaled to
     whatever the page column actually is. Re-tuning 40 internal numbers per
     breakpoint would lose the fidelity that is the whole point. */
  fitFrame() {
    const box = document.querySelector('[data-fit]')
    const frame = box && box.querySelector('[data-sim]')
    if (!box || !frame) return
    const scale = Math.min(1, box.clientWidth / 1280)
    frame.style.transform = 'scale(' + scale + ')'
    box.style.height = Math.round(frame.offsetHeight * scale) + 'px'
  }

  componentDidUpdate() {
    this.drawIcons()
  }

  componentWillUnmount() {
    this.simStop = true
    clearTimeout(this.simTimer)
    if (this.onResize) window.removeEventListener('resize', this.onResize)
  }

  /* ---- simulated test run inside the mockup ------------------------------
     Mirrors the real editor: pressing Chạy switches the dock to Nhật ký, each
     node pulses then takes a check, the edge into it marches, and the log
     appends a step-finished line. Pauses while the pointer is over the frame
     so the copy stays readable. */
  startSim() {
    const frame = document.querySelector('[data-sim]')
    if (!frame) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.simSet(frame, 4)
      return
    }
    frame.addEventListener('mouseenter', () => { this.simHold = true })
    frame.addEventListener('mouseleave', () => { this.simHold = false })

    const LEN = { canvas: 5, problems: 7, home: 9, sched: 25 }
    let step = -1
    const tick = () => {
      if (this.simStop) return
      const pane = (this.el && this.el.dataset.mk) || 'canvas'
      if (pane !== this.simPane) {
        this.simPane = pane
        step = -1
      }
      if (!this.simHold) {
        step = step + 1 > LEN[pane] ? -1 : step + 1
        if (pane === 'canvas') this.simSet(frame, step)
        else if (pane === 'problems') this.simReview(frame, step)
        else if (pane === 'home') this.simHome(frame, step)
        else this.simSched(frame, step)
      }
      this.simTimer = setTimeout(tick, pane === 'sched' ? 900 : step < 0 ? 900 : 1150)
    }
    tick()
  }

  /* Problems: the review runs, findings land one by one, the gate resolves. */
  simReview(frame, step) {
    const pane = frame.querySelector('[data-mkp="problems"]')
    if (!pane) return
    const en = (this.el && this.el.dataset.l) === 'en'
    const rows = pane.querySelectorAll('[data-pr]')
    const btn = pane.querySelector('[data-review]')
    const gate = pane.querySelector('[data-gate]')
    const scanning = step >= 0 && step < rows.length

    rows.forEach((el, i) => { el.dataset.pr = step > i ? 'on' : 'off' })

    if (btn) {
      btn.style.borderColor = scanning ? '#7ba2ca' : 'rgba(231,232,234,.14)'
      // the label is a bilingual pair, so write both spans rather than lastChild
      const pair = btn.querySelectorAll('[data-t]')
      if (pair.length === 2) {
        pair[0].textContent = scanning ? 'Đang phản biện…' : 'Chạy phản biện'
        pair[1].textContent = scanning ? 'Reviewing…' : 'Run critic review'
      }
    }
    if (gate) {
      const settled = step > rows.length
      gate.style.borderColor = settled ? '#d98d86' : 'rgba(231,232,234,.14)'
      const S = '<strong style="color:#d98d86;font-weight:700">79/85</strong>'
      // rebuilt with the pairs intact so a VI/EN switch still lands here
      gate.innerHTML = settled
        ? '<span data-t="vi">CỬA CRITIC</span><span data-t="en">CRITIC GATE</span> ' + S +
          ' <span data-t="vi">BỊ CHẶN</span><span data-t="en">BLOCKED</span>'
        : '<span data-t="vi">CHƯA PHẢN BIỆN</span><span data-t="en">NOT REVIEWED YET</span>'
    }
  }

  /* Overview: the figures fill in the way the 15s snapshot refresh fills them. */
  simHome(frame, step) {
    const pane = frame.querySelector('[data-mkp="home"]')
    if (!pane) return
    const cells = pane.querySelectorAll('[data-kpi]')
    // fills once on entry, then holds — re-zeroing every loop read as a glitch
    if (this.homeFilled && step >= 0) return
    cells.forEach((el) => {
      if (!el.dataset.kv) el.dataset.kv = el.textContent
      const target = el.dataset.kv
      const pct = target.indexOf('%') > -1
      if (step < 0) { el.textContent = pct ? '0.0%' : '0'; return }
      const num = parseFloat(target)
      if (isNaN(num)) return
      const p = Math.min(1, step / 5)
      el.textContent = pct ? (num * p).toFixed(1) + '%' : String(Math.round(num * p))
    })
    if (step >= 5) this.homeFilled = true
    if (step < 0) this.homeFilled = false
  }

  /* Schedules: the 24 h horizon marker walks, like the cron engine ticking. */
  simSched(frame, step) {
    const pane = frame.querySelector('[data-mkp="sched"]')
    const now = pane && pane.querySelector('[data-now]')
    if (!now) return
    now.style.left = Math.max(0, (step / 25) * 100) + '%'
  }

  simSet(frame, step) {
    this.simStep = step
    const nodes = frame.querySelectorAll('[data-n]')
    const edges = frame.querySelectorAll('path[data-e]')
    const logs = frame.querySelectorAll('[data-lg]')
    const state = (i) => (step < 0 ? 'idle' : i < step ? 'done' : i === step ? 'run' : 'idle')

    nodes.forEach((el, i) => { el.dataset.s = state(i) })
    edges.forEach((el, i) => { el.dataset.s = state(i + 1) })
    logs.forEach((el, i) => { el.dataset.lg = step > i ? 'on' : 'off' })

    const running = step >= 0 && step < nodes.length
    // a manual dock click takes ownership — the run must not fight the user
    if (!this.simDockLocked) frame.dataset.dk = step < 0 ? 'problems' : 'log'

    // these three read from the run, so they cannot be authored as data-t pairs
    const en = (this.el && this.el.dataset.l) === 'en'
    const t = (vi, eng) => (en ? eng : vi)

    const label = frame.querySelector('[data-runlabel]')
    if (label) label.textContent = running ? t('Dừng', 'Stop') : t('Chạy', 'Run')
    const btn = frame.querySelector('[data-runbtn]')
    if (btn) btn.style.background = running ? '#d98d86' : '#7ba2ca'

    const dot = frame.querySelector('[data-conn]')
    const conn = frame.querySelector('[data-conntext]')
    if (dot) dot.style.background = step >= 1 ? '#7ba2ca' : '#6d7075'
    if (conn) {
      conn.textContent = step >= 1
        ? t('ĐÃ KẾT NỐI · 9223', 'CONNECTED · 9223')
        : t('CHƯA KẾT NỐI', 'NOT CONNECTED')
    }

    const count = frame.querySelector('[data-stepcount]')
    if (count) {
      count.textContent = step < 0
        ? t('chưa chạy', 'not run yet')
        : running
          ? t('bước ' + (step + 1) + '/10 · đang chạy', 'step ' + (step + 1) + '/10 · running')
          : t('xong 4/10 · dừng ở Click Element', '4/10 done · stopped at Click Element')
    }
  }

  drawIcons() {
    if (typeof window === 'undefined' || !window.lucide) {
      this.iconTimer = this.iconTimer || setTimeout(() => {
        this.iconTimer = null
        this.drawIcons()
      }, 260)
      return
    }
    try {
      window.lucide.createIcons({ attrs: { 'stroke-width': 1.5 } })
    } catch (e) {
      /* icons are decorative — layout stands without them */
    }
  }

  read(key, allowed) {
    try {
      const v = localStorage.getItem(key)
      return allowed.indexOf(v) > -1 ? v : null
    } catch (e) {
      return null
    }
  }

  write(key, value) {
    try {
      localStorage.setItem(key, value)
    } catch (e) {
      /* private mode — the choice still holds for this session */
    }
  }

  readLang() {
    return this.read('hideauto.landing.lang', ['vi', 'en'])
  }

  renderVals() {
    const set = (key, value) => {
      const el = this.el
      if (el) el.dataset[key] = value
    }
    return {
      rootRef: this.root,
      onLang: (e) => {
        const next = e.currentTarget.dataset.langBtn
        set('l', next)
        this.write('hideauto.landing.lang', next)
        // repaint the run-driven labels in the new language
        const frame = document.querySelector('[data-sim]')
        if (frame) this.simSet(frame, this.simStep == null ? -1 : this.simStep)
      },
      onTheme: (e) => {
        const next = e.currentTarget.dataset.themeBtn
        set('theme', next)
        this.write('hideauto.landing.theme', next)
      },
      onHero: (e) => set('hero', e.currentTarget.dataset.hv),
      onMock: (e) => {
        const next = e.currentTarget.dataset.k
        set('mk', next)
        this.simPane = null
        // the rail follows the screen, like the real app's active nav item
        const frame = document.querySelector('[data-sim]')
        if (!frame) return
        frame.querySelectorAll('[data-rail]').forEach((el) => {
          const on = el.dataset.rail === next || (next === 'problems' && el.dataset.rail === 'canvas')
          el.style.borderLeftColor = on ? '#e7e8ea' : 'transparent'
          el.style.color = on ? '#e7e8ea' : 'rgba(231,232,234,.55)'
        })
      },
      onDock: (e) => {
        const frame = document.querySelector('[data-sim]')
        if (!frame) return
        this.simDockLocked = true
        frame.dataset.dk = e.currentTarget.dataset.dkb
      },
      onFx: (e) => set('fx', e.currentTarget.dataset.f),
      onFaq: (e) => {
        const item = e.currentTarget.parentElement
        item.dataset.faq = item.dataset.faq === 'open' ? 'closed' : 'open'
      }
    }
  }
}
