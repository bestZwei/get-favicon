// Cloudflare Pages Function 用于获取网站的 favicon

export async function onRequest(context) {
  try {
    // 解析请求参数
    const url = new URL(context.request.url);
    const domain = url.searchParams.get("domain");
    const size = url.searchParams.get("sz"); // 获取 sz 参数（可选）

    if (!domain) {
      return new Response("缺少 'domain' 参数", { 
        status: 400,
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        } 
      });
    }

    // 定义 Google Favicon API 的基础 URL
    const GOOGLE_FAVICON_API = "https://www.google.com/s2/favicons";
    
    // 构造 Google Favicon API 的完整 URL
    const googleFaviconUrl = new URL(GOOGLE_FAVICON_API);
    googleFaviconUrl.searchParams.set("domain", domain);

    // 如果提供了 sz 参数，则添加到请求中
    if (size) {
      googleFaviconUrl.searchParams.set("sz", size);
    }

    console.log(`正在获取域名 ${domain} 的 favicon，URL: ${googleFaviconUrl.toString()}`);

    // 请求 Google Favicon API，不使用Cloudflare特定配置
    const response = await fetch(googleFaviconUrl.toString());

    // 检查响应是否成功
    if (!response.ok) {
      console.error(`获取 favicon 失败: ${response.status} ${response.statusText}`);
      return new Response(`获取 favicon 失败: ${response.status} ${response.statusText}`, { 
        status: response.status, 
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        } 
      });
    }

    // 获取 favicon 数据
    const faviconData = await response.arrayBuffer();
    const contentType = response.headers.get("Content-Type") || "image/x-icon";

    console.log(`成功获取 favicon，内容类型: ${contentType}, 大小: ${faviconData.byteLength} 字节`);

    // 返回 favicon 数据给客户端
    return new Response(faviconData, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": faviconData.byteLength.toString(),
        "Cache-Control": "public, max-age=86400", // 缓存一天
      },
    });
  } catch (error) {
    console.error("错误:", error.message || error.toString());
    return new Response(`服务器内部错误: ${error.message || error.toString()}`, { 
      status: 500, 
      headers: {
        "Content-Type": "text/plain;charset=UTF-8"
      } 
    });
  }
}
