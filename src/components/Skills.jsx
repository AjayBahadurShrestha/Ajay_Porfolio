import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionLabel, sectionTitle } from './About'

const SKILLS = [
  { name:'React.js',   color:'#61dafb', orbit:120, speed:0.7,  angle:0,   size:22, label:'Intermediate' },
  { name:'JavaScript', color:'#f7df1e', orbit:175, speed:0.5,  angle:1.2, size:18, label:'Intermediate' },
  { name:'HTML/CSS',   color:'#e34f26', orbit:220, speed:0.38, angle:2.4, size:18, label:'Intermediate' },
  { name:'Python',     color:'#3776ab', orbit:155, speed:0.62, angle:3.6, size:20, label:'Intermediate' },
  { name:'C Lang',     color:'#a8b9cc', orbit:195, speed:0.45, angle:0.9, size:16, label:'Intermediate' },
  { name:'Git',        color:'#f05032', orbit:240, speed:0.28, angle:4.1, size:16, label:'Intermediate' },
]

const SKILL_CARDS = [
  { icon:'⚛️', name:'React.js',   pct:55 },
  { icon:'🌐', name:'HTML / CSS', pct:60 },
  { icon:'💛', name:'JavaScript', pct:55 },
  { icon:'🐍', name:'Python',     pct:50 },
  { icon:'⚙️', name:'C Language', pct:50 },
  { icon:'🔧', name:'Git / GitHub',pct:55 },
]

function OrbitCanvas() {
  const ref = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let t = 0, raf
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const onMove = e => {
      const r = c.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    c.addEventListener('mousemove', onMove)

    const draw = () => {
      const W = c.width, H = c.height
      ctx.clearRect(0, 0, W, H); t += 0.01
      const cx = W / 2, cy = H / 2
      const scale = Math.min(W, H) / 600

      SKILLS.forEach(s => {
        const orb = s.orbit * scale
        ctx.beginPath(); ctx.ellipse(cx, cy, orb, orb * 0.33, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1; ctx.stroke()
      })

      // Core
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 44 * scale)
      g.addColorStop(0, 'rgba(0,245,255,0.35)'); g.addColorStop(1, 'transparent')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 44 * scale, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = 'rgba(0,245,255,0.85)'; ctx.beginPath(); ctx.arc(cx, cy, 7 * scale, 0, Math.PI * 2); ctx.fill()

      SKILLS.forEach(s => {
        const angle = s.angle + t * s.speed
        const orb = s.orbit * scale
        const x = cx + Math.cos(angle) * orb
        const y = cy + Math.sin(angle) * orb * 0.33
        const dx = x - mouse.current.x, dy = y - mouse.current.y
        const hover = Math.sqrt(dx * dx + dy * dy) < 38 * scale
        const sz = s.size * scale

        const glow = ctx.createRadialGradient(x, y, 0, x, y, hover ? 38 * scale : 20 * scale)
        glow.addColorStop(0, s.color + '77'); glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(x, y, hover ? 38 * scale : 20 * scale, 0, Math.PI * 2); ctx.fill()

        ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2)
        ctx.fillStyle = hover ? s.color : s.color + 'aa'; ctx.fill()

        ctx.fillStyle = '#fff'
        ctx.font = `bold ${(hover ? 11 : 9) * scale}px Orbitron, monospace`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(s.name, x, y)
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); c.removeEventListener('mousemove', onMove) }
  }, [])

  return <canvas ref={ref} style={{ width:'100%', height:'100%', cursor:'none' }}/>
}

export default function Skills() {
  const { ref, visible } = useReveal(0.1)
  const cardsRef = useReveal(0.2)

  return (
    <section id="skills" ref={ref} style={{
      position:'relative', zIndex:1,
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'100px clamp(20px,5vw,48px)',
    }}>
      <div style={{
        textAlign:'center', marginBottom:'clamp(32px,5vw,64px)',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
        transition:'all 0.8s ease',
      }}>
        <SectionLabel>02 / Skills</SectionLabel>
        <h2 style={sectionTitle}>My <span style={{color:'#00f5ff'}}>Arsenal</span></h2>
        <p style={{ color:'#7a7a9a', fontSize:'clamp(13px,1.8vw,15px)', maxWidth:460, margin:'0 auto' }}>
          Tools and technologies I wield — all at intermediate level and growing every day
        </p>
      </div>

      {/* Orbit canvas */}
      <div style={{
        width:'100%', maxWidth:700,
        height:'clamp(280px,45vw,460px)',
        opacity: visible ? 1 : 0, transition:'all 0.8s 0.2s ease',
      }}>
        <OrbitCanvas/>
      </div>

      {/* Skill cards */}
      <div ref={cardsRef.ref} style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(clamp(130px,20vw,160px),1fr))',
        gap:'clamp(10px,2vw,16px)',
        width:'100%', maxWidth:900,
        marginTop:'clamp(28px,4vw,48px)',
      }}>
        {SKILL_CARDS.map((s, i) => (
          <SkillCard key={s.name} skill={s} delay={i * 80} visible={cardsRef.visible}/>
        ))}
      </div>
    </section>
  )
}

function SkillCard({ skill, delay, visible }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(0,245,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hov ? 'rgba(0,245,255,0.5)' : 'rgba(0,245,255,0.13)'}`,
        borderRadius:8, padding:'clamp(14px,2vw,20px) clamp(10px,2vw,16px)',
        textAlign:'center', cursor:'none',
        transform: visible ? (hov ? 'translateY(-6px)' : 'none') : 'translateY(30px)',
        opacity: visible ? 1 : 0,
        transition:`all 0.5s ${delay}ms ease`,
        boxShadow: hov ? '0 0 28px rgba(0,245,255,0.12)' : 'none',
      }}
    >
      <div style={{ fontSize:'clamp(24px,4vw,32px)', marginBottom:10 }}>{skill.icon}</div>
      <div style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(9px,1.2vw,11px)', fontWeight:700, color:'#fff', letterSpacing:1, marginBottom:10 }}>{skill.name}</div>
      <div style={{ height:2, background:'rgba(255,255,255,0.08)', borderRadius:2, overflow:'hidden' }}>
        <div style={{
          height:'100%', width: visible ? skill.pct + '%' : '0%',
          background:'linear-gradient(to right,#00f5ff,#b400ff)',
          borderRadius:2, transition:`width 1.2s ${delay + 200}ms ease`,
        }}/>
      </div>
      <div style={{ fontSize:11, color:'#7a7a9a', marginTop:6, fontFamily:'Space Mono,monospace', letterSpacing:1 }}>Intermediate</div>
    </div>
  )
}


