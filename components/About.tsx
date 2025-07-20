import React from 'react';
import { Award, Palette, Coffee, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function About() {
  const stats = [
    { icon: Award, value: '15+', label: '完成项目数' },
    { icon: Palette, value: '1800+', label: '绘制icon数' },
    { icon: Coffee, value: '100+', label: '喝咖啡杯数' },
    { icon: Heart, value: '100%', label: '设计热情' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            关于我
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我是一名充满好奇心和热情的用户体验设计师，致力于创造以用户为中心的解决方案，
            探索并发现更多有意思的事物。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              毕业于广州美术学院，拥有4年的用户体验设计经验，从2022年起在网易工作至今。
              我的设计方法结合了用户研究、数据驱动的洞察和创意解决。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              我认为，优秀的B端设计应当自然且直观。它需要将复杂的业务逻辑拆解为用户易于理解的概念和步骤。为此，设计师必须深入理解用户需求、业务目标和业务限制，才能创造出既美观又实用的界面。
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">我的专长</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  设计系统构建与组件化设计
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  企业级产品与B2B平台设计
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  AI工具产品与智能界面设计
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  3D设计与视觉创新体验
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}