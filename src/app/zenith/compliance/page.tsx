'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function CompliancePage() {
  const [user, setUser] = useState<any>(null)
  const [anomalies, setAnomalies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadData(currentUser.user_id)
  }, [])

  const loadData = async (userId: string) => {
    try {
      const data = await api.getAnomalies(userId)
      setAnomalies(data?.data?.anomalies || [])
      setSummary(data?.data)
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
            { label: 'Vendor Intel', path: '/zenith/vendor' },
            { label: 'Compliance', path: '/zenith/compliance', active: true },
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
            <div style={{ fontSize: '16px', fontWeight: 700 }}>✓ Compliance Center</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Audit trail dan monitoring kepatuhan transaksi</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
              {anomalies.filter((a: any) => a.risk_level === 'SAFE' || a.risk_level === 'LOW').length} Compliant
            </div>
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
              {anomalies.filter((a: any) => a.risk_level === 'HIGH').length} Violation
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* Summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Total Transaksi', value: anomalies.length || '0', color: '#3B82F6' },
              { label: 'Potensi Risiko', value: `Rp ${((summary?.total_risk_amount || 0) / 1000000).toFixed(1)}jt`, color: '#EF4444' },
              { label: 'Compliance Rate', value: anomalies.length > 0 ? `${Math.round((anomalies.filter((a: any) => a.risk_level === 'SAFE').length / anomalies.length) * 100)}%` : '100%', color: '#10B981' },
            ].map(stat => (
              <div key={stat.label} style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '8px' }}>{stat.label}</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Audit trail */}
          <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1F2D45', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>Audit Trail</div>
              <button onClick={() => loadData(user?.user_id)} style={{ padding: '5px 12px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '6px', color: '#60A5FA', fontSize: '11px', cursor: 'pointer', fontFamily: 'inherit' }}>↻ Refresh</button>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#4A5C78' }}>Loading...</div>
            ) : anomalies.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Semua Compliant</div>
                <div style={{ fontSize: '12px', color: '#4A5C78' }}>{summary?.summary || 'Belum ada data transaksi'}</div>
              </div>
            ) : anomalies.map((item: any, i: number) => (
              <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(31,45,69,0.5)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0, background: riskColor[item.risk_level] || '#4A5C78', boxShadow: `0 0 6px ${riskColor[item.risk_level] || '#4A5C78'}` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '3px' }}>{item.vendor_name} — {item.item_name}</div>
                  <div style={{ fontSize: '11px', color: '#4A5C78' }}>{item.recommendation || 'Tidak ada rekomendasi'}</div>
                </div>
                <div style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '5px', background: `${riskColor[item.risk_level] || '#4A5C78'}15`, color: riskColor[item.risk_level] || '#4A5C78', flexShrink: 0 }}>
                  {item.risk_level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}