# 🍣 SushiBada Frontend

欢迎来到 **SushiBada** 寿司店的前端项目！这是一个现代化响应式网站，支持菜单展示、派对拼盘预约、线上支付及商家后台管理，专为位于澳大利亚 Oxenford 的实体店开发。

---

## 🔗 项目地址

- 用户端页面：https://sushibada.netlify.app/  
- 商家后台入口：https://sushibada.netlify.app/admin/login

> 💡 请将以上链接替换为你部署后的网址。

---

## ✨ 功能亮点

- 🍱 浏览寿司菜单（支持分类、图片、价格展示）
- 📅 提交拼盘预约表单（含姓名、邮箱、电话、拼盘类型）
- 💌 自动邮件通知（使用 EmailJS）
- 💳 Stripe Checkout 在线支付（防止虚假订单）
- 🔐 商家后台管理（需登录）：
  - 添加 / 修改 / 删除菜单项
  - 上传菜单图片（Cloudinary）
  - 查看 / 删除用户订单

---

## 🛠 技术栈

- **Vue 3** + **Vite** + **TypeScript**
- **Tailwind CSS**（快速构建响应式页面）
- **Framer Motion Vue**（页面过渡动画）
- **Stripe Checkout**（集成支付功能）
- **EmailJS**（用户预约邮件发送）
- **Cloudinary**（菜单图片上传）
- **Netlify** / **Vercel** 部署

---

## 🚀 本地开发指南

### 1. 克隆项目

```bash
git clone https://github.com/yourname/sushibada-frontend.git
cd sushibada-frontend