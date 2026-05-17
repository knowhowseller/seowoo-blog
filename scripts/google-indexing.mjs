/**
 * Google Indexing API — 새 글 발행 후 구글에 즉시 색인 요청
 * 사용법: node scripts/google-indexing.mjs [slug]
 * slug 없으면 사이트맵 전체 URL 일괄 요청
 *
 * 사전 준비:
 * 1. Google Cloud Console → API & Services → Indexing API 활성화
 * 2. 서비스 계정 생성 → JSON 키 다운로드
 * 3. Search Console → 설정 → 사용자 및 권한 → 서비스 계정 이메일 추가 (소유자)
 * 4. .env.local에 GOOGLE_SERVICE_ACCOUNT_JSON, GOOGLE_SITE_URL 설정
 */

import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// .env.local 수동 로드
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

const SITE_URL = process.env.GOOGLE_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://seowoo-blog.vercel.app'

async function getAuth() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!json) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON 환경변수가 없습니다.')
  const credentials = JSON.parse(json)
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  })
  return auth
}

async function requestIndexing(url, auth) {
  const indexing = google.indexing({ version: 'v3', auth })
  const res = await indexing.urlNotifications.publish({
    requestBody: { url, type: 'URL_UPDATED' },
  })
  return res.data
}

async function main() {
  const slug = process.argv[2]

  let auth
  try {
    auth = await getAuth()
  } catch (e) {
    console.warn(`⚠️  Google Indexing API 미설정: ${e.message}`)
    console.warn('   .env.local에 GOOGLE_SERVICE_ACCOUNT_JSON을 설정하면 자동 색인됩니다.')
    process.exit(0)
  }

  const urls = slug
    ? [`${SITE_URL}/blog/${slug}`]
    : [`${SITE_URL}/`, `${SITE_URL}/blog`]

  console.log(`\n🔍 Google 색인 요청 (${urls.length}개 URL)`)

  for (const url of urls) {
    try {
      await requestIndexing(url, auth)
      console.log(`  ✅ ${url}`)
    } catch (err) {
      console.error(`  ❌ ${url} — ${err.message}`)
    }
    // API rate limit 방어 (1초 간격)
    await new Promise((r) => setTimeout(r, 1000))
  }

  console.log('\n완료. 구글이 보통 24~48시간 내 색인합니다.')
}

main().catch((err) => { console.error('❌ 오류:', err.message); process.exit(1) })
