import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/posts'
import { SITE } from '@/lib/site'
import { blogPostSchema, breadcrumbSchema } from '@/lib/schema'
import Link from 'next/link'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug: encodeURIComponent(slug) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = getPostBySlug(slug)
  if (!post) return {}
  const url = `${SITE.url}/blog/${encodeURIComponent(post.slug)}`
  return {
    title:       post.title,
    description: post.description,
    keywords:    post.tags,
    authors:     [{ name: SITE.author }],
    alternates:  { canonical: url },
    openGraph: {
      type:        'article',
      url,
      title:       post.title,
      description: post.description,
      publishedTime: post.date,
      authors:     [SITE.author],
      tags:        post.tags,
      images:      post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
        : [{ url: SITE.ogImage }],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = getAllPosts()
  const related  = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: '홈',    url: SITE.url },
            { name: '블로그', url: `${SITE.url}/blog` },
            { name: post.title, url: `${SITE.url}/blog/${encodeURIComponent(post.slug)}` },
          ])),
        }}
      />

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6 flex gap-2">
          <Link href="/" className="hover:text-seowoo-green">홈</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-seowoo-green">블로그</Link>
          <span>/</span>
          <span className="text-gray-600">{post.title}</span>
        </nav>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className="tag">
              #{tag}
            </Link>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          {post.date} · {post.readingTime} 소요
        </p>

        {/* Content */}
        <div className="prose prose-lg max-w-none prose-headings:text-seowoo-navy prose-a:text-seowoo-navy">
          <MDXRemote source={post.content} />
        </div>

        {/* App CTA inline */}
        <div className="mt-12 p-6 bg-seowoo-base/40 border border-seowoo-blue/20 rounded-2xl text-center">
          <p className="font-bold text-seowoo-navy text-lg mb-2">
            S = 믿음(B) × 생각(T) × 행동(A)
          </p>
          <p className="text-gray-600 text-sm mb-4">
            서우 비전관리 앱으로 오늘부터 직접 실천하세요. 30일 무료 체험.
          </p>
          <a href={SITE.appUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            무료로 시작하기 →
          </a>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-seowoo-green mb-6">함께 읽으면 좋은 글</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="card p-4 hover:border-seowoo-green/30">
                  <p className="font-semibold text-gray-800 text-sm line-clamp-2">{p.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{p.readingTime} 소요</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
