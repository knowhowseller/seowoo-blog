import type { Metadata } from 'next'
import './globals.css'
import { SITE } from '@/lib/site'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { websiteSchema } from '@/lib/schema'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:  `${SITE.name} — 작심삼일을 이겨내는 성장 연구소`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords:    SITE.keywords,
  authors:     [{ name: SITE.author, url: SITE.url }],
  creator:     SITE.author,
  openGraph: {
    type:        'website',
    locale:      SITE.locale,
    url:         SITE.url,
    siteName:    SITE.name,
    title:       SITE.name,
    description: SITE.description,
    images:      [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       SITE.name,
    description: SITE.description,
    images:      [SITE.ogImage],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: SITE.url },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
