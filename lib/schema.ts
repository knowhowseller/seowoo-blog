import { SITE } from './site'
import type { PostMeta } from './posts'

export function blogPostSchema(post: PostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline:         post.title,
    description:      post.description,
    datePublished:    post.date,
    dateModified:     post.date,
    author:           { '@type': 'Person', name: SITE.author, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name:    SITE.name,
      url:     SITE.url,
      logo:    { '@type': 'ImageObject', url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${encodeURIComponent(post.slug)}` },
    keywords:         post.tags.join(', '),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name:        SITE.name,
    url:         SITE.url,
    description: SITE.description,
    potentialAction: {
      '@type':       'SearchAction',
      target:        `${SITE.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':  'ListItem',
      position: i + 1,
      name:     item.name,
      item:     item.url,
    })),
  }
}
