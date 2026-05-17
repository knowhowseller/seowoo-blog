import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { SITE } from '@/lib/site'
import PostCard from '@/components/PostCard'
import AppCTA from '@/components/AppCTA'

export default function HomePage() {
  const posts    = getAllPosts()
  const featured = posts.filter((p) => p.featured).slice(0, 1)
  const recent   = posts.slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-seowoo-green to-seowoo-light py-20 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-seowoo-cream/80 font-medium tracking-widest text-sm uppercase">
            S=BTA 성장 연구소
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            작심삼일, 이번엔<br />
            <span className="text-yellow-300">진짜 달라질 수 있어요</span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            비전부터 오늘 행동까지 S=BTA로 연결하는 법을 매일 연구합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/blog" className="btn-primary bg-white text-seowoo-green hover:bg-seowoo-cream">
              글 읽기
            </Link>
            <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer"
               className="btn-primary bg-transparent border-2 border-white hover:bg-white/10">
              앱 무료 체험 →
            </a>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-seowoo-green mb-6">추천 글</h2>
          <PostCard post={featured[0]} featured />
        </section>
      )}

      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-seowoo-green">최근 글</h2>
          <Link href="/blog" className="text-sm text-seowoo-light hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-gray-400 py-20">첫 번째 글이 곧 올라옵니다.</p>
        )}
      </section>

      {/* App CTA */}
      <AppCTA />
    </>
  )
}
