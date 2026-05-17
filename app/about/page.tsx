import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import AppCTA from '@/components/AppCTA'

export const metadata: Metadata = {
  title: '서우 성장연구소 소개',
  description: 'S=BTA(성공=믿음×생각×행동) 방법론으로 작심삼일을 이겨내는 비전관리 앱 서우를 소개합니다.',
  alternates: { canonical: `${SITE.url}/about` },
}

export default function AboutPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-seowoo-navy mb-2">서우 성장연구소 소개</h1>
        <p className="text-seowoo-blue font-medium mb-8">We grow together!</p>

        <div className="prose prose-lg max-w-none prose-headings:text-seowoo-navy">
          <p className="text-xl text-gray-600 leading-relaxed">
            "또 작심삼일 했나요? 괜찮아요."<br />
            서우 성장연구소는 포기를 반복하는 사람들 곁에서
            <strong> 진정성과 믿음</strong>으로 진짜 변화를 만드는 방법을 연구합니다.
          </p>

          <h2>S=BTA란?</h2>
          <p>
            서우의 핵심 방법론 <strong>S=BTA</strong>는
            <em> 성공 = 믿음(Belief) × 생각/사색(Thinking) × 행동(Action)</em>의 법칙입니다.
            이 세 가지가 곱해질 때 비로소 진짜 성공이 만들어집니다.
          </p>
          <ul>
            <li>
              <strong>B (믿음, Belief)</strong> — 내가 할 수 있다는 믿음 없이는
              어떤 플래너도, 어떤 방법론도 작동하지 않습니다.
              모든 변화는 믿음에서 시작됩니다.
            </li>
            <li>
              <strong>T (생각/사색, Thinking)</strong> — 깊은 사색과 올바른 생각이
              방향을 만듭니다. 무작정 행동하기 전에 먼저 비전을 그리고 목표를 설계하세요.
            </li>
            <li>
              <strong>A (행동, Action)</strong> — 믿음과 생각이 아무리 깊어도
              매일의 작은 행동 없이는 나무가 자라지 않습니다.
            </li>
          </ul>
          <blockquote>
            셋 중 하나라도 0이면 결과도 0입니다. 곱셈의 법칙입니다.
          </blockquote>

          <h2>브랜드 이름 '서우'의 의미</h2>
          <p>
            서우(瑞雨) = <strong>생장을 돕는 상서로운 비.</strong><br />
            작은 빗방울 하나가 씨앗을 키우듯, 서우는 여러분의 성장 곁에 있겠습니다.
          </p>

          <h2>비전관리 앱</h2>
          <p>
            서우 비전관리 앱은 S=BTA를 매일 실천할 수 있도록 설계된 도구입니다.
            비전부터 오늘의 행동까지 계층적으로 연결하고,
            달성할수록 성공의 나무가 자라는 감성 경험을 제공합니다.
          </p>

          <h2>이 블로그에서 다루는 것</h2>
          <ul>
            <li>작심삼일을 이겨내는 실전 방법</li>
            <li>S=BTA(믿음·생각·행동) 방법론 깊이 이해하기</li>
            <li>비전·꿈·목표·계획을 연결하는 설계법</li>
            <li>자기계발 루틴 만들기</li>
            <li>성공하는 사람들의 습관 연구</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            앱 무료 체험 →
          </a>
          <a href={SITE.kakaoChannel} target="_blank" rel="noopener noreferrer"
             className="btn-gold">
            카카오채널
          </a>
        </div>
      </div>

      <AppCTA />
    </>
  )
}
