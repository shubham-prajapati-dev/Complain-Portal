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

  return (
    <div className="complaint-page">
      <header className="complaint-header">
        <a className="complaint-brand" href="/">
          <span className="complaint-brand-mark">T</span>
          <span>
            <strong>TRIDENT</strong>
            <small>PUBLIC SCHOOL</small>
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
                      onClick={() => setSelected({ category, level })}
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
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <span className="section-label">NEW COMPLAINT</span>
            <h2>{selected.category.title}</h2>
            <p className="modal-subtitle">{selected.level.title}</p>
            <form onSubmit={(event) => event.preventDefault()}>
              <label>
                Subject
                <input type="text" placeholder="Briefly describe the issue" />
              </label>
              <label>
                Description
                <textarea rows="5" placeholder="Explain the complaint in detail..." />
              </label>
              <label>
                Contact / Roll Number
                <input type="text" placeholder="Enter your details" />
              </label>
              <button className="submit-complaint" type="submit">SUBMIT COMPLAINT →</button>
            </form>
            <p className="demo-note">Demo interface — connect this form to your backend/API for real submissions.</p>
          </div>
        </div>
      )}
    </div>
  )
}
