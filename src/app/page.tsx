'use client'

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070B14',
      color: '#F0F4FF',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      overflowX: 'hidden',
    }}>

      {/* Grid BG */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: '1px solid rgba(31,45,69,0.8)',
        backgroundColor: 'rgba(7,11,20,0.9)',
        backdropFilter: 'blur(20px)',
        padding: '0 40px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
            borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
          }}>✦</div>
          <span style={{ fontWeight: 700, fontSize: '18px' }}>Orion <span style={{ color: '#3B82F6' }}>AI</span></span>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {['Fitur', 'Harga', 'Tentang'].map(item => (
            <a key={item} href="#" style={{ color: '#8899B4', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{item}</a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/login" style={{ color: '#8899B4', textDecoration: 'none', fontSize: '14px' }}>Masuk</a>
          <a href="/login" style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            color: 'white', padding: '8px 20px', borderRadius: '8px',
            textDecoration: 'none', fontSize: '14px', fontWeight: 600,
          }}>Mulai Gratis</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '160px 40px 120px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: '100px', padding: '6px 16px', marginBottom: '32px',
          fontSize: '13px', color: '#60A5FA', fontWeight: 500,
        }}>
          <span style={{ color: '#10B981' }}>●</span>
          AI Execution System untuk Bisnis Indonesia
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800,
          lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '24px',
        }}>
          Orion handles everything.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #60A5FA, #3B82F6, #06B6D4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>You focus on growth.</span>
        </h1>

        <p style={{ fontSize: '18px', color: '#8899B4', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 48px' }}>
          AI yang membaca email kamu, membalas WhatsApp customer, mendeteksi fraud transaksi,
          dan membuat laporan bisnis — semua otomatis 24/7.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px', flexWrap: 'wrap' }}>
          <a href="/login" style={{
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white',
            padding: '14px 32px', borderRadius: '10px', textDecoration: 'none',
            fontSize: '16px', fontWeight: 600, boxShadow: '0 8px 30px rgba(59,130,246,0.35)',
          }}>✦ Mulai Trial 3 Hari Gratis</a>
          <a href="#fitur" style={{
            background: 'transparent', color: '#F0F4FF', padding: '14px 32px',
            borderRadius: '10px', textDecoration: 'none', fontSize: '16px', fontWeight: 500,
            border: '1px solid #1F2D45',
          }}>Lihat Fitur →</a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { value: '39+', label: 'Kategori Harga Pasar' },
            { value: '24/7', label: 'AI Automation' },
            { value: 'Rp 0', label: 'Setup Cost' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#60A5FA' }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#4A5C78', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 120px', padding: '0 40px' }}>
        <div style={{
          background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '16px',
          overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}>
          {/* Browser bar */}
          <div style={{
            padding: '12px 20px', borderBottom: '1px solid #1F2D45',
            display: 'flex', alignItems: 'center', gap: '8px', background: '#0A0F1E',
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
            <div style={{
              flex: 1, maxWidth: '300px', margin: '0 auto', background: '#111827',
              borderRadius: '6px', padding: '4px 12px', fontSize: '11px', color: '#4A5C78', textAlign: 'center',
            }}>app.orionai.id/dashboard</div>
          </div>

          {/* Content */}
          <div style={{ display: 'flex', height: '480px' }}>
            {/* Sidebar */}
            <div style={{ width: '200px', borderRight: '1px solid #1F2D45', padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ padding: '6px 12px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✦</div>
                <span style={{ fontWeight: 700, fontSize: '14px' }}>Orion AI</span>
              </div>
              {[
                { icon: '◈', label: 'Dashboard', active: true },
                { icon: '✉', label: 'Email AI' },
                { icon: '◎', label: 'WhatsApp' },
                { icon: '✓', label: 'Tasks' },
                { icon: '◉', label: 'Broadcast' },
                { icon: '⬡', label: 'Zenith', zenith: true },
                { icon: '▸', label: 'Price Guard', sub: true },
                { icon: '▸', label: 'Investigator', sub: true },
                { icon: '▸', label: 'OCR Forensic', sub: true },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: item.sub ? '6px 8px 6px 20px' : '7px 10px',
                  borderRadius: '7px',
                  background: item.active ? 'rgba(59,130,246,0.12)' : 'transparent',
                  color: item.active ? '#60A5FA' : item.zenith ? '#F59E0B' : '#8899B4',
                  fontSize: '12px', fontWeight: item.active ? 600 : 400,
                  border: item.active ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                }}>
                  <span style={{ fontSize: '10px' }}>{item.icon}</span>
                  {item.label}
                  {item.zenith && <span style={{ marginLeft: 'auto', fontSize: '9px', background: 'rgba(245,158,11,0.15)', color: '#F59E0B', padding: '1px 5px', borderRadius: '4px' }}>PRO</span>}
                </div>
              ))}
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '4px' }}>Jumat, 16 Mei 2026 · 06:00 WIB</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>Selamat pagi, Azvicky ☀️</div>
                <div style={{ fontSize: '13px', color: '#8899B4', marginTop: '4px' }}>Orion sudah bekerja untuk kamu sejak semalam</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'Email Diproses', value: '15', sub: '3 urgent', color: '#3B82F6' },
                  { label: 'WA Auto-Reply', value: '23', sub: 'customer terbalas', color: '#10B981' },
                  { label: 'Task Terdeteksi', value: '8', sub: 'dari email & WA', color: '#06B6D4' },
                  { label: 'Alert Zenith', value: '2', sub: 'HIGH RISK', color: '#EF4444' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: '10px', padding: '14px' }}>
                    <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '6px' }}>{stat.label}</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '10px', color: '#8899B4', marginTop: '2px' }}>{stat.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '10px', padding: '14px 16px',
                display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px #EF4444', marginTop: '4px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#EF4444', marginBottom: '2px' }}>HIGH RISK — Invoice PT Supplier ABC</div>
                  <div style={{ fontSize: '11px', color: '#8899B4' }}>Markup 108% · Laptop Dell Rp 25jt vs pasar Rp 12jt · Potensi kerugian Rp 13 juta</div>
                </div>
                <div style={{ marginLeft: 'auto', flexShrink: 0, background: 'rgba(239,68,68,0.1)', color: '#EF4444', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>Investigasi →</div>
              </div>

              <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.5px' }}>AKTIVITAS TERKINI</div>
              {[
                { time: '06:00', text: 'Smart Briefing dikirim via email & WA', color: '#3B82F6' },
                { time: '05:47', text: 'WA customer Pak Budi dibalas otomatis', color: '#10B981' },
                { time: '05:32', text: 'Task deadline "Proposal Q2" terdeteksi', color: '#06B6D4' },
                { time: '04:15', text: 'Invoice PT ABC HIGH RISK — markup 108%', color: '#EF4444' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(31,45,69,0.5)', fontSize: '12px' }}>
                  <span style={{ color: '#4A5C78', flexShrink: 0, fontSize: '10px' }}>{item.time}</span>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, background: item.color }} />
                  <span style={{ color: '#8899B4' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" style={{ maxWidth: '1200px', margin: '0 auto 120px', padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>Satu sistem, semua otomatis</h2>
          <p style={{ color: '#8899B4', fontSize: '16px' }}>Tidak ada yang perlu dikonfigurasi. Login, connect Gmail, dan Orion langsung bekerja.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {[
            { icon: '✉', title: 'Email AI Agent', desc: 'Baca, klasifikasi, dan balas email otomatis. Invoice dari vendor langsung masuk Price Guard.', plan: 'APEX', color: '#3B82F6' },
            { icon: '◎', title: 'WhatsApp AI Agent', desc: 'Auto-reply 24/7, lead scoring, follow-up otomatis, closing — semua tanpa intervensi manual.', plan: 'APEX', color: '#06B6D4' },
            { icon: '☀', title: 'Smart Briefing', desc: 'Jam 06.00 pagi Orion kirim laporan harian ke email & WA. Email urgent, tasks, hot leads, alerts.', plan: 'APEX', color: '#10B981' },
            { icon: '⬡', title: 'Price Guard AI', desc: 'Setiap invoice dibandingkan 39+ harga pasar Indonesia. Markup 108%? Terdeteksi dalam detik.', plan: 'ZENITH', color: '#F59E0B' },
            { icon: '◉', title: 'AI Investigator', desc: '"Kenapa biaya naik 40%?" — AI analisa semua transaksi dan jawab dengan bukti data nyata.', plan: 'ZENITH', color: '#F59E0B' },
            { icon: '◪', title: 'OCR Invoice Forensic', desc: 'Foto invoice → AI deteksi manipulasi font, angka tidak cocok. CLEAN / SUSPICIOUS / TAMPERED.', plan: 'ZENITH', color: '#F59E0B' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', background: `${f.color}18`, border: `1px solid ${f.color}30`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: f.color }}>{f.icon}</div>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.8px', color: f.plan === 'ZENITH' ? '#F59E0B' : '#60A5FA', background: f.plan === 'ZENITH' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)', padding: '3px 8px', borderRadius: '5px' }}>{f.plan}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#8899B4', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ maxWidth: '1000px', margin: '0 auto 120px', padding: '0 40px' }}>
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
            <div key={plan.name} style={{
              background: plan.featured ? 'linear-gradient(135deg, #0D1B3E, #111827)' : '#0D1321',
              border: `1px solid ${plan.featured ? '#3B82F6' : plan.zenith ? '#F59E0B40' : '#1F2D45'}`,
              borderRadius: '16px', padding: '32px', position: 'relative',
              boxShadow: plan.featured ? '0 0 40px rgba(59,130,246,0.1)' : 'none',
            }}>
              {plan.featured && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>PALING POPULER</div>
              )}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: plan.zenith ? '#F59E0B' : plan.featured ? '#60A5FA' : '#4A5C78', marginBottom: '8px' }}>{plan.name}</div>
                <div style={{ fontSize: '32px', fontWeight: 800 }}>{plan.price}</div>
                <div style={{ fontSize: '13px', color: '#4A5C78' }}>{plan.sub}</div>
              </div>
              <div style={{ marginBottom: '28px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8899B4', marginBottom: '10px' }}>
                    <span style={{ color: plan.zenith ? '#F59E0B' : '#10B981' }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <a href="/login" style={{
                display: 'block', textAlign: 'center', padding: '12px', borderRadius: '8px',
                textDecoration: 'none', fontSize: '14px', fontWeight: 600,
                background: plan.featured ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : plan.zenith ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)',
                color: plan.featured ? 'white' : plan.zenith ? '#F59E0B' : '#F0F4FF',
                border: plan.featured ? 'none' : `1px solid ${plan.zenith ? 'rgba(245,158,11,0.3)' : '#1F2D45'}`,
              }}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #1F2D45', padding: '40px', textAlign: 'center', color: '#4A5C78', fontSize: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✦</div>
          <span style={{ fontWeight: 700, color: '#F0F4FF', fontSize: '15px' }}>Orion AI</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '16px' }}>
          <a href="https://orionai-eksekusi.github.io/orion-ai-privacy" style={{ color: '#4A5C78', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#4A5C78', textDecoration: 'none' }}>Terms of Service</a>
          <a href="mailto:azvickyfadzry02@gmail.com" style={{ color: '#4A5C78', textDecoration: 'none' }}>Kontak</a>
        </div>
        <div>© 2026 Orion AI. All rights reserved.</div>
      </footer>

    </div>
  )
}