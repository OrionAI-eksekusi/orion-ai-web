'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'

const BACKEND = 'https://web-production-d2935.up.railway.app'

export default function UpgradePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
  }, [])

  const handleUpgrade = async (plan: string) => {
    if (!user) return
    setLoading(plan)
    try {
      const res = await fetch(`${BACKEND}/chat/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.user_id,
          plan,
          email: user.email,
          name: user.name,
        })
      })
      const data = await res.json()
      if (data.status === 'success' && data.payment_url) {
        window.location.href = data.payment_url
      } else {
        alert('Gagal membuat payment: ' + (data.message || 'Error'))
      }
    } catch (e) {
      alert('Error: ' + e)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#070B14', color: '#F0F4FF', fontFamily: "'DM Sans', 'Inter', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '12px' }}>Upgrade Plan</h1>
        <p style={{ color: '#8899B4', fontSize: '16px' }}>Pilih plan yang sesuai dengan kebutuhan bisnis kamu</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '800px', width: '100%' }}>
        
        {/* APEX */}
        <div style={{ background: 'linear-gradient(135deg, #0D1B3E, #111827)', border: '1px solid #3B82F6', borderRadius: '20px', padding: '36px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#60A5FA', letterSpacing: '1px', marginBottom: '8px' }}>APEX</div>
          <div style={{ fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>Rp 120rb</div>
          <div style={{ fontSize: '13px', color: '#4A5C78', marginBottom: '32px' }}>per bulan</div>
          
          <div style={{ textAlign: 'left', marginBottom: '32px' }}>
            {['100 perintah/hari', 'WhatsApp AI Agent 24/7', 'Email AI Agent', 'Smart Briefing harian', 'Task Extractor otomatis', 'Broadcast WA', 'Auto Quotation PDF'].map(f => (
              <div key={f} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#8899B4', marginBottom: '10px' }}>
                <span style={{ color: '#10B981' }}>✓</span>{f}
              </div>
            ))}
          </div>

          <button
            onClick={() => handleUpgrade('apex')}
            disabled={loading === 'apex'}
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {loading === 'apex' ? 'Memproses...' : '✦ Upgrade ke APEX'}
          </button>
        </div>

        {/* ZENITH */}
        <div style={{ background: 'linear-gradient(135deg, #1a1200, #111827)', border: '1px solid #F59E0B', borderRadius: '20px', padding: '36px', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#F59E0B', letterSpacing: '1px', marginBottom: '8px' }}>ZENITH</div>
          <div style={{ fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>Rp 135rb</div>
          <div style={{ fontSize: '13px', color: '#4A5C78', marginBottom: '32px' }}>per bulan</div>
          
          <div style={{ textAlign: 'left', marginBottom: '32px' }}>
            {['200 perintah/hari', 'Semua fitur APEX', 'Price Guard AI', 'OCR Invoice Forensic', 'AI Investigator', 'Vendor Intelligence', 'Compliance Center'].map(f => (
              <div key={f} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#8899B4', marginBottom: '10px' }}>
                <span style={{ color: '#F59E0B' }}>✓</span>{f}
              </div>
            ))}
          </div>

          <button
            onClick={() => handleUpgrade('zenith')}
            disabled={loading === 'zenith'}
            style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #F59E0B, #D97706)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {loading === 'zenith' ? 'Memproses...' : '⬡ Upgrade ke ZENITH'}
          </button>
        </div>
      </div>

      <a href="/dashboard" style={{ marginTop: '32px', color: '#4A5C78', textDecoration: 'none', fontSize: '14px' }}>← Kembali ke Dashboard</a>
    </div>
  )
}