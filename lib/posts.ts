import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  readingTime: string
  featured?: boolean
  coverImage?: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`)
  const mdPath   = path.join(POSTS_DIR, `${slug}.md`)
  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(mdPath) ? mdPath : null
  if (!filePath) return null

  const raw  = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)

  return {
    slug,
    title:       data.title       ?? '',
    description: data.description ?? '',
    date:        data.date        ?? '',
    tags:        data.tags        ?? [],
    category:    data.category    ?? '자기계발',
    readingTime: `${Math.ceil(rt.minutes)}분`,
    featured:    data.featured    ?? false,
    coverImage:  data.coverImage  ?? null,
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function getAllTags(): { tag: string; count: number }[] {
  const tagCount: Record<string, number> = {}
  getAllPosts().forEach((p) => p.tags.forEach((t) => { tagCount[t] = (tagCount[t] ?? 0) + 1 }))
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}
