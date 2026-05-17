import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface Props {
  post: PostMeta
  featured?: boolean
}

export default function PostCard({ post, featured = false }: Props) {
  const href = `/blog/${encodeURIComponent(post.slug)}`

  if (featured) {
    return (
      <Link href={href}
        className="card p-8 flex flex-col md:flex-row gap-6 group">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-seowoo-green transition-colors mb-3 leading-tight">
            {post.title}
          </h2>
          <p className="text-gray-500 line-clamp-3 mb-4">{post.description}</p>
          <p className="text-xs text-gray-400">{post.date} · {post.readingTime} 소요</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="card p-6 flex flex-col group">
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="tag text-xs">{tag}</span>
        ))}
      </div>
      <h3 className="font-bold text-gray-900 group-hover:text-seowoo-green transition-colors mb-2 line-clamp-2 leading-snug">
        {post.title}
      </h3>
      <p className="text-gray-500 text-sm line-clamp-3 flex-1 mb-4">{post.description}</p>
      <p className="text-xs text-gray-400">{post.date} · {post.readingTime} 소요</p>
    </Link>
  )
}
