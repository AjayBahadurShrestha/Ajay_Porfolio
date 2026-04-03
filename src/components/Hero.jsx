import { useEffect, useRef, useState } from 'react'

const PHRASES = ['React Developer', 'Web Designer', 'Problem Solver', 'Creative Coder', 'Python Programmer']

function useTyped() {
  const [text, setText] = useState('')
  useEffect(() => {
    let pi = 0, ci = 0, deleting = false, timer
    const tick = () => {
      const phrase = PHRASES[pi]
      if (!deleting) {
        setText(phrase.slice(0, ++ci))
        if (ci === phrase.length) { deleting = true; timer = setTimeout(tick, 1800); return }
      } else {
        setText(phrase.slice(0, --ci))
        if (ci === 0) { deleting = false; pi = (pi + 1) % PHRASES.length }
      }
      timer = setTimeout(tick, deleting ? 55 : 105)
    }
    timer = setTimeout(tick, 1400)
    return () => clearTimeout(timer)
  }, [])
  return text
}

function SphereCanvas() {
  const ref = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let t = 0, raf, W, H

    const resize = () => {
      W = c.width = c.offsetWidth
      H = c.height = c.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const R = Math.min(W, H) * 0.28
    const LAT = 10, LNG = 16

    function getSphereLines(rX, rY) {
      const lines = []
      for (let i = 0; i <= LAT; i++) {
        const phi = (i / LAT) * Math.PI
        const pts = []
        for (let j = 0; j <= LNG; j++) {
          const theta = (j / LNG) * Math.PI * 2
          let x = R * Math.sin(phi) * Math.cos(theta)
          let y = R * Math.sin(phi) * Math.sin(theta)
          let z = R * Math.cos(phi)
          const x2 = x * Math.cos(rY) - z * Math.sin(rY)
          const z2 = x * Math.sin(rY) + z * Math.cos(rY)
          const y2 = y * Math.cos(rX) - z2 * Math.sin(rX)
          const z3 = y * Math.sin(rX) + z2 * Math.cos(rX)
          pts.push({ x: x2, y: y2, z: z3 })
        }
        lines.push(pts)
      }
      for (let j = 0; j <= LNG; j++) {
        const pts = []
        for (let i = 0; i <= LAT; i++) {
          const phi = (i / LAT) * Math.PI
          const theta = (j / LNG) * Math.PI * 2
          let x = R * Math.sin(phi) * Math.cos(theta)
          let y = R * Math.sin(phi) * Math.sin(theta)
          let z = R * Math.cos(phi)
          const x2 = x * Math.cos(rY) - z * Math.sin(rY)
          const z2 = x * Math.sin(rY) + z * Math.cos(rY)
          const y2 = y * Math.cos(rX) - z2 * Math.sin(rX)
          const z3 = y * Math.sin(rX) + z2 * Math.cos(rX)
          pts.push({ x: x2, y: y2, z: z3 })
        }
        lines.push(pts)
      }
      return lines
    }

    function project(x, y, z, cx, cy) {
      const fov = 400, dz = fov + z
      return { x: cx + x * fov / dz, y: cy + y * fov / dz }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.007
      const rY = t + mouse.current.x * 0.35
      const rX = 0.28 + mouse.current.y * 0.18
      const cx = W / 2, cy = H / 2
      const lines = getSphereLines(rX, rY)
      lines.forEach(pts => {
        ctx.beginPath()
        pts.forEach((p, i) => {
          const pr = project(p.x, p.y, p.z, cx, cy)
          const alpha = (p.z + R) / (R * 2)
          if (i === 0) ctx.moveTo(pr.x, pr.y)
          else ctx.lineTo(pr.x, pr.y)
          ctx.strokeStyle = `rgba(0,245,255,${alpha * 0.22})`
        })
        ctx.lineWidth = 0.7; ctx.stroke()
      })
      // rings
      for (let r = 0; r < 3; r++) {
        const rad = R * 0.45 + r * R * 0.35 + Math.sin(t + r) * 8
        ctx.beginPath()
        ctx.ellipse(cx, cy, rad, rad * 0.28, t * 0.4 + r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(180,0,255,${0.12 - r * 0.03})`
        ctx.lineWidth = 1; ctx.stroke()
      }
      // glow core
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.4)
      g.addColorStop(0, 'rgba(0,245,255,0.25)'); g.addColorStop(1, 'transparent')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 0.4, 0, Math.PI * 2); ctx.fill()
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}/>
}

export default function Hero() {
  const typed = useTyped()

  return (
    <section id="hero" style={{
      position:'relative', minHeight:'100vh',
      display:'flex', alignItems:'center', justifyContent:'center',
      flexDirection:'column', textAlign:'center',
      padding:'100px clamp(20px,5vw,48px) 60px',
      overflow:'hidden',
    }}>
      <SphereCanvas/>

      <div style={{ position:'relative', zIndex:2 }}>
        <p style={{
          fontFamily:'Space Mono,monospace', fontSize:'clamp(9px,1.5vw,12px)',
          color:'#00f5ff', letterSpacing:'4px', marginBottom:16,
          animation:'fadeUp 0.8s 0.5s both',
        }}>// INITIALIZING PORTFOLIO...</p>

        <h1 style={{
          fontFamily:'Orbitron,monospace',
          fontSize:'clamp(28px,8vw,84px)',
          fontWeight:900, lineHeight:1.05, letterSpacing:'clamp(1px,0.3vw,3px)',
          background:'linear-gradient(135deg,#fff 0%,#00f5ff 50%,#b400ff 100%)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
          animation:'fadeUp 0.8s 0.7s both', marginBottom:10,
        }}>
          AJAY BAHADUR<br/>SHRESTHA
        </h1>

        <p style={{
          fontFamily:'Rajdhani,sans-serif',
          fontSize:'clamp(13px,3vw,22px)',
          fontWeight:300, color:'#7a7a9a',
          letterSpacing:'clamp(3px,1vw,6px)', textTransform:'uppercase',
          animation:'fadeUp 0.8s 0.9s both', marginBottom:24,
        }}>Web Developer &amp; Programmer</p>

        <div style={{ height:28, animation:'fadeUp 0.8s 1.05s both' }}>
          <span style={{
            fontFamily:'Space Mono,monospace', fontSize:'clamp(11px,2vw,15px)',
            color:'#00ff88', borderRight:'2px solid #00ff88',
            animation:'blink 0.75s infinite', paddingRight:3,
          }}>{typed}</span>
        </div>

        <p style={{
          fontSize:'clamp(13px,2vw,16px)', color:'#7a7a9a',
          maxWidth:480, margin:'20px auto 36px', lineHeight:1.85,
          animation:'fadeUp 0.8s 1.2s both',
        }}>
          Building immersive digital experiences at the intersection of code, design, and creativity.
          Student · Developer · Explorer.
        </p>

        <div style={{
          display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap',
          animation:'fadeUp 0.8s 1.35s both',
        }}>
          <a href="#projects" style={btnPrimary}>View Projects</a>
          <a href="#contact" style={btnSecondary}>Contact Me</a>
        </div>
      </div>

      {/* scroll hint */}
      <div style={{
        position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:8,
        animation:'fadeUp 0.8s 2s both',
      }}>
        <span style={{ fontFamily:'Space Mono,monospace', fontSize:10, color:'#7a7a9a', letterSpacing:3 }}>SCROLL</span>
        <div style={{
          width:1, height:56,
          background:'linear-gradient(to bottom,#00f5ff,transparent)',
          animation:'scrollLine 2s infinite',
        }}/>
      </div>
    </section>
  )
}

const btnPrimary = {
  padding:'clamp(10px,2vw,14px) clamp(24px,4vw,36px)',
  background:'transparent', border:'1px solid #00f5ff',
  color:'#00f5ff', fontFamily:'Orbitron,monospace',
  fontSize:'clamp(9px,1.2vw,12px)', fontWeight:700,
  letterSpacing:'clamp(1px,0.3vw,3px)', textDecoration:'none',
  textTransform:'uppercase', cursor:'none',
  transition:'all 0.3s', display:'inline-block',
}
const btnSecondary = {
  ...btnPrimary,
  borderColor:'rgba(0,245,255,0.2)', color:'#7a7a9a',
}
