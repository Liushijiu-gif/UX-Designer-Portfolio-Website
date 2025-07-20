import React, { useState } from 'react';
import { ImageUploader } from './ImageUploader';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Copy, ExternalLink, Download } from 'lucide-react';

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  category: string;
}

export function ImageManager() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('covers');

  const categories = [
    { id: 'covers', name: '项目封面', description: '主页项目卡片封面图' },
    { id: 'netease', name: '网易项目', description: '网易OA系统AI助手项目详情图' },
    { id: 'xms', name: 'XMS项目', description: 'XMS低代码平台项目详情图' },
    { id: 'apollo', name: 'Apollo项目', description: 'Apollo财务分摊系统项目详情图' },
    { id: 'sigma', name: 'Sigma项目', description: 'Sigma游戏管理系统项目详情图' },
    { id: 'bedrock', name: 'Bedrock项目', description: 'Bedrock设计系统项目详情图' },
    { id: 'modeling', name: '3D建模', description: '3D建模作品图片' },
    { id: 'aigc', name: 'AIGC生图', description: 'AI生成图片作品' }
  ];

  const handleImageUploaded = (image: UploadedImage) => {
    setUploadedImages(prev => [...prev, image]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  const generateImportCode = () => {
    const imagesByCategory = uploadedImages.reduce((acc, img) => {
      if (!acc[img.category]) acc[img.category] = [];
      acc[img.category].push(img);
      return acc;
    }, {} as Record<string, UploadedImage[]>);

    let code = '// 自动生成的图片导入代码\n\n';
    
    Object.entries(imagesByCategory).forEach(([category, images]) => {
      const categoryName = category === 'covers' ? 'projectCoverImages' : `${category}ProjectImages`;
      code += `export const ${categoryName} = {\n`;
      
      images.forEach((img, index) => {
        const key = img.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        code += `  ${key}: '${img.url}',\n`;
      });
      
      code += '};\n\n';
    });

    return code;
  };

  const getCategoryImages = (category: string) => {
    return uploadedImages.filter(img => img.category === category);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">图片管理中心</h1>
        <p className="text-gray-600">
          上传和管理作品集网站的图片资源，支持Figma Make和Vercel部署
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="text-xs"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{category.name}</CardTitle>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  category={category.id as any}
                  onImageUploaded={handleImageUploaded}
                  maxFiles={category.id === 'covers' ? 9 : 20}
                />
              </CardContent>
            </Card>

            {/* 已上传图片展示 */}
            {getCategoryImages(category.id).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>已上传的图片</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getCategoryImages(category.id).map(image => (
                      <div key={image.id} className="border rounded-lg p-4 space-y-3">
                        <img 
                          src={image.url} 
                          alt={image.name}
                          className="w-full h-32 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-medium text-sm truncate">{image.name}</h4>
                          <p className="text-xs text-gray-500">
                            {(image.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(image.url)}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            复制URL
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(image.url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* 代码生成区域 */}
      {uploadedImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>生成代码</CardTitle>
            <p className="text-sm text-gray-600">
              将上传的图片URL自动生成为TypeScript导入代码
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => copyToClipboard(generateImportCode())}
                className="w-full"
              >
                <Copy className="h-4 w-4 mr-2" />
                复制完整导入代码
              </Button>
              
              <details className="border rounded p-4">
                <summary className="cursor-pointer font-medium">
                  预览生成的代码
                </summary>
                <pre className="mt-3 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
                  {generateImportCode()}
                </pre>
              </details>

              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <h4 className="font-semibold text-blue-900 mb-2">📝 使用步骤</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>复制上面生成的代码</li>
                  <li>替换 <code>components/project-images/image-imports.ts</code> 的内容</li>
                  <li>更新 <code>data/projects.ts</code> 中的图片引用</li>
                  <li>保存并测试图片显示效果</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}