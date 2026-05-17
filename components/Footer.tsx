import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/site'

export default function Footer() {
  return (
    <footer className="bg-seowoo-navy text-white/80 py-12 mt-20">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/logo-white.png" alt="서우 로고" width={28} height={28} className="object-contain" />
            <p className="font-bold text-white text-lg">{SITE.name}</p>
          </div>
          <p className="text-sm leading-relaxed text-white/70">{SITE.slogan}</p>
          <p className="text-xs text-white/50 mt-2">서우 = 생장을 돕는 상서로운 비.</p>
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
          <p className="text-sm mb-3 text-white/70">S=BTA로 믿음·생각·행동을 매일 실천하세요.</p>
          <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer"
             className="inline-block px-4 py-2 bg-seowoo-gold text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            30일 무료 체험
          </a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-8 pt-8 border-t border-white/10 text-xs text-center text-white/40">
        © {new Date().getFullYear()} 주식회사 서우(Seowoo). All rights reserved.
      </div>
    </footer>
  )
}
