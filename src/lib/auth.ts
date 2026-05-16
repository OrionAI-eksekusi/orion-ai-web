export interface OrionUser {
  user_id: string
  name: string
  email: string
  photo?: string
  plan: 'free' | 'trial' | 'apex' | 'zenith'
  trial_days_left?: number
}

const USER_KEY = 'orion_user'

export const auth = {
  // Simpan user setelah login
  saveUser: (user: OrionUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  // Ambil user dari storage
  getUser: (): OrionUser | null => {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(USER_KEY)
    if (!data) return null
    try {
      return JSON.parse(data)
    } catch {
      return null
    }
  },

  // Cek apakah sudah login
  isLoggedIn: (): boolean => {
    return !!auth.getUser()
  },

  // Logout
  logout: () => {
    localStorage.removeItem(USER_KEY)
    window.location.href = '/'
  },

  // Cek akses plan
  hasApexAccess: (): boolean => {
    const user = auth.getUser()
    if (!user) return false
    return ['trial', 'apex', 'zenith'].includes(user.plan)
  },

  hasZenithAccess: (): boolean => {
    const user = auth.getUser()
    if (!user) return false
    return ['trial', 'zenith'].includes(user.plan)
  },

  // Redirect ke login kalau belum login
  requireAuth: () => {
    if (typeof window === 'undefined') return
    if (!auth.isLoggedIn()) {
      window.location.href = '/login'
    }
  },

  // Redirect ke Google login
  loginWithGoogle: () => {
    window.location.href = 'https://web-production-d2935.up.railway.app/auth/google/login'
  },
}