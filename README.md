### 使用方法

1. **安装 Deno**  
   确保已安装 Deno，可通过以下命令检查：
   ```bash
   deno --version
   ```
   如果未安装，请参考 [Deno 官方文档](https://deno.land/) 进行安装。

2. **运行脚本**  
   将上述代码保存为 `favicon_mirror.ts`，然后运行以下命令启动服务：
   ```bash
   deno run --allow-net favicon_mirror.ts
   ```

3. **访问服务**  
   在浏览器或通过工具访问以下地址，传入目标域名或 URL 参数：
   ```
   http://localhost:8000/?domain=example.com
   ```
   或者：
   ```
   http://localhost:8000/?domain=https://example.com/page
   ```
