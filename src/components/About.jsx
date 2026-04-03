import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

function DNACanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let t = 0, raf
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const draw = () => {
      const W = c.width, H = c.height
      ctx.clearRect(0, 0, W, H); t += 0.022
      const cx = W / 2
      for (let i = 0; i < 220; i++) {
        const y = (i / 220) * H
        const phase = t + i * 0.09
        const x1 = cx + Math.cos(phase) * Math.min(55, W * 0.32)
        const x2 = cx + Math.cos(phase + Math.PI) * Math.min(55, W * 0.32)
        const sz = Math.abs(Math.cos(phase)) * 3.5 + 1
        ctx.beginPath(); ctx.arc(x1, y, sz, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,245,255,${0.45 - Math.abs(Math.cos(phase)) * 0.25})`
        ctx.fill()
        ctx.beginPath(); ctx.arc(x2, y, sz, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,0,255,${0.45 - Math.abs(Math.cos(phase + Math.PI)) * 0.25})`
        ctx.fill()
        if (i % 14 === 0) {
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y)
          ctx.strokeStyle = 'rgba(0,245,255,0.12)'; ctx.lineWidth = 1; ctx.stroke()
        }
      }
      const g = ctx.createRadialGradient(cx, H / 2, 0, cx, H / 2, 100)
      g.addColorStop(0, 'rgba(0,245,255,0.04)'); g.addColorStop(1, 'transparent')
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ width:'100%', height:'100%', borderRadius:8 }}/>
}

const timeline = [
  { year:'2023 — Now', title:'BSc. IT Student', desc:'LBEF Campus — studying information technology, algorithms, and software engineering.' },
  { year:'2023', title:'React Developer', desc:'Built real, interactive web applications using React.js and modern JavaScript.' },
  { year:'2022', title:'Web Dev Journey Begins', desc:'Learned HTML, CSS, and JavaScript — started creating things for the browser.' },
  { year:'2022', title:'First Lines of Code', desc:'Wrote my first C program. That single line ignited a passion that never stopped.' },
]

export default function About() {
  const { ref, visible } = useReveal()

  return (
    <section id="about" ref={ref} style={{
      position:'relative', zIndex:1,
      minHeight:'100vh', display:'flex', alignItems:'center',
      justifyContent:'center', flexWrap:'wrap',
      gap:'clamp(32px,5vw,80px)',
      padding:'100px clamp(20px,5vw,48px)',
    }}>
      {/* DNA canvas */}
      <div style={{
        flex:'0 0 clamp(240px,30vw,340px)',
        height:'clamp(300px,45vw,420px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateX(-40px)',
        transition:'all 0.8s ease',
      }}>
        <DNACanvas/>
      </div>

      {/* Content */}
      <div style={{
        flex:'1 1 clamp(280px,40vw,560px)', maxWidth:580,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateX(40px)',
        transition:'all 0.8s 0.15s ease',
      }}>
        <SectionLabel>01 / About Me</SectionLabel>
        <h2 style={sectionTitle}>Who Am <span style={{color:'#00f5ff'}}>I?</span></h2>

        <p style={bodyText}>
          I'm Ajay Bahadur Shrestha — a passionate web developer and programmer currently studying at{' '}
          <strong style={{color:'#00f5ff'}}>LBEF Campus</strong>, Nepal. I love crafting clean, interactive, and meaningful digital products.
        </p>
        <p style={{...bodyText, marginTop:-14}}>
          My stack revolves around <strong style={{color:'#00f5ff'}}>React.js</strong>, and I also work with Python and C.
          When I'm not coding, I'm exploring new technologies and pushing limits.
        </p>

        <div style={{ position:'relative', paddingLeft:28, marginTop:8 }}>
          <div style={{
            position:'absolute', left:0, top:0, bottom:0, width:1,
            background:'linear-gradient(to bottom,#00f5ff,#b400ff,transparent)',
          }}/>
          {timeline.map((item, i) => (
            <div key={i} style={{ position:'relative', marginBottom:26 }}>
              <div style={{
                position:'absolute', left:-32, top:6,
                width:8, height:8, borderRadius:'50%',
                background:'#00f5ff', boxShadow:'0 0 10px #00f5ff',
              }}/>
              <p style={{ fontFamily:'Space Mono,monospace', fontSize:11, color:'#b400ff', letterSpacing:2, marginBottom:3 }}>{item.year}</p>
              <p style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(12px,1.5vw,14px)', fontWeight:700, color:'#fff', marginBottom:3 }}>{item.title}</p>
              <p style={{ fontSize:'clamp(12px,1.5vw,14px)', color:'#7a7a9a', lineHeight:1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily:'Space Mono,monospace', fontSize:'clamp(9px,1.2vw,11px)',
      color:'#00f5ff', letterSpacing:'clamp(2px,0.5vw,5px)', textTransform:'uppercase',
      marginBottom:12, display:'flex', alignItems:'center', gap:12,
    }}>
      <span style={{ display:'inline-block', width:28, height:1, background:'#00f5ff' }}/>
      {children}
    </p>
  )
}

export const sectionTitle = {
  fontFamily:'Orbitron,monospace',
  fontSize:'clamp(24px,5vw,48px)',
  fontWeight:700, lineHeight:1.15,
  marginBottom:24, color:'#fff',
}
const bodyText = { fontSize:'clamp(13px,1.8vw,16px)', lineHeight:1.9, color:'#7a7a9a', marginBottom:18 }
