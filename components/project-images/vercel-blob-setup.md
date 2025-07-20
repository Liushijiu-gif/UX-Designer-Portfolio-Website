# Vercel Blob 完整配置指南

## 🚀 为什么选择Vercel Blob？

### 主要优势

- **零配置集成**：与Vercel项目无缝集成，部署时自动配置
- **慷慨免费额度**：5GB存储 + 100GB带宽/月
- **全球边缘网络**：利用Vercel的全球CDN，访问速度快
- **简单API**：极简的上传和管理接口
- **自动优化**：内置图片优化和格式转换
- **版本控制**：支持图片版本管理
- **安全性**：企业级安全保障

### 价格对比

```
Hobby版（个人）：5GB存储 + 100GB带宽 - 免费
Pro版（团队）：$20/月 - 100GB存储 + 1TB带宽
Enterprise版：定制价格
```

## 📋 前期准备

### 1. 注册Vercel账号

1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号注册（推荐）
3. 完成邮箱验证

### 2. 创建项目（如果还没有）

```bash
# 方法1：通过Vercel CLI
npm install -g vercel
vercel login
vercel init

# 方法2：通过GitHub导入
# 在Vercel Dashboard点击 "New Project"
# 连接GitHub仓库
```

### 3. 启用Blob存储

```bash
# 在项目根目录运行
vercel blob:enable

# 或者在Vercel Dashboard中
# Project Settings → Storage → Enable Blob
```

## 🔧 项目配置

### 1. 安装依赖

