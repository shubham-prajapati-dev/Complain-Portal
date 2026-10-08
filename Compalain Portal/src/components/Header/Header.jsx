import { useState } from 'react'
import './Header.css'

const navItems = ['HOME', 'ABOUT US', 'ACADEMICS', 'FACILITIES', 'ADMISSIONS', 'GALLERY', 'CONTACT US']

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="utility-left">
          <span>☎ +91 8127505222</span>
          <span>✉ info@allenhouse.ac.in</span>
          <span>⌖ Rooma, Kanpur, Uttar Pradesh</span>
        </div>
        <div className="utility-right">
          <span>Placements</span>
          <span>Alumni</span>
          <span>News & Events</span>
          <span>Student Life</span>
          <a href="#admissions">ADMISSIONS OPEN</a>
          <a className="complaint-link" href="/complaints.html">COMPLAINT PORTAL</a>
        </div>
      </div>

      <div className="nav-wrap">
        <a className="brand" href="#home">
          <div className="brand-mark"><img src="https://allenhouse.ac.in/favicon.ico" alt="Allenhouse logo" /></div>
          <div>
            <strong>ALLENHOUSE</strong>
            <small>GROUP OF INSTITUTIONS</small>
          </div>
        </a>

        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? '×' : '☰'}
        </button>

        <nav className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} className={item === 'HOME' ? 'active' : ''} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setOpen(false)}>
              {item}
              {['ACADEMICS', 'FACILITIES', 'ADMISSIONS'].includes(item) && <span>⌄</span>}
            </a>
          ))}
          <a className="mobile-complaint-link" href="/complaints.html" onClick={() => setOpen(false)}>COMPLAINT PORTAL</a>
          <button className="search-btn" aria-label="Search">⌕</button>
        </nav>
      </div>
    </header>
  )
}
