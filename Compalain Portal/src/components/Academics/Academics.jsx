import './Academics.css'
const cards=[
  ['▤','B.Tech','CSE, CSE (AI & ML), Electronics & Communication Engineering and Mechanical Engineering.'],
  ['♟','MBA & Management','Strategic leadership, business skills and industry-oriented management education.'],
  ['☼','BBA & BCA','Career-focused programs in business administration and computer applications.'],
  ['♜','MCA & Innovation','Advanced computing, research, innovation and practical technology skills.']
]
export default function Academics(){return <section id="academics" className="section academics"><p className="eyebrow">ACADEMICS</p><h2>Learn. Innovate. Lead.</h2><div className="academic-grid">{cards.map(([icon,title,text])=><article key={title}><b>{icon}</b><h3>{title}</h3><p>{text}</p></article>)}</div></section>}
