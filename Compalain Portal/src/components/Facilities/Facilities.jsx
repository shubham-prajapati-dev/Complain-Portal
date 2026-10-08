import './Facilities.css'
const cards=[
  ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=80','Smart Classrooms','▣','Technology-enabled classrooms designed for interactive and student-centred learning.'],
  ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=700&q=80','Computer & Research Labs','⌁','Modern computer labs, connected infrastructure and resources for technical learning.'],
  ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=700&q=80','Library','▤','A well-stocked library with course books and reference resources for learning and research.'],
  ['https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=700&q=80','Sports & Hostel','♧','Hostel, sports, recreation and student-support facilities for holistic development.']
]
export default function Facilities(){return <section id="facilities" className="section facilities"><p className="eyebrow">FACILITIES</p><h2>Infrastructure for Future-Ready Learning</h2><div className="facility-grid">{cards.map(([img,title,icon,text])=><article key={title}><div className="facility-img"><img src={img} alt={title}/><span>{icon}</span></div><div className="facility-copy"><h3>{title}</h3><p>{text}</p></div></article>)}</div><a className="view-btn" href="https://allenhouse.ac.in/it-infrastructure/">VIEW ALL FACILITIES <span>→</span></a></section>}
