/**
 * 사용법: node scripts/generate-content.mjs "키워드"
 * 예시:  node scripts/generate-content.mjs "작심삼일 극복하는 방법"
 *
 * OPENAI_API_KEY 환경변수가 필요합니다.
 * .env.local 파일에 설정하거나 터미널에서 직접 설정하세요.
 */

import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts')

// .env.local 수동 로드 (dotenv 없이)
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .forEach((l) => {
      const [k, ...v] = l.split('=')
      if (k && v.length) process.env[k.trim()] = v.join('=').trim()
    })
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

function todayDate() {
  return new Date().toISOString().split('T')[0]
}

async function generatePost(keyword) {
  console.log(`\n🤖 GPT-4o-mini로 글 생성 중: "${keyword}"`)

  const systemPrompt = `당신은 서우(Seowoo) 성장 연구소의 SEO 전문 블로그 작가입니다.
브랜드 정보:
- 서우 비전관리 앱: S=BTA(Success=Belief×Time×Action) 프레임워크
- 핵심 기능: 비전·꿈·목표·계획 계층 관리, 일일 BTA 체크, 성공의 나무 SVG, AI 코칭, 게이미피케이션
- 수익: 개인 Pro 월 6,900원(30일 무료), B2B 학교·기업
- 앱 URL: https://app.seowoo.kr
- 톤: 따뜻하고 진심 어린 응원, 솔직하고 공감, "또 작심삼일 했나요? 괜찮아요"

작성 규칙:
1. 구글 SEO 최적화: 키워드를 제목·소제목·본문에 자연스럽게 포함
2. 1,500~2,000자 분량
3. H2(##) 소제목 4~5개 사용
4. 마지막 섹션은 반드시 서우 비전관리 앱으로 자연스럽게 유도
5. 과장·보장 표현 금지 ("반드시", "무조건", "100%" 사용 금지)
6. 실용적이고 바로 적용 가능한 내용
7. MDX 형식으로 작성 (frontmatter 포함)`

  const userPrompt = `다음 키워드로 SEO 최적화 블로그 글을 작성해주세요: "${keyword}"

반드시 아래 MDX 형식으로 출력하세요 (코드블록 없이 그대로):

---
title: "제목 (키워드 포함, 30자 이내)"
description: "메타 설명 (키워드 포함, 80~120자, 클릭 유도)"
date: "${todayDate()}"
tags: ["태그1", "태그2", "태그3", "태그4"]
category: "자기계발"
featured: false
---

[본문 내용 — H2 소제목 4~5개, 1,500~2,000자]`

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens:  3000,
  })

  return response.choices[0].message.content.trim()
}

function extractTitle(content) {
  const match = content.match(/title:\s*"([^"]+)"/)
  return match ? match[1] : null
}

function savePost(content, keyword) {
  if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true })

  const title    = extractTitle(content) ?? keyword
  const slug     = `${todayDate()}-${slugify(title)}`
  const filename = `${slug}.mdx`
  const filepath = path.join(POSTS_DIR, filename)

  fs.writeFileSync(filepath, content, 'utf-8')
  return { filename, filepath, slug }
}

async function main() {
  const keyword = process.argv[2]
  if (!keyword) {
    console.error('❌ 키워드를 입력하세요.\n사용법: node scripts/generate-content.mjs "키워드"')
    process.exit(1)
  }
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY 환경변수가 없습니다. .env.local 파일을 확인하세요.')
    process.exit(1)
  }

  const content          = await generatePost(keyword)
  const { filename, slug } = savePost(content, keyword)

  console.log(`\n✅ 글 생성 완료!`)
  console.log(`   파일: content/posts/${filename}`)
  console.log(`   URL:  /blog/${slug}`)
  console.log(`\n📋 다음 단계:`)
  console.log(`   1. content/posts/${filename} 내용 검토`)
  console.log(`   2. git add . && git commit -m "post: ${filename}"`)
  console.log(`   3. git push → Vercel 자동 배포`)
  console.log(`   4. node scripts/google-indexing.mjs ${slug}  (구글 즉시 색인)`)
}

main().catch((err) => { console.error('❌ 오류:', err.message); process.exit(1) })
