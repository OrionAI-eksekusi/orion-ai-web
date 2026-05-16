'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function BroadcastPage() {
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadData(currentUser.user_id)
  }, [])

  const loadData = async (userId: string) => {
    try {
      const data = await api.getCustomers(userId)
      setCustomers(data?.customers || data || [])
    } catch (e) {
      console.log('Error:', e)
    } finally {
      setLoadingData(false)
    }
  }

  const sendBroadcast = async () => {
    if (!message.trim() || !user) return
    setLoading(true)
    try {
      await api.sendBroadcast(user.user_id, message)
      setSent(true)
      setMessage('')
      setTimeout(() => setSent(false), 3000)
    } catch (e) {
      console.log('Error:', e)
    } finally {
      setLoading(false)
    }
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
          { icon: '✓', label: 'Tasks', path: '/tasks' },
          { icon: '◉', label: 'Broadcast', path: '/broadcast', active: true },
        ].map(item => (
          <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', background: item.active ? 'rgba(59,130,246,0.12)' : 'transparent', color: item.active ? '#60A5FA' : '#8899B4', textDecoration: 'none', fontSize: '13px', border: item.active ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent' }}>
            <span>{item.icon}</span>{item.label}
          </a>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1F2D45' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>{user?.name?.split(' ')[0] || 'User'}</div>
              <div style={{ fontSize: '10px', color: '#4A5C78' }}>{user?.plan} Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>◉ Broadcast WA</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Kirim pesan ke semua customer sekaligus</div>
          </div>
          <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#60A5FA', fontWeight: 600 }}>
            {loadingData ? '...' : customers.length} Customer
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>

            {/* Compose */}
            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>TULIS PESAN BROADCAST</div>

              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Halo! Kami punya promo spesial untuk kamu hari ini..."
                rows={6}
                style={{ width: '100%', background: '#111827', border: '1px solid #1F2D45', borderRadius: '10px', padding: '14px', color: '#F0F4FF', fontSize: '14px', resize: 'vertical', outline: 'none', fontFamily: 'inherit', lineHeight: 1.6, boxSizing: 'border-box' }}
              />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <div style={{ fontSize: '12px', color: '#4A5C78' }}>
                  Target: <span style={{ color: '#60A5FA', fontWeight: 600 }}>{customers.length} customer</span>
                </div>
                <button
                  onClick={sendBroadcast}
                  disabled={!message.trim() || loading}
                  style={{ padding: '10px 24px', background: message.trim() ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : '#1F2D45', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: message.trim() ? 'pointer' : 'default', fontFamily: 'inherit' }}
                >
                  {loading ? 'Mengirim...' : sent ? '✓ Terkirim!' : `Kirim ke ${customers.length} Customer`}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '14px', padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#60A5FA', fontWeight: 700, marginBottom: '12px' }}>💡 TIPS BROADCAST EFEKTIF</div>
              {[
                'Gunakan nama customer dengan variabel {nama} untuk personalisasi',
                'Kirim di jam aktif: 09.00-11.00 atau 19.00-21.00',
                'Selalu sertakan CTA yang jelas di akhir pesan',
                'Jangan broadcast lebih dari 1x per hari',
              ].map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '13px', color: '#8899B4' }}>
                  <span style={{ color: '#60A5FA', flexShrink: 0 }}>→</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}