'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { auth } from '@/lib/auth'

function CallbackHandler() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const userId = searchParams.get('user_id')
    const name = searchParams.get('name')
    const email = searchParams.get('email')
    const photo = searchParams.get('photo')
    const plan = searchParams.get('plan') as 'free' | 'trial' | 'apex' | 'zenith'
    const trialDays = searchParams.get('trial_days_left')

    console.log('Callback params:', { userId, name, email, plan })

    if (userId && email) {
      auth.saveUser({
        user_id: userId,
        name: name || 'User',
        email,
        photo: photo || undefined,
        plan: plan || 'trial',
        trial_days_left: trialDays ? parseInt(trialDays) : 3,
      })
      window.location.href = '/dashboard'
    } else {
      console.log('No userId or email, redirecting to login')
      window.location.href = '/login?error=auth_failed'
    }
  }, [searchParams])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070B14',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', 'Inter', sans-serif",
      color: '#F0F4FF',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '56px', height: '56px',
          background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', margin: '0 auto 20px',
        }}>✦</div>
        <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
          Menghubungkan akun...
        </div>
        <div style={{ fontSize: '13px', color: '#8899B4' }}>
          Orion AI sedang menyiapkan workspace kamu
        </div>
      </div>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh', backgroundColor: '#070B14',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#F0F4FF', fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px' }}>Loading...</div>
        </div>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  )
}
