import { useState } from 'react'

const complaintTypes = [
  {
    key: 'college',
    title: 'College Complaint',
    tone: 'rose',
    icon: '▣',
    description: 'Academic and administrative issues raised within the college.',
  },
  {
    key: 'hostel',
    title: 'Hostel Complaint',
    tone: 'green',
    icon: '▰',
    description: 'Report accommodation, maintenance and hostel-related concerns.',
  },
  {
    key: 'campus',
    title: 'Campus Complaint',
    tone: 'gold',
    icon: '⌂',
    description: 'Report common campus facilities, safety and infrastructure issues.',
  },
]

const levels = [
  { title: 'College Level Complaint', icon: '●', description: 'Submit an issue for college-level review.' },
  { title: 'HOD Level Complaint', icon: '♟', description: 'Escalate an academic or departmental concern.' },
  { title: 'Administrator Level Complaint', icon: '⚙', description: 'Send a matter to the central administrator.' },
]

export default function ComplaintManagement() {
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ subject: '', description: '', contact: '' })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const openComplaint = (category, level) => {
    setSelected({ category, level })
    setForm({ subject: '', description: '', contact: '' })
    setResult(null)
  }

  const closeComplaint = () => {
    if (submitting) return
    setSelected(null)
    setResult(null)
  }

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const submitComplaint = async (event) => {
    event.preventDefault()
    if (!selected || submitting) return

    setSubmitting(true)
    setResult(null)

    try {
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selected.category.title,
          level: selected.level.title,
          ...form,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit the complaint.')
      }

      setResult({
        type: 'success',
        complaintId: data.complaint.complaintId,
        status: data.complaint.status,
      })
      setForm({ subject: '', description: '', contact: '' })
    } catch (error) {
      setResult({ type: 'error', message: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="complaint-page">
      <header className="complaint-header">
        <a className="complaint-brand" href="/">
          <span className="complaint-brand-mark"><img src="https://allenhouse.ac.in/favicon.ico" alt="Allenhouse logo" /></span>
          <span>
            <strong>ALLENHOUSE</strong>
            <small>GROUP OF INSTITUTIONS</small>
          </span>
        </a>
        <a className="back-home" href="/">← Back to Website</a>
      </header>

      <main>
        <section className="complaint-hero">
          <div className="hero-badge">COMPLAINT MANAGEMENT SYSTEM</div>
          <h1>Complaint</h1>
          <p>Choose where your concern belongs, then select the level that should receive and resolve it.</p>
        </section>

        <section className="complaint-flow" aria-label="Complaint management flow">
          <div className="flow-root">
            <div className="flow-icon">▤</div>
            <div>
              <span>START HERE</span>
              <h2>Complaint Management</h2>
            </div>
          </div>

          <div className="connector connector-root" aria-hidden="true" />

          <div className="category-grid">
            {complaintTypes.map((category) => (
              <article className={`category-card ${category.tone}`} key={category.key}>
                <div className="category-icon">{category.icon}</div>
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
                <div className="level-connector" aria-hidden="true" />
                <div className="level-grid">
                  {levels.map((level) => (
                    <button
                      className="level-card"
                      key={level.title}
                      onClick={() => openComplaint(category, level)}
                    >
                      <span className="level-icon">{level.icon}</span>
                      <strong>{level.title}</strong>
                      <small>{level.description}</small>
                      <span className="level-action">Report →</span>
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="resolve-connector" aria-hidden="true" />
          <div className="resolve-card">
            <div className="resolve-icon">▥</div>
            <div>
              <span>FINAL STAGE</span>
              <h2>Report and Resolve</h2>
              <p>Track the complaint from submission through review, action and resolution.</p>
            </div>
          </div>
        </section>

        <section className="quick-help">
          <div>
            <span className="section-label">HOW IT WORKS</span>
            <h2>Simple, clear and accountable.</h2>
          </div>
          <div className="help-steps">
            <div><b>01</b><span>Choose category</span></div>
            <div><b>02</b><span>Choose complaint level</span></div>
            <div><b>03</b><span>Submit and track</span></div>
          </div>
        </section>
      </main>

      {selected && (
        <div className="complaint-modal" role="dialog" aria-modal="true" aria-label="Complaint submission">
          <div className="modal-card">
            <button className="modal-close" onClick={closeComplaint} aria-label="Close">×</button>
            <span className="section-label">NEW COMPLAINT</span>
            <h2>{selected.category.title}</h2>
            <p className="modal-subtitle">{selected.level.title}</p>

            {result?.type === 'success' ? (
              <div className="submission-success">
                <div className="success-icon">✓</div>
                <h3>Complaint submitted successfully</h3>
                <p>Your complaint has been recorded and is now available for review.</p>
                <div className="complaint-reference">
                  <span>Complaint ID</span>
                  <strong>{result.complaintId}</strong>
                </div>
                <div className="complaint-reference">
                  <span>Status</span>
                  <strong>{result.status}</strong>
                </div>
                <button className="submit-complaint" type="button" onClick={closeComplaint}>DONE</button>
              </div>
            ) : (
              <form onSubmit={submitComplaint}>
                <label>
                  Subject
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={updateField}
                    maxLength="180"
                    required
                    type="text"
                    placeholder="Briefly describe the issue"
                  />
                </label>
                <label>
                  Description
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    maxLength="5000"
                    required
                    rows="5"
                    placeholder="Explain the complaint in detail..."
                  />
                </label>
                <label>
                  Contact / Roll Number
                  <input
                    name="contact"
                    value={form.contact}
                    onChange={updateField}
                    maxLength="120"
                    required
                    type="text"
                    placeholder="Enter your details"
                  />
                </label>

                {result?.type === 'error' && <p className="form-error" role="alert">{result.message}</p>}

                <button className="submit-complaint" type="submit" disabled={submitting}>
                  {submitting ? 'SUBMITTING…' : 'SUBMIT COMPLAINT →'}
                </button>
              </form>
            )}

            {!result?.type && (
              <p className="secure-note">Your complaint is sent securely to the website API and stored in the complaint database.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
