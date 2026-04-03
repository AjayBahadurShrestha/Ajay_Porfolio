import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionLabel, sectionTitle } from './About'

const PROJECTS = [
  {
    num:'001', title:'Project Alpha',
    desc:'A full-stack web application built with React. Interactive, responsive, and fast. Real project details coming soon.',
    tech:['React','JavaScript','CSS'],
    shape:'cube', color:'#00f5ff',
  },
  {
    num:'002', title:'Project Beta',
    desc:'A Python-powered application exploring automation and data handling. Efficient and thoughtfully designed from the ground up.',
    tech:['Python','React','API'],
    shape:'torus', color:'#b400ff',
  },
  {
    num:'003', title:'Project Gamma',
    desc:'An interactive web experience pushing CSS and JavaScript. Smooth animations and UI at its core.',
    tech:['HTML','CSS','JavaScript'],
    shape:'pyramid', color:'#00ff88',
  },
]

function ShapeCanvas({ shape, color }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let t = 0, raf
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight }
    resize(); window.addEventListener('resize', resize)

    const draw = () => {
      const W = c.width, H = c.height
      ctx.clearRect(0, 0, W, H); t += 0.015
      const cx = W / 2, cy = H / 2
      const scale = Math.min(W, H) / 220

      function rot3(x, y, z) {
        const x2 = x * Math.cos(t) - z * Math.sin(t)
        const z2 = x * Math.sin(t) + z * Math.cos(t)
        const y2 = y * Math.cos(t * 0.6) - z2 * Math.sin(t * 0.6)
        const z3 = y * Math.sin(t * 0.6) + z2 * Math.cos(t * 0.6)
        const fov = 350; const d = fov + z3
        return { x: cx + x2 * fov / d, y: cy + y2 * fov / d, z: z3 }
      }
      function hexAlpha(z, base = 180) {
        const a = Math.max(40, Math.min(base, base * ((z + 80) / 160)))
        return Math.round(a).toString(16).padStart(2,'0')
      }

      if (shape === 'cube') {
        const s = 50 * scale
        const v = [[-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],[-s,-s,s],[s,-s,s],[s,s,s],[-s,s,s]]
        const e = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
        const p = v.map(([x,y,z]) => rot3(x,y,z))
        e.forEach(([a,b]) => {
          ctx.beginPath(); ctx.moveTo(p[a].x, p[a].y); ctx.lineTo(p[b].x, p[b].y)
          ctx.strokeStyle = color + hexAlpha((p[a].z+p[b].z)/2)
          ctx.lineWidth = 1.5; ctx.stroke()
        })
      } else if (shape === 'torus') {
        const R2 = 55 * scale, r2 = 20 * scale
        for (let i = 0; i < 48; i++) {
          const u = (i / 48) * Math.PI * 2 + t
          for (let j = 0; j < 16; j++) {
            const v2 = (j / 16) * Math.PI * 2
            const x = (R2 + r2 * Math.cos(v2)) * Math.cos(u)
            const y = (R2 + r2 * Math.cos(v2)) * Math.sin(u)
            const z = r2 * Math.sin(v2)
            const x2 = x * Math.cos(t * 0.3) - z * Math.sin(t * 0.3)
            const z2 = x * Math.sin(t * 0.3) + z * Math.cos(t * 0.3)
            const fov = 350; const pr = { x: cx + x2 * fov / (fov + z2), y: cy + y * fov / (fov + z2) }
            const alpha = Math.max(0.1, (z2 + 80) / 160)
            ctx.beginPath(); ctx.arc(pr.x, pr.y, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = color + Math.round(alpha * 200).toString(16).padStart(2,'0')
            ctx.fill()
          }
        }
      } else {
        const h = 60 * scale
        const base = [[-55*scale,h,-55*scale],[55*scale,h,-55*scale],[55*scale,h,55*scale],[-55*scale,h,55*scale]]
        const apex = [0,-h,0]
        const pb = base.map(([x,y,z]) => rot3(x,y,z))
        const pa = rot3(...apex)
        const all = [...pb, pa]
        const edges = [[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]]
        edges.forEach(([a,b]) => {
          ctx.beginPath(); ctx.moveTo(all[a].x, all[a].y); ctx.lineTo(all[b].x, all[b].y)
          const az = ((all[a].z||0)+(all[b].z||0))/2
          ctx.strokeStyle = color + hexAlpha(az, 220)
          ctx.lineWidth = 1.5; ctx.stroke()
        })
      }

      // floor grid
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath()
        ctx.moveTo(cx + i * 22 * scale, cy + 70 * scale)
        ctx.lineTo(cx + i * 11 * scale, H)
        ctx.strokeStyle = `rgba(0,245,255,${Math.abs(i)===3?0.04:0.08})`
        ctx.lineWidth = 0.5; ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [shape, color])
  return <canvas ref={ref} style={{ width:'100%', height:'100%' }}/>
}

