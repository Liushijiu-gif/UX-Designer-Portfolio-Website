import React, { useState } from 'react';
import { Settings, Image, Code, FileText, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageManager } from './ImageManager';

interface AdminPanelProps {
  onClose: () => void;
}

export function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('images');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold">作品集管理面板</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onClose}>
                返回作品集
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>图片管理</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>内容管理</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>代码生成</span>
            </TabsTrigger>
            <TabsTrigger value="deploy" className="flex items-center space-x-2">
              <ExternalLink className="h-4 w-4" />
              <span>部署管理</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="mt-6">
            <ImageManager />
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>内容管理</CardTitle>
                <p className="text-sm text-gray-600">
                  管理项目信息、技能列表、个人简介等内容
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  内容管理功能开发中...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>代码生成</CardTitle>
                <p className="text-sm text-gray-600">
                  生成项目数据文件和组件代码
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  代码生成功能开发中...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deploy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>部署管理</CardTitle>
                <p className="text-sm text-gray-600">
                  管理部署配置和环境变量
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">🚀 部署检查清单</h4>
                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                      <li>✅ 图片已上传到Vercel Blob</li>
                      <li>✅ 环境变量已配置</li>
                      <li>⏳ 代码已提交到Git仓库</li>
                      <li>⏳ Vercel项目已创建</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full" disabled>
                    一键部署到Vercel（开发中）
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}