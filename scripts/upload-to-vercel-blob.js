// scripts/upload-to-vercel-blob.js
import { put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 检查环境变量
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('❌ 错误: 缺少 BLOB_READ_WRITE_TOKEN 环境变量');
  console.log('请先运行: vercel env pull .env.local');
  process.exit(1);
}

// 完整的图片上传映射
const uploadMap = {
  // 项目封面图 (8张)
  'projects/covers/netease-oa.png': './local-images/covers/netease-oa.png',
  'projects/covers/xms-lowcode.png': './local-images/covers/xms-lowcode.png',
  'projects/covers/apollo-finance.png': './local-images/covers/apollo-finance.png',
  'projects/covers/bedrock-design-system.png': './local-images/covers/bedrock-design-system.png',
  'projects/covers/bedrock-icon-library.png': './local-images/covers/bedrock-icon-library.png',
  'projects/covers/bi-tool-system.png': './local-images/covers/bi-tool-system.png',
  'projects/covers/sigma-system.png': './local-images/covers/sigma-system.png',
  'projects/covers/easeflow.png': './local-images/covers/easeflow.png',
  
  // 网易项目详情图 (17张)
  'projects/netease/project-context.png': './local-images/netease/project-context.png',
  'projects/netease/user-journey.png': './local-images/netease/user-journey.png',
  'projects/netease/design-goals.png': './local-images/netease/design-goals.png',
  'projects/netease/interaction-framework.png': './local-images/netease/interaction-framework.png',
  'projects/netease/smart-form.png': './local-images/netease/smart-form.png',
  'projects/netease/trigger-position.png': './local-images/netease/trigger-position.png',
  'projects/netease/awakening.png': './local-images/netease/awakening.png',
  'projects/netease/expression.png': './local-images/netease/expression.png',
  'projects/netease/confirmation.png': './local-images/netease/confirmation.png',
  'projects/netease/feedback.png': './local-images/netease/feedback.png',
  'projects/netease/guidelines.png': './local-images/netease/guidelines.png',
  'projects/netease/rule-detection.png': './local-images/netease/rule-detection.png',
  'projects/netease/speed-reading.png': './local-images/netease/speed-reading.png',
  'projects/netease/single-field.png': './local-images/netease/single-field.png',
  'projects/netease/mobile-framework.png': './local-images/netease/mobile-framework.png',
  'projects/netease/mobile-single-field.png': './local-images/netease/mobile-single-field.png',
  'projects/netease/mobile-page-display.png': './local-images/netease/mobile-page-display.png',
  
  // XMS项目详情图 (9张)
  'projects/xms/project-background.png': './local-images/xms/project-background.png',
  'projects/xms/user-analysis.png': './local-images/xms/user-analysis.png',
  'projects/xms/design-goals.png': './local-images/xms/design-goals.png',
  'projects/xms/learning-threshold-1.png': './local-images/xms/learning-threshold-1.png',
  'projects/xms/learning-threshold-2.png': './local-images/xms/learning-threshold-2.png',
  'projects/xms/configuration-efficiency.png': './local-images/xms/configuration-efficiency.png',
  'projects/xms/configuration-mechanism.png': './local-images/xms/configuration-mechanism.png',
  'projects/xms/learning-threshold-3.png': './local-images/xms/learning-threshold-3.png',
  'projects/xms/logo-design.png': './local-images/xms/logo-design.png',
  
  // Apollo项目详情图 (18张)
  'projects/apollo/project-background.png': './local-images/apollo/project-background.png',
  'projects/apollo/user-experience-map.png': './local-images/apollo/user-experience-map.png',
  'projects/apollo/design-goals.png': './local-images/apollo/design-goals.png',
  'projects/apollo/learning-threshold-1.png': './local-images/apollo/learning-threshold-1.png',
  'projects/apollo/learning-threshold-2.png': './local-images/apollo/learning-threshold-2.png',
  'projects/apollo/detail-page-structure.png': './local-images/apollo/detail-page-structure.png',
  'projects/apollo/efficiency-fast-draw.png': './local-images/apollo/efficiency-fast-draw.png',
  'projects/apollo/efficiency-auto-layout.png': './local-images/apollo/efficiency-auto-layout.png',
  'projects/apollo/help-documentation.png': './local-images/apollo/help-documentation.png',
  'projects/apollo/efficiency-auto-arrange.png': './local-images/apollo/efficiency-auto-arrange.png',
  'projects/apollo/efficiency-create-copy.png': './local-images/apollo/efficiency-create-copy.png',
  'projects/apollo/efficiency-batch-select.png': './local-images/apollo/efficiency-batch-select.png',
  'projects/apollo/efficiency-edit-path.png': './local-images/apollo/efficiency-edit-path.png',
  'projects/apollo/error-prevention-validation.png': './local-images/apollo/error-prevention-validation.png',
  'projects/apollo/error-prevention-correction.png': './local-images/apollo/error-prevention-correction.png',
  'projects/apollo/connection-optimization.png': './local-images/apollo/connection-optimization.png',
  'projects/apollo/login-page-design.png': './local-images/apollo/login-page-design.png',
  'projects/apollo/data-analytics-feedback.png': './local-images/apollo/data-analytics-feedback.png',
  
  // Sigma项目详情图 (14张)
  'projects/sigma/business-requirements.png': './local-images/sigma/business-requirements.png',
  'projects/sigma/problem-analysis.png': './local-images/sigma/problem-analysis.png',
  'projects/sigma/user-insights.png': './local-images/sigma/user-insights.png',
  'projects/sigma/guiding-objectives.png': './local-images/sigma/guiding-objectives.png',
  'projects/sigma/interactive-demo.png': './local-images/sigma/interactive-demo.png',
  'projects/sigma/global-search-framework.png': './local-images/sigma/global-search-framework.png',
  'projects/sigma/high-frequency-operation-optimization.png': './local-images/sigma/high-frequency-operation-optimization.png',
  'projects/sigma/homepage-global-perspective.png': './local-images/sigma/homepage-global-perspective.png',
  'projects/sigma/role-specific-game-product-list.png': './local-images/sigma/role-specific-game-product-list.png',
  'projects/sigma/detail-page-lifecycle-information.png': './local-images/sigma/detail-page-lifecycle-information.png',
  'projects/sigma/game-detail-report-display-optimization.png': './local-images/sigma/game-detail-report-display-optimization.png',
  'projects/sigma/analysis-report-data-trends.png': './local-images/sigma/analysis-report-data-trends.png',
  'projects/sigma/login-page-design.png': './local-images/sigma/login-page-design.png',
  'projects/sigma/onboarding-guide.png': './local-images/sigma/onboarding-guide.png',
  
  // Bedrock图标库详情图 (13张)
  'projects/bedrock/standards-guidelines.png': './local-images/bedrock/standards-guidelines.png',
  'projects/bedrock/identifiability-principle.png': './local-images/bedrock/identifiability-principle.png',
  'projects/bedrock/style-characteristics.png': './local-images/bedrock/style-characteristics.png',
  'projects/bedrock/size-consistency.png': './local-images/bedrock/size-consistency.png',
  'projects/bedrock/proportion-consistency.png': './local-images/bedrock/proportion-consistency.png',
  'projects/bedrock/corner-radius-consistency.png': './local-images/bedrock/corner-radius-consistency.png',
  'projects/bedrock/stroke-weight-consistency.png': './local-images/bedrock/stroke-weight-consistency.png',
  'projects/bedrock/density-spacing-consistency.png': './local-images/bedrock/density-spacing-consistency.png',
  'projects/bedrock/icon-drawing-sop.png': './local-images/bedrock/icon-drawing-sop.png',
  'projects/bedrock/results-showcase.png': './local-images/bedrock/results-showcase.png',
  'projects/bedrock/additional-1.png': './local-images/bedrock/additional-1.png',
  'projects/bedrock/additional-2.png': './local-images/bedrock/additional-2.png',
  'projects/bedrock/additional-3.png': './local-images/bedrock/additional-3.png',
};

