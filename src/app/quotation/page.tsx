'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function QuotationPage() {
  const [user, setUser] = useState<any>(null)
  const [form, setForm] = useState({ customer: '', items: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
  }, [])

  const generate = async () => {
    if (!form.customer || !form.items || !user) return
    setLoading(true)
    try {
      const res = await api.sendCommand(user.user_id, `Buatkan quotation untuk ${form.customer}. Items: ${form.items}. ${form.notes ? 'Catatan: ' + form.notes : ''}`)
      setResult(res)
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
          { icon: '◉', label: 'Broadcast', path: '/broadcast' },
          { icon: '📄', label: 'Quotation', path: '/quotation', active: true },
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
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>📄 Auto Quotation</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Generate PDF penawaran otomatis dengan AI</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>

            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '28px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '20px' }}>BUAT QUOTATION BARU</div>

              {[
                { label: 'Nama Customer / Perusahaan', key: 'customer', placeholder: 'PT Maju Jaya / Budi Santoso' },
                { label: 'Items & Harga', key: 'items', placeholder: '10 unit Laptop Dell @ Rp 12jt, 5 unit Mouse @ Rp 200rb' },
                { label: 'Catatan Tambahan', key: 'notes', placeholder: 'Diskon 5%, berlaku sampai akhir bulan' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#8899B4', fontWeight: 600, display: 'block', marginBottom: '8px' }}>{field.label}</label>
                  <input
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={{ width: '100%', padding: '12px', background: '#111827', border: '1px solid #1F2D45', borderRadius: '8px', color: '#F0F4FF', fontSize: '13px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                  />
                </div>
              ))}

              <button
                onClick={generate}
                disabled={!form.customer || !form.items || loading}
                style={{ width: '100%', padding: '12px', background: form.customer && form.items ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : '#1F2D45', border: 'none', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: form.customer && form.items ? 'pointer' : 'default', fontFamily: 'inherit' }}
              >
                {loading ? 'Generating...' : '✦ Generate Quotation AI'}
              </button>
            </div>

            {result && (
              <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px', padding: '24px' }}>
                <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, marginBottom: '12px' }}>✓ QUOTATION BERHASIL DIBUAT</div>
                <div style={{ fontSize: '13px', color: '#D1D9E6', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {result.response || result.message || 'Quotation sedang diproses...'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}