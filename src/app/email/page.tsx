'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function EmailPage() {
  const [user, setUser] = useState<any>(null)
  const [emails, setEmails] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [briefing, setBriefing] = useState<any>(null)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadData(currentUser.user_id)
  }, [])

  const loadData = async (userId: string) => {
    try {
      const [emailData, briefingData] = await Promise.all([
        api.getEmails(userId),
        api.getBriefing(userId),
      ])
      const allEmails = [
        ...(briefingData?.briefing?.urgent || []),
        ...(briefingData?.briefing?.bisa_nanti || []),
        ...(briefingData?.briefing?.arsip || []),
      ]
      setEmails(allEmails)
      setBriefing(briefingData?.briefing)
      if (allEmails.length > 0) setSelected(allEmails[0])
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
          { icon: '✉', label: 'Email AI', path: '/email', active: true },
          { icon: '◎', label: 'WhatsApp', path: '/whatsapp' },
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

        {/* Header */}
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>✉ Email AI Agent</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Gmail terhubung — Orion baca dan balas email otomatis</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
              {briefing?.urgent?.length || 0} Urgent
            </div>
            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#60A5FA', fontWeight: 600 }}>
              {briefing?.bisa_nanti?.length || 0} Bisa Nanti
            </div>
            <button onClick={() => loadData(user?.user_id)} style={{ padding: '6px 14px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', color: '#60A5FA', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              ↻ Refresh
            </button>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Email list */}
          <div style={{ width: '320px', flexShrink: 0, borderRight: '1px solid #1F2D45', overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#4A5C78' }}>Loading...</div>
            ) : emails.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✉</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Inbox Kosong</div>
                <div style={{ fontSize: '12px', color: '#4A5C78' }}>{briefing?.summary || 'Tidak ada email baru'}</div>
              </div>
            ) : (
              <>
                {briefing?.urgent?.length > 0 && (
                  <div style={{ padding: '8px 12px', fontSize: '10px', color: '#EF4444', fontWeight: 700, letterSpacing: '0.5px', borderBottom: '1px solid rgba(239,68,68,0.1)', background: 'rgba(239,68,68,0.04)' }}>
                    🔴 URGENT
                  </div>
                )}
                {emails.map((email: any, i: number) => (
                  <div key={i} onClick={() => setSelected(email)} style={{ padding: '14px 16px', borderBottom: '1px solid rgba(31,45,69,0.5)', cursor: 'pointer', background: selected === email ? 'rgba(59,130,246,0.08)' : 'transparent', borderLeft: `3px solid ${selected === email ? '#3B82F6' : 'transparent'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#F0F4FF' }}>{email.from || email.sender || 'Unknown'}</span>
                      <span style={{ fontSize: '10px', color: '#4A5C78' }}>{email.time || email.date || ''}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#8899B4', marginBottom: '4px', fontWeight: 500 }}>{email.subject || 'No Subject'}</div>
                    <div style={{ fontSize: '11px', color: '#4A5C78', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email.preview || email.summary || ''}</div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Email detail */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {selected ? (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{selected.subject || 'No Subject'}</h2>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#8899B4' }}>
                    <span>Dari: {selected.from || selected.sender}</span>
                    <span>{selected.time || selected.date}</span>
                  </div>
                </div>

                {selected.ai_summary && (
                  <div style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', color: '#60A5FA', fontWeight: 700, marginBottom: '8px' }}>✦ AI SUMMARY</div>
                    <div style={{ fontSize: '13px', color: '#D1D9E6', lineHeight: 1.7 }}>{selected.ai_summary}</div>
                  </div>
                )}

                <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', color: '#8899B4', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                    {selected.body || selected.preview || selected.summary || 'Tidak ada konten'}
                  </div>
                </div>

                {selected.suggested_reply && (
                  <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, marginBottom: '8px' }}>✦ DRAFT BALASAN AI</div>
                    <div style={{ fontSize: '13px', color: '#D1D9E6', lineHeight: 1.7, marginBottom: '12px' }}>{selected.suggested_reply}</div>
                    <button style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Kirim Balasan ✓
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4A5C78', fontSize: '14px' }}>
                Pilih email untuk melihat detail
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}