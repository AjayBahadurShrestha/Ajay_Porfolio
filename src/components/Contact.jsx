import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { SectionLabel, sectionTitle } from './About'

const CONTACTS = [
  { icon:'✉', label:'Email', value:'blackthunder9849017451@gmail.com', href:'mailto:blackthunder9849017451@gmail.com' },
  { icon:'⌥', label:'GitHub', value:'AjayBahadurShrestha', href:'https://github.com/AjayBahadurShrestha' },
  { icon:'in', label:'LinkedIn', value:'ajay-shrestha-67b37b33a', href:'https://www.linkedin.com/in/ajay-shrestha-67b37b33a/' },
  { icon:'📍', label:'Location', value:'Nepal 🇳🇵', href:null },
]

function ContactItem({ c }) {
  const [hov, setHov] = useState(false)
  const inner = (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display:'flex', alignItems:'center', gap:16,
        padding:'clamp(12px,2vw,16px) clamp(14px,2.5vw,20px)',
        background:'rgba(255,255,255,0.03)',
        border:`1px solid ${hov ? 'rgba(0,245,255,0.45)' : 'rgba(0,245,255,0.12)'}`,
        borderRadius:8, transition:'all 0.3s', cursor: c.href ? 'none' : 'default',
        textDecoration:'none',
      }}>
      <div style={{
        width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center',
        border:'1px solid rgba(0,245,255,0.18)', borderRadius:4,
        fontSize:'clamp(14px,2vw,18px)', color:'#00f5ff', flexShrink:0,
      }}>{c.icon}</div>
      <div>
        <p style={{ fontSize:10, color:'#7a7a9a', letterSpacing:2, textTransform:'uppercase', marginBottom:2, fontFamily:'Space Mono,monospace' }}>{c.label}</p>
        <p style={{ fontFamily:'Space Mono,monospace', fontSize:'clamp(9px,1.3vw,12px)', color:'#00f5ff', wordBreak:'break-all' }}>{c.value}</p>
      </div>
    </div>
  )
  return c.href ? <a href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration:'none' }}>{inner}</a> : inner
}

export default function Contact() {
  const { ref, visible } = useReveal(0.1)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => { setSending(false); setSent(true) }, 1200)
  }

  return (
    <section id="contact" ref={ref} style={{
      position:'relative', zIndex:1,
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      padding:'100px clamp(20px,5vw,48px)',
    }}>
      <div style={{ width:'100%', maxWidth:780 }}>
        <div style={{
          textAlign:'center', marginBottom:'clamp(32px,5vw,56px)',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
          transition:'all 0.8s',
        }}>
          <SectionLabel>05 / Contact</SectionLabel>
          <h2 style={sectionTitle}>Let's <span style={{color:'#00f5ff'}}>Connect</span></h2>
          <p style={{ color:'#7a7a9a', fontSize:'clamp(13px,1.8vw,15px)' }}>
            Have a project in mind? Want to collaborate? Reach out — I respond fast.
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(clamp(260px,40%,320px),1fr))',
          gap:'clamp(24px,4vw,40px)',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition:'all 0.8s 0.15s',
        }}>
          {/* Contact info */}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {CONTACTS.map(c => <ContactItem key={c.label} c={c}/>)}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { type:'text',  placeholder:'Your Name',       required:true },
              { type:'email', placeholder:'your@email.com',  required:true },
            ].map(inp => (
              <input key={inp.placeholder} type={inp.type} placeholder={inp.placeholder} required={inp.required}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor='#00f5ff'; e.target.style.boxShadow='0 0 14px rgba(0,245,255,0.1)' }}
                onBlur={e => { e.target.style.borderColor='rgba(0,245,255,0.13)'; e.target.style.boxShadow='none' }}
              />
            ))}
            <textarea placeholder="Your message..." required rows={5}
              style={{...inputStyle, resize:'vertical', minHeight:110}}
              onFocus={e => { e.target.style.borderColor='#00f5ff'; e.target.style.boxShadow='0 0 14px rgba(0,245,255,0.1)' }}
              onBlur={e => { e.target.style.borderColor='rgba(0,245,255,0.13)'; e.target.style.boxShadow='none' }}
            />
            {!sent ? (
              <button type="submit" style={{
                padding:'clamp(12px,2vw,16px) clamp(20px,3vw,32px)',
                background:'transparent', border:'1px solid #00f5ff',
                color: sending ? '#07030f' : '#00f5ff',
                fontFamily:'Orbitron,monospace', fontSize:'clamp(9px,1.2vw,12px)',
                fontWeight:700, letterSpacing:3, cursor:'none', textTransform:'uppercase',
                position:'relative', overflow:'hidden', transition:'color 0.3s',
                backgroundColor: sending ? '#00f5ff' : 'transparent',
              }}>
                {sending ? 'TRANSMITTING...' : 'SEND MESSAGE →'}
              </button>
            ) : (
              <div style={{
                padding:16, border:'1px solid #00ff88', borderRadius:4,
                color:'#00ff88', fontFamily:'Space Mono,monospace',
                fontSize:'clamp(9px,1.2vw,12px)', letterSpacing:2, textAlign:'center',
              }}>✓ MESSAGE TRANSMITTED SUCCESSFULLY</div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

const inputStyle = {
  width:'100%', padding:'clamp(10px,2vw,14px) clamp(12px,2vw,16px)',
  background:'rgba(255,255,255,0.03)',
  border:'1px solid rgba(0,245,255,0.13)', borderRadius:4,
  color:'#e8e8f0', fontFamily:'Rajdhani,sans-serif',
  fontSize:'clamp(13px,1.8vw,15px)', outline:'none',
  transition:'border-color 0.3s, box-shadow 0.3s',
}
