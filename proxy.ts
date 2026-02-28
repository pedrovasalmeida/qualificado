import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Atualiza a sessão (necessário para refresh de tokens)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // /painel/login é pública — qualquer um pode acessar
  if (pathname === "/painel/login") {
    return supabaseResponse;
  }

  // Proteger todas as demais rotas /painel/**
  if (pathname.startsWith("/painel")) {
    if (!user) {
      return NextResponse.redirect(new URL("/painel/login", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/painel/:path*"],
};
