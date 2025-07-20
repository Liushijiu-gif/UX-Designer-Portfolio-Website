import React from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowRight } from 'lucide-react';

export function Skills() {
  const skillCategories = [
    {
      title: '设计工具',
      skills: [
        { name: 'Figma', level: 95 },
        { name: 'Photoshop', level: 85 },
        { name: 'AIGC', level: 65 },
      ]
    },
    {
      title: '用户体验方法',
      skills: [
        { name: '用户研究', level: 90 },
        { name: '用户旅程地图', level: 92 },
        { name: '信息架构', level: 95 },
        { name: '可用性测试', level: 85 },
      ]
    },
    {
      title: '技术技能',
      skills: [
        { name: '响应式设计', level: 80 },
        { name: '设计系统', level: 90 },
      ]
    }
  ];

  const tools = [
    { name: 'Figma', category: '界面设计', logo: '🎨' },
    { name: 'Sketch', category: '界面设计', logo: '💎' },
    { name: 'C4D', category: '3D建模', logo: '🎯' },
    { name: 'Blender', category: '3D建模', logo: '🔷' },
    { name: 'Mid Journey', category: 'AI生成', logo: '🤖' },
    { name: 'Stable Diffusion', category: 'AI生成', logo: '🧠' },
    { name: 'Photoshop', category: '图像处理', logo: '🖼️' },
    { name: '动效设计', category: '动画制作', logo: '⚡' },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            技能与专长
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Skills Progress */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">核心能力</h3>
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-6">
                <h4 className="text-lg font-medium text-gray-800">{category.title}</h4>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Technologies */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">工具与平台</h3>
            <div className="grid grid-cols-2 gap-4">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{tool.logo}</div>
                      <div>
                        <div className="font-medium text-gray-900">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.category}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Process */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">设计流程</h3>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4">
            {[
              { step: '01', title: '用户研究', description: '通过问卷、访谈和可用性测试了解用户需求和痛点。' },
              { step: '02', title: '需求分析', description: '整理用户反馈，明确产品需求，创建用户画像。' },
              { step: '03', title: '线框与原型设计', description: '制作低保真线框图和高保真可交互原型，构建产品框架。' },
              { step: '04', title: '视觉设计', description: '确定视觉风格，建立设计规范，准备设计交付物。' },
              { step: '05', title: '开发协作与上线', description: '与开发团队合作确保设计落地，发布产品并监测反馈。' },
              { step: '06', title: '持续改进', description: '根据用户反馈和市场变化进行定期迭代和优化。' },
            ].map((phase, index, array) => (
              <React.Fragment key={index}>
                <div className="text-center max-w-xs">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-normal text-sm">{phase.step}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{phase.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{phase.description}</p>
                </div>
                {index < array.length - 1 && (
                  <div className="flex items-center justify-center lg:flex-shrink-0">
                    <ArrowRight className="h-6 w-6 text-blue-400 transform lg:rotate-0 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Market Expertise */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">行业专长</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="text-4xl">🎨</div>
                <h4 className="text-lg font-semibold text-gray-900">设计系统构建</h4>
                <p className="text-sm text-gray-600">
                  企业级设计系统规划与实施，组件库设计，设计规范制定，提升团队协作效率
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="text-4xl">🏢</div>
                <h4 className="text-lg font-semibold text-gray-900">企业级产品</h4>
                <p className="text-sm text-gray-600">
                  B2B产品设计、后台管理系统、数据可视化界面，关注效率提升和用户工作流优化
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="text-4xl">🤖</div>
                <h4 className="text-lg font-semibold text-gray-900">AI工具产品</h4>
                <p className="text-sm text-gray-600">
                  AI驱动的设计工具、智能化用户界面设计，探索人工智能与设计的深度结合
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}