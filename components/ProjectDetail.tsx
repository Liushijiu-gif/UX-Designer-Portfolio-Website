import React from 'react';
import { ArrowLeft, ExternalLink, Calendar, User, Building } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface ProjectDetailProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    duration: string;
    team: string;
    role: string;
    year: string;
    client: string;
    overview: string;
    challenge: string;

    processSteps: Array<{
      title: string;
      description: string;
      image: string;
    }>;
    keyFeatures: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    results: Array<{
      metric: string;
      value: string;
      description: string;
    }>;
    nextSteps: string[];
    liveUrl: string;
    caseStudyUrl: string;
    // 项目图片集合
    gallery?: string[];
  };
  onBack: () => void;
}

// 增强的文本分段函数
function formatTextWithParagraphs(text: string): string[] {
  if (!text) return [];
  
  // 定义列举关键词
  const listKeywords = [
    '首先', '其次', '第三', '第四', '第五', '第六', '第七', '第八', '第九', '第十',
    '最后', '另外', '此外', '再者', '同时', '然后', '接着', '紧接着',
    '第一', '第二', '第一个', '第二个', '第三个', '第四个', '第五个'
  ];
  
  // 创建正则表达式来匹配列举关键词
  const listPattern = new RegExp(`(${listKeywords.join('|')})`, 'g');
  
  // 检查是否包含列举结构
  const hasListStructure = listKeywords.some(keyword => text.includes(keyword));
  
  if (hasListStructure) {
    // 按列举关键词分段
    const segments = text.split(listPattern).filter(segment => segment.trim());
    const paragraphs: string[] = [];
    let currentParagraph = '';
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i].trim();
      
      // 如果是列举关键词
      if (listKeywords.includes(segment)) {
        // 保存当前段落（如果有内容）
        if (currentParagraph.trim()) {
          paragraphs.push(currentParagraph.trim());
        }
        // 开始新段落
        currentParagraph = segment;
      } else {
        // 继续当前段落
        currentParagraph += segment;
      }
    }
    
    // 添加最后一个段落
    if (currentParagraph.trim()) {
      paragraphs.push(currentParagraph.trim());
    }
    
    return paragraphs.length > 1 ? paragraphs : [text];
  }
  
  // 如果没有列举结构，按原有逻辑分段
  // 按句号分割，但保留句号
  const sentences = text.split(/([。；])/);
  const paragraphs: string[] = [];
  let currentParagraph = '';
  
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    if (sentence === '。' || sentence === '；') {
      currentParagraph += sentence;
      // 检查当前段落长度，如果超过150字符就分段
      if (currentParagraph.length > 180) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
    } else if (sentence.trim()) {
      currentParagraph += sentence;
    }
  }
  
  // 添加最后一个段落
  if (currentParagraph.trim()) {
    paragraphs.push(currentParagraph.trim());
  }
  
  // 如果分段后段落太少，按照更长的长度重新分段
  if (paragraphs.length <= 2 && text.length > 400) {
    const newParagraphs: string[] = [];
    let currentPara = '';
    const sentencesWithPunctuation = text.split(/([。；])/);
    
    for (let i = 0; i < sentencesWithPunctuation.length; i++) {
      const part = sentencesWithPunctuation[i];
      if (part === '。' || part === '；') {
        currentPara += part;
        // 按照350字符分段
        if (currentPara.length > 350) {
          newParagraphs.push(currentPara.trim());
          currentPara = '';
        }
      } else if (part.trim()) {
        currentPara += part;
      }
    }
    
    if (currentPara.trim()) {
      newParagraphs.push(currentPara.trim());
    }
    
    return newParagraphs.length > 1 ? newParagraphs : [text];
  }
  
  return paragraphs.length > 0 ? paragraphs : [text];
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  // 核心项目：只保留图片集合、成果与影响、下一步计划
  const isCoreProject = [1, 2, 3, 4].includes(project.id);
  
  // 完整内容项目：丰富的项目描述，不展示图片合集
  const isFullContentProject = [5, 6, 9, 10].includes(project.id);
  
  // 图片集合项目：显示图片合集、成果与影响、下一步计划，但不显示详细文字内容
  const isGalleryProject = [7, 8].includes(project.id);

  // 纯图片展示项目：只显示图片合集，不显示成果与影响和下一步计划
  const isGalleryOnlyProject = [7, 8].includes(project.id);

  // 获取分段后的文本
  const overviewParagraphs = formatTextWithParagraphs(project.overview);
  const challengeParagraphs = formatTextWithParagraphs(project.challenge);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - 减少返回按钮和分隔线间距 */}
      <div className="bg-gray-50 border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={onBack}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回首页
            </Button>
            <div className="flex items-center space-x-4">
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Project Header - 增加项目标题和分隔线间距 */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {project.category}
                </Badge>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* 项目信息横向排列 */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2" />
                  <span>{project.client}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:order-first">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Overview - 只对完整内容项目显示，使用分段显示 */}
      {isFullContentProject && project.overview && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">项目概述</h2>
            <div className="space-y-6">
              {overviewParagraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Project Gallery - 对核心项目和图片集合项目显示，增加项目标题和图片集间距 */}
      {(isCoreProject || isGalleryProject) && project.gallery && project.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
          <div className="space-y-12">
            {project.gallery.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image}
                  alt={`${project.title} - 图片 ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 其余内容保持原有容器宽度 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Challenge - 只对完整内容项目显示，使用分段显示 */}
        {isFullContentProject && project.challenge && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">设计挑战</h2>
            <div className="space-y-6">
              {challengeParagraphs.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Process - 只对完整内容项目显示，改为垂直排版 */}
        {isFullContentProject && project.processSteps.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">解决方案</h2>
            <div className="space-y-12">
              {project.processSteps.map((step, index) => (
                <div key={index} className="w-full">
                  {/* 文字内容在上 */}
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {/* 图片在下 */}
                  <div className="w-full">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Features - 只对完整内容项目显示 */}
        {isFullContentProject && project.keyFeatures.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">核心功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.keyFeatures.map((feature, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Results - 对核心项目和完整内容项目显示，但排除纯图片展示项目 */}
        {(isCoreProject || isFullContentProject) && !isGalleryOnlyProject && project.results.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">成果与影响</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.results.map((result, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {result.value}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      {result.metric}
                    </div>
                    <p className="text-sm text-gray-600">
                      {result.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Next Steps - 对核心项目和完整内容项目显示，但排除纯图片展示项目 */}
        {(isCoreProject || isFullContentProject) && !isGalleryOnlyProject && project.nextSteps.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">下一步计划</h2>
            <ul className="space-y-3">
              {project.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Action Buttons - 减少返回按钮和分隔线间距 */}
        <div className="flex flex-wrap gap-4 pt-2 border-t">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex items-center border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
          {project.liveUrl !== '#' && (
            <Button
              onClick={() => window.open(project.liveUrl, '_blank')}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              查看项目
            </Button>
          )}
          {project.caseStudyUrl !== '#' && (
            <Button
              onClick={() => window.open(project.caseStudyUrl, '_blank')}
              variant="outline"
              className="flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              详细案例
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}