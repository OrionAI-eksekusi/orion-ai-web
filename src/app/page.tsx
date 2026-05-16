'use client'

import { useEffect, useRef } from 'react'

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const stars = Array.from({ length: 250 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }))
    const shootingStars: any[] = []
    const addShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 2),
        len: Math.random() * 150 + 80,
        speed: Math.random() * 10 + 6,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15),
      })
    }
    const shootInterval = setInterval(() => { if (Math.random() > 0.3) addShootingStar() }, 2000)
    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(star => {
        star.alpha += star.speed
        const alpha = Math.abs(Math.sin(star.alpha)) * 0.8
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      })
      shootingStars.forEach((s, i) => {
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.alpha -= 0.02
        if (s.alpha <= 0) { shootingStars.splice(i, 1); return }
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len)
        grad.addColorStop(0, `rgba(180,220,255,${s.alpha})`)
        grad.addColorStop(1, 'rgba(100,180,255,0)')
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,240,255,${s.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', handleResize)
    return () => { cancelAnimationFrame(animId); clearInterval(shootInterval); window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020714', color: '#F0F4FF', fontFamily: "'DM Sans', 'Inter', sans-serif", overflowX: 'hidden' }}>

      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 20% 50%, rgba(15,25,70,0.5) 0%, transparent 60%)' }} />

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: '1px solid rgba(31,45,69,0.6)', backgroundColor: 'rgba(2,7,20,0.85)', backdropFilter: 'blur(20px)', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>✦</div>
          <span style={{ fontWeight: 700, fontSize: '18px' }}>Orion <span style={{ color: '#3B82F6' }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          {['Fitur', 'Harga', 'Tentang'].map(item => (
            <a key={item} href="#" style={{ color: '#8899B4', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/login" style={{ color: '#8899B4', textDecoration: 'none', fontSize: '14px' }}>Masuk</a>
          <a href="/login" style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', padding: '8px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>Mulai Gratis</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '160px 40px 120px', display: 'flex', alignItems: 'center', gap: '60px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '100px', padding: '6px 16px', marginBottom: '32px', fontSize: '13px', color: '#60A5FA' }}>
            <span style={{ color: '#10B981' }}>●</span> AI Execution System untuk Bisnis Indonesia
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '24px' }}>
            Orion handles everything.{' '}
            <span style={{ background: 'linear-gradient(135deg, #60A5FA, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              You focus on growth.
            </span>
          </h1>
          <p style={{ fontSize: '18px', color: '#8899B4', lineHeight: 1.7, maxWidth: '500px', marginBottom: '48px' }}>
            AI yang membaca email kamu, membalas WhatsApp customer, mendeteksi fraud transaksi, dan membuat laporan bisnis — semua otomatis 24/7.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
            <a href="/login" style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 30px rgba(59,130,246,0.35)' }}>✦ Mulai Trial 3 Hari Gratis</a>
            <a href="#fitur" style={{ background: 'transparent', color: '#F0F4FF', padding: '14px 32px', borderRadius: '10px', textDecoration: 'none', fontSize: '16px', border: '1px solid #1F2D45' }}>Lihat Fitur →</a>
          </div>
          <div style={{ display: 'flex', gap: '40px' }}>
            {[{ value: '39+', label: 'Kategori Harga Pasar' }, { value: '24/7', label: 'AI Automation' }, { value: 'Rp 0', label: 'Setup Cost' }].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#60A5FA' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#4A5C78' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Robot section */}
        <div style={{ flexShrink: 0, width: '420px', height: '480px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', animation: 'pulse 3s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', border: '1px solid rgba(59,130,246,0.2)', animation: 'spin-slow 20s linear infinite' }}>
            {[0, 90, 180, 270].map(deg => (
              <div key={deg} style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 10px #3B82F6', top: '50%', left: '50%', transform: `rotate(${deg}deg) translateX(160px) translateY(-50%)` }} />
            ))}
          </div>
          <div style={{ position: 'absolute', width: '240px', height: '240px', borderRadius: '50%', border: '1px solid rgba(6,182,212,0.15)', animation: 'spin-slow 15s linear infinite reverse' }} />

          {/* Robot Image */}
          <div style={{ position: 'relative', zIndex: 2, animation: 'float 4s ease-in-out infinite' }}>
            <img
              src="/robot.png"
              alt="Orion AI Robot"
              style={{
                width: '280px',
                height: 'auto',
                filter: 'drop-shadow(0 0 30px rgba(59,130,246,0.6)) drop-shadow(0 0 60px rgba(6,182,212,0.3))',
                animation: 'robot-glow 3s ease-in-out infinite',
              }}
            />
          </div>

          {[
            { x: -100, y: -80, text: '✉ 15 email', delay: '0s' },
            { x: 110, y: -50, text: '◎ WA 24/7', delay: '1s' },
            { x: -110, y: 90, text: '⬡ No Fraud', delay: '2s' },
            { x: 105, y: 110, text: '✓ Auto Task', delay: '0.5s' },
          ].map((p, i) => (
            <div key={i} style={{ position: 'absolute', left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)`, background: 'rgba(13,19,33,0.9)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', color: '#60A5FA', fontWeight: 600, whiteSpace: 'nowrap', animation: 'float 4s ease-in-out infinite', animationDelay: p.delay, zIndex: 3 }}>
              {p.text}
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes robot-glow {
          0%,100%{filter:drop-shadow(0 0 20px rgba(59,130,246,0.5)) drop-shadow(0 0 40px rgba(6,182,212,0.2));}
          50%{filter:drop-shadow(0 0 40px rgba(59,130,246,0.9)) drop-shadow(0 0 80px rgba(6,182,212,0.5)) brightness(1.1);}
        }
      `}</style>

      {/* FEATURES */}
      <section id="fitur" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto 120px', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>Satu sistem, semua otomatis</h2>
          <p style={{ color: '#8899B4', fontSize: '16px' }}>Tidak ada yang perlu dikonfigurasi. Login, connect Gmail, dan Orion langsung bekerja.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {[
            { icon: '✉', title: 'Email AI Agent', desc: 'Baca, klasifikasi, dan balas email otomatis. Invoice dari vendor langsung masuk Price Guard.', plan: 'APEX', color: '#3B82F6' },
            { icon: '◎', title: 'WhatsApp AI Agent', desc: 'Auto-reply 24/7, lead scoring, follow-up otomatis, closing — semua tanpa intervensi manual.', plan: 'APEX', color: '#06B6D4' },
            { icon: '☀', title: 'Smart Briefing', desc: 'Jam 06.00 pagi Orion kirim laporan harian ke email & WA.', plan: 'APEX', color: '#10B981' },
            { icon: '⬡', title: 'Price Guard AI', desc: 'Setiap invoice dibandingkan 39+ harga pasar Indonesia.', plan: 'ZENITH', color: '#F59E0B' },
            { icon: '◉', title: 'AI Investigator', desc: '"Kenapa biaya naik 40%?" — AI analisa semua transaksi.', plan: 'ZENITH', color: '#F59E0B' },
            { icon: '◪', title: 'OCR Invoice Forensic', desc: 'Foto invoice → AI deteksi manipulasi. CLEAN / SUSPICIOUS / TAMPERED.', plan: 'ZENITH', color: '#F59E0B' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: `${f.color}18`, border: `1px solid ${f.color}30`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: f.color }}>{f.icon}</div>
                <span style={{ fontSize: '10px', fontWeight: 700, color: f.plan === 'ZENITH' ? '#F59E0B' : '#60A5FA', background: f.plan === 'ZENITH' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)', padding: '3px 8px', borderRadius: '5px' }}>{f.plan}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#8899B4', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto 120px', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>Harga yang masuk akal</h2>
          <p style={{ color: '#8899B4', fontSize: '16px' }}>Trial 3 hari gratis. Tidak perlu kartu kredit.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { name: 'FREE', price: 'Gratis', sub: 'Selamanya', features: ['10 perintah/hari', 'Chat AI dasar', 'Email briefing terbatas'], cta: 'Mulai Gratis', featured: false, zenith: false },
            { name: 'APEX', price: 'Rp 120rb', sub: 'per bulan', features: ['100 perintah/hari', 'WhatsApp AI Agent 24/7', 'Email AI Agent', 'Smart Briefing harian', 'Task Extractor', 'Broadcast WA', 'Auto Quotation PDF'], cta: 'Mulai Trial', featured: true, zenith: false },
            { name: 'ZENITH', price: 'Rp 135rb', sub: 'per bulan', features: ['200 perintah/hari', 'Semua fitur Apex', 'Price Guard AI', 'OCR Invoice Forensic', 'AI Investigator', 'Vendor Intelligence', 'Executive Dashboard'], cta: 'Mulai Trial', featured: false, zenith: true },
          ].map(plan => (
            <div key={plan.name} style={{ background: plan.featured ? 'linear-gradient(135deg, #0D1B3E, #111827)' : '#0D1321', border: `1px solid ${plan.featured ? '#3B82F6' : plan.zenith ? '#F59E0B40' : '#1F2D45'}`, borderRadius: '16px', padding: '32px', position: 'relative', boxShadow: plan.featured ? '0 0 40px rgba(59,130,246,0.1)' : 'none' }}>
              {plan.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>PALING POPULER</div>}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: plan.zenith ? '#F59E0B' : plan.featured ? '#60A5FA' : '#4A5C78', marginBottom: '8px' }}>{plan.name}</div>
                <div style={{ fontSize: '32px', fontWeight: 800 }}>{plan.price}</div>
                <div style={{ fontSize: '13px', color: '#4A5C78' }}>{plan.sub}</div>
              </div>
              <div style={{ marginBottom: '28px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#8899B4', marginBottom: '10px' }}>
                    <span style={{ color: plan.zenith ? '#F59E0B' : '#10B981' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <a href="/login" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, background: plan.featured ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : plan.zenith ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)', color: plan.featured ? 'white' : plan.zenith ? '#F59E0B' : '#F0F4FF', border: plan.featured ? 'none' : `1px solid ${plan.zenith ? 'rgba(245,158,11,0.3)' : '#1F2D45'}` }}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid #1F2D45', padding: '40px', textAlign: 'center', color: '#4A5C78', fontSize: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✦</div>
          <span style={{ fontWeight: 700, color: '#F0F4FF', fontSize: '15px' }}>Orion AI</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '16px' }}>
          <a href="https://orionai-eksekusi.github.io/orion-ai-privacy" style={{ color: '#4A5C78', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="mailto:azvickyfadzry02@gmail.com" style={{ color: '#4A5C78', textDecoration: 'none' }}>Kontak</a>
        </div>
        <div>© 2026 Orion AI. All rights reserved.</div>
      </footer>

    </div>
  )
}