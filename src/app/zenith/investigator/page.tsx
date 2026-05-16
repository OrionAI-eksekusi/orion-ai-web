'use client'

import { useState } from 'react'

const suggestedQuestions = [
  'Kenapa biaya operasional bulan ini naik 40%?',
  'Vendor mana yang paling berisiko?',
  'Ada indikasi fraud di procurement?',
  'Bandingkan pengeluaran Q1 vs Q2',
  'Transaksi mencurigakan minggu ini?',
]

const mockResponses: Record<string, string> = {
  'naik': `📊 Analisa Kenaikan Biaya Operasional\n\nBerdasarkan 200 transaksi bulan ini, ditemukan:\n\n🔴 TEMUAN UTAMA:\nDivisi IT melakukan pembelian 20 unit laptop dengan harga 30% di atas harga pasar dari vendor baru "PT Tech Solution" yang baru terdaftar 2 bulan lalu.\n\n📋 BUKTI TRANSAKSI:\n• 12 Mei — PT Tech Solution — 10 unit laptop — Rp 250jt (pasar: Rp 190jt)\n• 14 Mei — PT Tech Solution — 10 unit laptop — Rp 248jt (pasar: Rp 190jt)\n• Total markup: Rp 118 juta\n\n⚠️ RED FLAGS:\n• Vendor baru tanpa track record\n• Tidak ada proses tender\n• Approval dilakukan 1 orang tanpa review\n• Transaksi dipecah untuk hindari limit approval\n\n🎯 REKOMENDASI:\n1. Audit hubungan procurement officer dengan vendor\n2. Tahan pembayaran kedua\n3. Lakukan tender ulang dengan 3 vendor terpercaya`,

  'berisiko': `⬡ Vendor Risk Analysis\n\nTop 3 Vendor Paling Berisiko:\n\n🔴 1. PT Supplier ABC — Score: 85/100\n• Markup konsisten 80-120% dari harga pasar\n• 3x terdeteksi invoice anomali\n• Transaksi Rp 450jt dalam 3 bulan\n\n🟡 2. CV Logistik Prima — Score: 54/100\n• Harga naik 35% tanpa alasan jelas\n• Dominant vendor (78% dari budget logistik)\n• Tidak ada vendor pembanding\n\n🟡 3. Toko Elektronik Sentral — Score: 48/100\n• 2x invoice duplikat terdeteksi\n• Transaksi di hari libur nasional\n\n✅ Vendor Terpercaya:\n• PT Maju Elektronik — Score: 12 (SAFE)\n• CV Berkah Jaya — Score: 8 (SAFE)`,

  'fraud': `🔍 Investigasi Fraud Procurement\n\nDitemukan 4 pola mencurigakan:\n\n1️⃣ SPLIT INVOICE\nPembelian Rp 500jt dipecah jadi 5 invoice Rp 100jt untuk hindari approval direksi.\nPelaku: Divisi Operasional\nWaktu: 8-12 Mei 2026\n\n2️⃣ TRANSAKSI HARI LIBUR\n3 transaksi bernilai total Rp 180jt dilakukan saat libur nasional 1 Mei tanpa approval.\n\n3️⃣ VENDOR DOMINANCE\nCV Logistik Prima kuasai 78% budget pengiriman Rp 2.1 miliar — risk kolusi tinggi.\n\n4️⃣ INVOICE MANIPULASI\nOCR mendeteksi font berbeda pada invoice PT Supplier ABC — kemungkinan angka dimanipulasi.\n\n💡 REKOMENDASI:\nLaporkan ke audit internal. Siapkan laporan untuk rapat direksi.`,

  'q1': `📈 Perbandingan Q1 vs Q2 2026\n\nQ1 (Jan-Mar): Rp 1.2 miliar\nQ2 (Apr-Jun): Rp 1.8 miliar\nKenaikan: +50% (Rp 600 juta)\n\nBreakdown kenaikan:\n• Procurement IT: +Rp 320jt (vendor baru markup tinggi)\n• Logistik: +Rp 180jt (dominasi 1 vendor)\n• Operasional: +Rp 100jt (split invoice terdeteksi)\n\n⚠️ Kenaikan tidak proporsional dengan pertumbuhan bisnis (hanya +12% revenue).\n\nRekomendasi: Audit menyeluruh Q2 sebelum tutup buku.`,

  'minggu': `🔍 Transaksi Mencurigakan Minggu Ini\n\n5 transaksi flagged:\n\n🔴 1. Invoice PT ABC — Rp 25jt — markup 108%\n🔴 2. Split payment CV Prima — 3x Rp 45jt\n🟡 3. Vendor baru tanpa verifikasi — Rp 78jt\n🟡 4. Transaksi weekend — Rp 32jt\n🟡 5. Harga tidak konsisten — Rp 15jt\n\nTotal potensi fraud: Rp 240 juta\nPerlu investigasi segera.`,
}

