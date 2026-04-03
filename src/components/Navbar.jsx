import { useState, useEffect } from 'react'

const links = ['About', 'Skills', 'Projects', 'Journey', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: 'clamp(14px,2vw,20px) clamp(20px,5vw,48px)',
    background: scrolled ? 'rgba(3,1,10,0.92)' : 'rgba(3,1,10,0.6)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,245,255,0.08)',
    transition: 'background 0.4s',
  }

  return (
    <nav style={nav}>
      <div style={{
        fontFamily:'Orbitron,monospace', fontSize:'clamp(14px,2vw,18px)',
        fontWeight:900, color:'#00f5ff', letterSpacing:'3px',
        textShadow:'0 0 18px #00f5ff',
      }}>ABS</div>

      {/* Desktop links */}
      <ul style={{
        display:'flex', gap:'clamp(20px,3vw,36px)', listStyle:'none',
        '@media(max-width:640px)':{ display:'none' }
      }} className="nav-desktop">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontFamily:'Rajdhani,sans-serif', fontSize:'clamp(11px,1.2vw,13px)',
              fontWeight:600, color:'#7a7a9a', textDecoration:'none',
              letterSpacing:'2px', textTransform:'uppercase',
              transition:'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color='#00f5ff'}
            onMouseLeave={e => e.target.style.color='#7a7a9a'}
            >{l}</a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display:'none', background:'none', border:'1px solid rgba(0,245,255,0.3)',
          color:'#00f5ff', padding:'8px 12px', cursor:'none',
          fontFamily:'Space Mono,monospace', fontSize:'11px', letterSpacing:'2px',
        }}
        aria-label="Toggle menu"
      >MENU</button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:'fixed', top:0, left:0, right:0, bottom:0,
          background:'rgba(3,1,10,0.97)', zIndex:200,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:32,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position:'absolute', top:24, right:24, background:'none',
            border:'none', color:'#7a7a9a', fontSize:24, cursor:'none',
          }}>✕</button>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:'Orbitron,monospace', fontSize:'clamp(20px,5vw,28px)',
                fontWeight:700, color:'#e8e8f0', textDecoration:'none',
                letterSpacing:'4px', textTransform:'uppercase',
                transition:'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color='#00f5ff'}
              onMouseLeave={e => e.target.style.color='#e8e8f0'}
            >{l}</a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:640px){
          .nav-desktop{ display:none !important; }
          .nav-hamburger{ display:block !important; }
        }
      `}</style>
    </nav>
  )
}
