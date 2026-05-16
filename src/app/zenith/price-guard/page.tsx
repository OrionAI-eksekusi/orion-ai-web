'use client'

import { useState } from 'react'

const mockAlerts = [
  {
    id: 1,
    vendor: 'PT Supplier ABC',
    item: 'Laptop Dell XPS 15',
    qty: 2,
    harga: 25000000,
    hargaPasar: 12000000,
    markup: 108,
    risk: 'HIGH',
    score: 85,
    source: 'Gmail',
    time: '04:15',
    rekomendasi: 'TAHAN PEMBAYARAN. Minta quotation dari 3 vendor lain.',
    penghematan: 13000000,
  },
  {
    id: 2,
    vendor: 'CV Logistik Prima',
    item: 'Jasa Pengiriman Bulanan',
    qty: 1,
    harga: 8500000,
    hargaPasar: 6000000,
    markup: 41,
    risk: 'MEDIUM',
    score: 54,
    source: 'WA',
    time: '02:30',
    rekomendasi: 'Negosiasi harga. Bandingkan dengan vendor sejenis.',
    penghematan: 2500000,
  },
  {
    id: 3,
    vendor: 'Toko Elektronik Maju',
    item: 'Monitor LG 27 inch',
    qty: 5,
    harga: 3200000,
    hargaPasar: 3100000,
    markup: 3,
    risk: 'SAFE',
    score: 12,
    source: 'Manual',
    time: 'Kemarin',
    rekomendasi: 'Harga wajar. Aman untuk diproses.',
    penghematan: 0,
  },
]

const riskColor: Record<string, string> = {
  HIGH: '#EF4444',
  MEDIUM: '#F59E0B',
  SAFE: '#10B981',
}

const riskBg: Record<string, string> = {
  HIGH: 'rgba(239,68,68,0.08)',
  MEDIUM: 'rgba(245,158,11,0.08)',
  SAFE: 'rgba(16,185,129,0.08)',
}

const riskBorder: Record<string, string> = {
  HIGH: 'rgba(239,68,68,0.2)',
  MEDIUM: 'rgba(245,158,11,0.2)',
  SAFE: 'rgba(16,185,129,0.2)',
}

