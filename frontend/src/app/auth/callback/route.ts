import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { userExitsts } from '@/lib/actions/auth-actions'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = '/dashboard';

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      redirectTo.pathname = '/error';
      return NextResponse.redirect(redirectTo);
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      redirectTo.pathname = '/error';
      return NextResponse.redirect(redirectTo);
    }

    try {
      const res = await userExitsts(user?.email as string);

      if (!res || !res.data) {
        redirectTo.pathname = '/error';
        return NextResponse.redirect(redirectTo);
      }

      if (!res.data.success) {
        console.log(res.data.message);
        redirectTo.pathname = '/error';
        return NextResponse.redirect(redirectTo);
      }

      console.log(user.app_metadata);

      const provider = user?.app_metadata.provider;

      if (provider === 'google' && !res.data.user) {//user doesn't exist, redirect the user to complete profile page
        redirectTo.pathname = "/complete-profile";
        return NextResponse.redirect(redirectTo);
      }
    } catch (error) {
      redirectTo.pathname = '/error';
      return NextResponse.redirect(redirectTo);
    }
  } else {
    redirectTo.pathname = '/error';
  }

  return NextResponse.redirect(redirectTo);
}