import Link from 'next/link'

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { email?: string }
}) {
  const email = searchParams.email || 'your inbox'

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

            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6 text-4xl">
              ✅
            </div>

            <h1 className="text-2xl font-black text-[#111] mb-3">
              Registration <span className="text-[#c0103c]">Successful!</span>
            </h1>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              We've sent a verification email to{' '}
              <strong className="text-[#111]">{email}</strong>.
              <br />
              Click the activation link to unlock your access.
            </p>

            {/* Info Box */}
            <div className="bg-[#fdf0f4] border border-[#e8d0d8] rounded-xl p-5 mb-8 text-left space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-[#c0103c]">✉️</span>
                Check email from <strong className="text-[#111]">digest@incubein.com</strong>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-[#c0103c]">📁</span>
                Check your <strong className="text-[#111]">spam folder</strong> if not in inbox
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-[#c0103c]">🔑</span>
                Your <strong className="text-[#111]">Startup Access ID</strong> is in the email
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-[#c0103c]">🕙</span>
                Digest arrives daily at <strong className="text-[#111]">10 AM IST</strong>
              </div>
            </div>

            <Link
              href="/"
              className="inline-block text-sm text-[#c0103c] font-semibold hover:underline"
            >
              ← Back to IncubeIn
            </Link>
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
          <span>🌐 www.incubein.org</span>
          <span>✉ hello@incubein.org</span>
        </div>
      </footer>

    </main>
  )
}