export async function onRequest(context) {
  const response = await context.next();
  
  // 添加 CORS 头
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  
  // 复制原来的响应并添加新的头信息
  const newResponse = new Response(response.body, response);
  
  // 添加 CORS 头到响应
  Object.keys(corsHeaders).forEach(key => {
    newResponse.headers.set(key, corsHeaders[key]);
  });
  
  return newResponse;
}
