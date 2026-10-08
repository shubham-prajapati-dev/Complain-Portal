import { useState } from "react";
import "./Hero.css";
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85",
    title: "Inspiring Excellence,",
    accent: "Building Futures",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85",
    title: "Learn. Grow. Achieve.",
    accent: "Together.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85",
    title: "A Future Ready",
    accent: "Education.",
  },
];
export default function Hero() {
  const [index, setIndex] = useState(0),
    slide = slides[index];
  return (
    <section
      id="home"
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg,rgba(4,24,22,.82),rgba(4,24,22,.2) 68%),url(${slide.image})`,
      }}
    >
      <button
        className="hero-arrow left"
        onClick={() => setIndex((index - 1 + slides.length) % slides.length)}
      >
        ‹
      </button>
      <div className="hero-content">
        <p className="eyebrow light">TRIDENT PUBLIC SCHOOL</p>
        <h1>
          {slide.title}
          <br />
          <em>{slide.accent}</em>
        </h1>
        <p>
          At Trident Public School, we nurture young minds with strong values,
          modern learning and boundless opportunities.
        </p>
        <div className="hero-actions">
          <a href="#admissions" className="gold-btn">
            ADMISSION OPEN <span>→</span>
          </a>
          <a href="#facilities" className="outline-btn">
            EXPLORE CAMPUS <span>→</span>
          </a>
        </div>
      </div>
      <button
        className="hero-arrow right"
        onClick={() => setIndex((index + 1) % slides.length)}
      >
        ›
      </button>
      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === index ? "active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
