import './Gallery.css'
const images=[
  ['https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=700&q=80','Student activities'],
  ['https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80','Innovation event'],
  ['https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=700&q=80','Academic life'],
  ['https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=700&q=80','Campus event'],
  ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80','Student community']
]
export default function Gallery(){return <section id="gallery" className="section gallery"><div className="gallery-head"><div><p className="eyebrow">CAMPUS LIFE</p><h2>Events, Innovation & Student Life</h2></div><a className="view-btn" href="https://allenhouse.ac.in/gallery/">VIEW GALLERY <span>→</span></a></div><div className="gallery-grid">{images.map(([src,alt])=><img key={src} src={src} alt={alt}/>)}</div></section>}
