'use client'

import { useEffect, useRef } from 'react'

export default function LoginPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Stars
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }))

    // Shooting stars
    const shootingStars: {x: number, y: number, len: number, speed: number, alpha: number, active: boolean, angle: number}[] = []

    const addShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        len: Math.random() * 120 + 60,
        speed: Math.random() * 8 + 6,
        alpha: 1,
        active: true,
        angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15),
      })
    }

    // Add shooting stars periodically
    const shootInterval = setInterval(() => {
      if (Math.random() > 0.4) addShootingStar()
    }, 1800)

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach(star => {
        star.alpha += star.speed
        const alpha = Math.abs(Math.sin(star.alpha))
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
        ctx.fill()
      })

      // Draw shooting stars
      shootingStars.forEach((s, i) => {
        if (!s.active) return
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.alpha -= 0.018

        if (s.alpha <= 0) {
          shootingStars.splice(i, 1)
          return
        }

        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        )
        grad.addColorStop(0, `rgba(180, 220, 255, ${s.alpha})`)
        grad.addColorStop(0.3, `rgba(100, 180, 255, ${s.alpha * 0.6})`)
        grad.addColorStop(1, 'rgba(100, 180, 255, 0)')

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        )
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Glowing head
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 240, 255, ${s.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(shootInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#020714',
      color: '#F0F4FF',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Star canvas */}
      <canvas ref={canvasRef} style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Deep space gradient */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(15,25,70,0.6) 0%, transparent 60%),
          radial-gradient(ellipse at 80% 20%, rgba(10,20,60,0.5) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 100%, rgba(5,15,40,0.8) 0%, transparent 60%)
        `,
      }} />

      {/* Blue nebula glow */}
      <div style={{
        position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '500px', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)',
      }} />

      {/* Back */}
      <a href="/" style={{
        position: 'fixed', top: '28px', left: '32px',
        display: 'flex', alignItems: 'center', gap: '6px',
        color: 'rgba(136,153,180,0.7)', textDecoration: 'none', fontSize: '13px',
        zIndex: 10, letterSpacing: '0.2px',
        transition: 'color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = '#F0F4FF')}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(136,153,180,0.7)')}
      >← Kembali</a>

      {/* Card */}
      <div style={{
        background: 'rgba(10,16,35,0.85)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: '24px',
        padding: '52px 44px',
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1,
        boxShadow: `
          0 0 0 1px rgba(59,130,246,0.05),
          0 40px 80px rgba(0,0,0,0.6),
          0 0 60px rgba(59,130,246,0.04),
          inset 0 1px 0 rgba(255,255,255,0.04)
        `,
      }}>

        {/* Top shimmer line */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(6,182,212,0.3), transparent)',
          borderRadius: '100px',
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #1D4ED8, #0891B2)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', margin: '0 auto 18px',
            boxShadow: '0 8px 32px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}>✦</div>

          <h1 style={{
            fontSize: '26px', fontWeight: 800, marginBottom: '8px',
            letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #F0F4FF 0%, #CBD5E1 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Masuk ke Orion <span style={{
              background: 'linear-gradient(135deg, #60A5FA, #06B6D4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>AI</span>
          </h1>
          <p style={{ color: 'rgba(136,153,180,0.8)', fontSize: '14px', letterSpacing: '0.2px' }}>
            AI Execution System untuk bisnis Indonesia
          </p>
        </div>

        {/* Trial badge */}
        <div style={{
          background: 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.15)',
          borderRadius: '12px',
          padding: '14px 16px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}>
          <span style={{ fontSize: '18px', flexShrink: 0 }}>🎁</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#10B981', marginBottom: '3px' }}>
              Trial 3 Hari Gratis
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(136,153,180,0.8)', lineHeight: 1.5 }}>
              Daftar pertama kali? Dapat akses semua fitur Apex + Zenith selama 3 hari.
            </div>
          </div>
        </div>

        {/* Google Button */}
        <a href="https://web-production-d2935.up.railway.app/auth/google/login" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          width: '100%',
          padding: '15px',
          background: 'rgba(255,255,255,0.97)',
          color: '#1a1a1a',
          borderRadius: '12px',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          marginBottom: '24px',
          letterSpacing: '0.1px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
        }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Lanjutkan dengan Google
        </a>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(31,45,69,0.8)' }} />
          <span style={{ fontSize: '11px', color: 'rgba(74,92,120,0.8)', letterSpacing: '0.3px' }}>YANG KAMU DAPATKAN</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(31,45,69,0.8)' }} />
        </div>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
          {[
            { icon: '✉', text: 'Gmail terhubung otomatis saat login', color: '#3B82F6' },
            { icon: '◎', text: 'WhatsApp AI Agent siap diaktifkan', color: '#06B6D4' },
            { icon: '⬡', text: 'Price Guard & Zenith Intelligence', color: '#F59E0B' },
            { icon: '☀', text: 'Smart Briefing harian jam 06.00', color: '#10B981' },
          ].map(item => (
            <div key={item.text} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              fontSize: '13px', color: 'rgba(136,153,180,0.85)',
            }}>
              <span style={{
                width: '30px', height: '30px',
                background: `${item.color}12`,
                border: `1px solid ${item.color}25`,
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '13px', color: item.color, flexShrink: 0,
              }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {/* Privacy */}
        <p style={{ fontSize: '11px', color: 'rgba(74,92,120,0.7)', textAlign: 'center', lineHeight: 1.6 }}>
          Dengan masuk, kamu menyetujui{' '}
          <a href="https://orionai-eksekusi.github.io/orion-ai-privacy"
            style={{ color: 'rgba(96,165,250,0.8)', textDecoration: 'none' }}>
            Privacy Policy
          </a>{' '}Orion AI.
        </p>
      </div>
    </div>
  )
}