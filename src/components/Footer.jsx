import { useEffect, useState } from 'react'

export function Footer() {
  return (
    <footer style={{
      position:'relative', zIndex:1,
      textAlign:'center', padding:'clamp(24px,4vw,40px)',
      borderTop:'1px solid rgba(0,245,255,0.08)',
      fontFamily:'Space Mono,monospace',
      fontSize:'clamp(9px,1.2vw,11px)', color:'#7a7a9a',
      letterSpacing:2,
    }}>
      <p>Designed &amp; built by <span style={{color:'#00f5ff'}}>Ajay Bahadur Shrestha</span> — <span style={{color:'#00f5ff'}}>2025</span></p>
      <p style={{ marginTop:8, fontSize:'clamp(8px,1vw,10px)', color:'#333' }}>
        🕹 Try the Konami Code for a surprise
      </p>
    </footer>
  )
}

const KONAMI = [38,38,40,40,37,39,37,39,66,65]

export function EasterEgg() {
  const [active, setActive] = useState(false)
  useEffect(() => {
    let idx = 0
    const onKey = (e) => {
      if (e.keyCode === KONAMI[idx]) {
        idx++
        if (idx === KONAMI.length) { setActive(true); idx = 0 }
      } else { idx = 0 }
      if (e.key === 'Escape') setActive(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!active) return null
  return (
    <div onClick={() => setActive(false)} style={{
      position:'fixed', inset:0, zIndex:99999,
      background:'rgba(0,0,0,0.96)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:20,
      cursor:'none',
    }}>
      <p style={{
        fontFamily:'Orbitron,monospace', fontSize:'clamp(18px,4vw,28px)',
        color:'#00f5ff', letterSpacing:4, animation:'glitch 0.5s infinite',
        textAlign:'center', padding:'0 20px',
      }}>🎮 HACKER MODE ACTIVATED</p>
      <p style={{ fontFamily:'Space Mono,monospace', color:'#7a7a9a', fontSize:'clamp(10px,1.5vw,14px)', letterSpacing:3, textAlign:'center', padding:'0 20px' }}>
        you found the secret — press ESC or click to return
      </p>
      <div style={{ color:'#ff0080', fontFamily:'Space Mono,monospace', fontSize:12, letterSpacing:3, marginTop:10 }}>[ ESC ] CLOSE</div>
    </div>
  )
}