export default function PriceGuardPage() {
  const [selected, setSelected] = useState<number | null>(1)
  const [tab, setTab] = useState<'alerts' | 'input' | 'import'>('alerts')
  const [form, setForm] = useState({ vendor: '', item: '', harga: '', qty: '' })
  const [verified, setVerified] = useState<number[]>([])

  const selectedAlert = mockAlerts.find(a => a.id === selected)

  return (
    <div style={{
      display: 'flex', height: '100vh',
      backgroundColor: '#070B14', color: '#F0F4FF',
      fontFamily: "'DM Sans', 'Inter', sans-serif", overflow: 'hidden',
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: '220px', flexShrink: 0,
        borderRight: '1px solid #1F2D45',
        backgroundColor: '#0A0F1E',
        padding: '20px 12px',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 8px', marginBottom: '28px' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>✦</div>
          <span style={{ fontWeight: 800, fontSize: '16px' }}>Orion <span style={{ color: '#3B82F6' }}>AI</span></span>
        </div>

        {[
          { icon: '◈', label: 'Dashboard', path: '/dashboard' },
          { icon: '✉', label: 'Email AI', path: '/email' },
          { icon: '◎', label: 'WhatsApp', path: '/whatsapp' },
          { icon: '✓', label: 'Tasks', path: '/tasks' },
        ].map(item => (
          <a key={item.label} href={item.path} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '9px 10px', borderRadius: '8px', marginBottom: '2px',
            color: '#8899B4', textDecoration: 'none', fontSize: '13px',
            border: '1px solid transparent',
          }}>{item.icon} {item.label}</a>
        ))}

        <div style={{ marginTop: '12px', marginBottom: '6px' }}>
          <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#F59E0B', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>⬡ ZENITH PRO</div>
          {[
            { label: 'Price Guard', path: '/zenith/price-guard', active: true },
            { label: 'Investigator', path: '/zenith/investigator' },
            { label: 'OCR Forensic', path: '/zenith/ocr' },
            { label: 'Vendor Intel', path: '/zenith/vendor' },
            { label: 'Compliance', path: '/zenith/compliance' },
          ].map(item => (
            <a key={item.label} href={item.path} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 10px 8px 16px', borderRadius: '8px', marginBottom: '2px',
              background: item.active ? 'rgba(245,158,11,0.08)' : 'transparent',
              color: item.active ? '#F59E0B' : '#8899B4',
              textDecoration: 'none', fontSize: '12px',
              border: item.active ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent',
            }}>
              {item.active && <span style={{ color: '#F59E0B', fontSize: '10px' }}>▸</span>}
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{
          borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: '#0A0F1E', flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>⬡ Price Guard AI</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Deteksi markup vendor otomatis dari Gmail, WA, dan upload manual</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
              1 HIGH RISK
            </div>
            <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>
              1 MEDIUM
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Left — Alert list */}
          <div style={{ width: '340px', flexShrink: 0, borderRight: '1px solid #1F2D45', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #1F2D45', flexShrink: 0 }}>
              {(['alerts', 'input', 'import'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, padding: '12px 8px', background: 'transparent',
                  border: 'none', borderBottom: `2px solid ${tab === t ? '#F59E0B' : 'transparent'}`,
                  color: tab === t ? '#F59E0B' : '#4A5C78',
                  fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', letterSpacing: '0.3px',
                }}>
                  {t === 'alerts' ? '⚠ Alerts' : t === 'input' ? '+ Input' : '↑ Import CSV'}
                </button>
              ))}
            </div>

            {tab === 'alerts' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                {mockAlerts.map(alert => (
                  <div key={alert.id} onClick={() => setSelected(alert.id)} style={{
                    background: selected === alert.id ? riskBg[alert.risk] : '#0D1321',
                    border: `1px solid ${selected === alert.id ? riskBorder[alert.risk] : '#1F2D45'}`,
                    borderRadius: '12px', padding: '14px', marginBottom: '10px',
                    cursor: 'pointer', transition: 'all 0.15s',
                    opacity: verified.includes(alert.id) ? 0.5 : 1,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
                        color: riskColor[alert.risk],
                        background: riskBg[alert.risk],
                        border: `1px solid ${riskBorder[alert.risk]}`,
                        padding: '2px 8px', borderRadius: '5px',
                      }}>{alert.risk} · {alert.score}</span>
                      <span style={{ fontSize: '10px', color: '#4A5C78' }}>{alert.source} · {alert.time}</span>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{alert.vendor}</div>
                    <div style={{ fontSize: '11px', color: '#8899B4', marginBottom: '8px' }}>{alert.item}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', color: riskColor[alert.risk], fontWeight: 600 }}>
                        +{alert.markup}% markup
                      </span>
                      {alert.penghematan > 0 && (
                        <span style={{ fontSize: '11px', color: '#4A5C78' }}>
                          Hemat Rp {(alert.penghematan / 1000000).toFixed(0)}jt
                        </span>
                      )}
                    </div>
                    {verified.includes(alert.id) && (
                      <div style={{ marginTop: '8px', fontSize: '11px', color: '#10B981', fontWeight: 600 }}>✓ Diverifikasi</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {tab === 'input' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <div style={{ fontSize: '12px', color: '#8899B4', marginBottom: '16px' }}>Input transaksi manual untuk dianalisa Price Guard</div>
                {[
                  { label: 'Nama Vendor', key: 'vendor', placeholder: 'PT Supplier ABC' },
                  { label: 'Nama Item', key: 'item', placeholder: 'Laptop Dell XPS 15' },
                  { label: 'Harga (Rp)', key: 'harga', placeholder: '25000000' },
                  { label: 'Jumlah', key: 'qty', placeholder: '2' },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: '14px' }}>
                    <label style={{ fontSize: '11px', color: '#4A5C78', fontWeight: 600, display: 'block', marginBottom: '6px' }}>{field.label}</label>
                    <input
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%', padding: '10px 12px',
                        background: '#111827', border: '1px solid #1F2D45',
                        borderRadius: '8px', color: '#F0F4FF',
                        fontSize: '13px', outline: 'none', fontFamily: 'inherit',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                ))}
                <button style={{
                  width: '100%', padding: '12px',
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  border: 'none', borderRadius: '10px',
                  color: 'white', fontSize: '14px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  ⬡ Analisa dengan Price Guard
                </button>
              </div>
            )}

            {tab === 'import' && (
              <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '100%', border: '2px dashed #2D4160', borderRadius: '12px',
                  padding: '40px 20px', textAlign: 'center',
                  background: 'rgba(59,130,246,0.02)',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📂</div>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Upload CSV / Excel</div>
                  <div style={{ fontSize: '12px', color: '#4A5C78', marginBottom: '16px', lineHeight: 1.6 }}>
                    Format: vendor, item, harga, qty, category<br/>
                    Dari Accurate, Jurnal, atau Excel manual
                  </div>
                  <button style={{
                    padding: '10px 20px', background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px',
                    color: '#60A5FA', fontSize: '13px', fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    Pilih File
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right — Detail */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {selectedAlert ? (
              <>
                {/* Risk header */}
                <div style={{
                  background: riskBg[selectedAlert.risk],
                  border: `1px solid ${riskBorder[selectedAlert.risk]}`,
                  borderRadius: '14px', padding: '20px 24px', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <div style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: riskColor[selectedAlert.risk],
                        boxShadow: `0 0 10px ${riskColor[selectedAlert.risk]}`,
                      }} />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: riskColor[selectedAlert.risk], letterSpacing: '0.5px' }}>
                        {selectedAlert.risk} RISK — Score {selectedAlert.score}/100
                      </span>
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>{selectedAlert.vendor}</div>
                    <div style={{ fontSize: '13px', color: '#8899B4' }}>{selectedAlert.item} · {selectedAlert.qty} unit · via {selectedAlert.source}</div>
                  </div>

                  {/* Score circle */}
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    border: `3px solid ${riskColor[selectedAlert.risk]}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: riskBg[selectedAlert.risk],
                    boxShadow: `0 0 20px ${riskBg[selectedAlert.risk]}`,
                  }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: riskColor[selectedAlert.risk] }}>{selectedAlert.score}</div>
                    <div style={{ fontSize: '9px', color: riskColor[selectedAlert.risk], opacity: 0.7 }}>RISK SCORE</div>
                  </div>
                </div>

                {/* Price comparison */}
                <div style={{
                  background: '#0D1321', border: '1px solid #1F2D45',
                  borderRadius: '14px', padding: '20px', marginBottom: '16px',
                }}>
                  <div style={{ fontSize: '11px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>
                    PERBANDINGAN HARGA
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '6px' }}>Harga Vendor</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: '#EF4444' }}>
                        Rp {(selectedAlert.harga / 1000000).toFixed(0)}jt
                      </div>
                      <div style={{ fontSize: '10px', color: '#4A5C78' }}>per unit</div>
                    </div>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{
                        background: `${riskColor[selectedAlert.risk]}18`,
                        border: `1px solid ${riskBorder[selectedAlert.risk]}`,
                        borderRadius: '8px', padding: '6px 12px',
                        fontSize: '16px', fontWeight: 800, color: riskColor[selectedAlert.risk],
                      }}>+{selectedAlert.markup}%</div>
                      <div style={{ fontSize: '10px', color: '#4A5C78', marginTop: '4px' }}>markup</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '6px' }}>Harga Pasar</div>
                      <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981' }}>
                        Rp {(selectedAlert.hargaPasar / 1000000).toFixed(0)}jt
                      </div>
                      <div style={{ fontSize: '10px', color: '#4A5C78' }}>per unit</div>
                    </div>
                  </div>

                  {selectedAlert.penghematan > 0 && (
                    <div style={{
                      marginTop: '16px', padding: '12px',
                      background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)',
                      borderRadius: '10px', textAlign: 'center',
                    }}>
                      <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 700 }}>
                        💰 Potensi Penghematan: Rp {(selectedAlert.penghematan / 1000000).toFixed(0)} juta
                      </span>
                    </div>
                  )}
                </div>

                {/* Rekomendasi */}
                <div style={{
                  background: '#0D1321', border: '1px solid #1F2D45',
                  borderRadius: '14px', padding: '20px', marginBottom: '16px',
                }}>
                  <div style={{ fontSize: '11px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '12px' }}>
                    REKOMENDASI AI
                  </div>
                  <div style={{
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                    padding: '14px',
                    background: `${riskColor[selectedAlert.risk]}08`,
                    border: `1px solid ${riskBorder[selectedAlert.risk]}`,
                    borderRadius: '10px',
                  }}>
                    <span style={{ fontSize: '20px', flexShrink: 0 }}>
                      {selectedAlert.risk === 'HIGH' ? '🚨' : selectedAlert.risk === 'MEDIUM' ? '⚠️' : '✅'}
                    </span>
                    <div style={{ fontSize: '13px', color: '#D1D9E6', lineHeight: 1.7, fontWeight: 500 }}>
                      {selectedAlert.rekomendasi}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setVerified(prev => [...prev, selectedAlert.id])} style={{
                    flex: 1, padding: '12px',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: '10px', color: '#10B981',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    ✓ Verifikasi Alert
                  </button>
                  <a href="/zenith/investigator" style={{
                    flex: 1, padding: '12px',
                    background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: '10px', color: '#F59E0B',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    ◉ Investigasi Lebih Dalam
                  </a>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4A5C78', fontSize: '14px' }}>
                Pilih alert untuk melihat detail
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}