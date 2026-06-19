import type { APIRoute } from 'astro';
import { db } from '../services/db';

export const GET: APIRoute = async ({ request }) => {
  const origin = new URL(request.url).origin;

  // Lấy danh sách bài blog
  const blogs = await db.getBlogs();

  // Escape ký tự đặc biệt XML
  const escapeXml = (text: string): string =>
    text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const buildDate = new Date().toUTCString();

  const items = blogs
    .map((blog) => {
      const pubDate = blog.created_at
        ? new Date(blog.created_at).toUTCString()
        : buildDate;

      const title   = escapeXml(blog.title);
      const summary = escapeXml(blog.summary || 'Bài viết mới từ Lớp 12 LMS');
      const link    = `${origin}/blog/${blog.slug}`;

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${summary}</description>
      <pubDate>${pubDate}</pubDate>
      <category>Học tập</category>${blog.cover_url ? `
      <enclosure url="${escapeXml(blog.cover_url)}" type="image/jpeg" length="0"/>` : ''}
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>Lớp 12 LMS - Bí kíp học tập &amp; Tin tức Giáo dục</title>
    <link>${origin}/blog</link>
    <description>Cập nhật nhanh các thông báo tuyển sinh, cấu trúc đề thi tham khảo THPT và phương pháp giải nhanh trắc nghiệm đạt điểm cao.</description>
    <language>vi</language>
    <managingEditor>admin@lop12.vn (Lớp 12 LMS)</managingEditor>
    <webMaster>admin@lop12.vn (Lớp 12 LMS)</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${origin}/favicon.svg</url>
      <title>Lớp 12 LMS</title>
      <link>${origin}</link>
    </image>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800',
    },
  });
};
