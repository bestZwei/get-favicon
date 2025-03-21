// 导入必要的依赖
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

// 定义 Google Favicon API 的基础 URL
const GOOGLE_FAVICON_API = "https://www.google.com/s2/favicons?domain=";

// 启动 HTTP 服务
serve(async (req: Request) => {
  try {
    // 解析请求参数
    const url = new URL(req.url);
    const domain = url.searchParams.get("domain");

    if (!domain) {
      return new Response("Missing 'domain' parameter", { status: 400 });
    }

    // 构造 Google Favicon API 的完整 URL
    const googleFaviconUrl = `${GOOGLE_FAVICON_API}${encodeURIComponent(domain)}`;

    // 请求 Google Favicon API
    const response = await fetch(googleFaviconUrl);

    // 检查响应是否成功
    if (!response.ok) {
      return new Response("Failed to fetch favicon", { status: 500 });
    }

    // 获取 favicon 数据
    const faviconData = await response.arrayBuffer();
    const contentType = response.headers.get("Content-Type") || "image/x-icon";

    // 返回 favicon 数据给客户端
    return new Response(faviconData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // 缓存一天
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}, { port: 8000 });

console.log("Favicon mirror service running at http://localhost:8000");
