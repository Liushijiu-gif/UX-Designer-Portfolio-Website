import React from 'react';
import { Card, CardContent } from './ui/card';

export function Contact() {
  const contactInfo = [
    {
      icon: '📧',
      title: '邮箱',
      value: '332581402@qq.com',
      link: 'mailto:332581402@qq.com'
    },
    {
      icon: '📞',
      title: '电话',
      value: '13418034440',
      link: 'tel:13418034440'
    },
    {
      icon: '💬',
      title: '微信',
      value: 'Llzzz73',
      link: '#'
    },
    {
      icon: '📍',
      title: '位置',
      value: '广州',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's 一起工作！
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            我随时欢迎聊聊新的机会和有趣的项目。
            让我们一起创造出色的作品吧！
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <span className="text-3xl">{info.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">{info.title}</h4>
                        <a 
                          href={info.link}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}