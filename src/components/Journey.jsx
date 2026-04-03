import { useReveal } from '../hooks/useReveal'
import { SectionLabel, sectionTitle } from './About'

const JOURNEY = [
  { year:'2022', role:'First Lines of Code', org:'Hello, World.', desc:"Wrote my first C program. That single print statement ignited a passion I haven't stopped feeding since.", color:'#00f5ff' },
  { year:'2022', role:'Python Explorer', org:'Self-taught', desc:'Dove into Python — scripting, automation, and algorithms. Built small projects to solidify fundamentals.', color:'#b400ff' },
  { year:'2023', role:'Web Dev Journey Begins', org:'HTML → CSS → JS → React', desc:'Fell in love with the web. Learned React and began building real, interactive applications.', color:'#ff0080' },
  { year:'2023 — Now', role:'BSc. IT @ LBEF', org:'LBEF Campus, Nepal', desc:'Studying computer science fundamentals, software engineering, and expanding my technical horizon every day.', color:'#00ff88' },
  { year:'Future', role:'Next Chapter...', org:'To be written', desc:'Growing. Building. Shipping. The story continues.', color:'#00f5ff', pulse:true },
]

function JourneyItem({ item, index, visible }) {
  const isEven = index % 2 === 0
  return (
    <div style={{
      display:'flex', alignItems:'flex-start',
      justifyContent: isEven ? 'flex-start' : 'flex-end',
      marginBottom:'clamp(40px,6vw,60px)',
      position:'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : `translateX(${isEven ? -30 : 30}px)`,
      transition: `all 0.7s ${index * 100}ms ease`,
    }}>
      {/* Dot */}
      <div style={{
        position:'absolute',
        left:'50%', top:20,
        transform:'translateX(-50%)',
        width:12, height:12, borderRadius:'50%',
        background: item.color,
        boxShadow: `0 0 12px ${item.color}`,
        animation: item.pulse ? 'pulse 2s infinite' : 'none',
        zIndex:2,
      }}/>

      {/* Card — half width, alternating sides */}
      <div style={{
        width:'calc(50% - 32px)',
        marginLeft: isEven ? 0 : 'auto',
        marginRight: isEven ? 'auto' : 0,
        background:'rgba(255,255,255,0.03)',
        border: `1px solid ${item.pulse ? 'rgba(0,245,255,0.3)' : 'rgba(0,245,255,0.12)'}`,
        borderRadius:8, padding:'clamp(14px,2.5vw,24px)',
      }}>
        <p style={{ fontFamily:'Space Mono,monospace', fontSize:10, color: item.color, letterSpacing:2, marginBottom:5 }}>{item.year}</p>
        <p style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(12px,1.5vw,15px)', fontWeight:700, color:'#fff', marginBottom:4 }}>{item.role}</p>
        <p style={{ fontSize:'clamp(11px,1.3vw,13px)', color:'#b400ff', marginBottom:8 }}>{item.org}</p>
        <p style={{ fontSize:'clamp(12px,1.5vw,13px)', color:'#7a7a9a', lineHeight:1.7 }}>{item.desc}</p>
      </div>
    </div>
  )
}

// Mobile-friendly stacked version
function JourneyItemMobile({ item, index, visible }) {
  return (
    <div style={{
      display:'flex', gap:16, marginBottom:32,
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateX(-20px)',
      transition: `all 0.6s ${index * 100}ms ease`,
    }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
        <div style={{
          width:10, height:10, borderRadius:'50%', marginTop:18,
          background: item.color, boxShadow: `0 0 10px ${item.color}`,
          animation: item.pulse ? 'pulse 2s infinite' : 'none',
          flexShrink:0,
        }}/>
        <div style={{ width:1, flex:1, background:`linear-gradient(to bottom, ${item.color}44, transparent)`, marginTop:6 }}/>
      </div>
      <div style={{
        background:'rgba(255,255,255,0.03)',
        border:`1px solid rgba(0,245,255,0.12)`,
        borderRadius:8, padding:'14px 16px', flex:1,
      }}>
        <p style={{ fontFamily:'Space Mono,monospace', fontSize:9, color: item.color, letterSpacing:2, marginBottom:4 }}>{item.year}</p>
        <p style={{ fontFamily:'Orbitron,monospace', fontSize:'clamp(12px,3vw,14px)', fontWeight:700, color:'#fff', marginBottom:3 }}>{item.role}</p>
        <p style={{ fontSize:'clamp(11px,2.5vw,12px)', color:'#b400ff', marginBottom:7 }}>{item.org}</p>
        <p style={{ fontSize:'clamp(11px,2.5vw,13px)', color:'#7a7a9a', lineHeight:1.65 }}>{item.desc}</p>
      </div>
    </div>
  )
}

export default function Journey() {
  const { ref, visible } = useReveal(0.1)
  const list = useReveal(0.1)

  return (
    <section id="journey" ref={ref} style={{
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
        <SectionLabel>04 / Journey</SectionLabel>
        <h2 style={sectionTitle}>My <span style={{color:'#00f5ff'}}>Path</span></h2>
      </div>

      {/* Desktop timeline */}
      <div ref={list.ref} style={{ position:'relative', width:'100%', maxWidth:840 }} className="journey-desktop">
        <div style={{
          position:'absolute', left:'50%', top:0, bottom:0,
          width:1, transform:'translateX(-50%)',
          background:'linear-gradient(to bottom,#00f5ff,#b400ff,#ff0080,#00ff88,transparent)',
        }}/>
        {JOURNEY.map((item, i) => (
          <JourneyItem key={i} item={item} index={i} visible={list.visible}/>
        ))}
      </div>

      {/* Mobile timeline */}
      <div ref={list.ref} style={{ width:'100%', maxWidth:560 }} className="journey-mobile">
        {JOURNEY.map((item, i) => (
          <JourneyItemMobile key={i} item={item} index={i} visible={list.visible}/>
        ))}
      </div>

      <style>{`
        .journey-mobile { display: none; }
        @media(max-width: 640px) {
          .journey-desktop { display: none; }
          .journey-mobile { display: block; }
        }
      `}</style>
    </section>
  )
}
