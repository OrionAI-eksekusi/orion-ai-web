const BASE_URL = 'https://orion-ai-backend-v2-production.up.railway.app'

export const api = {
  // AUTH
  getGoogleLoginUrl: () => `${BASE_URL}/auth/google/login`,

  // USER
  getUserProfile: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/user-profile/${userId}`)
    return res.json()
  },

  getUserPlan: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/plan/${userId}`)
    return res.json()
  },

  // CHAT COMMAND
  sendCommand: async (userId: string, message: string) => {
    const res = await fetch(`${BASE_URL}/chat/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, message }),
    })
    return res.json()
  },

  // BRIEFING
  getBriefing: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/briefing?user_id=${userId}`)
    return res.json()
  },

  // EMAIL
  getEmails: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/emails?user_id=${userId}`)
    return res.json()
  },

  sendEmail: async (userId: string, to: string, subject: string, body: string) => {
    const res = await fetch(`${BASE_URL}/chat/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, to, subject, body }),
    })
    return res.json()
  },

  // TASKS
  getTasks: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/tasks?user_id=${userId}`)
    return res.json()
  },

  // WHATSAPP
  getWaStatus: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/wa-status?user_id=${userId}`)
    return res.json()
  },

  getWaQr: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/wa-qr?user_id=${userId}`)
    return res.json()
  },

  getWaMessages: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/whatsapp-messages?user_id=${userId}`)
    return res.json()
  },

  sendBroadcast: async (userId: string, message: string) => {
    const res = await fetch(`${BASE_URL}/chat/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, message }),
    })
    return res.json()
  },

  // CUSTOMERS
  getCustomers: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/customers?user_id=${userId}`)
    return res.json()
  },

  // INVOICES
  getInvoices: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/chat/invoices/${userId}`)
    return res.json()
  },

  // ZENITH
  priceGuard: async (userId: string, data: {
    vendor: string, item: string, harga: number, qty: number, category?: string
  }) => {
    const res = await fetch(`${BASE_URL}/zenith/price-guard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, ...data }),
    })
    return res.json()
  },

  getAnomalies: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/zenith/anomalies/${userId}`)
    return res.json()
  },

  ocrVision: async (userId: string, imageBase64: string) => {
    const res = await fetch(`${BASE_URL}/zenith/ocr-vision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, image_base64: imageBase64 }),
    })
    return res.json()
  },

  getMarketPrices: async () => {
    const res = await fetch(`${BASE_URL}/zenith/market-price/list`)
    return res.json()
  },

  autoExtractGmail: async (userId: string) => {
    const res = await fetch(`${BASE_URL}/zenith/auto-extract-gmail`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    })
    return res.json()
  },
}