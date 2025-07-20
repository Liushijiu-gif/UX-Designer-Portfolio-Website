// scripts/check-environment.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 检查环境配置...\n');

// 检查环境变量
const requiredEnvVars = ['BLOB_READ_WRITE_TOKEN'];
const missingVars = [];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('❌ 缺少必要的环境变量:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n💡 解决方案:');
  console.log('   1. 运行: vercel login');
  console.log('   2. 运行: vercel env pull .env.local');
  console.log('   3. 确保.env.local文件存在于项目根目录\n');
} else {
  console.log('✅ 环境变量配置正确\n');
}

// 检查本地图片目录
const imagesDirPath = path.resolve(__dirname, '..', 'local-images');
if (!fs.existsSync(imagesDirPath)) {
  console.log('⚠️  本地图片目录不存在: local-images/');
  console.log('💡 请创建目录结构:');
  console.log('   local-images/');
  console.log('   ├── covers/');
  console.log('   ├── netease/');
  console.log('   ├── xms/');
  console.log('   ├── apollo/');
  console.log('   ├── sigma/');
  console.log('   └── bedrock/\n');
} else {
  console.log('✅ 本地图片目录存在');
  
  // 检查子目录
  const subDirs = ['covers', 'netease', 'xms', 'apollo', 'sigma', 'bedrock'];
  const missingDirs = [];
  
  subDirs.forEach(dir => {
    const dirPath = path.join(imagesDirPath, dir);
    if (!fs.existsSync(dirPath)) {
      missingDirs.push(dir);
    }
  });
  
  if (missingDirs.length > 0) {
    console.log('⚠️  缺少子目录:');
    missingDirs.forEach(dir => {
      console.log(`   - local-images/${dir}/`);
    });
  } else {
    console.log('✅ 所有必要的子目录都存在');
  }
  
  // 统计图片文件数量
  let totalImages = 0;
  subDirs.forEach(dir => {
    const dirPath = path.join(imagesDirPath, dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(file => 
        /\.(png|jpg|jpeg|webp)$/i.test(file)
      );
      totalImages += files.length;
      console.log(`   ${dir}/: ${files.length} 个图片文件`);
    }
  });
  
  console.log(`📊 总计: ${totalImages} 个图片文件\n`);
}

// 检查依赖包
console.log('📦 检查依赖包...');
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const hasVercelBlob = packageJson.dependencies && packageJson.dependencies['@vercel/blob'];
  
  if (hasVercelBlob) {
    console.log('✅ @vercel/blob 依赖已安装');
  } else {
    console.log('❌ 缺少 @vercel/blob 依赖');
    console.log('💡 运行: npm install @vercel/blob');
  }
} else {
  console.log('❌ 找不到 package.json 文件');
}

// 检查Vercel CLI
console.log('\n🛠️  检查Vercel CLI...');
try {
  const { execSync } = await import('child_process');
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI 已安装');
} catch (error) {
  console.log('❌ Vercel CLI 未安装');
  console.log('💡 运行: npm install -g vercel');
}

console.log('\n🎉 环境检查完成！');

if (missingVars.length === 0 && fs.existsSync(imagesDirPath)) {
  console.log('\n🚀 环境配置良好，可以开始上传图片：');
  console.log('   npm run upload-images');
} else {
  console.log('\n⚠️  请先解决上述问题，然后再进行图片上传。');
}