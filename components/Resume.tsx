import image_c45826329011dcdd90b4016b66618f39ba4d4023 from 'figma:asset/c45826329011dcdd90b4016b66618f39ba4d4023.png';
import image_726fba7653f39cf1dd04fd3815694bdfcd65cffb from 'figma:asset/726fba7653f39cf1dd04fd3815694bdfcd65cffb.png';
import image_c45826329011dcdd90b4016b66618f39ba4d4023 from 'figma:asset/c45826329011dcdd90b4016b66618f39ba4d4023.png';
import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Globe, Calendar, GraduationCap, Briefcase, Star, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ResumeProps {
  onBack: () => void;
}

export function Resume({ onBack }: ResumeProps) {
  const personalInfo = {
    name: '刘家铃',
    title: '用户体验设计师',
    email: '332581402@qq.com',
    phone: '+86 134 1803 4440',
    wechat: 'Llzzz73',
    location: '广州',
    website: 'www.jialing-design.com',
    summary: '拥有4年用户体验设计经验，专注于企业级B端系统设计，在AI助手、低代码平台、财务系统、游戏运营等领域有丰富项目经验，擅长用户研究、交互设计和设计系统构建。'
  };

  const workExperience = [
    {
      company: '德科信息有限公司（网易驻场）',
      position: 'UI/UX设计师',
      duration: '2022年5月 - 至今',
      location: '广州',
      achievements: [
        '负责网易OA系统AI助手、财务分摊系统、游戏管理系统等多个企业级B端产品的用户体验设计',
        '建立并维护Bedrock设计系统，包括组件库和图标库，提高团队设计效率40%',
        '主导低代码平台、财务分摊系统、游戏管理系统的交互设计，简化复杂业务流程',
        '建立设计标准和流程规范，推动设计团队专业化发展'
      ]
    },
    {
      company: '北京金溪欣网络科技有限公司',
      position: 'UI设计师',
      duration: '2021年5月 - 2022年3月',
      location: '广州',
      achievements: [
        '负责C端与B端后台项目的UI设计，包括汽车主机厂的APP、H5和PC管理后台',
        '制定新产品视觉风格，建立设计规范和标准文档',
        '根据需求延续风格，优化现有功能和交互流程',
        '协助开发团队标注和切图，确保设计质量',
        '维护版本迭代，提升用户界面体验'
      ]
    }
  ];

  const education = [
    {
      school: '广州美术学院',
      degree: '美术学学士',
      major: '美术史专业',
      duration: '2015年9月 - 2019年6月',
      achievements: [
        '专业排名前15%',
        '毕业论文获得优秀毕业论文奖项'
      ]
    }
  ];

  const skills = [
    {
      category: '设计工具',
      items: ['Figma', 'Sketch', 'Blender', 'Midjourney', 'Stable Diffusion', 'After Effects']
    },
    {
      category: '设计方法',
      items: ['用户研究', '可用性测试', '原型设计', '信息架构', '交互设计', '视觉设计']
    },
    {
      category: '软技能',
      items: ['项目管理', '团队协作', '跨部门沟通', '需求分析']
    }
  ];



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Personal Info */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.name}</h1>
                <h2 className="text-xl text-blue-600 mb-4">{personalInfo.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{personalInfo.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span>{personalInfo.wechat}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 md:col-span-2">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{personalInfo.website}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </div>
              
              <div className="w-48 h-48 flex-shrink-0">
                <ImageWithFallback
                  src={image_c45826329011dcdd90b4016b66618f39ba4d4023}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Experience */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              工作经历
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {workExperience.map((job, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.position}</h3>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      {job.duration}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  {index < workExperience.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              教育背景
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.school}</p>
                      <p className="text-sm text-gray-600">{edu.major}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1 md:mt-0">
                      <Calendar className="h-4 w-4 mr-1" />
                      {edu.duration}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  {index < education.length - 1 && <Separator className="mt-6" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              专业技能
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-gray-900 mb-3">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>



        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={onBack}
            variant="outline"
            size="lg"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
}