import { useRef, useState } from 'react'
import './App.css'

const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>" +
      "<rect width='200' height='200' fill='#e9e9e9'/>" +
      "<circle cx='100' cy='78' r='38' fill='#bdbdbd'/>" +
      "<path d='M40 178c0-33 27-54 60-54s60 21 60 54z' fill='#bdbdbd'/>" +
      "</svg>",
  )

const ACCENTS = ['#111827', '#c98c4f', '#2563eb', '#059669', '#dc2626', '#7c3aed']

const TEMPLATES = [
  { id: 'classic', name: 'Classic', hint: 'Avatar, divider, stacked text. The original minimal look.' },
  { id: 'stacked', name: 'Stacked', hint: 'No image. A short accent rule under the name.' },
  { id: 'card', name: 'Card', hint: 'Avatar with an accent bar and a colored name.' },
]

/* Template 1 — a 1:1 rebuild of minimalsignature.com */
function ClassicSignature({ d }) {
  const heading = d.role ? `${d.name} , ${d.role}` : d.name
  return (
    <table
      style={{
        verticalAlign: '-webkit-baseline-middle',
        fontSize: 'small',
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      <tbody>
        <tr>
          {d.image && (
            <td style={{ borderRight: '2px solid gray', paddingRight: '7px' }}>
              <img
                src={d.image}
                alt={`${d.name} signature`}
                style={{ width: 'auto', height: '70px' }}
              />
            </td>
          )}
          <td style={{ paddingLeft: d.image ? '7px' : '0', lineHeight: '1.3em' }}>
            <b>{heading}</b>
            <br />
            {d.email && (
              <>
                {d.email}
                <br />
              </>
            )}
            {d.phone && (
              <>
                {d.phone}
                <br />
              </>
            )}
            {d.address && (
              <>
                {d.address}
                <br />
              </>
            )}
            {d.link && (
              <a
                href={d.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline' }}
              >
                {d.link}
              </a>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

/* Template 2 — text only, short accent rule under the name */
function StackedSignature({ d }) {
  return (
    <table
      style={{
        fontSize: 'small',
        fontFamily: 'Arial, Helvetica, sans-serif',
        color: '#222222',
      }}
    >
      <tbody>
        <tr>
          <td style={{ paddingBottom: '5px', lineHeight: '1.2em' }}>
            <span style={{ fontWeight: 700, fontSize: '15px', color: '#111111' }}>
              {d.name}
            </span>
            {d.role && <span style={{ color: '#888888' }}>{`  ·  ${d.role}`}</span>}
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <div style={{ width: '34px', height: '2px', backgroundColor: d.accent }} />
          </td>
        </tr>
        <tr>
          <td style={{ fontSize: '13px', lineHeight: '1.5em', color: '#333333' }}>
            {d.email && (
              <>
                <a
                  href={`mailto:${d.email}`}
                  style={{ color: '#333333', textDecoration: 'none' }}
                >
                  {d.email}
                </a>
                <br />
              </>
            )}
            {d.phone && (
              <>
                {d.phone}
                <br />
              </>
            )}
            {d.address && (
              <>
                {d.address}
                <br />
              </>
            )}
            {d.link && (
              <a
                href={d.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: d.accent, textDecoration: 'none' }}
              >
                {d.link}
              </a>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

/* Template 3 — avatar, accent bar, colored name */
function CardSignature({ d }) {
  return (
    <table style={{ fontSize: 'small', fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <tbody>
        <tr>
          {d.image && (
            <td style={{ paddingRight: '12px', verticalAlign: 'middle' }}>
              <img
                src={d.image}
                alt={`${d.name} signature`}
                style={{
                  height: '64px',
                  width: '64px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  display: 'block',
                }}
              />
            </td>
          )}
          <td
            style={{
              borderLeft: `3px solid ${d.accent}`,
              paddingLeft: '12px',
              verticalAlign: 'middle',
              lineHeight: '1.45em',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '15px', color: d.accent }}>{d.name}</div>
            {d.role && (
              <div style={{ fontSize: '12px', color: '#666666', paddingBottom: '3px' }}>
                {d.role}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#333333' }}>
              {d.email && (
                <>
                  <a
                    href={`mailto:${d.email}`}
                    style={{ color: '#333333', textDecoration: 'none' }}
                  >
                    {d.email}
                  </a>
                  <br />
                </>
              )}
              {d.phone && (
                <>
                  {d.phone}
                  <br />
                </>
              )}
              {d.address && (
                <>
                  {d.address}
                  <br />
                </>
              )}
              {d.link && (
                <a
                  href={d.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: d.accent, textDecoration: 'none' }}
                >
                  {d.link}
                </a>
              )}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const RENDERERS = {
  classic: ClassicSignature,
  stacked: StackedSignature,
  card: CardSignature,
}

function Field({ label, value, onChange, onBlur, placeholder, type = 'text' }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </label>
  )
}

function App() {
  const [template, setTemplate] = useState('classic')
  const [data, setData] = useState({
    image: DEFAULT_AVATAR,
    name: 'Tom Cook',
    role: 'CEO',
    email: 'email@amazingdomain.com',
    phone: '',
    address: 'Address, City, Country',
    link: 'https://amazingdomain.com',
    accent: ACCENTS[0],
  })
  const [copied, setCopied] = useState(false)
  const previewRef = useRef(null)

  const set = (field) => (value) => setData((prev) => ({ ...prev, [field]: value }))
  const trim = (field) => () =>
    setData((prev) => {
      const t = (prev[field] || '').trim()
      return t === prev[field] ? prev : { ...prev, [field]: t }
    })

  const Signature = RENDERERS[template]

  const selectAndCopy = (root) => {
    const range = document.createRange()
    range.selectNodeContents(root)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    document.execCommand('copy')
    sel.removeAllRanges()
  }

  const copySignature = async () => {
    const root = previewRef.current?.querySelector('.sig-root')
    if (!root) return
    const html = root.innerHTML
    const text = root.innerText
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new window.ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([text], { type: 'text/plain' }),
          }),
        ])
      } else {
        selectAndCopy(root)
      }
    } catch {
      selectAndCopy(root)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const copyHtml = async () => {
    const root = previewRef.current?.querySelector('.sig-root')
    if (!root) return
    try {
      await navigator.clipboard.writeText(root.innerHTML)
    } catch {
      /* clipboard unavailable */
    }
  }

  const activeHint = TEMPLATES.find((t) => t.id === template)?.hint

  return (
    <div className="app">
      <main className="container">
        <div className="masthead no-print">
          <span className="eyebrow">Email Signatures</span>
          <h1>Make a clean email signature</h1>
          <p className="sub">
            Fill it in, pick a template, copy, paste into Gmail or Outlook. Free, no signup,
            and nothing ever leaves your browser.
          </p>
        </div>

        <div className="layout">
          <section className="controls no-print">
            <div className="segment" role="tablist">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={template === t.id}
                  className={`segment-btn${template === t.id ? ' is-active' : ''}`}
                  onClick={() => setTemplate(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <p className="template-hint">{activeHint}</p>

            <div className="card">
              <Field
                label="Image URL"
                value={data.image}
                onChange={set('image')}
                onBlur={trim('image')}
                placeholder="https://… (logo or headshot)"
              />
              <div className="field-row">
                <Field
                  label="Name"
                  value={data.name}
                  onChange={set('name')}
                  onBlur={trim('name')}
                  placeholder="Tom Cook"
                />
                <Field
                  label="Role"
                  value={data.role}
                  onChange={set('role')}
                  onBlur={trim('role')}
                  placeholder="CEO"
                />
              </div>
              <Field
                label="Email"
                value={data.email}
                onChange={set('email')}
                onBlur={trim('email')}
                placeholder="you@domain.com"
                type="email"
              />
              <Field
                label="Phone"
                value={data.phone}
                onChange={set('phone')}
                onBlur={trim('phone')}
                placeholder="Optional"
              />
              <Field
                label="Address"
                value={data.address}
                onChange={set('address')}
                onBlur={trim('address')}
                placeholder="Address, City, Country"
              />
              <Field
                label="Website"
                value={data.link}
                onChange={set('link')}
                onBlur={trim('link')}
                placeholder="https://domain.com"
              />

              <div className="field">
                <span className="field-label">Accent · Stacked &amp; Card</span>
                <div className="accent-row">
                  {ACCENTS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`swatch${data.accent === c ? ' is-active' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => set('accent')(c)}
                      aria-label={`Accent ${c}`}
                    />
                  ))}
                  <input
                    type="color"
                    className="swatch-picker"
                    value={data.accent}
                    onChange={(e) => set('accent')(e.target.value)}
                    aria-label="Custom accent color"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="preview-col">
            <div className="preview-head no-print">
              <span className="preview-tag">Live preview</span>
              <div className="preview-actions">
                <button type="button" className="ghost" onClick={copyHtml}>
                  Copy HTML
                </button>
                <button type="button" className="primary" onClick={copySignature}>
                  {copied ? 'Copied ✓' : 'Copy signature'}
                </button>
              </div>
            </div>

            <div className="canvas" ref={previewRef}>
              <div className="sig-root">
                <Signature d={data} />
              </div>
            </div>

            <p className="note no-print">
              "Copy signature" puts the formatted signature on your clipboard. In Gmail:
              Settings → General → Signature, then paste. In Outlook: paste into the signature
              editor.
            </p>
          </section>
        </div>
      </main>

      <footer className="foot no-print">
        <a
          className="foot-brand"
          href="https://modul4r.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          A modul4r tool · <strong>modul4r.com</strong> →
        </a>
        <span>Modul4r</span>
      </footer>
    </div>
  )
}

export default App
