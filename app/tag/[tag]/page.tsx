import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import { SITE } from '@/lib/site'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

interface Props { params: Promise<{ tag: string }> }

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag)
  return {
    title:      `#${tag} 관련 글 모음`,
    description: `${tag}에 관한 자기계발 가이드 모음. 서우 성장연구소`,
    alternates:  { canonical: `${SITE.url}/tag/${rawTag}` },
  }
}

export default async function TagPage({ params }: Props) {
  const { tag: rawTag } = await params
  const tag   = decodeURIComponent(rawTag)
  const posts = getPostsByTag(tag)
  if (posts.length === 0) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/blog" className="text-sm text-gray-400 hover:text-seowoo-green">← 블로그</Link>
      </div>
      <h1 className="text-3xl font-bold text-seowoo-green mb-2">
        <span className="text-seowoo-light">#</span>{tag}
      </h1>
      <p className="text-gray-500 mb-10">총 {posts.length}개의 글</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
