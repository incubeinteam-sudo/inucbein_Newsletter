import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { generateAccessCode } from '@/lib/access-code'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { startup_name, founder_name, email, phone, incubator_name, website } = body

    if (!startup_name || !founder_name || !email) {
      return NextResponse.json(
        { error: 'Startup name, founder name and email are required.' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    const { data: existing } = await supabase
      .from('subscribers')
      .select('id, verified')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (existing) {
      return NextResponse.json(
        { error: existing.verified
            ? 'This email is already registered and verified.'
            : 'Already registered. Check your inbox for the verification link.'
        },
        { status: 409 }
      )
    }

    let access_code = generateAccessCode()
    for (let i = 0; i < 5; i++) {
      const { data: check } = await supabase
        .from('subscribers')
        .select('id')
        .eq('access_code', access_code)
        .single()
      if (!check) break
      access_code = generateAccessCode()
    }

    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({
        startup_name,
        founder_name,
        email: email.toLowerCase().trim(),
        phone: phone || null,
        incubator_name: incubator_name || null,
        website: website || null,
        access_code,
        verified: false,
      })

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to register. Please try again.' },
        { status: 500 }
      )
    }

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify/${access_code}`

    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })

      await transporter.sendMail({
        from: `IncubeIn Digest <${process.env.GMAIL_USER}>`,
        to: email,
        subject: 'Activate Your Startup Digest Access — IncubeIn',
        html: getVerificationEmailHtml({
          founder_name,
          startup_name,
          access_code,
          verifyUrl,
        }),
      })

      console.log(`Verification email sent to ${email}`)
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Check your email to activate.',
    })

  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

function getVerificationEmailHtml({
  founder_name,
  startup_name,
  access_code,
  verifyUrl,
}: {
  founder_name: string
  startup_name: string
  access_code: string
  verifyUrl: string
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

  <tr>
    <td style="background:#c0103c;border-radius:12px 12px 0 0;padding:36px;text-align:center;">
      <div style="background:rgba(255,255,255,0.15);display:inline-block;padding:8px 16px;
                  border-radius:4px;margin-bottom:16px;">
        <span style="color:#fff;font-weight:900;font-size:18px;letter-spacing:1px;">IF</span>
      </div>
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:900;">IncubeIn Startup Digest</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
        India's Daily Startup Intelligence
      </p>
    </td>
  </tr>

  <tr>
    <td style="background:#fff;padding:36px 40px;">
      <p style="color:#555;font-size:15px;margin:0 0 14px;">
        Hi <strong style="color:#111;">${founder_name}</strong>,
      </p>
      <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 28px;">
        Welcome! <strong style="color:#111;">${startup_name}</strong> has been registered
        on IncubeIn Startup Digest. Click below to activate your access and start
        receiving daily startup intelligence every morning.
      </p>

      <div style="background:#fdf0f4;border:2px solid #e8d0d8;border-radius:12px;
                  padding:24px;text-align:center;margin-bottom:28px;">
        <p style="color:#999;font-size:10px;letter-spacing:3px;
                  text-transform:uppercase;margin:0 0 8px;">
          Your Startup Access ID
        </p>
        <p style="color:#c0103c;font-size:26px;font-weight:900;
                  letter-spacing:4px;margin:0;font-family:monospace;">
          ${access_code}
        </p>
      </div>

      <div style="text-align:center;margin-bottom:24px;">
        <a href="${verifyUrl}"
           style="display:inline-block;background:#c0103c;color:#fff;
                  text-decoration:none;padding:16px 40px;border-radius:8px;
                  font-size:14px;font-weight:900;letter-spacing:1px;
                  text-transform:uppercase;">
          Activate My Access →
        </a>
      </div>

      <p style="color:#aaa;font-size:12px;text-align:center;margin:0;">
        Or paste in browser:<br>
        <a href="${verifyUrl}" style="color:#c0103c;">${verifyUrl}</a>
      </p>
    </td>
  </tr>

  <tr>
    <td style="background:#fdf0f4;padding:24px 40px;">
      <p style="color:#999;font-size:10px;letter-spacing:2px;
                text-transform:uppercase;margin:0 0 14px;">
        What you'll receive daily
      </p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:5px 0;color:#555;font-size:13px;">🚀 &nbsp;Startup Funding News</td>
          <td style="padding:5px 0;color:#555;font-size:13px;">🏛️ &nbsp;Government Grants</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#555;font-size:13px;">💰 &nbsp;VC & Angel Updates</td>
          <td style="padding:5px 0;color:#555;font-size:13px;">🎯 &nbsp;Accelerator Programs</td>
        </tr>
        <tr>
          <td style="padding:5px 0;color:#555;font-size:13px;">📋 &nbsp;DPIIT Schemes</td>
          <td style="padding:5px 0;color:#555;font-size:13px;">🌱 &nbsp;Incubator Opportunities</td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="background:#1a1a2e;border-radius:0 0 12px 12px;
               padding:20px 40px;text-align:center;">
      <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:0;">
        Powered by <strong style="color:#c0103c;">IncubeIn Foundation</strong>
        &nbsp;·&nbsp; If you didn't register, ignore this email.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`
}