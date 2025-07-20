// Vercel Blob配置文件

// Vercel Blob配置
export const blobConfig = {
  // Vercel Blob的基础域名（部署时会自动使用正确的域名）
  baseUrl: process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://your-project.vercel.app',
  
  // 项目的Blob存储标识符
  storeId: process.env.BLOB_READ_WRITE_TOKEN || '',
};

// 图片URL生成函数
export function getBlobImageUrl(imagePath: string): string {
  // 在Vercel环境中，Blob URL会自动使用正确的域名
  if (typeof window !== 'undefined') {
    // 浏览器环境：使用当前域名
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    if (hostname.includes('vercel.app') || hostname.includes('vercel-storage.com')) {
      // 生产环境：返回完整的Blob URL
      return `${protocol}//${hostname}/_vercel/blob/${imagePath}`;
    }
  }
  
  // 开发环境或服务端：使用配置的基础URL
  return `${blobConfig.baseUrl}/_vercel/blob/${imagePath}`;
}

// 优化的图片URL生成（Vercel Blob目前不支持URL参数优化，但为将来做准备）
export function getOptimizedBlobUrl(
  imagePath: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'png' | 'jpg';
  } = {}
): string {
  const baseUrl = getBlobImageUrl(imagePath);
  
  // Vercel Blob目前不支持URL参数优化
  // 这里保留接口，为将来的功能做准备
  if (Object.keys(options).length === 0) {
    return baseUrl;
  }
  
  // 如果将来Vercel Blob支持URL参数，可以在这里实现
  // const params = new URLSearchParams();
  // if (options.width) params.set('w', options.width.toString());
  // if (options.height) params.set('h', options.height.toString());
  // if (options.quality) params.set('q', options.quality.toString());
  // if (options.format && options.format !== 'auto') {
  //   params.set('fm', options.format);
  // }
  // return `${baseUrl}?${params.toString()}`;
  
  return baseUrl;
}

// 响应式图片URL生成
export function getResponsiveBlobUrls(imagePath: string) {
  const imageUrl = getBlobImageUrl(imagePath);
  
  return {
    src: imageUrl,
    srcSet: [
      `${imageUrl} 400w`,
      `${imageUrl} 600w`,
      `${imageUrl} 800w`,
      `${imageUrl} 1200w`
    ].join(', '),
    sizes: '(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px'
  };
}

// 预设的图片尺寸配置
export const imageSizes = {
  thumbnail: { width: 300, height: 200, quality: 70 },
  card: { width: 400, height: 300, quality: 80 },
  detail: { width: 800, height: 600, quality: 85 },
  hero: { width: 1200, height: 800, quality: 90 },
  fullscreen: { width: 1920, height: 1080, quality: 95 }
};

// 快捷函数（目前返回原始URL，将来可以添加优化）
export const getImageUrl = (imagePath: string, size: keyof typeof imageSizes = 'detail') => {
  // 将来可以根据size参数生成优化的URL
  return getBlobImageUrl(imagePath);
};

// 图片预加载工具
export function preloadBlobImages(imagePaths: string[]) {
  if (typeof window === 'undefined') return;
  
  imagePaths.forEach(imagePath => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getBlobImageUrl(imagePath);
    document.head.appendChild(link);
  });
}

// 检查Blob URL是否有效
export async function validateBlobUrl(imagePath: string): Promise<boolean> {
  try {
    const url = getBlobImageUrl(imagePath);
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Failed to validate blob URL:', error);
    return false;
  }
}

// 环境检测
export function isBlobEnvironment(): boolean {
  return !!(
    process.env.BLOB_READ_WRITE_TOKEN ||
    (typeof window !== 'undefined' && window.location.hostname.includes('vercel'))
  );
}

// 调试工具
export function debugBlobConfig() {
  if (process.env.NODE_ENV === 'development') {
    console.log('Blob Config Debug:', {
      baseUrl: blobConfig.baseUrl,
      hasToken: !!blobConfig.storeId,
      environment: process.env.NODE_ENV,
      vercelUrl: process.env.VERCEL_URL,
      isBrowser: typeof window !== 'undefined',
      hostname: typeof window !== 'undefined' ? window.location.hostname : 'N/A'
    });
  }
}