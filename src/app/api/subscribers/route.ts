import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const password = req.nextUrl.searchParams.get('password')
  const authHeader = req.headers.get('authorization')

  const isAuthorized =
    password === process.env.ADMIN_PASSWORD ||
    authHeader === `Bearer ${process.env.NEWSLETTER_SECRET}`

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch.' }, { status: 500 })
  }

  return NextResponse.json({ subscribers: data, count: data.length })
}