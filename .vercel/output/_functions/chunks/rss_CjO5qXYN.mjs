import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./db_ugDz1A2K.mjs";
//#region src/pages/rss.xml.ts
var rss_xml_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ request }) => {
	const origin = new URL(request.url).origin;
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>Lớp 12 LMS - Bí kíp học tập &amp; Tin tức Giáo dục</title>
    <link>${origin}</link>
    <description>Cập nhật nhanh các thông báo tuyển sinh, cấu trúc đề thi tham khảo THPT và phương pháp giải nhanh trắc nghiệm đạt điểm cao.</description>
    <language>vi</language>
    <managingEditor>admin@lop12.vn (Lớp 12 LMS)</managingEditor>
    <webMaster>admin@lop12.vn (Lớp 12 LMS)</webMaster>
    <lastBuildDate>${(/* @__PURE__ */ new Date()).toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${origin}/favicon.svg</url>
      <title>Lớp 12 LMS</title>
      <link>${origin}</link>
    </image>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;
	return new Response(xml, {
		status: 200,
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
			"Cache-Control": "public, max-age=1800, s-maxage=1800"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/rss.xml@_@ts
var page = () => rss_xml_exports;
//#endregion
export { page };