export default function InvestigatorPage() {
  const [messages, setMessages] = useState([
    {
      role: 'orion',
      text: '◉ AI Investigator siap. Tanya saya tentang transaksi, vendor, atau anomali keuangan perusahaan kamu dalam bahasa Indonesia. Saya akan analisa semua data dan berikan temuan berbasis bukti.',
      time: '06:00',
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', text: input, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    const q = input
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const key = Object.keys(mockResponses).find(k => q.toLowerCase().includes(k))
      const reply = key ? mockResponses[key] : `🔍 Menganalisa pertanyaan: "${q}"\n\nBerdasarkan data transaksi yang tersedia, saya sedang memproses analisa mendalam. Untuk hasil akurat, pastikan data transaksi sudah diimport ke sistem Zenith.\n\nAnda bisa coba pertanyaan seperti:\n• "Kenapa biaya naik bulan ini?"\n• "Vendor mana yang berisiko?"\n• "Ada indikasi fraud di procurement?"`
      setMessages(prev => [...prev, { role: 'orion', text: reply, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) }])
      setLoading(false)
    }, 1500)
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
        ].map(item => (
          <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', borderRadius: '8px', marginBottom: '2px', color: '#8899B4', textDecoration: 'none', fontSize: '13px', border: '1px solid transparent' }}>{item.icon} {item.label}</a>
        ))}

        <div style={{ marginTop: '12px' }}>
          <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#F59E0B', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>⬡ ZENITH PRO</div>
          {[
            { label: 'Price Guard', path: '/zenith/price-guard' },
            { label: 'Investigator', path: '/zenith/investigator', active: true },
            { label: 'OCR Forensic', path: '/zenith/ocr' },
            { label: 'Vendor Intel', path: '/zenith/vendor' },
          ].map(item => (
            <a key={item.label} href={item.path} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px 8px 16px', borderRadius: '8px', marginBottom: '2px', background: item.active ? 'rgba(245,158,11,0.08)' : 'transparent', color: item.active ? '#F59E0B' : '#8899B4', textDecoration: 'none', fontSize: '12px', border: item.active ? '1px solid rgba(245,158,11,0.2)' : '1px solid transparent' }}>
              {item.active && <span style={{ color: '#F59E0B', fontSize: '10px' }}>▸</span>}
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>◉ AI Investigator</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Tanya AI dalam bahasa Indonesia — dijawab berdasarkan data transaksi nyata</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#60A5FA', fontWeight: 600 }}>
              200 transaksi dianalisa
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, background: msg.role === 'orion' ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'linear-gradient(135deg, #6366F1, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>
                {msg.role === 'orion' ? '◉' : 'A'}
              </div>
              <div style={{ maxWidth: '75%' }}>
                <div style={{ background: msg.role === 'orion' ? '#0D1321' : 'rgba(99,102,241,0.1)', border: `1px solid ${msg.role === 'orion' ? '#1F2D45' : 'rgba(99,102,241,0.2)'}`, borderRadius: msg.role === 'orion' ? '4px 14px 14px 14px' : '14px 4px 14px 14px', padding: '14px 18px', fontSize: '13px', color: '#D1D9E6', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {msg.text}
                </div>
                <div style={{ fontSize: '10px', color: '#4A5C78', marginTop: '4px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #D97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>◉</div>
              <div style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '4px 14px 14px 14px', padding: '14px 18px', fontSize: '13px', color: '#4A5C78' }}>
                Menganalisa data transaksi...
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        <div style={{ padding: '0 24px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap', flexShrink: 0 }}>
          {suggestedQuestions.map(q => (
            <button key={q} onClick={() => setInput(q)} style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '20px', padding: '5px 12px', fontSize: '12px', color: '#F59E0B', cursor: 'pointer', fontFamily: 'inherit' }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 24px 20px', borderTop: '1px solid #1F2D45', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', background: '#0D1321', border: '1px solid #2D4160', borderRadius: '14px', padding: '12px 16px' }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder="Tanya dalam bahasa Indonesia... contoh: 'Kenapa biaya naik bulan ini?'"
              rows={1}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#F0F4FF', fontSize: '14px', resize: 'none', fontFamily: 'inherit', lineHeight: 1.5, caretColor: '#F59E0B' }}
            />
            <button onClick={send} disabled={!input.trim() || loading} style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, background: input.trim() ? 'linear-gradient(135deg, #F59E0B, #D97706)' : '#1F2D45', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: 'white', transition: 'all 0.2s' }}>↑</button>
          </div>
          <div style={{ fontSize: '11px', color: '#4A5C78', marginTop: '8px', textAlign: 'center' }}>Enter untuk kirim · AI menjawab berdasarkan data transaksi nyata</div>
        </div>
      </div>
    </div>
  )
}