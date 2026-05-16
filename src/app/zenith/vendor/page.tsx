'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function VendorPage() {
  const [user, setUser] = useState<any>(null)
  const [anomalies, setAnomalies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadData(currentUser.user_id)
  }, [])

  const loadData = async (userId: string) => {
    try {
      const data = await api.getAnomalies(userId)
      const vendors = data?.data?.anomalies || []
      setAnomalies(vendors)
      if (vendors.length > 0) setSelected(vendors[0])
    } catch (e) {
      console.log('Error:', e)
    } finally {
      setLoading(false)
    }
  }

  const riskColor: Record<string, string> = {
    HIGH: '#EF4444',
    MEDIUM: '#F59E0B',
    LOW: '#10B981',
    SAFE: '#10B981',
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
          <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', color: '#8899B4', textDecoration: 'none', fontSize: '13px', border: '1px solid transparent' }}>
            <span>{item.icon}</span>{item.label}
          </a>
        ))}
        <div style={{ marginTop: '12px' }}>
          <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#F59E0B', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>⬡ ZENITH PRO</div>
          {[
            { label: 'Price Guard', path: '/zenith/price-guard' },
            { label: 'Investigator', path: '/zenith/investigator' },
            { label: 'OCR Forensic', path: '/zenith/ocr' },
            { label: 'Vendor Intel', path: '/zenith/vendor', active: true },
            { label: 'Compliance', path: '/zenith/compliance' },
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
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>◈ Vendor Intelligence</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Analisa mendalam profil dan risiko setiap vendor</div>
          </div>
          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>
            {anomalies.length} Vendor Terdeteksi
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Vendor list */}
          <div style={{ width: '300px', flexShrink: 0, borderRight: '1px solid #1F2D45', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#4A5C78' }}>Loading...</div>
            ) : anomalies.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>◈</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Belum ada data vendor</div>
                <div style={{ fontSize: '12px', color: '#4A5C78' }}>Import transaksi di Price Guard untuk analisa vendor</div>
              </div>
            ) : anomalies.map((vendor: any, i: number) => (
              <div key={i} onClick={() => setSelected(vendor)} style={{ padding: '14px 16px', borderBottom: '1px solid rgba(31,45,69,0.5)', cursor: 'pointer', background: selected === vendor ? 'rgba(245,158,11,0.06)' : 'transparent', borderLeft: `3px solid ${selected === vendor ? '#F59E0B' : 'transparent'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600 }}>{vendor.vendor_name || 'Vendor'}</span>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: riskColor[vendor.risk_level] || '#4A5C78', background: `${riskColor[vendor.risk_level] || '#4A5C78'}15`, padding: '2px 6px', borderRadius: '4px' }}>
                    {vendor.risk_level || 'UNKNOWN'}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#4A5C78' }}>{vendor.item_name}</div>
                {vendor.markup_percentage && (
                  <div style={{ fontSize: '11px', color: riskColor[vendor.risk_level], marginTop: '4px' }}>
                    Markup: +{vendor.markup_percentage}%
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Vendor detail */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {selected ? (
              <div>
                <div style={{ background: `${riskColor[selected.risk_level] || '#4A5C78'}10`, border: `1px solid ${riskColor[selected.risk_level] || '#4A5C78'}30`, borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{selected.vendor_name}</div>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '4px' }}>Risk Level</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: riskColor[selected.risk_level] }}>{selected.risk_level}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '4px' }}>Risk Score</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: riskColor[selected.risk_level] }}>{selected.risk_score}/100</div>
                    </div>
                    {selected.markup_percentage && (
                      <div>
                        <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '4px' }}>Markup</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: riskColor[selected.risk_level] }}>+{selected.markup_percentage}%</div>
                      </div>
                    )}
                    {selected.potential_savings && (
                      <div>
                        <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '4px' }}>Potensi Hemat</div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#10B981' }}>Rp {(selected.potential_savings / 1000000).toFixed(1)}jt</div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '20px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#4A5C78', fontWeight: 700, marginBottom: '12px' }}>DETAIL TRANSAKSI</div>
                  <div style={{ display: 'grid', gap: '10px' }}>
                    {[
                      { label: 'Item', value: selected.item_name },
                      { label: 'Harga Vendor', value: selected.vendor_price ? `Rp ${selected.vendor_price?.toLocaleString('id-ID')}` : '-' },
                      { label: 'Harga Pasar', value: selected.market_price ? `Rp ${selected.market_price?.toLocaleString('id-ID')}` : '-' },
                      { label: 'Rekomendasi', value: selected.recommendation || '-' },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid rgba(31,45,69,0.5)' }}>
                        <span style={{ color: '#4A5C78' }}>{row.label}</span>
                        <span style={{ color: '#D1D9E6', fontWeight: 500, maxWidth: '60%', textAlign: 'right' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href="/zenith/investigator" style={{ flex: 1, padding: '12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', color: '#F59E0B', fontSize: '13px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ◉ Investigasi Lebih Dalam
                  </a>
                  <a href="/zenith/price-guard" style={{ flex: 1, padding: '12px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', color: '#60A5FA', fontSize: '13px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ⬡ Lihat Price Guard
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4A5C78' }}>
                Pilih vendor untuk melihat detail
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}