# Cloudinary 详细配置指南

## 🚀 快速开始

### 1. 注册账号
1. 访问 [Cloudinary官网](https://cloudinary.com)
2. 点击 "Sign Up For Free"
3. 填写基本信息完成注册
4. 验证邮箱激活账号

### 2. 获取配置信息
登录后在Dashboard可以看到：
```
Cloud Name: your-cloud-name
API Key: 123456789012345
API Secret: your-api-secret
Environment variable: CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

### 3. 创建上传预设
1. 进入 Settings → Upload
2. 点击 "Add upload preset"
3. 配置如下：
   - **Preset name**: `portfolio-images`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `projects`
   - **Allowed formats**: `jpg,png,webp,gif`
   - **Auto optimization**: `Enabled`

## 📁 文件夹结构规划

```
your-cloudinary-account/
├── projects/
│   ├── covers/          # 项目封面图
│   │   ├── netease-oa
│   │   ├── xms-lowcode
│   │   ├── apollo-finance
│   │   └── ...
│   ├── netease/         # 网易项目详情图
│   │   ├── project-context
│   │   ├── user-journey
│   │   └── ...
│   ├── xms/            # XMS项目详情图
│   ├── apollo/         # Apollo项目详情图
│   ├── sigma/          # Sigma项目详情图
│   └── bedrock/        # Bedrock项目详情图
└── assets/
    ├── icons/
    └── logos/
```

## 🛠 批量上传工具

### 方法1: 使用Cloudinary Web界面
1. 登录Cloudinary Dashboard
2. 点击 "Media Library"
3. 点击 "Upload" 按钮
4. 选择多个文件或拖拽文件夹
5. 选择上传预设 `portfolio-images`

### 方法2: 使用Node.js脚本

```javascript
// upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// 配置Cloudinary
cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret'
});

// 批量上传函数
async function uploadImages() {
  const imageMap = {
    // 项目封面图
    'covers/netease-oa.png': './local-images/covers/netease-oa.png',
    'covers/xms-lowcode.png': './local-images/covers/xms-lowcode.png',
    'covers/apollo-finance.png': './local-images/covers/apollo-finance.png',
    'covers/bedrock-design-system.png': './local-images/covers/bedrock-design-system.png',
    'covers/bedrock-icon-library.png': './local-images/covers/bedrock-icon-library.png',
    'covers/bi-tool-system.png': './local-images/covers/bi-tool-system.png',
    'covers/sigma-system.png': './local-images/covers/sigma-system.png',
    'covers/easeflow.png': './local-images/covers/easeflow.png',
    
    // 网易项目详情图
    'netease/project-context.png': './local-images/netease/project-context.png',
    'netease/user-journey.png': './local-images/netease/user-journey.png',
    // ... 更多图片映射
  };

  console.log('🚀 开始上传图片到Cloudinary...\n');

  for (const [cloudPath, localPath] of Object.entries(imageMap)) {
    try {
      if (!fs.existsSync(localPath)) {
        console.log(`⚠️  文件不存在: ${localPath}`);
        continue;
      }

      const result = await cloudinary.uploader.upload(localPath, {
        public_id: `projects/${cloudPath}`,
        folder: 'projects',
        overwrite: true,
        resource_type: 'image',
        format: 'auto',
        quality: 'auto'
      });

      console.log(`✅ 上传成功: ${cloudPath}`);
      console.log(`   URL: ${result.secure_url}`);
      console.log(`   大小: ${(result.bytes / 1024).toFixed(2)} KB\n`);

    } catch (error) {
      console.error(`❌ 上传失败: ${cloudPath}`);
      console.error(`   错误: ${error.message}\n`);
    }
  }

  console.log('🎉 批量上传完成！');
}

// 运行上传
uploadImages().catch(console.error);
```

运行脚本：
```bash
# 安装依赖
npm install cloudinary

# 运行上传脚本
node upload-to-cloudinary.js
```

### 方法3: 使用Cloudinary CLI

```bash
# 安装CLI
npm install -g cloudinary-cli

# 配置认证
cld config

# 批量上传整个文件夹
cld uploader upload-dir ./local-images/covers projects/covers --upload-preset portfolio-images

# 上传单个文件
cld uploader upload ./local-images/covers/netease-oa.png --public-id projects/covers/netease-oa --upload-preset portfolio-images
```

## 🔧 更新代码配置

### 1. 创建Cloudinary配置

```typescript
// components/project-images/cloudinary-config.ts
export const cloudinaryConfig = {
  cloudName: 'your-cloud-name',
  uploadPreset: 'portfolio-images',
  apiKey: 'your-api-key', // 仅在服务端使用
  apiSecret: 'your-api-secret' // 仅在服务端使用
};

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'crop';
  gravity?: 'center' | 'face' | 'faces' | 'auto';
  effect?: string;
}

