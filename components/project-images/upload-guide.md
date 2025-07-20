# 图片上传和迁移完整指南

## 概述
这份指南将帮助你完成从当前环境到Vercel的图片迁移工作，包括图片上传、配置设置和代码更新。

## 第一步：准备Vercel Blob存储

### 1.1 安装Vercel CLI
```bash
npm i -g vercel
```

### 1.2 登录Vercel账户
```bash
vercel login
```

### 1.3 在Vercel Dashboard中创建项目（如果还没有）
- 访问 https://vercel.com/dashboard
- 点击 "New Project" 
- 连接你的代码仓库（推荐GitHub）

### 1.4 获取Blob存储令牌
```bash
# 在项目根目录执行
vercel env pull .env.local
```

这会创建一个包含`BLOB_READ_WRITE_TOKEN`的`.env.local`文件。

## 第二步：准备图片文件

### 2.1 创建本地图片目录结构
```
local-images/
├── covers/                    # 项目封面图
│   ├── netease-oa.png
│   ├── xms-lowcode.png
│   ├── apollo-finance.png
│   ├── sigma-system.png
│   ├── bedrock-design-system.png
│   ├── bedrock-icon-library.png
│   ├── modeling-3d.png
│   ├── aigc-generation.png
│   └── ai-website.png
├── netease/                   # 网易项目详情图
│   ├── project-context.png
│   ├── user-journey.png
│   └── ...（其他17张图）
├── xms/                       # XMS项目详情图
├── apollo/                    # Apollo项目详情图
├── sigma/                     # Sigma项目详情图
└── bedrock/                   # Bedrock项目详情图
```

### 2.2 图片优化建议
- **格式**: PNG或JPG
- **大小**: 单张图片不超过5MB
- **分辨率**: 封面图建议1200x800px，详情图建议800x600px
- **命名**: 使用英文和连字符，避免特殊字符

## 第三步：配置环境变量

### 3.1 创建或更新.env.local文件
```bash
# Vercel Blob存储令牌
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx

# 项目URL（可选，部署时自动设置）
VERCEL_URL=your-project.vercel.app
```

### 3.2 在Vercel Dashboard中设置环境变量
- 进入项目设置 → Environment Variables
- 添加`BLOB_READ_WRITE_TOKEN`

## 第四步：批量上传图片

### 4.1 安装依赖
```bash
npm install @vercel/blob
```

### 4.2 运行上传脚本
```bash
node scripts/upload-to-vercel-blob.js
```

### 4.3 检查上传结果
脚本会：
- 批量上传所有图片到Vercel Blob
- 生成URL映射文件
- 创建用于更新代码的TypeScript代码

## 第五步：更新代码

### 5.1 更新image-imports.ts文件
使用脚本生成的代码替换 `/components/project-images/image-imports.ts` 的内容。

### 5.2 验证图片引用
确保所有项目数据文件中的图片引用都使用了正确的导入。

## 第六步：部署和测试

### 6.1 部署到Vercel
```bash
vercel --prod
```

### 6.2 测试图片加载
- 检查所有项目封面是否正常显示
- 检查项目详情页的图片是否正常加载
- 测试不同设备和网络条件下的加载速度

## 故障排除

### 常见问题和解决方案

1. **BLOB_READ_WRITE_TOKEN错误**
   ```bash
   vercel env pull .env.local --force
   ```

2. **文件大小超限**
   - 使用在线工具压缩图片
   - 推荐工具：TinyPNG, ImageOptim

3. **图片加载404错误**
   - 检查URL映射是否正确
   - 确认环境变量设置正确

4. **本地开发图片不显示**
   - 确保`.env.local`文件存在
   - 重启开发服务器

## 最佳实践

### 图片优化
- 使用现代图片格式（WebP）如果可能
- 实施懒加载
- 设置适当的缓存策略

### 版本管理
- 不要将`.env.local`提交到代码仓库
- 使用`.gitignore`排除敏感文件
- 定期备份重要图片资源

### 性能优化
- 使用CDN加速（Vercel Blob自带）
- 实施响应式图片加载
- 考虑图片预加载策略

## 成本控制

### Vercel Blob免费额度
- 存储：5GB
- 带宽：100GB/月
- 请求：100万次/月

### 监控使用量
定期检查Vercel Dashboard中的使用统计，避免超出免费额度。

## 备用方案

如果Vercel Blob不满足需求，可以考虑：
1. **Cloudinary** - 更多图片处理功能
2. **AWS S3** - 更大存储容量
3. **GitHub** - 免费但有限制
4. **自建CDN** - 完全控制但需要更多维护

---

按照这个指南操作，你就能成功完成图片的上传和迁移工作。如有问题，请参考故障排除部分或联系技术支持。