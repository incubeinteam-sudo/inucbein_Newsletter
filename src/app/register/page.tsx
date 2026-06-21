'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    startup_name: '',
    founder_name: '',
    email: '',
    phone: '',
    incubator_name: '',
    website: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      router.push(`/success?email=${encodeURIComponent(form.email)}`)

    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `
    w-full flex items-center gap-3 border-2 border-[#e0d0d5]
    rounded-lg px-4 py-3 bg-[#fafafa] outline-none text-sm
    text-gray-700 placeholder-gray-400
    focus:border-[#c0103c] transition
  `

  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#f0e0e5]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#c0103c] text-white font-black text-base flex items-center justify-center rounded-[4px]">
            IF
          </div>
          <span className="font-bold text-sm">
            IncubeIn <span className="text-[#c0103c]">Foundation</span>
          </span>
        </Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-[#c0103c] transition">
          ← Back to home
        </Link>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-[#c0103c] text-white font-black text-sm flex items-center justify-center rounded-[4px] mx-auto mb-4">
            IF
          </div>
          <div className="inline-flex mb-4">
            <span className="bg-[#1a1a2e] text-white text-[10px] font-black tracking-[1.5px] uppercase px-3 py-1.5">
              Free Access
            </span>
            <span className="bg-[#c0103c] text-white text-[10px] font-black tracking-[1px] uppercase px-3 py-1.5">
              For Incubated Startups
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#111] mb-2">
            Register Your <span className="text-[#c0103c]">Startup</span>
          </h1>
          <p className="text-sm text-gray-500">
            Fill in your details and get your unique Startup Access ID instantly.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-2 border-[#e8d0d8] rounded-2xl p-8 shadow-sm">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Startup Name <span className="text-[#c0103c]">*</span>
                </label>
                <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa] focus-within:border-[#c0103c] transition">
                  <span className="text-[#c0103c]">🏢</span>
                  <input
                    name="startup_name"
                    value={form.startup_name}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                    placeholder="Acme Technologies"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                  Founder Name <span className="text-[#c0103c]">*</span>
                </label>
                <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa] focus-within:border-[#c0103c] transition">
                  <span className="text-[#c0103c]">👤</span>
                  <input
                    name="founder_name"
                    value={form.founder_name}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                    placeholder="Rahul Sharma"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                Email Address <span className="text-[#c0103c]">*</span>
              </label>
              <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa] focus-within:border-[#c0103c] transition">
                <span className="text-[#c0103c]">✉️</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                  placeholder="founder@yourstartup.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                Phone Number
              </label>
              <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa] focus-within:border-[#c0103c] transition">
                <span className="text-[#c0103c]">📞</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                Incubator Name
              </label>
              <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa] focus-within:border-[#c0103c] transition">
                <span className="text-[#c0103c]">🏛️</span>
                <input
                  name="incubator_name"
                  value={form.incubator_name}
                  onChange={handleChange}
                  className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                  placeholder="IIT Bombay SINE, T-Hub, NSRCEL..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                Website
              </label>
              <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa] focus-within:border-[#c0103c] transition">
                <span className="text-[#c0103c]">🌐</span>
                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
                  placeholder="https://yourstartup.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c0103c] hover:bg-[#a00d33] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-lg text-sm font-black tracking-widest uppercase transition mt-2"
            >
              {loading ? 'Registering...' : 'Get My Access Code →'}
            </button>

          </form>

          <p className="text-center text-[11px] text-gray-400 mt-5 flex items-center justify-center gap-1">
            🔒 Free for incubated startups. No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </main>
  )
}