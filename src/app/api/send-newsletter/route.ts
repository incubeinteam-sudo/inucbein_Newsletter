import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.NEWSLETTER_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createServiceClient()

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const { data: articles } = await supabase
      .from('articles')
      .select('*')
      .gte('created_at', yesterday.toISOString())
      .order('published_at', { ascending: false })
      .limit(30)

    const { data: subscribers } = await supabase
      .from('subscribers')
      .select('email, founder_name, startup_name, access_code')
      .eq('verified', true)

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'No verified subscribers.' })
    }

    const startups = articles?.filter(a => a.category === 'startups') ?? []
    const grants   = articles?.filter(a => a.category === 'grants')   ?? []

    const dateStr = new Date().toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      timeZone: 'Asia/Kolkata'
    })

    let sent = 0, failed = 0

    for (const sub of subscribers) {
      try {
        await resend.emails.send({
          from: 'IncubeIn Digest <onboarding@resend.dev>',
          to: sub.email,
          subject: `🚀 IncubeIn Digest — ${dateStr}`,
          html: buildNewsletterHtml({ ...sub, startups, grants, dateStr }),
        })
        sent++
      } catch (e) {
        console.error(`Failed: ${sub.email}`, e)
        failed++
      }
    }

    await supabase.from('newsletters').insert({
      title: `Daily Digest — ${dateStr}`,
      sent_count: sent,
    })

    return NextResponse.json({ success: true, sent, failed })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

function buildNewsletterHtml({ founder_name, startup_name, access_code, startups, grants, dateStr }: any) {
  const card = (a: any, color: string) => `
    <tr><td style="padding:6px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e8d0d8;border-left:4px solid ${color};border-radius:8px;">
        <tr><td style="padding:14px 18px;">
          <a href="${a.url}" style="text-decoration:none;">
            <p style="margin:0 0 5px;color:#111;font-size:14px;font-weight:700;line-height:1.4;">${a.title}</p>
          </a>
          <p style="margin:0 0 6px;font-size:11px;color:#999;">📰 ${a.source || 'IncubeIn'} · ${a.published_at?.substring(0,10) || dateStr}</p>
          ${a.summary ? `<p style="margin:0;color:#666;font-size:12px;line-height:1.5;">${a.summary.substring(0,180)}${a.summary.length > 180 ? '…' : ''}</p>` : ''}
        </td></tr>
      </table>
    </td></tr>`

  return `
<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:30px 15px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
  <tr><td style="background:#c0103c;border-radius:12px 12px 0 0;padding:28px;text-align:center;">
    <h1 style="margin:0;color:#fff;font-size:22px;font-weight:900;">🚀 IncubeIn Startup Digest</h1>
    <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">${dateStr}</p>
  </td></tr>
  <tr><td style="background:#fff;padding:20px 28px;">
    <p style="color:#555;font-size:14px;margin:0;">Hi <strong>${founder_name}</strong> from <strong style="color:#c0103c;">${startup_name}</strong>, here's your daily digest.</p>
  </td></tr>
  ${startups.length > 0 ? `
  <tr><td style="background:#fdf0f4;padding:10px 28px 4px;">
    <p style="color:#c0103c;font-size:13px;font-weight:900;margin:0;text-transform:uppercase;letter-spacing:1px;">🚀 Funding & Startups</p>
  </td></tr>
  <tr><td style="background:#f5f5f5;padding:8px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0">${startups.slice(0,8).map((a: any) => card(a,'#c0103c')).join('')}</table>
  </td></tr>` : ''}
  ${grants.length > 0 ? `
  <tr><td style="background:#f0fdf4;padding:10px 28px 4px;">
    <p style="color:#166534;font-size:13px;font-weight:900;margin:0;text-transform:uppercase;letter-spacing:1px;">🏛️ Grants & Schemes</p>
  </td></tr>
  <tr><td style="background:#f5f5f5;padding:8px 28px;">
    <table width="100%" cellpadding="0" cellspacing="0">${grants.slice(0,6).map((a: any) => card(a,'#16a34a')).join('')}</table>
  </td></tr>` : ''}
  <tr><td style="background:#1a1a2e;border-radius:0 0 12px 12px;padding:18px 28px;text-align:center;">
    <p style="color:#c0103c;font-size:11px;font-weight:900;margin:0 0 4px;">Access ID: ${access_code}</p>
    <p style="color:rgba(255,255,255,0.3);font-size:11px;margin:0;">Powered by <strong style="color:#c0103c;">IncubeIn Foundation</strong></p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`
}