```bash
npm install @vercel/blob
```

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# Vercel Blob Token (自动生成)
BLOB_READ_WRITE_TOKEN=your_blob_token_here
```

**注意**：

- 在Vercel部署时，这个token会自动设置
- 本地开发需要手动配置
- 获取方式：Vercel Dashboard → Project → Settings → Environment Variables

### 3. 创建上传工具

创建 `scripts/upload-to-vercel-blob.js`：

```javascript
// scripts/upload-to-vercel-blob.js
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置上传映射
const uploadMap = {
  // 项目封面图
  'covers/netease-oa.png': '../local-images/covers/netease-oa.png',
  'covers/xms-lowcode.png': '../local-images/covers/xms-lowcode.png',
  'covers/apollo-finance.png': '../local-images/covers/apollo-finance.png',
  'covers/bedrock-design-system.png': '../local-images/covers/bedrock-design-system.png',
  'covers/bedrock-icon-library.png': '../local-images/covers/bedrock-icon-library.png',
  'covers/bi-tool-system.png': '../local-images/covers/bi-tool-system.png',
  'covers/sigma-system.png': '../local-images/covers/sigma-system.png',
  'covers/easeflow.png': '../local-images/covers/easeflow.png',

  // 网易项目详情图
  'netease/project-context.png': '../local-images/netease/project-context.png',
  'netease/user-journey.png': '../local-images/netease/user-journey.png',
  'netease/design-goals.png': '../local-images/netease/design-goals.png',
  'netease/interaction-framework.png': '../local-images/netease/interaction-framework.png',
  'netease/smart-form.png': '../local-images/netease/smart-form.png',
  'netease/trigger-position.png': '../local-images/netease/trigger-position.png',
  'netease/awakening.png': '../local-images/netease/awakening.png',
  'netease/expression.png': '../local-images/netease/expression.png',
  'netease/confirmation.png': '../local-images/netease/confirmation.png',
  'netease/feedback.png': '../local-images/netease/feedback.png',
  'netease/guidelines.png': '../local-images/netease/guidelines.png',
  'netease/rule-detection.png': '../local-images/netease/rule-detection.png',
  'netease/speed-reading.png': '../local-images/netease/speed-reading.png',
  'netease/single-field.png': '../local-images/netease/single-field.png',
  'netease/mobile-framework.png': '../local-images/netease/mobile-framework.png',
  'netease/mobile-single-field.png': '../local-images/netease/mobile-single-field.png',
  'netease/mobile-page-display.png': '../local-images/netease/mobile-page-display.png',

  // XMS项目详情图
  'xms/project-background.png': '../local-images/xms/project-background.png',
  'xms/user-analysis.png': '../local-images/xms/user-analysis.png',
  'xms/design-goals.png': '../local-images/xms/design-goals.png',
  'xms/learning-threshold-1.png': '../local-images/xms/learning-threshold-1.png',
  'xms/learning-threshold-2.png': '../local-images/xms/learning-threshold-2.png',
  'xms/configuration-efficiency.png': '../local-images/xms/configuration-efficiency.png',
  'xms/configuration-mechanism.png': '../local-images/xms/configuration-mechanism.png',
  'xms/learning-threshold-3.png': '../local-images/xms/learning-threshold-3.png',
  'xms/logo-design.png': '../local-images/xms/logo-design.png',

  // Apollo项目详情图
  'apollo/project-background.png': '../local-images/apollo/project-background.png',
  'apollo/user-experience-map.png': '../local-images/apollo/user-experience-map.png',
  'apollo/design-goals.png': '../local-images/apollo/design-goals.png',
  'apollo/learning-threshold-1.png': '../local-images/apollo/learning-threshold-1.png',
  'apollo/learning-threshold-2.png': '../local-images/apollo/learning-threshold-2.png',
  'apollo/detail-page-structure.png': '../local-images/apollo/detail-page-structure.png',
  'apollo/efficiency-fast-draw.png': '../local-images/apollo/efficiency-fast-draw.png',
  'apollo/efficiency-auto-layout.png': '../local-images/apollo/efficiency-auto-layout.png',
  'apollo/help-documentation.png': '../local-images/apollo/help-documentation.png',
  'apollo/efficiency-auto-arrange.png': '../local-images/apollo/efficiency-auto-arrange.png',
  'apollo/efficiency-create-copy.png': '../local-images/apollo/efficiency-create-copy.png',
  'apollo/efficiency-batch-select.png': '../local-images/apollo/efficiency-batch-select.png',
  'apollo/efficiency-edit-path.png': '../local-images/apollo/efficiency-edit-path.png',
  'apollo/error-prevention-validation.png': '../local-images/apollo/error-prevention-validation.png',
  'apollo/error-prevention-correction.png': '../local-images/apollo/error-prevention-correction.png',
  'apollo/connection-optimization.png': '../local-images/apollo/connection-optimization.png',
  'apollo/login-page-design.png': '../local-images/apollo/login-page-design.png',
  'apollo/data-analytics-feedback.png': '../local-images/apollo/data-analytics-feedback.png',

  // Sigma项目详情图
  'sigma/business-requirements.png': '../local-images/sigma/business-requirements.png',
  'sigma/problem-analysis.png': '../local-images/sigma/problem-analysis.png',
  'sigma/user-insights.png': '../local-images/sigma/user-insights.png',
  'sigma/guiding-objectives.png': '../local-images/sigma/guiding-objectives.png',
  'sigma/interactive-demo.png': '../local-images/sigma/interactive-demo.png',
  'sigma/global-search-framework.png': '../local-images/sigma/global-search-framework.png',
  'sigma/high-frequency-operation-optimization.png': '../local-images/sigma/high-frequency-operation-optimization.png',
  'sigma/homepage-global-perspective.png': '../local-images/sigma/homepage-global-perspective.png',
  'sigma/role-specific-game-product-list.png': '../local-images/sigma/role-specific-game-product-list.png',
  'sigma/detail-page-lifecycle-information.png': '../local-images/sigma/detail-page-lifecycle-information.png',
  'sigma/game-detail-report-display-optimization.png': '../local-images/sigma/game-detail-report-display-optimization.png',
  'sigma/analysis-report-data-trends.png': '../local-images/sigma/analysis-report-data-trends.png',
  'sigma/login-page-design.png': '../local-images/sigma/login-page-design.png',
  'sigma/onboarding-guide.png': '../local-images/sigma/onboarding-guide.png',

  // Bedrock图标库详情图
  'bedrock/standards-guidelines.png': '../local-images/bedrock/standards-guidelines.png',
  'bedrock/identifiability-principle.png': '../local-images/bedrock/identifiability-principle.png',
  'bedrock/style-characteristics.png': '../local-images/bedrock/style-characteristics.png',
  'bedrock/size-consistency.png': '../local-images/bedrock/size-consistency.png',
  'bedrock/proportion-consistency.png': '../local-images/bedrock/proportion-consistency.png',
  'bedrock/corner-radius-consistency.png': '../local-images/bedrock/corner-radius-consistency.png',
  'bedrock/stroke-weight-consistency.png': '../local-images/bedrock/stroke-weight-consistency.png',
  'bedrock/density-spacing-consistency.png': '../local-images/bedrock/density-spacing-consistency.png',
  'bedrock/icon-drawing-sop.png': '../local-images/bedrock/icon-drawing-sop.png',
  'bedrock/results-showcase.png': '../local-images/bedrock/results-showcase.png',
  'bedrock/additional-1.png': '../local-images/bedrock/additional-1.png',
  'bedrock/additional-2.png': '../local-images/bedrock/additional-2.png',
  'bedrock/additional-3.png': '../local-images/bedrock/additional-3.png',
};