export function buildCloudinaryUrl(
  imagePath: string,
  options: ImageTransformOptions = {}
): string {
  const {
    width = 800,
    height = 600,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'center',
    effect
  } = options;

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `g_${gravity}`,
    effect && `e_${effect}`
  ].filter(Boolean).join(',');

  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${imagePath}`;
}

// 预设的图片尺寸
export const imageSizes = {
  thumbnail: { width: 300, height: 200, quality: 70 },
  card: { width: 400, height: 300, quality: 80 },
  detail: { width: 800, height: 600, quality: 85 },
  hero: { width: 1200, height: 800, quality: 90 },
  fullscreen: { width: 1920, height: 1080, quality: 95 }
};

// 快捷函数
export const getImageUrl = (imagePath: string, size: keyof typeof imageSizes = 'detail') => {
  return buildCloudinaryUrl(imagePath, {
    ...imageSizes[size],
    format: 'webp'
  });
};
```

### 2. 更新图片导入文件

```typescript
// components/project-images/image-imports.ts
import { getImageUrl, buildCloudinaryUrl } from './cloudinary-config';

// 项目封面图 - 使用Cloudinary
export const projectCoverImages = {
  netease: getImageUrl('projects/covers/netease-oa', 'card'),
  xms: getImageUrl('projects/covers/xms-lowcode', 'card'),
  apollo: getImageUrl('projects/covers/apollo-finance', 'card'),
  bedrockDesign: getImageUrl('projects/covers/bedrock-design-system', 'card'),
  bedrockIcon: getImageUrl('projects/covers/bedrock-icon-library', 'card'),
  biTool: getImageUrl('projects/covers/bi-tool-system', 'card'),
  sigma: getImageUrl('projects/covers/sigma-system', 'card'),
  easeflow: getImageUrl('projects/covers/easeflow', 'card'),
};

// 网易项目详情图
export const neteaseProjectImages = {
  projectContext: getImageUrl('projects/netease/project-context', 'detail'),
  userJourney: getImageUrl('projects/netease/user-journey', 'detail'),
  designGoals: getImageUrl('projects/netease/design-goals', 'detail'),
  interactionFramework: getImageUrl('projects/netease/interaction-framework', 'detail'),
  smartForm: getImageUrl('projects/netease/smart-form', 'detail'),
  triggerPosition: getImageUrl('projects/netease/trigger-position', 'detail'),
  awakening: getImageUrl('projects/netease/awakening', 'detail'),
  expression: getImageUrl('projects/netease/expression', 'detail'),
  confirmation: getImageUrl('projects/netease/confirmation', 'detail'),
  feedback: getImageUrl('projects/netease/feedback', 'detail'),
  guidelines: getImageUrl('projects/netease/guidelines', 'detail'),
  ruleDetection: getImageUrl('projects/netease/rule-detection', 'detail'),
  speedReading: getImageUrl('projects/netease/speed-reading', 'detail'),
  singleField: getImageUrl('projects/netease/single-field', 'detail'),
  mobileFramework: getImageUrl('projects/netease/mobile-framework', 'detail'),
  mobileSingleField: getImageUrl('projects/netease/mobile-single-field', 'detail'),
  mobilePageDisplay: getImageUrl('projects/netease/mobile-page-display', 'detail'),
};

// 其他项目图片配置...
// XMS项目详情图
export const xmsProjectImages = {
  projectBackground: getImageUrl('projects/xms/project-background', 'detail'),
  userAnalysis: getImageUrl('projects/xms/user-analysis', 'detail'),
  designGoals: getImageUrl('projects/xms/design-goals', 'detail'),
  learningThreshold1: getImageUrl('projects/xms/learning-threshold-1', 'detail'),
  learningThreshold2: getImageUrl('projects/xms/learning-threshold-2', 'detail'),
  configurationEfficiency: getImageUrl('projects/xms/configuration-efficiency', 'detail'),
  configurationMechanism: getImageUrl('projects/xms/configuration-mechanism', 'detail'),
  learningThreshold3: getImageUrl('projects/xms/learning-threshold-3', 'detail'),
  logoDesign: getImageUrl('projects/xms/logo-design', 'detail'),
};

// 可以继续添加其他项目...

// 响应式图片生成器
export const getResponsiveImageSet = (imagePath: string) => {
  return {
    src: getImageUrl(imagePath, 'detail'),
    srcSet: [
      `${buildCloudinaryUrl(imagePath, { width: 400, height: 300, format: 'webp', quality: 80 })} 400w`,
      `${buildCloudinaryUrl(imagePath, { width: 600, height: 450, format: 'webp', quality: 85 })} 600w`,
      `${buildCloudinaryUrl(imagePath, { width: 800, height: 600, format: 'webp', quality: 85 })} 800w`,
      `${buildCloudinaryUrl(imagePath, { width: 1200, height: 900, format: 'webp', quality: 90 })} 1200w`
    ].join(', '),
    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 600px, (max-width: 1280px) 800px, 1200px'
  };
};

// 占位图片（继续使用Unsplash作为fallback）
export const placeholderImages = {
  project9: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop',
  project10: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  project11: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
  project12: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
};
```

