import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = '/dashboard'

  if (code) {
    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(redirectTo)
    }

    console.error('Auth callback error:', error.message)
  }

  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}