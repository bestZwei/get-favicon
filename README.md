# 网站图标服务 / Favicon Service with Cloudflare Pages Functions

> **免责声明 / Disclaimer**  
> 本服务仅作学习和演示用途，图标内容均来自 Google Favicon API，版权归原网站所有。请勿用于商业用途或大规模抓取。如因使用本服务导致任何法律风险或账号被封，开发者概不负责。  
> This service is for learning and demonstration purposes only. All favicon content is fetched from the Google Favicon API and belongs to the original site owners. Do not use for commercial purposes or large-scale crawling. The developer is not responsible for any legal risks or account suspension caused by using this service.

---

## 简介 / Introduction

这是一个通过 Cloudflare Pages Functions 实现的 favicon 获取服务，代理 Google Favicon API，便于部署和使用。  
This is a simple favicon retrieval service that proxies requests to the Google Favicon API. It's implemented as a Cloudflare Pages Function for easy deployment and high availability.

## 部署 / Deployment

1. 安装 Wrangler CLI / Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/):
   ```
   npm install -g wrangler
   ```

2. 登录 Cloudflare 账号 / Login to your Cloudflare account:
   ```
   wrangler login
   ```

3. 创建并部署 Cloudflare Pages 项目 / Create and deploy the Cloudflare Pages project:
   ```
   # 进入项目目录 / Navigate to the project directory
   cd get-favicon
   
   # 初始化 Git 仓库 / Initialize Git repository
   git init
   git add .
   git commit -m "Initial commit"
   
   # 创建并发布 Pages 项目 / Create and publish Pages project
   wrangler pages project create get-favicon
   wrangler pages publish .
   ```

## Docker Compose 部署

1. 新建 `docker-compose.yml` 文件，内容如下：

```yaml
version: '3.8'
services:
  favicon:
    image: bestzwei/get-favicon:latest
    container_name: get-favicon
    restart: unless-stopped
    ports:
      - "9738:9738"  # 主机9738端口映射到容器9738
    environment:
      - PORT=9738     # 可选，如需自定义端口
```

2. 在服务器项目目录下运行：

```
docker compose up -d
```

3. 访问服务：

```
http://<你的服务器IP>:9738/?domain=example.com
```
或
```
http://<你的服务器IP>:9738/api/favicon?domain=example.com
```

---

如需自定义端口，修改 `ports` 和 `environment` 中的端口号即可。

## 使用方法 / Usage

部署后，你可以通过以下两种方式获取 favicon：  
Once deployed, you can use the service in two ways:

### 1. 根路径 / Root path (simplest)

```
https://[your-project-name].pages.dev/?domain=[domain]
```

### 2. API 路径 / API path

```
https://[your-project-name].pages.dev/api/favicon?domain=[domain]
```

两种方式都会直接返回 favicon 图片。  
Both methods will return the favicon image directly.

### 参数 / Parameters

- `domain`：必填，要获取 favicon 的域名 (如 `google.com`)  
  (Required) The domain to fetch the favicon for (e.g., `google.com`)
- `sz`：可选，favicon 的尺寸 (如 `16`, `32`, `64`)  
  (Optional) The desired size of the favicon (e.g., `16`, `32`, `64`)

### 请求示例 / Example Requests

基础用法 / Basic usage:
```
https://get-favicon.pages.dev/?domain=google.com
```

指定尺寸 / With specified size:
```
https://get-favicon.pages.dev/?domain=google.com&sz=64
```

### HTML 中使用 / Usage in HTML

```html
<img src="https://get-favicon.pages.dev/?domain=google.com" alt="Google Favicon">
```

## 交互演示 / Interactive Demo

项目主页提供交互式演示界面，支持中英文切换：  
The project includes an interactive HTML demo page with language switch at:

```
https://[your-project-name].pages.dev/
```

该页面允许用户测试服务并查看实时示例。  
This page allows users to test the service and see live examples.

## 本地开发 / Development

本地开发命令 / For local development:

```
npx wrangler pages dev
```

这将启动一个模拟 Cloudflare Pages 环境的本地服务器。  
This will start a local server that emulates the Cloudflare Pages environment.

## 技术说明 / Technical Notes

- 本项目使用 Cloudflare Pages Functions 实现，无需独立服务器
- 支持 CORS，可在任何网站中调用
- 图标将缓存一天，减轻服务器负担
- 支持多种尺寸选项，但实际返回取决于 Google API

---

Powered by [Cloudflare Pages](https://pages.cloudflare.com/) | [GitHub Repository](https://github.com/bestZwei/get-favicon)
