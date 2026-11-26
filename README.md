# 用 GitHub Pages 上线（免费）

这个文件夹就是可以直接推到 GitHub Pages 的成品，**不用改任何代码**——站点全部用相对路径，放在 `/仓库名/` 子路径下也能正常工作。

## 方式一：网页上传（不用装 Git，3 分钟）

1. 打开 <https://github.com>，登录（没有账号就注册，邮箱验证即可，免费）。
2. 右上角 `+` → **New repository**
   - Repository name：`laoshan-guide`（随便起，会变成网址的一部分）
   - 选 **Public**
   - 点 **Create repository**
3. 在新仓库页面点 **uploading an existing file**，把本文件夹里这 6 个文件拖进去：

   ```
   index.html
   style.css
   knowledge.js
   app.js
   favicon.svg
   .nojekyll      ← 隐藏文件，macOS 按 Cmd+Shift+. 才看得到
   ```

   然后点 **Commit changes**。
4. 仓库 → **Settings** → 左侧 **Pages**
   - Source 选 **Deploy from a branch**
   - Branch 选 **main**，目录选 **/(root)**
   - 点 **Save**
5. 等 1–2 分钟，访问：

   ```
   https://你的用户名.github.io/laoshan-guide/
   ```

## 方式二：一条命令（有 Git 就行）

```bash
GITHUB_TOKEN=ghp_xxx bash ../deploy/github-setup.sh 你的用户名 laoshan-guide
```

脚本会：建仓库 → 推送这 6 个文件 → 开启 Pages → 轮询构建状态 → 打印网址。

> Token 在 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token，勾选 `repo` 权限即可，用完可以删除。

## 注意

- **`.nojekyll` 别漏**，否则 GitHub 会跑 Jekyll 处理，某些文件会被忽略。
- 想用根域名 `https://你的用户名.github.io/`，把仓库名改成 `你的用户名.github.io` 即可。
- 想绑自己的域名：Settings → Pages → Custom domain（域名要能解析，国内访问仍需备案/香港线路）。
- **国内可达性**：`github.io` 在国内时通时断（部分省份 DNS 污染、连接超时），不能保证所有游客都能打开。如果目标是"大陆都能访问"，GitHub Pages 只能当备用入口，主入口建议用国内托管（见 `../NO-SERVER.md`）。
- 以后改内容：直接在网页上重新上传覆盖，或 `git push`。
