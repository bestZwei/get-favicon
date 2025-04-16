export async function onRequest(context) {
  // 获取主页 HTML 内容
  const response = await context.env.ASSETS.fetch(new Request(new URL('/', context.request.url)));
  
  if (!response.ok) {
    // 如果无法获取静态资源，则返回简单的 HTML
    return new Response(`
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Favicon 获取服务</title>
      </head>
      <body>
        <h1>Favicon 获取服务</h1>
        <p>使用方法: /api/favicon?domain=example.com</p>
      </body>
      </html>
    `, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8"
      }
    });
  }
  
  return response;
}
