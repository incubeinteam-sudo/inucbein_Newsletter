'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [subscribers, setSubscribers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/subscribers?password=${password}`)
      if (!res.ok) { setError('Wrong password.'); return }
      const data = await res.json()
      setSubscribers(data.subscribers)
      setAuthed(true)
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  const filtered = subscribers.filter(s =>
    search === '' ||
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s.startup_name?.toLowerCase().includes(search.toLowerCase()) ||
    s.founder_name?.toLowerCase().includes(search.toLowerCase()) ||
    (s.incubator_name || '').toLowerCase().includes(search.toLowerCase())
  )

  const exportCSV = () => {
    const headers = ['Startup Name', 'Founder', 'Email', 'Phone', 'Incubator', 'Website', 'Access Code', 'Verified', 'Date']
    const rows = subscribers.map(s => [
      s.startup_name, s.founder_name, s.email, s.phone || '',
      s.incubator_name || '', s.website || '', s.access_code,
      s.verified ? 'Yes' : 'No', s.created_at?.substring(0, 10)
    ])
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `incubein-subscribers-${new Date().toISOString().substring(0, 10)}.csv`
    a.click()
  }

  const verified = subscribers.filter(s => s.verified)
  const unverified = subscribers.filter(s => !s.verified)

  if (!authed) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white border-2 border-[#e8d0d8] rounded-2xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-[#c0103c] text-white font-black text-base flex items-center justify-center rounded-[4px] mx-auto mb-4">
              IF
            </div>
            <h1 className="text-xl font-black text-[#111] mb-1">Admin Dashboard</h1>
            <p className="text-xs text-gray-400 mb-6">IncubeIn Startup Digest</p>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-4">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa] focus-within:border-[#c0103c] transition">
                <span className="text-[#c0103c]">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Admin password"
                  className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c0103c] hover:bg-[#a00d33] disabled:opacity-60 text-white py-3 rounded-lg font-black text-sm uppercase tracking-wide transition"
              >
                {loading ? 'Loading...' : 'Access Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-[#f0e0e5] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#c0103c] text-white font-black text-base flex items-center justify-center rounded-[4px]">
            IF
          </div>
          <div>
            <div className="font-black text-[#111] text-sm">Admin Dashboard</div>
            <div className="text-xs text-gray-400">IncubeIn Startup Digest</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition"
          >
            ⬇️ Export CSV
          </button>
          <Link href="/" className="text-xs text-gray-400 hover:text-[#c0103c] transition">
            ← Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: '👥', label: 'Total Registered', value: subscribers.length, color: 'text-blue-600' },
            { icon: '✅', label: 'Verified', value: verified.length, color: 'text-green-600' },
            { icon: '⏳', label: 'Pending Verification', value: unverified.length, color: 'text-yellow-600' },
          ].map(s => (
            <div key={s.label} className="bg-white border-2 border-[#e8d0d8] rounded-xl p-5">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border-2 border-[#e0d0d5] rounded-xl px-4 py-3 mb-4 focus-within:border-[#c0103c] transition">
          <span className="text-[#c0103c]">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by startup, founder, email or incubator..."
            className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
          />
        </div>

        {/* Table */}
        <div className="bg-white border-2 border-[#e8d0d8] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#f0e8ea] bg-[#fdf0f4]">
                  {['Startup', 'Founder', 'Email', 'Phone', 'Incubator', 'Access Code', 'Status', 'Date'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black text-[#c0103c] uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr
                    key={s.id}
                    className={`border-b border-[#f0e8ea] hover:bg-[#fdf0f4] transition ${i % 2 === 0 ? 'bg-white' : 'bg-[#fdfafa]'}`}
                  >
                    <td className="px-4 py-3 font-bold text-[#111] whitespace-nowrap">{s.startup_name}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{s.founder_name}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{s.email}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{s.phone || '—'}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{s.incubator_name || '—'}</td>
                    <td className="px-4 py-3">
                      <code className="text-[#c0103c] text-xs bg-[#fdf0f4] border border-[#e8d0d8] px-2 py-1 rounded font-mono font-bold">
                        {s.access_code}
                      </code>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {s.verified ? (
                        <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                          ✅ Verified
                        </span>
                      ) : (
                        <span className="bg-yellow-50 text-yellow-700 border border-yellow-200 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                          ⏳ Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {s.created_at?.substring(0, 10)}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-gray-400 text-sm">
                      No subscribers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-gray-400 text-xs mt-3 text-center">
          Showing {filtered.length} of {subscribers.length} subscribers
        </p>
      </div>
    </main>
  )
}