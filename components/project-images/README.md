# 图片迁移指南

当您将代码从Figma Make迁移到其他平台时，图片资源需要重新配置。本指南将帮助您完成图片迁移过程。

## 🚀 快速开始

### 方案一：使用云存储（推荐）

**优点**：
- 全平台兼容
- 加载速度快
- 可以CDN加速
- 支持图片优化

**步骤**：

1. **选择云存储服务**
   ```bash
   # 推荐服务商：
   - Cloudinary (免费25GB/月)
   - AWS S3 + CloudFront
   - Vercel Blob
   - GitHub + jsDelivr
   - 阿里云OSS
   - 七牛云
   ```

2. **上传图片到云存储**
   ```bash
   # 创建文件夹结构
   your-bucket/
   ├── projects/
   │   ├── covers/          # 8张项目封面图
   │   ├── netease/         # 17张网易项目图片
   │   ├── xms/             # 9张XMS项目图片
   │   ├── apollo/          # 18张Apollo项目图片
   │   ├── sigma/           # 14张Sigma项目图片
   │   └── bedrock/         # 13张Bedrock图标库图片
   ```

3. **更新图片配置**
   ```typescript
   // 在 image-imports.ts 中更新 cloud 字段
   const projectCoverConfigs = {
     netease: {
       cloud: 'https://your-cdn.com/projects/covers/netease-oa.png',
       // ... 其他配置保持不变
     },
     // ... 更新其他项目
   };
   ```

### 方案二：使用本地图片

**优点**：
- 无需外部依赖
- 完全控制图片资源
- 适合私有部署

**步骤**：

1. **创建本地图片文件夹**
   ```bash
   mkdir -p public/images/projects/{covers,netease,xms,apollo,sigma,bedrock}
   ```

2. **下载并保存图片**
   - 从当前Figma Make项目中下载所有图片
   - 按照文件夹结构保存到对应位置
   - 使用有意义的文件名

3. **图片已配置好本地路径**
   ```typescript
   // image-imports.ts 中已经预设了本地路径
   const projectCoverConfigs = {
     netease: {
       local: '/images/projects/covers/netease-oa.png', // ✅ 已配置
       // ...
     },
   };
   ```

## 📁 文件夹结构参考

```
public/
└── images/
    └── projects/
        ├── covers/                    # 项目封面图 (8张)
        │   ├── netease-oa.png
        │   ├── xms-lowcode.png
        │   ├── apollo-finance.png
        │   ├── bedrock-design-system.png
        │   ├── bedrock-icon-library.png
        │   ├── bi-tool-system.png
        │   ├── sigma-system.png
        │   └── easeflow.png
        ├── netease/                   # 网易项目详情图 (17张)
        │   ├── project-context.png
        │   ├── user-journey.png
        │   ├── design-goals.png
        │   ├── interaction-framework.png
        │   ├── smart-form.png
        │   ├── trigger-position.png
        │   ├── awakening.png
        │   ├── expression.png
        │   ├── confirmation.png
        │   ├── feedback.png
        │   ├── guidelines.png
        │   ├── rule-detection.png
        │   ├── speed-reading.png
        │   ├── single-field.png
        │   ├── mobile-framework.png
        │   ├── mobile-single-field.png
        │   └── mobile-page-display.png
        ├── xms/                       # XMS项目详情图 (9张)
        │   ├── project-background.png
        │   ├── user-analysis.png
        │   ├── design-goals.png
        │   ├── learning-threshold-1.png
        │   ├── learning-threshold-2.png
        │   ├── configuration-efficiency.png
        │   ├── configuration-mechanism.png
        │   ├── learning-threshold-3.png
        │   └── logo-design.png
        ├── apollo/                    # Apollo项目详情图 (18张)
        │   ├── project-background.png
        │   ├── user-experience-map.png
        │   ├── design-goals.png
        │   ├── learning-threshold-1.png
        │   ├── learning-threshold-2.png
        │   ├── detail-page-structure.png
        │   ├── efficiency-fast-draw.png
        │   ├── efficiency-auto-layout.png
        │   ├── help-documentation.png
        │   ├── efficiency-auto-arrange.png
        │   ├── efficiency-create-copy.png
        │   ├── efficiency-batch-select.png
        │   ├── efficiency-edit-path.png
        │   ├── error-prevention-validation.png
        │   ├── error-prevention-correction.png
        │   ├── connection-optimization.png
        │   ├── login-page-design.png
        │   └── data-analytics-feedback.png
        ├── sigma/                     # Sigma项目详情图 (14张)
        │   ├── business-requirements.png
        │   ├── problem-analysis.png
        │   ├── user-insights.png
        │   ├── guiding-objectives.png
        │   ├── interactive-demo.png
        │   ├── global-search-framework.png
        │   ├── high-frequency-operation-optimization.png
        │   ├── homepage-global-perspective.png
        │   ├── role-specific-game-product-list.png
        │   ├── detail-page-lifecycle-information.png
        │   ├── game-detail-report-display-optimization.png
        │   ├── analysis-report-data-trends.png
        │   ├── login-page-design.png
        │   └── onboarding-guide.png
        └── bedrock/                   # Bedrock图标库详情图 (13张)
            ├── standards-guidelines.png
            ├── identifiability-principle.png
            ├── style-characteristics.png
            ├── size-consistency.png
            ├── proportion-consistency.png
            ├── corner-radius-consistency.png
            ├── stroke-weight-consistency.png
            ├── density-spacing-consistency.png
            ├── icon-drawing-sop.png
            ├── results-showcase.png
            ├── additional-1.png
            ├── additional-2.png
            └── additional-3.png
```

