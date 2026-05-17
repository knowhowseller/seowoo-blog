import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import AppCTA from '@/components/AppCTA'

export const metadata: Metadata = {
  title: '서우 성장연구소 소개',
  description: 'S=BTA 방법론으로 작심삼일을 이겨내는 비전관리 앱 서우를 소개합니다.',
  alternates: { canonical: `${SITE.url}/about` },
}

export default function AboutPage() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-seowoo-green mb-6">서우 성장연구소 소개</h1>

        <div className="prose prose-lg max-w-none prose-headings:text-seowoo-green">
          <p className="text-xl text-gray-600 leading-relaxed">
            "또 작심삼일 했나요? 괜찮아요."<br />
            서우 성장연구소는 포기를 반복하는 사람들 곁에서
            진짜 변화를 만드는 방법을 연구합니다.
          </p>

          <h2>S=BTA란?</h2>
          <p>
            서우의 핵심 방법론 <strong>S=BTA</strong>는
            <em>Success = Belief × Time × Action</em>의 약자입니다.
            성공은 신념(Belief), 시간(Time), 행동(Action)이 곱해질 때 만들어집니다.
          </p>
          <ul>
            <li><strong>B (Belief)</strong> — 내가 할 수 있다는 신념 없이는 어떤 플래너도 작동하지 않습니다.</li>
            <li><strong>T (Time)</strong> — 꾸준한 시간 투자가 쌓여야 진짜 변화가 생깁니다.</li>
            <li><strong>A (Action)</strong> — 매일 작은 행동 하나가 나무를 키웁니다.</li>
          </ul>

          <h2>비전관리 앱</h2>
          <p>
            서우 비전관리 앱은 S=BTA를 매일 실천할 수 있도록 설계된 도구입니다.
            비전부터 오늘의 행동까지 계층적으로 연결하고,
            달성할수록 성공의 나무가 자라는 감성 경험을 제공합니다.
          </p>

          <h2>이 블로그에서 다루는 것</h2>
          <ul>
            <li>작심삼일을 이겨내는 실전 방법</li>
            <li>S=BTA 방법론 깊이 있게 이해하기</li>
            <li>비전·꿈·목표·계획을 연결하는 설계법</li>
            <li>자기계발 루틴 만들기</li>
            <li>성공하는 사람들의 습관 연구</li>
          </ul>
        </div>

        <div className="mt-10 flex gap-4">
          <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            앱 무료 체험 →
          </a>
          <a href={SITE.kakaoChannel} target="_blank" rel="noopener noreferrer"
             className="btn-primary bg-yellow-400 text-gray-900 hover:bg-yellow-300">
            카카오채널
          </a>
        </div>
      </div>

      <AppCTA />
    </>
  )
}
