'use client'

import { useState } from 'react'

export default function OCRPage() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'done'>('idle')
  const [result, setResult] = useState<null | {
    status: 'CLEAN' | 'SUSPICIOUS' | 'TAMPERED'
    score: number
    findings: string[]
    vendor: string
    total: string
    date: string
  }>(null)

  const scan = () => {
    setStatus('scanning')
    setTimeout(() => {
      setResult({
        status: 'TAMPERED',
        score: 91,
        vendor: 'PT Supplier ABC',
        total: 'Rp 25.000.000',
        date: '10 Mei 2026',
        findings: [
          'Font berbeda terdeteksi pada kolom harga — kemungkinan angka dimanipulasi',
          'Total tidak cocok dengan perhitungan item (selisih Rp 3.2 juta)',
          'Metadata dokumen menunjukkan file diedit 2x setelah dibuat',
          'Nomor invoice tidak sesuai format standar vendor ini',
        ],
      })
      setStatus('done')
    }, 2500)
  }

  const resultColor = {
    CLEAN: '#10B981',
    SUSPICIOUS: '#F59E0B',
    TAMPERED: '#EF4444',
  }

  const resultBg = {
    CLEAN: 'rgba(16,185,129,0.08)',
    SUSPICIOUS: 'rgba(245,158,11,0.08)',
    TAMPERED: 'rgba(239,68,68,0.08)',
  }

  const resultBorder = {
    CLEAN: 'rgba(16,185,129,0.2)',
    SUSPICIOUS: 'rgba(245,158,11,0.2)',
    TAMPERED: 'rgba(239,68,68,0.2)',
  }

  const resultIcon = {
    CLEAN: '✅',
    SUSPICIOUS: '⚠️',
    TAMPERED: '🚨',
  }

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#070B14', color: '#F0F4FF', fontFamily: "'DM Sans', 'Inter', sans-serif", overflow: 'hidden' }}>

      {/* SIDEBAR */}
      <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid #1F2D45', backgroundColor: '#0A0F1E', padding: '20px 12px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 8px', marginBottom: '28px' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>✦</div>
          <span style={{ fontWeight: 800, fontSize: '16px' }}>Orion <span style={{ color: '#3B82F6' }}>AI</span></span>
        </div>

        {[
          { icon: '◈', label: 'Dashboard', path: '/dashboard' },
          { icon: '✉', label: 'Email AI', path: '/email' },
          { icon: '◎', label: 'WhatsApp', path: '/whatsapp' },
        ].map(item => (
          <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', color: '#8899B4', textDecoration: 'none', fontSize: '13px', border: '1px solid transparent' }}>{item.icon} {item.label}</a>
        ))}

        <div style={{ marginTop: '12px' }}>
          <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#F59E0B', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>⬡ ZENITH PRO</div>
          {[
            { label: 'Price Guard', path: '/zenith/price-guard' },
            { label: 'Investigator', path: '/zenith/investigator' },
            { label: 'OCR Forensic', path: '/zenith/ocr', active: true },
            { label: 'Vendor Intel', path: '/zenith/vendor' },
          ].map(item => (
            <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px 8px 16px', borderRadius: '8px', marginBottom: '2px', background: item.active ? 'rgba(245,158,11,0.08)' : 'transparent', color: item.active ? '#F59E0B' : '#8899B4', textDecoration: 'none', fontSize: '12px', border: item.active ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent' }}>
              {item.active && <span style={{ color: '#F59E0B', fontSize: '10px' }}>▸</span>}
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>◪ OCR Invoice Forensic</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Upload foto invoice → AI deteksi manipulasi dokumen otomatis</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Status badges */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              {[
                { label: 'CLEAN', desc: 'Dokumen asli', color: '#10B981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
                { label: 'SUSPICIOUS', desc: 'Perlu investigasi', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
                { label: 'TAMPERED', desc: 'Terdeteksi manipulasi', color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: s.bg, border: `1px solid ${s.border}`, borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: s.color }}>{s.label}</div>
                    <div style={{ fontSize: '11px', color: '#4A5C78' }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload area */}
            <div style={{
              border: `2px dashed ${status === 'scanning' ? '#3B82F6' : '#2D4160'}`,
              borderRadius: '16px', padding: '60px 40px', textAlign: 'center',
              background: status === 'scanning' ? 'rgba(59,130,246,0.03)' : 'rgba(59,130,246,0.01)',
              marginBottom: '24px', transition: 'all 0.3s',
            }}>
              {status === 'idle' && (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Upload Invoice</div>
                  <div style={{ fontSize: '13px', color: '#8899B4', marginBottom: '24px', lineHeight: 1.6 }}>
                    Foto invoice fisik atau file PDF/JPG<br />
                    AI akan analisa keaslian dokumen secara forensik
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button onClick={scan} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #F59E0B, #D97706)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                      📷 Pilih Foto Invoice
                    </button>
                    <button onClick={scan} style={{ padding: '12px 28px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', color: '#60A5FA', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      📂 Upload PDF
                    </button>
                  </div>
                </>
              )}

              {status === 'scanning' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '48px' }}>🔍</div>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>AI sedang menganalisa dokumen...</div>
                  <div style={{ fontSize: '13px', color: '#8899B4' }}>OCR extraction → Metadata analysis → Forensic check</div>
                  {/* Progress bar */}
                  <div style={{ width: '300px', height: '4px', background: '#1F2D45', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(90deg, #3B82F6, #06B6D4)', borderRadius: '4px', width: '70%', transition: 'width 0.5s' }} />
                  </div>
                  <div style={{ fontSize: '12px', color: '#4A5C78' }}>Menganalisa font, angka, dan metadata...</div>
                </div>
              )}
            </div>

            {/* Result */}
            {status === 'done' && result && (
              <div>
                {/* Status header */}
                <div style={{
                  background: resultBg[result.status],
                  border: `1px solid ${resultBorder[result.status]}`,
                  borderRadius: '16px', padding: '24px', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '40px' }}>{resultIcon[result.status]}</div>
                    <div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: resultColor[result.status], marginBottom: '4px' }}>
                        {result.status}
                      </div>
                      <div style={{ fontSize: '13px', color: '#8899B4' }}>
                        {result.vendor} · {result.date} · {result.total}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', fontWeight: 800, color: resultColor[result.status] }}>{result.score}</div>
                    <div style={{ fontSize: '10px', color: '#4A5C78' }}>RISK SCORE</div>
                  </div>
                </div>

                {/* Findings */}
                <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>
                    TEMUAN FORENSIK
                  </div>
                  {result.findings.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.1)', borderRadius: '10px', marginBottom: '10px' }}>
                      <span style={{ color: '#EF4444', flexShrink: 0, marginTop: '1px' }}>⚠</span>
                      <div style={{ fontSize: '13px', color: '#D1D9E6', lineHeight: 1.6 }}>{f}</div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setStatus('idle'); setResult(null) }} style={{ flex: 1, padding: '12px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', color: '#60A5FA', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    ↑ Scan Invoice Lain
                  </button>
                  <a href="/zenith/investigator" style={{ flex: 1, padding: '12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', color: '#F59E0B', fontSize: '13px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ◉ Investigasi Vendor
                  </a>
                  <button style={{ flex: 1, padding: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', color: '#EF4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                    📄 Export Laporan PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}