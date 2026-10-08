import './Highlights.css'
const items=[
  ['▣','Industry Connections','Strong links with leading companies and recruiters'],
  ['♧','30,000+ Students','A growing education network across India'],
  ['▤','90%+ Placement Rate','Career-focused training and placement support'],
  ['♧','NAAC Accredited','Academic excellence with a forward-looking approach'],
  ['⌁','500 Computers','Connected labs and modern digital infrastructure']
]
export default function Highlights(){return <section className="highlights">{items.map(([icon,title,text])=><div className="highlight" key={title}><b>{icon}</b><div><strong>{title}</strong><span>{text}</span></div></div>)}</section>}
