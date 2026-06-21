import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#111]">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#f0e0e5]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#c0103c] text-white font-black text-base flex items-center justify-center rounded-[4px]">
            IF
          </div>
          <span className="font-bold text-sm">
            IncubeIn <span className="text-[#c0103c]">Foundation</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>Home</span>
          <span>About</span>
          <span>Startups</span>
          <Link
            href="/register"
            className="bg-[#c0103c] text-white px-5 py-2 rounded text-sm font-bold hover:bg-[#a00d33] transition"
          >
            Get Access
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-8 pt-14 pb-12 max-w-6xl mx-auto items-center">

        {/* Left */}
        <div>
          {/* Badge */}
          <div className="inline-flex mb-6">
            <span className="bg-[#1a1a2e] text-white text-[10px] font-black tracking-[1.5px] uppercase px-3 py-1.5">
              Exclusive Newsletter Access
            </span>
            <span className="bg-[#c0103c] text-white text-[10px] font-black tracking-[1px] uppercase px-3 py-1.5">
              For Incubated Startups
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-4">
            Stay Ahead.<br />
            <span className="text-[#c0103c]">Stay Funded.</span>
          </h1>

          <p className="text-base text-gray-500 leading-relaxed mb-8 max-w-md">
            Get India's daily startup digest featuring funding news, grants,
            startup opportunities, and ecosystem updates.
          </p>

          <ul className="flex flex-col gap-5">
            {[
              {
                icon: '🚀',
                title: 'Startup News',
                desc: 'Latest startup launches, investments, and ecosystem trends.',
              },
              {
                icon: '₹',
                title: 'Grants & Funding',
                desc: 'Government schemes, grants, and funding opportunities.',
              },
              {
                icon: '📈',
                title: 'Curated Opportunities',
                desc: 'Accelerators, incubators, startup programs, and competitions.',
              },
            ].map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#c0103c] flex items-center justify-center text-white text-lg flex-shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#c0103c] mb-0.5">{f.title}</div>
                  <div className="text-sm text-gray-500 leading-snug">{f.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Form Card */}
        <div className="bg-white border-2 border-[#e8d0d8] rounded-2xl p-8 shadow-sm max-w-sm mx-auto w-full">
          <div className="text-center mb-6">
            <div className="w-9 h-9 bg-[#c0103c] text-white font-black text-sm flex items-center justify-center rounded-[4px] mx-auto mb-3">
              IF
            </div>
            <h2 className="text-lg font-medium text-[#111]">
              Unlock Your <span className="text-[#c0103c] font-black">Free Access</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Join our newsletter and receive a unique access code for your startup.
            </p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa]">
              <span className="text-[#c0103c] text-base">👤</span>
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa]">
              <span className="text-[#c0103c] text-base">🏢</span>
              <input
                type="text"
                placeholder="Startup / Organization"
                className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 border-2 border-[#e0d0d5] rounded-lg px-4 py-3 bg-[#fafafa]">
              <span className="text-[#c0103c] text-base">✉️</span>
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent outline-none text-sm text-gray-600 w-full placeholder-gray-400"
              />
            </div>
          </div>

          <Link href="/register">
            <button className="w-full bg-[#c0103c] text-white py-3.5 rounded-lg text-sm font-black tracking-wider uppercase hover:bg-[#a00d33] transition">
              Get My Access Code
            </button>
          </Link>

          <p className="text-center text-[11px] text-gray-400 mt-3 flex items-center justify-center gap-1">
            🔒 Your information is secure and will not be shared.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#f0e8ea] mx-8" />

      {/* How It Works */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[#e8d0d8]" />
          <h2 className="text-sm font-black tracking-[2px] uppercase text-[#111]">How It Works</h2>
          <div className="flex-1 h-px bg-[#e8d0d8]" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '1', icon: '👤', title: 'Submit Your Details', desc: 'Fill in a quick form on our secure page.' },
            { num: '2', icon: '✉️', title: 'Receive Your Access Code', desc: "We'll instantly generate your unique access code." },
            { num: '3', icon: '✅', title: 'Verify Your Startup', desc: 'Enter the code to verify your startup.' },
            { num: '4', icon: '📰', title: 'Get Daily Startup Digest', desc: 'Receive daily updates on news, grants & opportunities.' },
          ].map((s, i) => (
            <div key={s.num} className="flex flex-col items-center text-center gap-3 relative">
              {i < 3 && (
                <div className="hidden lg:block absolute right-[-28px] top-5 text-[#c0103c] text-xl font-black z-10">→</div>
              )}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#c0103c] flex items-center justify-center text-xl">
                  {s.icon}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1a1a2e] text-white text-[9px] font-black flex items-center justify-center">
                  {s.num}
                </div>
              </div>
              <div className="text-[11px] font-black uppercase tracking-wide text-[#111] leading-tight">{s.title}</div>
              <div className="text-[11px] text-gray-500 leading-snug">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <div className="bg-[#c0103c] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🚀</span>
          <div>
            <div className="text-white font-black text-base uppercase tracking-wide">Claim Your Free Access Today</div>
            <div className="text-white/80 text-sm underline font-semibold">Incubein.com/newsletter</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-white/60 flex items-center justify-center text-white text-sm">✓</div>
          <div>
            <div className="text-white font-black text-xl leading-none">100% Free</div>
            <div className="text-white/80 text-[10px] uppercase tracking-wide">For Incubated Startups</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c0103c] text-white font-black text-xs flex items-center justify-center rounded-[3px]">
            IF
          </div>
          <div>
            <div className="text-white text-xs font-bold">Powered by IncubeIn Foundation</div>
            <div className="text-white/50 text-[10px]">Daily startup intelligence, grants, funding updates, and opportunities from across India.</div>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white/50 text-xs">
          <span>🌐 www.incubein.org</span>
          <span>✉ hello@incubein.org</span>
        </div>
      </footer>

    </main>
  )
}
