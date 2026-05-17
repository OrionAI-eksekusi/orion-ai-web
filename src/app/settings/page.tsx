'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'

const BACKEND = 'https://web-production-d2935.up.railway.app'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [phone, setPhone] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessContext, setBusinessContext] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadProfile(currentUser.user_id)
  }, [])

  const loadProfile = async (userId: string) => {
    try {
      const res = await fetch(`${BACKEND}/chat/user-profile/${userId}`)
      const data = await res.json()
      setPhone(data?.phone || '')
      setBusinessName(data?.business_name || '')
      setBusinessContext(data?.business_context || '')
    } catch (e) {}
  }

  const saveSettings = async () => {
    if (!user) return
    setSaving(true)
    try {
      await fetch(`${BACKEND}/chat/update-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.user_id,
          phone,
          business_name: businessName,
          business_context: businessContext,
        })
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
    } finally {
      setSaving(false)
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
        ].map(item => (
          <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', color: '#8899B4', textDecoration: 'none', fontSize: '13px', border: '1px solid transparent' }}>
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
          <button onClick={() => auth.logout()} style={{ width: '100%', marginTop: '8px', padding: '8px', background: 'transparent', border: '1px solid #1F2D45', borderRadius: '8px', color: '#4A5C78', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
            Keluar
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>⚙ Settings</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Profil, bisnis, dan pengaturan akun</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '600px' }}>

            {/* Profile */}
            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>PROFIL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700 }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>{user?.name}</div>
                  <div style={{ fontSize: '13px', color: '#8899B4' }}>{user?.email}</div>
                  <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>✓ Gmail Connected</div>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: '#8899B4', fontWeight: 600, display: 'block', marginBottom: '8px' }}>📱 Nomor WA untuk Smart Briefing</label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="628xxxxxxxxxx"
                  style={{ width: '100%', padding: '10px 12px', background: '#111827', border: '1px solid #1F2D45', borderRadius: '8px', color: '#F0F4FF', fontSize: '13px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
                <div style={{ fontSize: '11px', color: '#4A5C78', marginTop: '4px' }}>Briefing dikirim ke nomor ini setiap jam 06.00 pagi</div>
              </div>
            </div>

            {/* Business Context */}
            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>PROFIL BISNIS</div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: '#8899B4', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Nama Bisnis</label>
                <input
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder="Toko Maju Jaya / PT Orion Indonesia"
                  style={{ width: '100%', padding: '10px 12px', background: '#111827', border: '1px solid #1F2D45', borderRadius: '8px', color: '#F0F4FF', fontSize: '13px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#8899B4', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Deskripsi Bisnis & Produk</label>
                <textarea
                  value={businessContext}
                  onChange={e => setBusinessContext(e.target.value)}
                  placeholder="Kami menjual... Produk unggulan kami... Harga mulai dari... Target customer kami..."
                  rows={5}
                  style={{ width: '100%', padding: '10px 12px', background: '#111827', border: '1px solid #1F2D45', borderRadius: '8px', color: '#F0F4FF', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
                />
                <div style={{ fontSize: '11px', color: '#4A5C78', marginTop: '4px' }}>AI Sales akan pakai info ini untuk balas WA customer kamu</div>
              </div>
            </div>

            {/* SOP Bisnis */}
            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>📋 SOP & FAQ BISNIS</div>
              <div style={{ fontSize: '12px', color: '#8899B4', marginBottom: '12px' }}>Info ini dipakai Sales AI untuk jawab pertanyaan customer dengan tepat</div>
              {[
                { key: 'products', label: '🛍️ Daftar Produk & Harga', placeholder: 'Produk A: Rp 100.000
Produk B: Rp 200.000
Produk C: Rp 150.000' },
                { key: 'faq', label: '❓ FAQ & Cara Order', placeholder: 'Q: Cara order?
A: Chat WA ini dan sebutkan produk yang mau dibeli

Q: Pengiriman ke mana saja?
A: Seluruh Indonesia via JNE/J&T' },
                { key: 'promo', label: '🎁 Promo & Diskon', placeholder: 'Promo bulan ini:
- Diskon 10% untuk pembelian pertama
- Free ongkir minimal Rp 300.000' },
              ].map(sop => (
                <div key={sop.key} style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', color: '#8899B4', fontWeight: 600, display: 'block', marginBottom: '8px' }}>{sop.label}</label>
                  <textarea
                    placeholder={sop.placeholder}
                    rows={4}
                    id={`sop-${sop.key}`}
                    style={{ width: '100%', padding: '10px 12px', background: '#111827', border: '1px solid #1F2D45', borderRadius: '8px', color: '#F0F4FF', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
                  />
                </div>
              ))}
            </div>

            {/* Save */}
            <button onClick={saveSettings} disabled={saving} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '20px' }}>
              {saving ? 'Menyimpan...' : saved ? '✓ Tersimpan!' : 'Simpan Pengaturan'}
            </button>

            {/* Plan */}
            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>PLAN AKTIF</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: user?.plan === 'zenith' ? '#F59E0B' : '#60A5FA' }}>{user?.plan?.toUpperCase() || 'FREE'}</div>
                  <div style={{ fontSize: '13px', color: '#8899B4' }}>
                    {user?.plan === 'trial' ? `Trial berakhir dalam ${user?.trial_days_left || 0} hari` : user?.plan === 'apex' ? '100 perintah/hari' : user?.plan === 'zenith' ? '200 perintah/hari' : '10 perintah/hari'}
                  </div>
                </div>
                {['free', 'trial'].includes(user?.plan) && (
                  <a href="/upgrade" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Upgrade →</a>
                )}
              </div>
            </div>

            {/* Danger */}
            <div style={{ background: '#0D1321', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', padding: '24px' }}>
              <div style={{ fontSize: '12px', color: '#EF4444', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>DANGER ZONE</div>
              <button onClick={() => auth.logout()} style={{ padding: '10px 20px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', color: '#EF4444', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                Keluar dari Akun
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}