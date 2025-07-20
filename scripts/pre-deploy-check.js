// scripts/pre-deploy-check.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 部署前检查...\n');

let hasErrors = false;
let hasWarnings = false;

// 检查构建
async function checkBuild() {
  console.log('🏗️  检查构建...');
  
  try {
    const { execSync } = await import('child_process');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ 构建成功');
    
    // 检查构建产物
    const distPath = path.resolve(__dirname, '..', 'dist');
    if (fs.existsSync(distPath)) {
      const files = fs.readdirSync(distPath);
      console.log(`   构建产物: ${files.length} 个文件`);
      
      // 检查关键文件
      const indexHtml = path.join(distPath, 'index.html');
      if (fs.existsSync(indexHtml)) {
        console.log('✅ index.html 存在');
      } else {
        console.log('❌ index.html 不存在');
        hasErrors = true;
      }
    }
  } catch (error) {
    console.log('❌ 构建失败');
    console.log(`   错误: ${error.message}`);
    hasErrors = true;
  }
}

// 检查图片引用
function checkImageReferences() {
  console.log('\n🖼️  检查图片引用...');
  
  try {
    const imageImportsPath = path.resolve(__dirname, '..', 'components/project-images/image-imports.ts');
    if (!fs.existsSync(imageImportsPath)) {
      console.log('❌ image-imports.ts 文件不存在');
      hasErrors = true;
      return;
    }
    
    const content = fs.readFileSync(imageImportsPath, 'utf8');
    
    // 检查是否使用了本地路径
    if (content.includes('./local-images/') || content.includes('/local-images/')) {
      console.log('⚠️  检测到本地图片路径，请确保已上传到云端');
      hasWarnings = true;
    }
    
    // 检查是否有Vercel Blob URL
    if (content.includes('https://') && content.includes('vercel-storage.com')) {
      console.log('✅ 检测到Vercel Blob URL');
    } else if (content.includes('https://')) {
      console.log('✅ 检测到云端图片URL');
    } else {
      console.log('⚠️  未检测到云端图片URL');
      hasWarnings = true;
    }
  } catch (error) {
    console.log('❌ 检查图片引用失败');
    console.log(`   错误: ${error.message}`);
    hasErrors = true;
  }
}

// 检查环境变量
function checkEnvironmentForProduction() {
  console.log('\n🔐 检查生产环境配置...');
  
  // 检查是否有敏感信息硬编码
  const filesToCheck = [
    'components/project-images/vercel-blob-config.ts',
    'data/projects.ts'
  ];
  
  filesToCheck.forEach(fileName => {
    const filePath = path.resolve(__dirname, '..', fileName);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // 检查是否有硬编码的token
      if (content.includes('vercel_blob_rw_') && !content.includes('process.env')) {
        console.log(`⚠️  ${fileName} 中可能有硬编码的token`);
        hasWarnings = true;
      }
    }
  });
  
  // 检查.env.local是否在.gitignore中
  const gitIgnorePath = path.resolve(__dirname, '..', '.gitignore');
  if (fs.existsSync(gitIgnorePath)) {
    const gitIgnoreContent = fs.readFileSync(gitIgnorePath, 'utf8');
    if (gitIgnoreContent.includes('.env.local')) {
      console.log('✅ .env.local 已在 .gitignore 中');
    } else {
      console.log('⚠️  .env.local 不在 .gitignore 中');
      hasWarnings = true;
    }
  }
}

// 检查包大小
function checkBundleSize() {
  console.log('\n📦 检查包大小...');
  
  const distPath = path.resolve(__dirname, '..', 'dist');
  if (fs.existsSync(distPath)) {
    let totalSize = 0;
    
    function getDirectorySize(dirPath) {
      const files = fs.readdirSync(dirPath);
      let size = 0;
      
      files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          size += getDirectorySize(filePath);
        } else {
          size += stat.size;
        }
      });
      
      return size;
    }
    
    totalSize = getDirectorySize(distPath);
    const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
    
    console.log(`   总大小: ${sizeMB} MB`);
    
    if (totalSize > 50 * 1024 * 1024) { // 50MB
      console.log('⚠️  构建产物较大，可能影响加载速度');
      hasWarnings = true;
    } else {
      console.log('✅ 构建产物大小合理');
    }
  }
}

// 检查依赖安全性
async function checkDependencies() {
  console.log('\n🔒 检查依赖安全性...');
  
  try {
    const { execSync } = await import('child_process');
    execSync('npm audit --audit-level=high', { stdio: 'pipe' });
    console.log('✅ 依赖安全检查通过');
  } catch (error) {
    console.log('⚠️  检测到安全问题');
    console.log('   建议运行: npm audit fix');
    hasWarnings = true;
  }
}

// 生成检查报告
function generateReport() {
  console.log('\n📊 检查报告:');
  
  if (hasErrors) {
    console.log('❌ 发现严重问题，不建议部署');
    console.log('   请解决错误后重新检查');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('⚠️  发现一些警告，建议优化后部署');
    console.log('   可以继续部署，但建议解决警告问题');
  } else {
    console.log('✅ 所有检查通过，可以安全部署！');
  }
  
  console.log('\n🚀 建议的部署流程:');
  console.log('1. git add .');
  console.log('2. git commit -m "准备部署"');
  console.log('3. git push origin main');
  console.log('4. 在Vercel Dashboard中部署');
}

// 运行所有检查
async function runAllChecks() {
  await checkBuild();
  checkImageReferences();
  checkEnvironmentForProduction();
  checkBundleSize();
  await checkDependencies();
  generateReport();
}

// 执行检查
runAllChecks().catch(console.error);