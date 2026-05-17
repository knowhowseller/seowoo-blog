import { SITE } from '@/lib/site'

export default function AppCTA() {
  return (
    <section className="bg-seowoo-green py-16 px-4 text-white text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-5xl mb-4">🌳</p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          읽는 것만으로는 바뀌지 않아요.
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          서우 비전관리 앱으로 S=BTA를 매일 실천하세요.<br />
          30일 무료 체험, 카드 정보 불필요.
        </p>
        <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer"
           className="inline-block px-8 py-4 bg-white text-seowoo-green font-bold rounded-xl hover:bg-seowoo-cream transition-colors text-lg">
          지금 무료로 시작하기 →
        </a>
        <p className="text-white/50 text-sm mt-4">월 6,900원 · 언제든 취소 가능</p>
      </div>
    </section>
  )
}
