import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-seowoo-green text-lg">
          <span className="text-2xl">🌳</span>
          <span>{SITE.name}</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/blog" className="text-gray-600 hover:text-seowoo-green transition-colors">블로그</Link>
          <Link href="/about" className="text-gray-600 hover:text-seowoo-green transition-colors">소개</Link>
          <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 bg-seowoo-green text-white rounded-lg hover:bg-seowoo-light transition-colors">
            앱 시작하기
          </a>
        </div>
      </nav>
    </header>
  )
}
