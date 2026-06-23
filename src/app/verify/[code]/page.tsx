'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function VerifyPage() {
  const params = useParams()
  const code = params?.code as string

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [data, setData] = useState<any>(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!code) {
      setStatus('error')
      setErrorMsg('No access code found in the link.')
      return
    }

    fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: decodeURIComponent(code) }),
    })
      .then(async r => {
        const d = await r.json()
        if (d.success) {
          setStatus('success')
          setData(d)
        } else {
          setStatus('error')
          setErrorMsg(d.error || 'Verification failed.')
        }
      })
      .catch(() => {
        setStatus('error')
        setErrorMsg('Network error. Please try again.')
      })
  }, [code])

  return (
    <main className="min-h-screen bg-white flex flex-col">

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
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white border-2 border-[#e8d0d8] rounded-2xl p-10 text-center shadow-sm">

            {/* LOADING */}
            {status === 'loading' && (
              <>
                <div className="w-20 h-20 rounded-full bg-[#fdf0f4] border-2 border-[#e8d0d8] flex items-center justify-center mx-auto mb-6 text-4xl animate-pulse">
                  ⏳
                </div>
                <h1 className="text-xl font-black text-[#111]">Verifying your access...</h1>
                <p className="text-gray-400 text-sm mt-2">Just a moment</p>
              </>
            )}

            {/* SUCCESS */}
            {status === 'success' && (
              <>
                <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6 text-4xl">
                  🎉
                </div>

                <h1 className="text-2xl font-black text-[#111] mb-1">
                  {data?.already_verified ? 'Already Verified!' : 'Access Activated!'}
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                  Welcome, <strong className="text-[#111]">{data?.subscriber?.founder_name}</strong>!
                  <br />
                  <span className="text-[#c0103c] font-bold">{data?.subscriber?.startup_name}</span> is now subscribed.
                </p>

                <div className="bg-[#fdf0f4] border-2 border-[#e8d0d8] rounded-xl p-5 mb-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
                    Your Startup Access ID
                  </p>
                  <p className="text-[#c0103c] text-2xl font-black tracking-widest font-mono">
                    {data?.subscriber?.access_code}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left space-y-2">
                  <p className="text-sm text-gray-600">✅ Daily digest at <strong className="text-[#111]">10 AM IST</strong></p>
                  <p className="text-sm text-gray-600">✅ Startup news, grants, funding, schemes</p>
                  <p className="text-sm text-gray-600">✅ Curated from 40+ sources</p>
                </div>

                <Link
                  href="/"
                  className="inline-block bg-[#c0103c] hover:bg-[#a00d33] text-white px-8 py-3 rounded-lg font-black text-sm uppercase tracking-wide transition"
                >
                  Back to IncubeIn →
                </Link>
              </>
            )}

            {/* ERROR */}
            {status === 'error' && (
              <>
                <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mx-auto mb-6 text-4xl">
                  ❌
                </div>
                <h1 className="text-xl font-black text-[#111] mb-2">Verification Failed</h1>
                <p className="text-gray-500 text-sm mb-6">{errorMsg}</p>
                <Link
                  href="/register"
                  className="inline-block bg-[#c0103c] text-white px-6 py-3 rounded-lg font-black text-sm uppercase tracking-wide hover:bg-[#a00d33] transition"
                >
                  Register Again →
                </Link>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c0103c] text-white font-black text-xs flex items-center justify-center rounded-[3px]">
            IF
          </div>
          <div className="text-white text-xs font-bold">Powered by IncubeIn Foundation</div>
        </div>
        <div className="flex items-center gap-5 text-white/50 text-xs">
          <span>🌐 www.incubein.com</span>
          <span>✉ hello@incubein.org</span>
        </div>
      </footer>

    </main>
  )
}