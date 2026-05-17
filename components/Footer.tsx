import Link from 'next/link'
import { SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="bg-seowoo-green text-white/80 py-12 mt-20">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-white text-lg mb-2">🌳 {SITE.name}</p>
          <p className="text-sm leading-relaxed">{SITE.description}</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">링크</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/blog" className="hover:text-white transition-colors">블로그</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">서우 소개</Link></li>
            <li><a href={SITE.kakaoChannel} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">카카오채널</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">서우 비전관리 앱</p>
          <p className="text-sm mb-3">S=BTA로 비전부터 오늘 행동까지 연결하세요.</p>
          <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer"
             className="inline-block px-4 py-2 bg-white text-seowoo-green rounded-lg text-sm font-semibold hover:bg-seowoo-cream transition-colors">
            30일 무료 체험
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-8 pt-8 border-t border-white/20 text-xs text-center">
        © {new Date().getFullYear()} 서우(Seowoo). All rights reserved.
      </div>
    </footer>
  )
}
