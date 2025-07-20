// scripts/deploy-setup.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 配置部署环境...\n');

// 检查构建配置
function checkBuildConfig() {
  console.log('📦 检查构建配置...');
  
  const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredScripts = ['build', 'preview'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    console.log('❌ 缺少必要的构建脚本:');
    missingScripts.forEach(script => {
      console.log(`   - ${script}`);
    });
    return false;
  }
  
  console.log('✅ 构建脚本配置正确');
  return true;
}

// 检查Vercel配置
function checkVercelConfig() {
  console.log('\n🔧 检查Vercel配置...');
  
  const vercelConfigPath = path.resolve(__dirname, '..', 'vercel.json');
  if (!fs.existsSync(vercelConfigPath)) {
    console.log('⚠️  vercel.json 文件不存在，将创建默认配置');
    createVercelConfig();
  } else {
    console.log('✅ vercel.json 配置存在');
  }
}

// 创建Vercel配置
function createVercelConfig() {
  const vercelConfig = {
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    framework: 'vite',
    redirects: [
      {
        source: '/(.*)',
        destination: '/index.html'
      }
    ],
    headers: [
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  };
  
  const configPath = path.resolve(__dirname, '..', 'vercel.json');
  fs.writeFileSync(configPath, JSON.stringify(vercelConfig, null, 2));
  console.log('✅ 已创建 vercel.json 配置文件');
}

// 检查环境变量
function checkEnvironmentVariables() {
  console.log('\n🔐 检查环境变量...');
  
  const envExamplePath = path.resolve(__dirname, '..', '.env.example');
  const envLocalPath = path.resolve(__dirname, '..', '.env.local');
  
  if (!fs.existsSync(envLocalPath)) {
    console.log('⚠️  .env.local 文件不存在');
    console.log('💡 请运行: vercel env pull .env.local');
  } else {
    console.log('✅ 环境变量配置存在');
  }
}

// 检查Git配置
function checkGitConfig() {
  console.log('\n📝 检查Git配置...');
  
  const gitIgnorePath = path.resolve(__dirname, '..', '.gitignore');
  if (!fs.existsSync(gitIgnorePath)) {
    console.log('⚠️  .gitignore 文件不存在，将创建');
    createGitIgnore();
  } else {
    console.log('✅ .gitignore 配置存在');
  }
}

// 创建.gitignore
function createGitIgnore() {
  const gitIgnoreContent = `
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
/build
/dist
/.next/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Local images
local-images/
optimized-images/

# Logs
*.log

# Cache
.cache/
`.trim();

  const gitIgnorePath = path.resolve(__dirname, '..', '.gitignore');
  fs.writeFileSync(gitIgnorePath, gitIgnoreContent);
  console.log('✅ 已创建 .gitignore 文件');
}

// 生成部署指南
function generateDeployGuide() {
  console.log('\n📚 生成部署指南...');
  
  const deployGuide = `
# 部署指南

## 快速部署到Vercel

1. **准备代码仓库**
   \`\`\`bash
   git add .
   git commit -m "准备部署"
   git push origin main
   \`\`\`

2. **连接Vercel**
   - 访问 https://vercel.com/dashboard
   - 点击 "New Project"
   - 选择你的Git仓库
   - 点击 "Import"

3. **配置环境变量**
   在Vercel项目设置中添加：
   - \`BLOB_READ_WRITE_TOKEN\`: Vercel Blob访问令牌

4. **部署**
   - Vercel会自动检测配置并开始构建
   - 构建完成后获得部署URL

## 其他部署选项

### Netlify
\`\`\`bash
构建命令: npm run build
发布目录: dist
\`\`\`

### GitHub Pages
\`\`\`bash
npm install --save-dev gh-pages
npm run build && npx gh-pages -d dist
\`\`\`

## 域名配置

### Vercel自定义域名
1. 在项目设置中点击 "Domains"
2. 添加自定义域名
3. 根据提示配置DNS记录

### SSL证书
Vercel自动提供Let's Encrypt SSL证书
`.trim();

  const guidePath = path.resolve(__dirname, '..', 'DEPLOY.md');
  fs.writeFileSync(guidePath, deployGuide);
  console.log('✅ 已生成部署指南 DEPLOY.md');
}

// 主函数
function setupDeployment() {
  const configOk = checkBuildConfig();
  checkVercelConfig();
  checkEnvironmentVariables();
  checkGitConfig();
  generateDeployGuide();
  
  console.log('\n🎉 部署环境配置完成！');
  
  if (configOk) {
    console.log('\n📋 下一步操作：');
    console.log('1. 确保所有图片已上传：npm run upload-images');
    console.log('2. 测试本地构建：npm run build && npm run preview');
    console.log('3. 提交代码：git add . && git commit -m "准备部署"');
    console.log('4. 推送到仓库：git push origin main');
    console.log('5. 在Vercel中导入项目并部署');
  } else {
    console.log('\n⚠️  请先解决配置问题，然后重新运行此脚本');
  }
}

// 运行设置
setupDeployment();