// 上传函数
async function uploadImages() {
  console.log('🚀 开始上传图片到Vercel Blob...\n');

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (const [blobPath, localPath] of Object.entries(uploadMap)) {
    try {
      const fullLocalPath = path.resolve(__dirname, localPath);

      // 检查文件是否存在
      if (!fs.existsSync(fullLocalPath)) {
        console.log(`⚠️  文件不存在，跳过: ${localPath}`);
        continue;
      }

      // 读取文件
      const fileBuffer = fs.readFileSync(fullLocalPath);
      const fileName = path.basename(blobPath);

      // 上传到Vercel Blob
      const blob = await put(`projects/${blobPath}`, fileBuffer, {
        access: 'public',
        contentType: `image/${path.extname(fileName).slice(1)}`,
      });

      console.log(`✅ 上传成功: ${blobPath}`);
      console.log(`   URL: ${blob.url}`);
      console.log(`   大小: ${(fileBuffer.length / 1024).toFixed(2)} KB\n`);

      results.push({
        blobPath,
        url: blob.url,
        size: fileBuffer.length
      });

      successCount++;

    } catch (error) {
      console.error(`❌ 上传失败: ${blobPath}`);
      console.error(`   错误: ${error.message}\n`);
      failCount++;
    }
  }

  console.log('🎉 批量上传完成！');
  console.log(`✅ 成功: ${successCount} 个文件`);
  console.log(`❌ 失败: ${failCount} 个文件`);

  // 生成URL映射文件
  const urlMapping = {};
  results.forEach(({ blobPath, url }) => {
    urlMapping[blobPath] = url;
  });

  // 保存URL映射到文件
  fs.writeFileSync(
    path.resolve(__dirname, '../components/project-images/blob-urls.json'),
    JSON.stringify(urlMapping, null, 2)
  );

  console.log('\n📄 URL映射已保存到: blob-urls.json');

  return results;
}

// 运行上传
uploadImages().catch(console.error);
```

### 4. 配置package.json脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "upload:blob": "node scripts/upload-to-vercel-blob.js",
    "upload:blob:covers": "node scripts/upload-covers-only.js"
  },
  "type": "module"
}
```

## 📤 上传图片

### 方法1：使用上传脚本

```bash
# 确保本地有图片文件
mkdir -p local-images/{covers,netease,xms,apollo,sigma,bedrock}

# 运行上传脚本
npm run upload:blob
```

### 方法2：手动上传（小文件）

```javascript
// utils/upload-single-image.js
import { put } from '@vercel/blob';

export async function uploadSingleImage(file, pathname) {
  try {
    const blob = await put(pathname, file, {
      access: 'public',
    });

    console.log('上传成功:', blob.url);
    return blob.url;
  } catch (error) {
    console.error('上传失败:', error);
    throw error;
  }
}

// 使用示例
// const file = new File([...], 'image.png', { type: 'image/png' });
// const url = await uploadSingleImage(file, 'projects/covers/example.png');
```

### 方法3：批量上传（仅封面图）

创建 `scripts/upload-covers-only.js`：

