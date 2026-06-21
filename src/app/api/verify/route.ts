import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: 'Access code is required.' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('access_code', code.toUpperCase().trim())
      .single()

    if (error || !subscriber) {
      return NextResponse.json({ error: 'Invalid access code.' }, { status: 404 })
    }

    if (subscriber.verified) {
      return NextResponse.json({
        success: true,
        already_verified: true,
        subscriber: {
          founder_name: subscriber.founder_name,
          startup_name: subscriber.startup_name,
          access_code: subscriber.access_code,
        }
      })
    }

    await supabase
      .from('subscribers')
      .update({ verified: true })
      .eq('id', subscriber.id)

    return NextResponse.json({
      success: true,
      already_verified: false,
      subscriber: {
        founder_name: subscriber.founder_name,
        startup_name: subscriber.startup_name,
        access_code: subscriber.access_code,
      }
    })

  } catch (err) {
    console.error('Verify error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}