### 3. 创建优化的图片组件

```typescript
// components/OptimizedImage.tsx
import React, { useState } from 'react';
import { getResponsiveImageSet } from './project-images/image-imports';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  sizes,
  priority = false,
  onLoad,
  onError
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // 如果是Cloudinary路径，生成响应式图片集
  const isCloudinaryUrl = src.includes('res.cloudinary.com');
  
  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  if (isCloudinaryUrl) {
    // 从URL中提取图片路径
    const imagePath = src.split('/upload/')[1]?.split('/').slice(1).join('/');
    const imageSet = imagePath ? getResponsiveImageSet(imagePath) : null;

    if (imageSet) {
      return (
        <img
          src={imageSet.src}
          srcSet={imageSet.srcSet}
          sizes={sizes || imageSet.sizes}
          alt={alt}
          className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }
  }

  // 普通图片
  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};
```

## 🎯 高级配置

### 1. 图片预处理和优化

```javascript
// 上传时自动优化
const uploadWithOptimization = async (filePath, publicId) => {
  return await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    // 自动优化
    quality: 'auto:good',
    format: 'auto',
    // 自动裁剪人脸
    gravity: 'auto',
    // 生成多种尺寸
    eager: [
      { width: 300, height: 200, crop: 'fill', quality: 70 },
      { width: 600, height: 400, crop: 'fill', quality: 80 },
      { width: 800, height: 600, crop: 'fill', quality: 85 }
    ],
    // 生成响应式断点
    responsive_breakpoints: {
      create_derived: true,
      bytes_step: 20000,
      min_width: 200,
      max_width: 1000
    }
  });
};
```

### 2. 图片SEO优化

```typescript
// 为图片添加结构化数据
export const getImageMetadata = (imagePath: string, alt: string) => {
  const imageUrl = getImageUrl(imagePath);
  
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": imageUrl,
    "width": 800,
    "height": 600,
    "description": alt,
    "contentUrl": imageUrl,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "creator": {
      "@type": "Person",
      "name": "Your Name"
    }
  };
};
```

### 3. 监控和分析

```javascript
// 上传完成后的回调处理
cloudinary.uploader.upload(filePath, {
  // ... 其他配置
  notification_url: "https://your-webhook-url.com/cloudinary-webhook"
}, (error, result) => {
  if (result) {
    console.log('图片上传成功:', {
      url: result.secure_url,
      size: result.bytes,
      format: result.format,
      width: result.width,
      height: result.height
    });
  }
});
```

## 📊 成本优化建议

### 1. 存储优化
- 删除不再使用的图片
- 使用自动优化减小文件大小
- 选择合适的图片格式（WebP优先）

### 2. 带宽优化
- 使用响应式图片
- 启用懒加载
- 合理设置图片质量

### 3. 监控使用量
```bash
# 查看当月使用量
curl -X GET \
  "https://api.cloudinary.com/v1_1/your-cloud-name/usage" \
  -H "Authorization: Basic $(echo -n 'your-api-key:your-api-secret' | base64)"
```

## 🚀 部署验证

完成配置后，可以通过以下方式验证：

1. **测试图片加载**
```javascript
// 在浏览器控制台测试
console.log('测试图片URL:', 'https://res.cloudinary.com/your-cloud-name/image/upload/f_auto,q_auto,w_800,h_600,c_fill/projects/covers/netease-oa');
```

2. **检查响应时间**
```bash
# 使用curl测试
curl -w "@curl-format.txt" -o /dev/null -s "https://res.cloudinary.com/your-cloud-name/image/upload/f_auto,q_auto,w_800,h_600,c_fill/projects/covers/netease-oa"
```

3. **验证不同设备上的显示效果**
- 桌面端浏览器
- 移动端浏览器
- 不同网络环境

配置完成后，您的项目图片将通过Cloudinary的全球CDN提供服务，无论在何处部署都能正常访问！