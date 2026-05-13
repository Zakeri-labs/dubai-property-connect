import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useMatches,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">صفحه پیدا نشد / الصفحة غير موجودة</p>
        <a href="/fa" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
          خانه / الرئيسية
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-foreground">خطا / خطأ</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-5 rounded-full bg-foreground px-5 py-2.5 text-sm text-background"
        >
          تلاش مجدد / إعادة المحاولة
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { name: "theme-color", content: "#1a1a1a" },
      { title: "مریم البلوشی | مشاوره خرید ملک در دبی" },
      { name: "description", content: "مشاوره تخصصی خرید ملک در دبی و امارات و راهنمای اقامت برای فارسی و عربی‌زبانان." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Maryam Alblushi — Dubai Real Estate" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap",
      },
      { rel: "alternate", hrefLang: "fa", href: "/fa" },
      { rel: "alternate", hrefLang: "ar", href: "/ar" },
      { rel: "alternate", hrefLang: "x-default", href: "/fa" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html dir="rtl" lang="fa" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LangSync />
      <Outlet />
    </QueryClientProvider>
  );
}

// keep <html lang> in sync with current $lang param on client navigation
function LangSync() {
  const matches = useMatches();
  if (typeof document !== "undefined") {
    const params = matches[matches.length - 1]?.params as { lang?: string } | undefined;
    const lang = params?.lang === "ar" ? "ar" : "fa";
    if (document.documentElement.lang !== lang) document.documentElement.lang = lang;
    document.documentElement.dir = "rtl";
  }
  return null;
}
