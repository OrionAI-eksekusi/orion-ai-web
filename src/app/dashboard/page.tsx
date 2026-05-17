'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

const sidebarItems = [
  { icon: '◈', label: 'Dashboard', path: '/dashboard', active: true },
  { icon: '✉', label: 'Email AI', path: '/email' },
  { icon: '◎', label: 'WhatsApp', path: '/whatsapp' },
  { icon: '✓', label: 'Tasks', path: '/tasks' },
  { icon: '◉', label: 'Broadcast', path: '/broadcast' },
  { icon: '📄', label: 'Quotation', path: '/quotation' },
]

const zenithItems = [
  { icon: '⬡', label: 'Price Guard', path: '/zenith/price-guard' },
  { icon: '◉', label: 'Investigator', path: '/zenith/investigator' },
  { icon: '◪', label: 'OCR Forensic', path: '/zenith/ocr' },
  { icon: '◈', label: 'Vendor Intel', path: '/zenith/vendor' },
  { icon: '✓', label: 'Compliance', path: '/zenith/compliance' },
]

const quickCommands = [
  'Laporan harian hari ini',
  'Cek email urgent',
  'Blast WA ke semua customer',
  'Cek alert Zenith',
  'Buatkan quotation',
]

export default function Dashboard() {
  const [command, setCommand] = useState('')
  const [messages, setMessages] = useState([{
    role: 'orion',
    text: '✦ Selamat pagi! Saya siap mengeksekusi perintah kamu.',
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
  }])
  const [loading, setLoading] = useState(false)
  const [zenithOpen, setZenithOpen] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [briefing, setBriefing] = useState<any>(null)
  const [waStatus, setWaStatus] = useState<any>(null)
  const [anomalies, setAnomalies] = useState<any[]>([])

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    // SSE real-time notifications
    const es = new EventSource(`https://web-production-d2935.up.railway.app/chat/notifications/stream/${currentUser.user_id}`)
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        if (data.type === 'hot_lead') alert(`🔥 HOT LEAD! ${data.phone} siap beli!`)
        if (data.type === 'human_required') alert(`🚨 ${data.phone} butuh bantuan manual!`)
      } catch {}
    }
    return () => es.close()
    const loadData = async () => {
      try {
        const [briefingData, waData] = await Promise.all([
          api.getEmails(currentUser.user_id),
          api.getWaStatus(currentUser.user_id),
        ])
        setBriefing(briefingData)
        setWaStatus(waData)
        if (['trial', 'zenith'].includes(currentUser.plan)) {
          const anomalyData = await api.getAnomalies(currentUser.user_id)
          setAnomalies(anomalyData?.data?.anomalies || [])
        }
      } catch (e) { console.log('Error:', e) }
    }
    loadData()
  }, [])

  const sendCommand = async () => {
    if (!command.trim() || loading || !user) return
    const userMsg = { role: 'user', text: command, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    const cmd = command
    setCommand('')
    setLoading(true)
    try {
      const res = await api.sendCommand(user.user_id, cmd)
      setMessages(prev => [...prev, {
        role: 'orion',
        text: res.response || res.message || res.reply || 'Perintah diproses. ✦',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }])
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'orion',
        text: 'Maaf, terjadi error. Coba lagi. ✦',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }])
    } finally { setLoading(false) }
  }

  const emailCount = briefing?.emails?.length || 0
  const urgentCount = briefing?.emails?.length || 0
  const highRiskCount = anomalies.filter((a: any) => a.risk_level === 'HIGH').length

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#070B14', color: '#F0F4FF', fontFamily: "'DM Sans', 'Inter', sans-serif", overflow: 'hidden' }}>

      {/* SIDEBAR */}
      <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid #1F2D45', backgroundColor: '#0A0F1E', display: 'flex', flexDirection: 'column', padding: '20px 12px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 8px', marginBottom: '28px' }}>
          <div style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>✦</div>
          <span style={{ fontWeight: 800, fontSize: '16px' }}>Orion <span style={{ color: '#3B82F6' }}>AI</span></span>
        </div>

        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '8px', padding: '8px 12px', marginBottom: '20px', fontSize: '11px', color: '#10B981', fontWeight: 600 }}>
          ✦ {user?.plan === 'trial' ? `Trial · ${user?.trial_days_left || 0} hari lagi` : user?.plan?.toUpperCase() || 'FREE'}
        </div>

        <div style={{ fontSize: '10px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.8px', padding: '0 8px', marginBottom: '8px' }}>MENU</div>

        {sidebarItems.map(item => (
          <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', background: item.active ? 'rgba(59,130,246,0.12)' : 'transparent', color: item.active ? '#60A5FA' : '#8899B4', textDecoration: 'none', fontSize: '13px', fontWeight: item.active ? 600 : 400, border: item.active ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent' }}>
            <span style={{ fontSize: '12px' }}>{item.icon}</span>{item.label}
          </a>
        ))}

        <div style={{ marginTop: '16px', marginBottom: '8px' }}>
          <button onClick={() => setZenithOpen(!zenithOpen)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 10px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#F59E0B', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            <span>⬡ ZENITH PRO</span><span>{zenithOpen ? '▾' : '▸'}</span>
          </button>
          {zenithOpen && (
            <div style={{ marginTop: '4px' }}>
              {zenithItems.map(item => (
                <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px 8px 18px', borderRadius: '8px', marginBottom: '2px', color: '#8899B4', textDecoration: 'none', fontSize: '12px', border: '1px solid transparent' }}>
                  <span style={{ fontSize: '10px', color: '#F59E0B' }}>{item.icon}</span>{item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1F2D45' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>{user?.name?.split(' ')[0] || 'User'}</div>
              <div style={{ fontSize: '10px', color: '#4A5C78' }}>{user?.plan || 'Free'} Plan</div>
            </div>
          </div>
          <button onClick={() => auth.logout()} style={{ width: '100%', marginTop: '8px', padding: '8px', background: 'transparent', border: '1px solid #1F2D45', borderRadius: '8px', color: '#4A5C78', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
            Keluar
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>Command Center</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Ketik perintah — Orion akan mengeksekusi</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: waStatus?.connected ? '#10B981' : '#4A5C78' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: waStatus?.connected ? '#10B981' : '#4A5C78', boxShadow: waStatus?.connected ? '0 0 6px #10B981' : 'none' }} />
              {waStatus?.connected ? 'WA Online' : 'WA Offline'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#3B82F6' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 6px #3B82F6' }} />
              Gmail Connected
            </div>
            {highRiskCount > 0 && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '5px 12px', fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
                {highRiskCount} Alert HIGH RISK
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '20px 24px 0', flexShrink: 0 }}>
              {[
                { label: 'Email Diproses', value: emailCount, sub: `${urgentCount} urgent`, color: '#3B82F6', icon: '✉' },
                { label: 'WA Status', value: waStatus?.connected ? 'ON' : 'OFF', sub: waStatus?.connected ? 'WA aktif 24/7' : 'WA offline', color: waStatus?.connected ? '#10B981' : '#4A5C78', icon: '◎' },
                { label: 'Task Terdeteksi', value: briefing?.emails?.length || 0, sub: 'dari email', color: '#06B6D4', icon: '✓' },
                { label: 'Alert Zenith', value: anomalies.length, sub: `${highRiskCount} HIGH RISK`, color: '#EF4444', icon: '⬡' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#4A5C78' }}>{stat.label}</div>
                    <span style={{ fontSize: '14px', color: stat.color, opacity: 0.7 }}>{stat.icon}</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: '#8899B4', marginTop: '4px' }}>{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Briefing summary */}
            {briefing?.summary && (
              <div style={{ margin: '16px 24px 0', padding: '12px 16px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', fontSize: '13px', color: '#8899B4' }}>
                📋 {briefing?.summary}
              </div>
            )}

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0, background: msg.role === 'orion' ? 'linear-gradient(135deg, #3B82F6, #06B6D4)' : 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                    {msg.role === 'orion' ? '✦' : user?.name?.charAt(0) || 'U'}
                  </div>
                  <div style={{ maxWidth: '70%' }}>
                    <div style={{ background: msg.role === 'orion' ? '#0D1321' : 'rgba(59,130,246,0.12)', border: `1px solid ${msg.role === 'orion' ? '#1F2D45' : 'rgba(59,130,246,0.2)'}`, borderRadius: msg.role === 'orion' ? '4px 14px 14px 14px' : '14px 4px 14px 14px', padding: '12px 16px', fontSize: '13px', color: '#D1D9E6', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {msg.text}
                    </div>
                    <div style={{ fontSize: '10px', color: '#4A5C78', marginTop: '4px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>✦</div>
                  <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '4px 14px 14px 14px', padding: '12px 16px', fontSize: '13px', color: '#4A5C78' }}>Orion sedang memproses...</div>
                </div>
              )}
            </div>

            {/* Quick commands */}
            <div style={{ padding: '0 24px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
              {quickCommands.map(cmd => (
                <button key={cmd} onClick={() => setCommand(cmd)} style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '20px', padding: '5px 12px', fontSize: '12px', color: '#60A5FA', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '12px 24px 20px', flexShrink: 0, borderTop: '1px solid #1F2D45' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', background: '#0D1321', border: '1px solid #2D4160', borderRadius: '14px', padding: '12px 16px' }}>
                <textarea
                  value={command}
                  onChange={e => setCommand(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendCommand() } }}
                  placeholder="Ketik perintah... contoh: 'laporan hari ini' atau 'blast WA promo'"
                  rows={1}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#F0F4FF', fontSize: '14px', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5, caretColor: '#3B82F6' }}
                />
                <button onClick={sendCommand} disabled={!command.trim() || loading} style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, background: command.trim() ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : '#1F2D45', border: 'none', cursor: command.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: 'white' }}>↑</button>
              </div>
              <div style={{ fontSize: '11px', color: '#4A5C78', marginTop: '8px', textAlign: 'center' }}>Enter untuk kirim · Shift+Enter baris baru</div>
            </div>
          </div>

          {/* Right panel */}
          <div style={{ width: '280px', flexShrink: 0, borderLeft: '1px solid #1F2D45', backgroundColor: '#0A0F1E', padding: '20px 16px', overflowY: 'auto' }}>
            <div style={{ fontSize: '11px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.8px', marginBottom: '14px' }}>AKTIVITAS REAL-TIME</div>

            {/* Email urgent */}
            {briefing?.emails?.map((email: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '10px', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid rgba(31,45,69,0.5)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginTop: '3px', flexShrink: 0, background: '#EF4444', boxShadow: '0 0 6px #EF4444' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#D1D9E6' }}>{email.from || 'Email Urgent'}</div>
                  <div style={{ fontSize: '11px', color: '#4A5C78' }}>{email.subject || 'Perlu respon segera'}</div>
                </div>
              </div>
            ))}

            {/* Zenith anomalies */}
            {anomalies.slice(0, 3).map((item: any, i: number) => (
              <div key={i} style={{ display: 'flex', gap: '10px', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid rgba(31,45,69,0.5)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', marginTop: '3px', flexShrink: 0, background: item.risk_level === 'HIGH' ? '#EF4444' : '#F59E0B' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#D1D9E6' }}>{item.vendor_name || 'Alert'}</div>
                  <div style={{ fontSize: '11px', color: '#4A5C78' }}>{item.risk_level} · {item.item_name}</div>
                </div>
              </div>
            ))}

            {!briefing?.emails?.length && anomalies.length === 0 && (
              <div style={{ fontSize: '12px', color: '#4A5C78', textAlign: 'center', padding: '20px 0' }}>
                ✓ Semua aman, tidak ada aktivitas urgent
              </div>
            )}

            {highRiskCount > 0 && (
              <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#EF4444', marginBottom: '8px' }}>⬡ ZENITH ALERT</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#EF4444', marginBottom: '4px' }}>{highRiskCount} HIGH RISK terdeteksi</div>
                <a href="/zenith/price-guard" style={{ display: 'block', textAlign: 'center', padding: '7px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '7px', fontSize: '11px', fontWeight: 600, color: '#EF4444', textDecoration: 'none' }}>Investigasi Sekarang →</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}