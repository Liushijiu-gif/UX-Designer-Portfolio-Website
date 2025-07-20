import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

interface PortfolioProps {
  projects: Project[];
  onProjectClick: (projectId: number) => void;
}

export function Portfolio({ projects, onProjectClick }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  
  const categories = ['全部', '企业级产品', 'AI技术应用', '设计系统', '个人创作'];

  const filteredProjects = selectedCategory === '全部' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            我的作品集
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            专注企业级产品设计与创新技术应用，涵盖B端产品、AI技术、设计系统和个人创作等领域，致力于通过设计创造更好的用户体验。
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => onProjectClick(project.id)}
            >
              <div className="relative overflow-hidden">
                {/* 项目封面图片 */}
                <div className="w-full h-48 bg-gray-100">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}