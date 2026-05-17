import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-seowoo-base">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-color.png" alt="서우 로고" width={36} height={36} className="object-contain" />
          <span className="font-bold text-seowoo-navy text-lg">{SITE.name}</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/blog" className="text-seowoo-dark hover:text-seowoo-navy transition-colors">블로그</Link>
          <Link href="/about" className="text-seowoo-dark hover:text-seowoo-navy transition-colors">소개</Link>
          <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-seowoo-navy text-white rounded-lg hover:bg-seowoo-blue transition-colors text-sm font-semibold">
            앱 시작하기
          </a>
        </div>
      </nav>
    </header>
  )
}
