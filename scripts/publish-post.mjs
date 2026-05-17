/**
 * 통합 자동화 파이프라인
 * 사용법: node scripts/publish-post.mjs "키워드"
 *
 * 실행 순서:
 * 1. OpenAI로 글 자동 생성 → MDX 파일 저장
 * 2. git add → commit → push (Vercel 자동 배포 트리거)
 * 3. Google Indexing API로 색인 요청
 */

import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const ROOT       = path.join(__dirname, '..')

// .env.local 로드
const envPath = path.join(ROOT, '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .forEach((l) => {
      const [k, ...v] = l.split('=')
      if (k && v.length) process.env[k.trim()] = v.join('=').trim()
    })
}

function run(cmd, opts = {}) {
  console.log(`  $ ${cmd}`)
  return execSync(cmd, { cwd: ROOT, stdio: 'inherit', ...opts })
}

async function main() {
  const keyword = process.argv[2]
  if (!keyword) {
    console.error('❌ 키워드를 입력하세요.\n사용법: node scripts/publish-post.mjs "키워드"')
    process.exit(1)
  }

  console.log('\n🚀 자동 발행 파이프라인 시작\n')
  console.log(`키워드: "${keyword}"\n`)

  // Step 1 — 글 생성
  console.log('📝 Step 1. 글 생성 중...')
  run(`node scripts/generate-content.mjs "${keyword}"`)

  // Step 2 — Git push (Vercel 자동 배포)
  console.log('\n📦 Step 2. GitHub 푸시 (Vercel 자동 배포)...')
  try {
    run('git add content/posts/')
    run(`git commit -m "post: ${keyword} (${new Date().toISOString().split('T')[0]})"`)
    run('git push')
    console.log('  ✅ 푸시 완료 — Vercel이 자동 빌드·배포합니다 (약 1~2분)')
  } catch (e) {
    console.warn('  ⚠️  Git 푸시 실패. 수동으로 push 해주세요.')
  }

  // Step 3 — Google 색인 (선택)
  console.log('\n🔍 Step 3. Google 색인 요청...')
  try {
    run('node scripts/google-indexing.mjs')
  } catch (e) {
    console.warn('  ⚠️  Google 색인 건너뜀 (설정 없음)')
  }

  console.log('\n✅ 파이프라인 완료!')
  console.log('   Vercel 배포 현황: https://vercel.com/dashboard')
}

main().catch((err) => { console.error('❌ 오류:', err.message); process.exit(1) })
