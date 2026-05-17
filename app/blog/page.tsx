import type { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/posts'
import { SITE } from '@/lib/site'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title:    '블로그 — 작심삼일 극복부터 비전 설계까지',
  description: '목표 관리, 자기계발 루틴, S=BTA 방법론, 비전보드 만들기 등 성장을 위한 실전 가이드를 모두 모았습니다.',
  alternates: { canonical: `${SITE.url}/blog` },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags  = getAllTags().slice(0, 12)

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-seowoo-navy mb-2">블로그</h1>
      <p className="text-gray-500 mb-8">
        작심삼일 극복, S=BTA 방법론, 비전 설계 실전 가이드
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map(({ tag, count }) => (
            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className="tag hover:bg-seowoo-navy hover:text-white transition-colors">
              #{tag} <span className="opacity-60">({count})</span>
            </Link>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-gray-400 py-20">첫 번째 글이 곧 올라옵니다.</p>
      )}
    </div>
  )
}
