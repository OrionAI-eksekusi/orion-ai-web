'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

const WA_GATEWAY = 'https://worker-production-67d8.up.railway.app'

export default function WhatsAppPage() {
  const [user, setUser] = useState<any>(null)
  const [waStatus, setWaStatus] = useState<any>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadData(currentUser.user_id)
  }, [])

  const loadData = async (userId: string) => {
    try {
      const [statusRes, msgRes] = await Promise.all([
        fetch(`${WA_GATEWAY}/status?user_id=${userId}`).then(r => r.json()),
        api.getWaMessages(userId),
      ])
      setWaStatus(statusRes)
      setMessages(msgRes?.messages || [])

      if (!statusRes?.connected) {
        await triggerConnect(userId)
      }
    } catch (e) {
      console.log('Error:', e)
    } finally {
      setLoading(false)
    }
  }

  const triggerConnect = async (userId: string) => {
    setConnecting(true)
    try {
      await fetch(`${WA_GATEWAY}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      })
      await new Promise(r => setTimeout(r, 8000))
      const qrRes = await fetch(`${WA_GATEWAY}/qr?user_id=${userId}`).then(r => r.json())
      console.log('QR response:', qrRes)
      setQrCode(qrRes?.qr_url || qrRes?.qr || null)
    } catch (e) {
      console.log('Connect error:', e)
    } finally {
      setConnecting(false)
    }
  }

  const refreshQr = async () => {
    if (!user) return
    setQrCode(null)
    setLoading(true)
    await loadData(user.user_id)
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
          { icon: '◎', label: 'WhatsApp', path: '/whatsapp', active: true },
          { icon: '✓', label: 'Tasks', path: '/tasks' },
          { icon: '◉', label: 'Broadcast', path: '/broadcast' },
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
            <div style={{ fontSize: '16px', fontWeight: 700 }}>◎ WhatsApp AI Agent</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Auto-reply customer 24/7 — AI yang handle semua pesan WA bisnis kamu</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: waStatus?.connected ? '#10B981' : '#EF4444', background: waStatus?.connected ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${waStatus?.connected ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`, padding: '6px 14px', borderRadius: '8px', fontWeight: 600 }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: waStatus?.connected ? '#10B981' : '#EF4444', boxShadow: `0 0 6px ${waStatus?.connected ? '#10B981' : '#EF4444'}` }} />
              {waStatus?.connected ? 'WA Online' : 'WA Offline'}
            </div>
            <button onClick={refreshQr} style={{ padding: '6px 14px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', color: '#60A5FA', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              ↻ Refresh
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {loading || connecting ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4A5C78', gap: '16px' }}>
              <div style={{ fontSize: '32px' }}>◎</div>
              <div style={{ fontSize: '14px' }}>{connecting ? 'Menghubungkan WhatsApp...' : 'Loading...'}</div>
              <div style={{ fontSize: '12px', color: '#4A5C78' }}>Mohon tunggu 8-10 detik</div>
            </div>
          ) : !waStatus?.connected ? (
            <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '16px', padding: '40px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>◎</div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Connect WhatsApp Bisnis</h2>
                <p style={{ color: '#8899B4', fontSize: '14px', marginBottom: '32px', lineHeight: 1.6 }}>
                  Scan QR code ini dengan WhatsApp di HP kamu untuk mengaktifkan AI auto-reply 24/7
                </p>

                {qrCode ? (
                  <div style={{ background: 'white', padding: '20px', borderRadius: '12px', display: 'inline-block', marginBottom: '24px' }}>
                    <img src={qrCode} alt="QR Code WA" style={{ width: '220px', height: '220px' }} />
                  </div>
                ) : (
                  <div style={{ background: '#111827', border: '1px solid #1F2D45', borderRadius: '12px', padding: '40px', marginBottom: '24px', color: '#4A5C78', fontSize: '14px' }}>
                    Klik tombol di bawah untuk generate QR Code
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', marginBottom: '24px' }}>
                  {['Buka WhatsApp di HP kamu', 'Klik menu ⋮ → Perangkat Tertaut', 'Klik "Tautkan Perangkat"', 'Scan QR code di atas'].map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#60A5FA', flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontSize: '13px', color: '#8899B4' }}>{step}</span>
                    </div>
                  ))}
                </div>

                <button onClick={refreshQr} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                  ↻ Generate QR Baru
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                  { label: 'Pesan Masuk', value: messages.length, color: '#3B82F6' },
                  { label: 'Auto-Reply', value: messages.filter((m: any) => m.fromMe).length, color: '#10B981' },
                  { label: 'Customer Aktif', value: new Set(messages.map((m: any) => m.from)).size, color: '#06B6D4' },
                ].map(stat => (
                  <div key={stat.label} style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#4A5C78', marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #1F2D45', fontSize: '13px', fontWeight: 600 }}>Pesan Terkini</div>
                {messages.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#4A5C78', fontSize: '14px' }}>Belum ada pesan masuk</div>
                ) : messages.slice(0, 20).map((msg: any, i: number) => (
                  <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(31,45,69,0.5)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: msg.fromMe ? 'linear-gradient(135deg, #3B82F6, #06B6D4)' : '#1F2D45', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
                      {msg.fromMe ? '✦' : '👤'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: msg.fromMe ? '#60A5FA' : '#F0F4FF' }}>
                          {msg.fromMe ? 'Orion AI' : msg.from?.replace('@s.whatsapp.net', '') || 'Customer'}
                        </span>
                        <span style={{ fontSize: '10px', color: '#4A5C78' }}>
                          {msg.timestamp ? new Date(msg.timestamp * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#8899B4' }}>{msg.body || msg.message || '...'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}