function ProjectCard({ proj, delay, visible }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:'rgba(255,255,255,0.025)',
        border: `1px solid ${hov ? 'rgba(0,245,255,0.4)' : 'rgba(0,245,255,0.12)'}`,
        borderRadius:12, overflow:'hidden', cursor:'none',
        opacity: visible ? 1 : 0,
        transform: visible ? (hov ? 'translateY(-10px)' : 'none') : 'translateY(40px)',
        transition: `all 0.6s ${delay}ms ease`,
        boxShadow: hov ? '0 24px 60px rgba(0,0,0,0.5), 0 0 36px rgba(0,245,255,0.08)' : 'none',
      }}
    >
      <div style={{ height:'clamp(160px,20vw,200px)', background:'#07030f', position:'relative' }}>
        <ShapeCanvas shape={proj.shape} color={proj.color}/>
        {hov && <div style={{
          position:'absolute', inset:0,
          background:'radial-gradient(circle at center, rgba(0,245,255,0.08), transparent 70%)',
          pointerEvents:'none',
        }}/>}
      </div>
      <div style={{ padding:'clamp(16px,3vw,24px)' }}>
        <p style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'#00f5ff', letterSpacing:3, marginBottom:6 }}>// PROJECT_{proj.num}</p>
        <h3 style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(14px,2vw,18px)', fontWeight:700, color:'#fff', marginBottom:10 }}>{proj.title}</h3>
        <p style={{ fontSize:'clamp(12px,1.5vw,14px)', color:'#7a7a9a', lineHeight:1.7, marginBottom:18 }}>{proj.desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:18 }}>
          {proj.tech.map(t => (
            <span key={t} style={{
              fontFamily:'Space Mono,monospace', fontSize:10, padding:'3px 10px',
              border:'1px solid rgba(180,0,255,0.3)', color:'#b400ff',
              borderRadius:2, letterSpacing:1,
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {[['GitHub ↗','https://github.com/AjayBahadurShrestha'],['Live ↗','#']].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{
              fontFamily:'Orbitron,monospace', fontSize:'clamp(8px,1.2vw,10px)',
              fontWeight:700, letterSpacing:2, textDecoration:'none',
              padding:'8px 14px', border:'1px solid rgba(0,245,255,0.18)',
              color:'#7a7a9a', transition:'all 0.2s', cursor:'none',
            }}
            onMouseEnter={e => { e.target.style.borderColor='#00f5ff'; e.target.style.color='#00f5ff' }}
            onMouseLeave={e => { e.target.style.borderColor='rgba(0,245,255,0.18)'; e.target.style.color='#7a7a9a' }}
            >{label}</a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { ref, visible } = useReveal(0.1)
  const grid = useReveal(0.1)
  return (
    <section id="projects" ref={ref} style={{
      position:'relative', zIndex:1,
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'100px clamp(20px,5vw,48px)',
    }}>
      <div style={{
        textAlign:'center', marginBottom:'clamp(32px,5vw,64px)',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
        transition:'all 0.8s',
      }}>
        <SectionLabel>03 / Projects</SectionLabel>
        <h2 style={sectionTitle}>My <span style={{color:'#00f5ff'}}>Work</span></h2>
        <p style={{ color:'#7a7a9a', fontSize:'clamp(13px,1.8vw,15px)', maxWidth:460, margin:'0 auto' }}>
          Interactive digital experiences I've crafted — more coming soon
        </p>
      </div>
      <div ref={grid.ref} style={{
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(clamp(280px,30vw,340px),1fr))',
        gap:'clamp(16px,2.5vw,24px)',
        width:'100%', maxWidth:1100,
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} proj={p} delay={i * 120} visible={grid.visible}/>
        ))}
      </div>
    </section>
  )
}
