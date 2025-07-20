import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} 刘家铃。保留所有权利。
          </p>
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            回到顶部
          </Button>
        </div>
      </div>
    </footer>
  );
}