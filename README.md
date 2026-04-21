<!-- 第一行：GitHub 数据类（仿照图中的 Stars, CI, License） -->
<img src="https://img.shields.io/github/stars/your-username/your-repo?style=flat&logo=github&label=Stars&color=333" alt="Stars"/>
<img src="https://img.shields.io/badge/CI-passing-green?style=flat&logo=github&color=333" alt="CI"/>
<img src="https://img.shields.io/badge/License-MIT-yellow?style=flat&color=333" alt="License"/>

<br>

<!-- 第二行：技术栈类（仿照图中的 Python, GitHub Actions, Docker） -->
<img src="https://img.shields.io/badge/HTML5-555?style=flat&logo=html5&logoColor=E34F26&label=HTML5" alt="HTML5"/>
<img src="https://img.shields.io/badge/CSS3-555?style=flat&logo=css3&logoColor=1572B6&label=CSS3" alt="CSS3"/>
<img src="https://img.shields.io/badge/JavaScript-555?style=flat&logo=javascript&logoColor=F7DF1E&label=JavaScript" alt="JavaScript"/>
<img src="https://img.shields.io/badge/SweetAlert2-555?style=flat&logo=sweetalert2&logoColor=FFD200&label=SweetAlert2" alt="SweetAlert2"/>
<img src="https://img.shields.io/badge/Bootstrap-555?style=flat&logo=bootstrap&logoColor=7952B3&label=Bootstrap" alt="Bootstrap"/>
<img src="https://img.shields.io/badge/GitHub-555?style=flat&logo=github&label=GitHub" alt="GitHub"/>


# KBH 个人博客

一个现代化的个人博客网站，分享 AI、大模型、Agent、科技资讯等内容。

## 🌐 在线访问

[https://kbhknkc.github.io](https://kbhknkc.github.io)

## ✨ 功能特性

- **响应式设计** - 适配桌面端和移动端设备
- **深色/浅色主题** - 支持一键切换主题模式
- **文章列表** - 展示技术文章，支持分类浏览
- **语录页面** - 收藏精彩语录和名言
- **壁纸欣赏** - 精美壁纸展示与下载

## 📁 项目结构

```
KBHKNKC.github.io/
├── index.html              # 首页 - 文章列表
├── about.html              # 关于页面
├── article.html            # 文章详情页
├── category.html           # 分类页面
├── contact.html            # 联系页面
├── quotes.html             # 语录页面
├── sticky-wall.html        # 便签墙页面
├── wallpapers.html         # 壁纸欣赏页面
├── links.html              # 友链页面
├── css/
│   └── blog.css           # 主样式文件
├── js/
│   └── blog.js            # 主要 JavaScript 逻辑
├── img/                    # 图片资源
├── bootstrap/              # Bootstrap 框架
├── ionicons/               # Ionicons 图标库
├── sweetalert/             # SweetAlert 弹窗库
├── data/                   # 数据文件
├── mock/                   # Mock 数据
└── server/                 # 服务端代码
```

## 🚀 本地开发

### 前置要求

- 任意现代浏览器（Chrome、Firefox、Safari、Edge）
- 本地 Web 服务器（可选，推荐用于完整功能测试）

### 运行方式

#### 方法一：直接打开

直接在浏览器中打开 `index.html` 文件即可预览。

#### 方法二：使用本地服务器（推荐）

```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server -p 8000

# 或使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript (ES6+)** - 交互逻辑
- **Bootstrap** - UI 组件框架
- **Ionicons** - 图标库
- **SweetAlert** - 美化的弹窗组件

## 📝 自定义配置

### 修改网站信息

编辑各个 HTML 文件中的 `<title>` 和 `<meta>` 标签来更新网站标题、描述和关键词。

### 添加新文章

在 `data/` 目录或 `mock/` 目录中添加文章数据文件，格式参考现有示例。

### 修改样式

编辑 `css/blog.css` 文件来自定义颜色、布局和其他样式。

### 更换 Logo

替换 `img/logo.png` 文件为你的个人 Logo。

## 📦 部署

本项目设计为静态网站，可以部署到任何静态托管服务：

### GitHub Pages

```bash
# 推送代码到 GitHub 仓库
git add .
git commit -m "更新内容"
git push origin main
```

GitHub Pages 会自动从 `main` 分支部署网站。

### 其他平台

- **Vercel**: 连接 GitHub 仓库后自动部署
- **Netlify**: 拖拽文件夹或连接 Git 仓库
- **Cloudflare Pages**: 连接 Git 仓库部署

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m '添加某个很棒的特性'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📮 联系方式

- 网站: [https://kbhknkc.github.io](https://kbhknkc.github.io)
- 邮箱:kbhknkc@gmail.com
- GitHub: [@KBHKNKC](https://github.com/KBHKNKC)

## ⭐ 致谢

感谢所有开源项目的贡献者，让这个项目成为可能。

---

如果这个项目对你有帮助，请给个 Star ⭐ 支持一下！
