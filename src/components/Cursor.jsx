import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.14
      ring.current.y += (pos.current.y - ring.current.y) * 0.14
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top  = pos.current.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    const enterEl = () => {
      dotRef.current && (dotRef.current.style.transform = 'translate(-50%,-50%) scale(2.2)')
      ringRef.current && (ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.6)')
      ringRef.current && (ringRef.current.style.borderColor = 'rgba(0,245,255,0.9)')
    }
    const leaveEl = () => {
      dotRef.current && (dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)')
      ringRef.current && (ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)')
      ringRef.current && (ringRef.current.style.borderColor = 'rgba(0,245,255,0.45)')
    }
    document.querySelectorAll('a,button,input,textarea,select,.skill-card,.project-card').forEach(el => {
      el.addEventListener('mouseenter', enterEl)
      el.addEventListener('mouseleave', leaveEl)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed', width:10, height:10, borderRadius:'50%',
        background:'#00f5ff', pointerEvents:'none', zIndex:9999,
        transform:'translate(-50%,-50%)',
        boxShadow:'0 0 18px #00f5ff, 0 0 36px #00f5ff',
        mixBlendMode:'screen', transition:'transform 0.12s',
      }}/>
      <div ref={ringRef} style={{
        position:'fixed', width:34, height:34, borderRadius:'50%',
        border:'1px solid rgba(0,245,255,0.45)', pointerEvents:'none', zIndex:9998,
        transform:'translate(-50%,-50%)',
        transition:'transform 0.15s, border-color 0.2s',
      }}/>
    </>
  )
}
