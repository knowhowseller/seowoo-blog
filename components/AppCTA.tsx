import Image from 'next/image'
import { SITE } from '@/lib/site'

export default function AppCTA() {
  return (
    <section className="bg-gradient-to-br from-seowoo-navy to-seowoo-teal py-16 px-4 text-white text-center">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center mb-5">
          <Image src="/logo-white.png" alt="서우" width={56} height={56} className="object-contain opacity-90" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          읽는 것만으로는 바뀌지 않아요.
        </h2>
        <p className="text-white/75 mb-2 text-base">
          <span className="text-seowoo-gold font-semibold">S = 믿음(B) × 생각(T) × 행동(A)</span>
        </p>
        <p className="text-white/70 mb-8 text-base">
          서우 비전관리 앱으로 오늘부터 직접 실천하세요.<br />
          30일 무료 체험, 카드 정보 불필요.
        </p>
        <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer"
           className="inline-block px-8 py-4 bg-seowoo-gold text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-lg">
          지금 무료로 시작하기 →
        </a>
        <p className="text-white/40 text-sm mt-4">We grow together!</p>
      </div>
    </section>
  )
}
