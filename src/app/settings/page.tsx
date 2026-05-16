'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadData(currentUser.user_id)
  }, [])

  const loadData = async (userId: string) => {
    try {
      const planData = await api.getUserPlan(userId)
      setPlan(planData)
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
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Profil, plan, dan pengaturan akun</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          <div style={{ maxWidth: '600px' }}>

            {/* Profile */}
            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>PROFIL</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 700 }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{user?.name || 'User'}</div>
                  <div style={{ fontSize: '13px', color: '#8899B4' }}>{user?.email}</div>
                  <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>✓ Gmail Connected</div>
                </div>
              </div>
            </div>

            {/* Plan */}
            <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '14px', padding: '24px', marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#4A5C78', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '16px' }}>PLAN AKTIF</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: user?.plan === 'zenith' ? '#F59E0B' : '#60A5FA', marginBottom: '4px' }}>
                    {user?.plan?.toUpperCase() || 'FREE'}
                  </div>
                  <div style={{ fontSize: '13px', color: '#8899B4' }}>
                    {user?.plan === 'trial' ? `Trial berakhir dalam ${user?.trial_days_left || 0} hari` :
                     user?.plan === 'apex' ? '100 perintah/hari' :
                     user?.plan === 'zenith' ? '200 perintah/hari' :
                     '10 perintah/hari'}
                  </div>
                </div>
                {['free', 'trial'].includes(user?.plan) && (
                  <a href="/upgrade" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                    Upgrade →
                  </a>
                )}
              </div>
            </div>

            {/* Danger zone */}
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