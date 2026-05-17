import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url:             `${SITE.url}/blog/${post.slug}`,
    lastModified:    new Date(post.date),
    changeFrequency: 'weekly',
    priority:        0.8,
  }))

  return [
    { url: SITE.url,             lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE.url}/blog`,   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE.url}/about`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...postEntries,
  ]
}