## 🛠 工具函数使用

### 动态更新云存储URL

```typescript
import { updateImageCloudUrl, updateProjectCloudUrls } from './image-imports';

// 更新单个图片
updateImageCloudUrl('netease', 'projectContext', 'https://your-cdn.com/netease/project-context.png');

// 批量更新项目图片
updateProjectCloudUrls('netease', {
  projectContext: 'https://your-cdn.com/netease/project-context.png',
  userJourney: 'https://your-cdn.com/netease/user-journey.png',
  // ... 更多图片
});
```

## 🔄 自动化迁移脚本

### Node.js 脚本示例

```javascript
// migrate-images.js
const fs = require('fs');
const path = require('path');
const https = require('https');

// 从Figma导出的图片URL映射
const figmaAssets = {
  'netease-oa': 'figma:asset/xxxx.png',
  // ... 更多映射
};

// 下载图片函数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 执行迁移
async function migrateImages() {
  for (const [name, url] of Object.entries(figmaAssets)) {
    const filepath = path.join('public/images/projects/covers', `${name}.png`);
    await downloadImage(url, filepath);
    console.log(`✅ Downloaded: ${name}`);
  }
}

migrateImages();
```

## 📊 图片优化建议

### 图片格式选择
- **PNG**: 适合图标、UI截图（支持透明度）
- **JPG**: 适合照片、复杂图像（文件更小）
- **WebP**: 现代格式，更好压缩率（需要fallback）

### 图片尺寸优化
```javascript
// 推荐尺寸
const imageSizes = {
  projectCovers: '800x600',    // 项目封面
  detailImages: '1200x900',    // 项目详情图
  thumbnails: '400x300',       // 缩略图
};
```

### CDN配置示例

```typescript
// Cloudinary示例
const cloudinaryBase = 'https://res.cloudinary.com/your-cloud-name/image/upload';
const cloudinaryUrl = (imagePath: string, transforms?: string) => 
  `${cloudinaryBase}/${transforms || 'f_auto,q_auto,w_800'}/${imagePath}`;

// 使用示例
cloud: cloudinaryUrl('projects/covers/netease-oa.png', 'f_webp,q_85,w_800')
```

## ✅ 迁移检查清单

- [ ] 选择图片存储方案（云存储/本地）
- [ ] 创建文件夹结构
- [ ] 下载所有项目图片（93张）
  - [ ] 项目封面图（8张）
  - [ ] 网易项目详情图（17张）
  - [ ] XMS项目详情图（9张）
  - [ ] Apollo项目详情图（18张）
  - [ ] Sigma项目详情图（14张）
  - [ ] Bedrock图标库详情图（13张）
- [ ] 更新 `image-imports.ts` 配置
- [ ] 测试图片加载
- [ ] 验证fallback机制
- [ ] 优化图片大小和格式

## 🐛 常见问题

**Q: 图片显示不出来怎么办？**
A: 检查以下几点：
1. 图片路径是否正确
2. 文件是否存在
3. 文件权限是否正确
4. 是否有CORS问题（云存储）

**Q: 如何批量压缩图片？**
A: 推荐工具：
- tinypng.com (在线压缩)
- imagemin (Node.js包)
- squoosh.app (Google工具)

**Q: 图片加载慢怎么优化？**
A: 考虑以下优化：
1. 使用CDN
2. 启用图片懒加载
3. 使用WebP格式
4. 设置适当的缓存头

## 📞 技术支持

如有问题，请检查：
1. 浏览器控制台是否有错误
2. 网络面板中图片请求状态
3. 图片URL是否可以直接访问

---

**注意**: 迁移完成后，建议删除不再使用的figma:asset导入，以避免在非Figma环境中出现错误。