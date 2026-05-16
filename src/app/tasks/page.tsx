'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/auth'
import { api } from '@/lib/api'

export default function TasksPage() {
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = auth.getUser()
    if (!currentUser) { window.location.href = '/login'; return }
    setUser(currentUser)
    loadData(currentUser.user_id)
  }, [])

  const loadData = async (userId: string) => {
    try {
      const data = await api.getTasks(userId)
      setTasks(data?.tasks?.tasks || [])
    } catch (e) {
      console.log('Error:', e)
    } finally {
      setLoading(false)
    }
  }

  const priorityColor: Record<string, string> = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
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
          { icon: '✓', label: 'Tasks', path: '/tasks', active: true },
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
        <div style={{ borderBottom: '1px solid #1F2D45', padding: '0 28px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0A0F1E', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700 }}>✓ Task Extractor</div>
            <div style={{ fontSize: '11px', color: '#4A5C78' }}>Task otomatis terdeteksi dari email dan WA kamu</div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', padding: '6px 14px', fontSize: '12px', color: '#60A5FA', fontWeight: 600 }}>
              {tasks.length} Tasks
            </div>
            <button onClick={() => loadData(user?.user_id)} style={{ padding: '6px 14px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '8px', color: '#60A5FA', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              ↻ Refresh
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#4A5C78' }}>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
              <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Tidak ada task</div>
              <div style={{ fontSize: '13px', color: '#4A5C78' }}>Task akan muncul otomatis saat Orion mendeteksi dari email atau WA</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '12px', maxWidth: '800px' }}>
              {tasks.map((task: any, i: number) => (
                <div key={i} style={{ background: '#0D1321', border: '1px solid #1F2D45', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: priorityColor[task.priority] || '#4A5C78', boxShadow: `0 0 8px ${priorityColor[task.priority] || '#4A5C78'}`, marginTop: '4px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>{task.title || task.task || 'Task'}</div>
                    {task.deadline && (
                      <div style={{ fontSize: '11px', color: '#F59E0B', marginBottom: '4px' }}>⏰ Deadline: {task.deadline}</div>
                    )}
                    {task.source && (
                      <div style={{ fontSize: '11px', color: '#4A5C78' }}>Sumber: {task.source}</div>
                    )}
                  </div>
                  <div style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '5px', background: `${priorityColor[task.priority] || '#4A5C78'}18`, color: priorityColor[task.priority] || '#4A5C78', flexShrink: 0 }}>
                    {(task.priority || 'normal').toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}