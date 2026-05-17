# 배포 가이드 — seowoo-blog

## 1. GitHub 레포지토리 생성 및 초기 푸시

터미널(seowoo-blog 폴더)에서 순서대로 실행:

```bash
git init
git add .
git commit -m "init: seowoo blog"
git branch -M main
git remote add origin https://github.com/knowhowseller/seowoo-blog.git
git push -u origin main
```

## 2. Vercel 연동

1. https://vercel.com/dashboard 접속
2. "Add New Project" 클릭
3. GitHub에서 `seowoo-blog` 레포 선택
4. Framework Preset: **Next.js** 자동 감지
5. **Environment Variables** 추가:

| 이름 | 값 |
|------|----|
| `NEXT_PUBLIC_SITE_URL` | `https://seowoo-blog.vercel.app` |
| `OPENAI_API_KEY` | sk-... (OpenAI 키) |

6. "Deploy" 클릭 → 2~3분 후 배포 완료

## 3. NEXT_PUBLIC_SITE_URL 업데이트

배포 완료 후 실제 Vercel URL 확인 후:
- Vercel Dashboard → Project → Settings → Environment Variables
- `NEXT_PUBLIC_SITE_URL` 값을 실제 URL로 수정
- Redeploy

## 4. 콘텐츠 자동 생성 설정 (로컬)

`.env.local` 파일 생성 (`.gitignore`에 포함되어 있어 안전):

```
NEXT_PUBLIC_SITE_URL=https://seowoo-blog.vercel.app
OPENAI_API_KEY=sk-...
```

글 생성 테스트:
```bash
node scripts/generate-content.mjs "작심삼일 극복하는 방법"
```

전체 파이프라인 (생성 + git push + Vercel 배포):
```bash
node scripts/publish-post.mjs "목표 달성 습관 만들기"
```

## 5. GitHub Actions 자동화 설정

GitHub 레포 → Settings → Secrets and variables → Actions → New repository secret:

| Secret 이름 | 값 |
|------------|-----|
| `OPENAI_API_KEY` | OpenAI API 키 |
| `NEXT_PUBLIC_SITE_URL` | https://seowoo-blog.vercel.app |

설정 완료 후:
- **자동**: 매주 월·수·금 오전 9시(KST) 키워드 풀에서 자동 글 발행
- **수동**: GitHub → Actions → "자동 SEO 콘텐츠 발행" → "Run workflow" → 키워드 입력

## 6. Google Indexing API 설정 (선택 — 나중에 설정 가능)

1. Google Cloud Console → 새 프로젝트 생성
2. APIs & Services → Indexing API 활성화
3. IAM & Admin → 서비스 계정 생성
4. 서비스 계정 → 키 → JSON 키 다운로드
5. Google Search Console → 설정 → 사용자 → 서비스 계정 이메일 추가 (소유자)
6. `.env.local`에 추가:
   ```
   GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
   GOOGLE_SITE_URL=https://seowoo-blog.vercel.app
   ```

## 운영 루틴 요약

| 작업 | 명령어 | 빈도 |
|------|--------|------|
| 글 1편 생성 + 발행 | `node scripts/publish-post.mjs "키워드"` | 원할 때 |
| 자동 발행 | GitHub Actions 스케줄 (월·수·금) | 자동 |
| 구글 색인 요청 | 자동 (Actions 내 포함) | 자동 |
