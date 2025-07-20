import React, { useState, useCallback } from 'react';
import { Upload, X, Check, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

interface UploadedImage {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  category: string;
}

interface ImageUploaderProps {
  onImageUploaded?: (image: UploadedImage) => void;
  category?: 'covers' | 'netease' | 'xms' | 'apollo' | 'sigma' | 'bedrock' | 'modeling' | 'aigc';
  maxFiles?: number;
  maxSizeInMB?: number;
}

export function ImageUploader({ 
  onImageUploaded, 
  category = 'covers',
  maxFiles = 10,
  maxSizeInMB = 5 
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<Array<{
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'success' | 'error';
    url?: string;
    error?: string;
    dataUrl?: string;
  }>>([]);
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);

  // 检查API是否可用
  const checkApiAvailability = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true })
      });
      return response.status !== 404;
    } catch (error) {
      return false;
    }
  };

  // 上传到Vercel Blob（如果API可用）
  const uploadToVercelBlob = async (file: File): Promise<string> => {
    try {
      // 生成文件路径
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
      const blobPath = `projects/${category}/${fileName}`;

      // 上传到Vercel Blob
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: blobPath,
          contentType: file.type,
          file: await fileToBase64(file)
        })
      });

      if (!response.ok) {
        throw new Error(`API不可用: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }
      
      return result.url;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  // 文件转Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // 移除data:前缀
      };
      reader.onerror = error => reject(error);
    });
  };

  // 文件转Data URL（预览用）
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // 处理文件上传
  const handleFileUpload = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files).slice(0, maxFiles);
    
    // 验证文件
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= maxSizeInMB * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) {
      alert('请选择有效的图片文件（小于' + maxSizeInMB + 'MB）');
      return;
    }

    // 检查API是否可用
    if (apiAvailable === null) {
      const available = await checkApiAvailability();
      setApiAvailable(available);
    }

    // 初始化上传队列
    const initialQueue = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));

    setUploadQueue(initialQueue);

    // 逐个处理文件
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      
      try {
        // 更新状态为上传中
        setUploadQueue(prev => prev.map((item, index) => 
          index === i ? { ...item, status: 'uploading', progress: 10 } : item
        ));

        // 生成预览图
        const dataUrl = await fileToDataUrl(file);
        
        setUploadQueue(prev => prev.map((item, index) => 
          index === i ? { ...item, progress: 30, dataUrl } : item
        ));

        if (apiAvailable) {
          // API可用，尝试上传到Vercel Blob
          const progressInterval = setInterval(() => {
            setUploadQueue(prev => prev.map((item, index) => 
              index === i && item.progress < 90 
                ? { ...item, progress: item.progress + 10 } 
                : item
            ));
          }, 200);

          try {
            const url = await uploadToVercelBlob(file);
            clearInterval(progressInterval);
            
            // 更新成功状态
            setUploadQueue(prev => prev.map((item, index) => 
              index === i ? { 
                ...item, 
                status: 'success', 
                progress: 100, 
                url 
              } : item
            ));

            // 通知父组件
            const uploadedImage: UploadedImage = {
              id: `${Date.now()}-${i}`,
              name: file.name,
              url,
              size: file.size,
              type: file.type,
              category
            };

            onImageUploaded?.(uploadedImage);
          } catch (error) {
            clearInterval(progressInterval);
            throw error;
          }
        } else {
          // API不可用，只生成预览
          setUploadQueue(prev => prev.map((item, index) => 
            index === i ? { 
              ...item, 
              status: 'success', 
              progress: 100,
              url: dataUrl // 使用dataUrl作为临时URL
            } : item
          ));

          // 通知父组件（使用dataUrl）
          const uploadedImage: UploadedImage = {
            id: `${Date.now()}-${i}`,
            name: file.name,
            url: dataUrl,
            size: file.size,
            type: file.type,
            category
          };

          onImageUploaded?.(uploadedImage);
        }

      } catch (error) {
        console.error('Upload failed:', error);
        
        setUploadQueue(prev => prev.map((item, index) => 
          index === i ? { 
            ...item, 
            status: 'error', 
            progress: 0,
            error: error instanceof Error ? error.message : 'Upload failed'
          } : item
        ));
      }
    }
  }, [category, maxFiles, maxSizeInMB, onImageUploaded, apiAvailable]);

  // 拖拽事件处理
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  // 清除队列
  const clearQueue = () => {
    setUploadQueue([]);
  };

  // 移除单个项目
  const removeQueueItem = (index: number) => {
    setUploadQueue(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-4">
      {/* API状态提示 */}
      {apiAvailable === false && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">API不可用</h4>
                <p className="text-sm text-yellow-700 mb-2">
                  当前环境不支持图片上传API。图片将以预览模式显示。
                </p>
                <p className="text-sm text-yellow-700">
                  要启用真实上传功能，请部署到Vercel并配置BLOB_READ_WRITE_TOKEN环境变量。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 上传区域 */}
      <Card className={`border-2 border-dashed transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}>
        <CardContent className="p-8">
          <div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={`p-4 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <Upload className={`h-8 w-8 ${isDragging ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {apiAvailable === false ? '预览' : '上传'}{category === 'covers' ? '项目封面' : '项目详情'}图片
              </h3>
              <p className="text-gray-600 mb-4">
                拖拽图片到此处或点击选择文件
              </p>
              <p className="text-sm text-gray-500">
                支持 PNG, JPG, JPEG 格式，单个文件不超过 {maxSizeInMB}MB
              </p>
            </div>

            <Button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files) {
                    handleFileUpload(target.files);
                  }
                };
                input.click();
              }}
              className="mt-4"
            >
              选择图片文件
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 上传队列 */}
      {uploadQueue.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">
                {apiAvailable === false ? '预览' : '上传'}进度
              </h4>
              <Button variant="ghost" size="sm" onClick={clearQueue}>
                <X className="h-4 w-4" />
                清除
              </Button>
            </div>
            
            <div className="space-y-3">
              {uploadQueue.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">
                        {item.file.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        {item.status === 'success' && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                        {item.status === 'error' && (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQueueItem(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <Progress value={item.progress} className="h-2" />
                    
                    {item.status === 'error' && item.error && (
                      <p className="text-xs text-red-600 mt-1">{item.error}</p>
                    )}
                    
                    {item.status === 'success' && (item.url || item.dataUrl) && (
                      <div className="mt-2">
                        <img 
                          src={item.url || item.dataUrl} 
                          alt={item.file.name}
                          className="h-20 w-20 object-cover rounded border"
                        />
                        <p className="text-xs text-green-600 mt-1">
                          {apiAvailable === false ? '预览生成成功！' : '上传成功！'}
                        </p>
                        {item.url && !item.url.startsWith('data:') && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs mt-1"
                            onClick={() => {
                              navigator.clipboard.writeText(item.url!);
                              alert('URL已复制到剪贴板');
                            }}
                          >
                            复制URL
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 使用说明 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-semibold text-blue-900 mb-2">📋 使用说明</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {apiAvailable === false ? (
              <>
                <p>⚠️ 当前为预览模式，图片未实际上传到云端</p>
                <p>1. 图片将以base64格式显示，仅用于预览</p>
                <p>2. 要启用真实上传，请部署到Vercel并配置环境变量</p>
                <p>3. 部署后的项目将自动上传到Vercel Blob存储</p>
              </>
            ) : (
              <>
                <p>✅ API可用，图片将上传到Vercel Blob存储</p>
                <p>1. 上传成功后会显示永久URL</p>
                <p>2. 复制URL到项目数据中替换原有路径</p>
                <p>3. 这样确保在所有环境中都能正常显示</p>
              </>
            )}
          </div>
          {apiAvailable === false && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-700 border-blue-300 hover:bg-blue-100"
                onClick={() => window.open('https://vercel.com/docs/storage/vercel-blob', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                查看Vercel Blob配置文档
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}