// 上传函数
async function uploadImages() {
  console.log('🚀 开始上传图片到Vercel Blob...\n');
  console.log(`📊 计划上传 ${Object.keys(uploadMap).length} 个文件\n`);
  
  const results = [];
  const urlMapping = {};
  let successCount = 0;
  let skipCount = 0;
  let failCount = 0;

  for (const [blobPath, localPath] of Object.entries(uploadMap)) {
    try {
      const fullLocalPath = path.resolve(__dirname, '..', localPath);
      
      // 检查文件是否存在
      if (!fs.existsSync(fullLocalPath)) {
        console.log(`⚠️  文件不存在，跳过: ${localPath}`);
        skipCount++;
        continue;
      }

      // 读取文件
      const fileBuffer = fs.readFileSync(fullLocalPath);
      const fileExtension = path.extname(localPath).slice(1).toLowerCase();
      
      // 检查文件大小 (Vercel Blob限制50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (fileBuffer.length > maxSize) {
        console.log(`⚠️  文件过大 (${(fileBuffer.length / 1024 / 1024).toFixed(2)}MB)，跳过: ${localPath}`);
        skipCount++;
        continue;
      }
      
      // 上传到Vercel Blob
      const blob = await put(blobPath, fileBuffer, {
        access: 'public',
        contentType: `image/${fileExtension}`,
      });

      console.log(`✅ 上传成功: ${blobPath}`);
      console.log(`   URL: ${blob.url}`);
      console.log(`   大小: ${(fileBuffer.length / 1024).toFixed(2)} KB\n`);
      
      results.push({
        blobPath,
        localPath,
        url: blob.url,
        size: fileBuffer.length
      });
      
      // 构建URL映射 (用于更新image-imports.ts)
      const imageName = path.basename(blobPath, path.extname(blobPath));
      urlMapping[blobPath] = blob.url;
      
      successCount++;
      
      // 添加延迟避免请求过快
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      console.error(`❌ 上传失败: ${blobPath}`);
      console.error(`   错误: ${error.message}\n`);
      failCount++;
    }
  }

  // 输出结果统计
  console.log('🎉 批量上传完成！');
  console.log(`✅ 成功: ${successCount} 个文件`);
  console.log(`⚠️  跳过: ${skipCount} 个文件`);
  console.log(`❌ 失败: ${failCount} 个文件\n`);
  
  // 保存URL映射到文件
  try {
    const outputPath = path.resolve(__dirname, '..', 'components/project-images/blob-urls.json');
    fs.writeFileSync(outputPath, JSON.stringify(urlMapping, null, 2));
    console.log('📄 URL映射已保存到: components/project-images/blob-urls.json');
    
    // 生成更新image-imports.ts的代码片段
    generateImageImportsCode(urlMapping);
    
  } catch (error) {
    console.error('❌ 保存URL映射失败:', error.message);
  }
  
  return results;
}