```javascript
// scripts/upload-covers-only.js
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 仅上传项目封面图
const coverImages = {
  'covers/netease-oa.png': '../local-images/covers/netease-oa.png',
  'covers/xms-lowcode.png': '../local-images/covers/xms-lowcode.png',
  'covers/apollo-finance.png': '../local-images/covers/apollo-finance.png',
  'covers/bedrock-design-system.png': '../local-images/covers/bedrock-design-system.png',
  'covers/bedrock-icon-library.png': '../local-images/covers/bedrock-icon-library.png',
  'covers/bi-tool-system.png': '../local-images/covers/bi-tool-system.png',
  'covers/sigma-system.png': '../local-images/covers/sigma-system.png',
  'covers/easeflow.png': '../local-images/covers/easeflow.png',
};

async function uploadCovers() {
  console.log('🚀 开始上传项目封面图到Vercel Blob...\n');

  for (const [blobPath, localPath] of Object.entries(coverImages)) {
    try {
      const fullLocalPath = path.resolve(__dirname, localPath);

      if (!fs.existsSync(fullLocalPath)) {
        console.log(`⚠️  文件不存在，跳过: ${localPath}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(fullLocalPath);

      const blob = await put(`projects/${blobPath}`, fileBuffer, {
        access: 'public',
        contentType: 'image/png',
      });

      console.log(`✅ 上传成功: ${blobPath}`);
      console.log(`   URL: ${blob.url}\n`);

    } catch (error) {
      console.error(`❌ 上传失败: ${blobPath} - ${error.message}\n`);
    }
  }

  console.log('🎉 封面图上传完成！');
}

uploadCovers().catch(console.error);
```

## 🔧 更新代码配置

### 1. 安装React组件依赖

```bash
npm install @vercel/blob
```

### 2. 创建Blob配置文件

创建 `components/project-images/vercel-blob-config.ts`：

```typescript
// components/project-images/vercel-blob-config.ts

// Vercel Blob配置
export const blobConfig = {
  baseUrl: "https://your-project.vercel.app", // 替换为你的域名
  // 在生产环境中，Vercel会自动设置正确的域名
  // 这个配置主要用于开发环境
};

// 图片URL生成函数
export function getBlobImageUrl(imagePath: string): string {
  // 在Vercel环境中，Blob URL会自动使用正确的域名
  // 这里我们使用相对路径，让Vercel自动处理
  if (
    typeof window !== "undefined" &&
    window.location.hostname.includes("vercel.app")
  ) {
    // 生产环境：使用Vercel Blob的完整URL
    return `https://${window.location.hostname}/_vercel/blob/${imagePath}`;
  }

  // 开发环境：使用环境变量或默认URL
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : blobConfig.baseUrl;

  return `${baseUrl}/_vercel/blob/${imagePath}`;
}

// 优化的图片URL生成（支持参数）
export function getOptimizedBlobUrl(
  imagePath: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "png" | "jpg";
  } = {},
): string {
  const baseUrl = getBlobImageUrl(imagePath);

  if (Object.keys(options).length === 0) {
    return baseUrl;
  }

  const params = new URLSearchParams();
  if (options.width) params.set("w", options.width.toString());
  if (options.height)
    params.set("h", options.height.toString());
  if (options.quality)
    params.set("q", options.quality.toString());
  if (options.format && options.format !== "auto") {
    params.set("fm", options.format);
  }

  return `${baseUrl}?${params.toString()}`;
}

// 响应式图片URL生成
export function getResponsiveBlobUrls(imagePath: string) {
  return {
    src: getOptimizedBlobUrl(imagePath, {
      width: 800,
      height: 600,
      quality: 85,
    }),
    srcSet: [
      `${getOptimizedBlobUrl(imagePath, { width: 400, height: 300, quality: 80 })} 400w`,
      `${getOptimizedBlobUrl(imagePath, { width: 600, height: 450, quality: 85 })} 600w`,
      `${getOptimizedBlobUrl(imagePath, { width: 800, height: 600, quality: 85 })} 800w`,
      `${getOptimizedBlobUrl(imagePath, { width: 1200, height: 900, quality: 90 })} 1200w`,
    ].join(", "),
    sizes:
      "(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px",
  };
}

// 预设的图片尺寸
export const imageSizes = {
  thumbnail: { width: 300, height: 200, quality: 70 },
  card: { width: 400, height: 300, quality: 80 },
  detail: { width: 800, height: 600, quality: 85 },
  hero: { width: 1200, height: 800, quality: 90 },
  fullscreen: { width: 1920, height: 1080, quality: 95 },
};

// 快捷函数
export const getImageUrl = (
  imagePath: string,
  size: keyof typeof imageSizes = "detail",
) => {
  return getOptimizedBlobUrl(imagePath, {
    ...imageSizes[size],
    format: "webp",
  });
};
```

## ⚙️ 运行步骤

### 1. 准备图片文件

```bash
# 在项目根目录创建本地图片文件夹
mkdir -p local-images/{covers,netease,xms,apollo,sigma,bedrock}

