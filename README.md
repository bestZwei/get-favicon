# Favicon 获取服务

这是一个基于 Cloudflare Pages Functions 构建的简单 Favicon 镜像服务，可以获取任意网站的 favicon 图标。

## 功能特点

- 使用 Google Favicon API 获取网站图标
- 支持自定义图标大小
- 使用 Cloudflare Pages 免费部署
- 支持 CDN 缓存

## 部署指南

### 前提条件

- 一个 Cloudflare 账号
- 已安装 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/)（Cloudflare 的命令行工具）

### 部署步骤

1. 克隆此仓库：
   ```
   git clone https://github.com/your-username/get-favicon.git
   cd get-favicon
   ```

2. 使用 Wrangler 登录到您的 Cloudflare 账户：
   ```
   wrangler login
   ```

3. 部署到 Cloudflare Pages：
   ```
   wrangler pages publish .
   ```

4. 部署完成后，您将获得一个 Cloudflare Pages 域名，如 `your-project.pages.dev`

## 如何使用

获取网站的 favicon：
```
https://[您的域名]/api/favicon?domain=example.com
```

指定图标大小：
```
https://[您的域名]/api/favicon?domain=example.com&sz=64
```

## 参数说明

- `domain`：必需，指定要获取 favicon 的网站域名
- `sz`：可选，指定图标大小（像素），如 16、32、48、64 等

## 本地开发

使用 Wrangler 在本地运行开发服务器：

```
wrangler pages dev .
```

然后在浏览器中访问 `http://localhost:8788` 即可测试服务。

## 授权许可

MIT
