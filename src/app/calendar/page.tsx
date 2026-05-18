'use client'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-d2935.up.railway.app'

export default function CalendarPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [reauth, setReauth] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const u = localStorage.getItem('user_id') || ''
    setUserId(u)
    if (!u) { window.location.href = '/login'; return }
    fetchEvents(u)
  }, [])

  const fetchEvents = async (uid: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/chat/calendar/${uid}`)
      const data = await res.json()
      if (data.status === 'reauth_required') {
        setReauth(true)
      } else {
        setEvents(data.events || [])
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const formatDate = (dt: string) => {
    if (!dt) return '-'
    return new Date(dt).toLocaleString('id-ID', {
      weekday: 'short', day: 'numeric', month: 'short',
      hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta'
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', color: '#E2E8F0', fontFamily: 'Inter, sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>📅 Google Calendar</h1>
        <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '28px' }}>Jadwal mendatang dari Google Calendar kamu</p>

        {reauth && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
            <p style={{ color: '#EF4444', fontSize: '13px', marginBottom: '10px' }}>⚠️ Perlu izin ulang untuk mengakses Google Calendar</p>
            <a href={`${API}/auth/google/login`} style={{ background: '#3B82F6', color: '#fff', padding: '8px 16px', borderRadius: '7px', fontSize: '13px', textDecoration: 'none' }}>
              Hubungkan Ulang Google
            </a>
          </div>
        )}

        {loading ? (
          <p style={{ color: '#64748B' }}>Memuat jadwal...</p>
        ) : events.length === 0 && !reauth ? (
          <p style={{ color: '#64748B' }}>Tidak ada jadwal mendatang.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.map((ev) => (
              <div key={ev.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px' }}>
                <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{ev.summary || 'Tanpa judul'}</p>
                <p style={{ color: '#60A5FA', fontSize: '12px', marginBottom: '4px' }}>🕐 {formatDate(ev.start?.dateTime || ev.start?.date)}</p>
                {ev.description && <p style={{ color: '#94A3B8', fontSize: '12px' }}>{ev.description}</p>}
                {ev.htmlLink && (
                  <a href={ev.htmlLink} target="_blank" style={{ color: '#60A5FA', fontSize: '11px', textDecoration: 'none' }}>Buka di Google Calendar →</a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