# 将您的图片文件放到对应文件夹中
# 例如：
# local-images/covers/netease-oa.png
# local-images/covers/xms-lowcode.png
# 等等...
```

### 2. 配置环境变量

```bash
# 获取Blob Token
vercel env pull .env.local

# 或者手动在 .env.local 中添加：
# BLOB_READ_WRITE_TOKEN=your_token_here
```

### 3. 执行上传

```bash
# 上传所有图片
npm run upload:blob

# 或者仅上传封面图
npm run upload:blob:covers
```

### 4. 验证上传结果

上传完成后，会生成 `blob-urls.json` 文件，包含所有图片的URL映射。

## 🎯 最佳实践

### 1. 图片命名规范

```
projects/
├── covers/
│   ├── netease-oa.png
│   ├── xms-lowcode.png
│   └── ...
├── netease/
│   ├── project-context.png
│   ├── user-journey.png
│   └── ...
└── ...
```

### 2. 图片优化建议

- **格式**：使用WebP格式（更小的文件大小）
- **质量**：封面图80-85%，详情图85-90%
- **尺寸**：封面图400x300，详情图800x600
- **压缩**：使用TinyPNG等工具预压缩

### 3. 缓存策略

```typescript
// 图片预加载
const preloadCriticalImages = () => {
  const criticalImages = [
    getImageUrl("projects/covers/netease-oa.png"),
    getImageUrl("projects/covers/xms-lowcode.png"),
    // ... 更多关键图片
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
};
```

### 4. 错误处理

```typescript
// 图片加载失败处理
const BlobImage: React.FC<{
  src: string;
  fallback?: string;
  alt: string;
}> = ({ src, fallback, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallback) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};
```

## 📊 监控和管理

### 1. 查看使用量

```bash
# 通过Vercel CLI查看Blob使用情况
vercel blob:list
vercel blob:stats
```

### 2. 管理文件

```bash
# 删除文件
vercel blob:delete <blob-url>

# 列出所有文件
vercel blob:list --prefix "projects/"
```

### 3. 成本监控

- 访问Vercel Dashboard → Usage
- 查看Blob存储和带宽使用情况
- 设置使用量告警

## 🚀 部署到Vercel

### 1. 连接GitHub仓库

```bash
# 推送代码到GitHub
git add .
git commit -m "Add Vercel Blob image management"
git push origin main
```

### 2. 部署到Vercel

```bash
# 方法1：通过CLI
vercel --prod

# 方法2：通过GitHub集成
# Vercel会自动检测到推送并部署
```

### 3. 验证部署

- 访问部署后的网站
- 检查图片是否正常加载
- 测试不同设备上的显示效果

## 🔧 故障排除

### 常见问题

1. **Token权限错误**

```bash
# 重新获取token
vercel env pull .env.local
```

2. **上传失败**

```javascript
// 检查文件大小（最大50MB）
const maxSize = 50 * 1024 * 1024; // 50MB
if (fileBuffer.length > maxSize) {
  console.error('文件过大，请压缩后重试');
}
```

3. **图片不显示**

```typescript
// 检查URL格式
console.log(
  "图片URL:",
  getImageUrl("projects/covers/example.png"),
);
// 应该返回类似：https://your-app.vercel.app/_vercel/blob/projects/covers/example.png
```

### 调试工具

```typescript
// 开发环境调试
if (process.env.NODE_ENV === "development") {
  console.log(
    "Blob URL:",
    getBlobImageUrl("projects/test.png"),
  );
  console.log("Environment:", process.env.VERCEL_URL);
}
```

## 📈 性能优化

### 1. 图片懒加载

```typescript
const LazyBlobImage: React.FC<{
  src: string;
  alt: string;
}> = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      loading="lazy"
      {...props}
    />
  );
};
```

### 2. 响应式图片

```typescript
const ResponsiveBlobImage: React.FC<{
  imagePath: string;
  alt: string;
}> = ({ imagePath, alt, ...props }) => {
  const responsive = getResponsiveBlobUrls(imagePath);

  return (
    <img
      src={responsive.src}
      srcSet={responsive.srcSet}
      sizes={responsive.sizes}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};
```

---

配置完成后，您的项目图片将通过Vercel Blob提供服务，享受全球CDN加速和自动优化功能！