// 生成image-imports.ts更新代码
function generateImageImportsCode(urlMapping) {
  console.log('\n📝 生成image-imports.ts更新代码...\n');
  
  const coverUrls = {};
  const neteaseUrls = {};
  const xmsUrls = {};
  const apolloUrls = {};
  const sigmaUrls = {};
  const bedrockUrls = {};
  
  Object.entries(urlMapping).forEach(([path, url]) => {
    if (path.includes('covers/')) {
      const name = path.split('/')[2].replace('.png', '').replace('-', '');
      if (name.includes('netease')) coverUrls.netease = url;
      else if (name.includes('xms')) coverUrls.xms = url;
      else if (name.includes('apollo')) coverUrls.apollo = url;
      else if (name.includes('bedrock') && name.includes('design')) coverUrls.bedrockDesign = url;
      else if (name.includes('bedrock') && name.includes('icon')) coverUrls.bedrockIcon = url;
      else if (name.includes('bi')) coverUrls.biTool = url;
      else if (name.includes('sigma')) coverUrls.sigma = url;
      else if (name.includes('easeflow')) coverUrls.easeflow = url;
    } else if (path.includes('netease/')) {
      const name = path.split('/')[2].replace('.png', '').replace(/-/g, '');
      neteaseUrls[toCamelCase(name)] = url;
    } else if (path.includes('xms/')) {
      const name = path.split('/')[2].replace('.png', '').replace(/-/g, '');
      xmsUrls[toCamelCase(name)] = url;
    } else if (path.includes('apollo/')) {
      const name = path.split('/')[2].replace('.png', '').replace(/-/g, '');
      apolloUrls[toCamelCase(name)] = url;
    } else if (path.includes('sigma/')) {
      const name = path.split('/')[2].replace('.png', '').replace(/-/g, '');
      sigmaUrls[toCamelCase(name)] = url;
    } else if (path.includes('bedrock/')) {
      const name = path.split('/')[2].replace('.png', '').replace(/-/g, '');
      bedrockUrls[toCamelCase(name)] = url;
    }
  });
  
  console.log('🔧 请用以下代码更新 components/project-images/image-imports.ts:\n');
  console.log('export const projectCoverImages = {');
  Object.entries(coverUrls).forEach(([key, url]) => {
    console.log(`  ${key}: '${url}',`);
  });
  console.log('};\n');
  
  if (Object.keys(neteaseUrls).length > 0) {
    console.log('export const neteaseProjectImages = {');
    Object.entries(neteaseUrls).forEach(([key, url]) => {
      console.log(`  ${key}: '${url}',`);
    });
    console.log('};\n');
  }
  
  // 保存到文件
  const updateCode = `// 自动生成的URL映射 - ${new Date().toISOString()}
export const projectCoverImages = {
${Object.entries(coverUrls).map(([key, url]) => `  ${key}: '${url}',`).join('\n')}
};

export const neteaseProjectImages = {
${Object.entries(neteaseUrls).map(([key, url]) => `  ${key}: '${url}',`).join('\n')}
};

export const xmsProjectImages = {
${Object.entries(xmsUrls).map(([key, url]) => `  ${key}: '${url}',`).join('\n')}
};

export const apolloProjectImages = {
${Object.entries(apolloUrls).map(([key, url]) => `  ${key}: '${url}',`).join('\n')}
};

export const sigmaProjectImages = {
${Object.entries(sigmaUrls).map(([key, url]) => `  ${key}: '${url}',`).join('\n')}
};

export const bedrockIconImages = {
${Object.entries(bedrockUrls).map(([key, url]) => `  ${key}: '${url}',`).join('\n')}
};
`;
  
  const codeOutputPath = path.resolve(__dirname, '..', 'components/project-images/generated-imports.ts');
  fs.writeFileSync(codeOutputPath, updateCode);
  console.log('📄 生成的代码已保存到: components/project-images/generated-imports.ts');
}

// 工具函数：转换为驼峰命名
function toCamelCase(str) {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
}

// 运行上传
uploadImages().catch(console.error);