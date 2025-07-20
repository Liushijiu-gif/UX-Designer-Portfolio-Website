// scripts/optimize-images.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 图片优化配置
const optimizationConfig = {
  covers: {
    width: 1200,
    height: 800,
    quality: 85
  },
  details: {
    width: 800,
    height: 600,
    quality: 80
  },
  thumbnails: {
    width: 400,
    height: 300,
    quality: 75
  }
};

// 优化单个图片
async function optimizeImage(inputPath, outputPath, config) {
  try {
    const { width, height, quality } = config;
    
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality })
      .toFile(outputPath);
    
    // 获取文件大小信息
    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const compression = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}`);
    console.log(`   ${(inputSize / 1024).toFixed(1)}KB → ${(outputSize / 1024).toFixed(1)}KB (压缩 ${compression}%)`);
    
    return { success: true, inputSize, outputSize, compression };
  } catch (error) {
    console.error(`❌ 优化失败: ${path.basename(inputPath)}`);
    console.error(`   错误: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// 批量优化图片
async function optimizeImages() {
  console.log('🎨 开始优化图片...\n');
  
  const inputDir = path.resolve(__dirname, '..', 'local-images');
  const outputDir = path.resolve(__dirname, '..', 'optimized-images');
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 处理不同类型的图片
  const subdirs = ['covers', 'netease', 'xms', 'apollo', 'sigma', 'bedrock'];
  let totalProcessed = 0;
  let totalInputSize = 0;
  let totalOutputSize = 0;
  
  for (const subdir of subdirs) {
    const inputSubdir = path.join(inputDir, subdir);
    const outputSubdir = path.join(outputDir, subdir);
    
    if (!fs.existsSync(inputSubdir)) {
      console.log(`⚠️  跳过不存在的目录: ${subdir}`);
      continue;
    }
    
    // 创建输出子目录
    if (!fs.existsSync(outputSubdir)) {
      fs.mkdirSync(outputSubdir, { recursive: true });
    }
    
    console.log(`📁 处理目录: ${subdir}/`);
    
    const files = fs.readdirSync(inputSubdir).filter(file =>
      /\.(png|jpg|jpeg)$/i.test(file)
    );
    
    for (const file of files) {
      const inputPath = path.join(inputSubdir, file);
      const outputPath = path.join(outputSubdir, file.replace(/\.(png|jpg|jpeg)$/i, '.jpg'));
      
      // 选择优化配置
      const config = subdir === 'covers' ? optimizationConfig.covers : optimizationConfig.details;
      
      const result = await optimizeImage(inputPath, outputPath, config);
      
      if (result.success) {
        totalInputSize += result.inputSize;
        totalOutputSize += result.outputSize;
        totalProcessed++;
      }
      
      // 添加小延迟避免过度占用CPU
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('');
  }
  
  // 输出总结
  const totalCompression = ((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(1);
  
  console.log('🎉 图片优化完成！');
  console.log(`📊 处理统计:`);
  console.log(`   处理文件数: ${totalProcessed}`);
  console.log(`   总输入大小: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   总输出大小: ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   总压缩率: ${totalCompression}%`);
  console.log(`   节省空间: ${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB`);
  
  console.log('\n💡 下一步:');
  console.log('1. 检查 optimized-images/ 目录中的优化结果');
  console.log('2. 如果满意，将优化后的图片复制到 local-images/ 目录');
  console.log('3. 运行 npm run upload-images 上传到Vercel Blob');
}

// 运行优化
optimizeImages().catch(console.error);