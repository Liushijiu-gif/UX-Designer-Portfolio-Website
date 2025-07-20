// API路由用于上传图片到Vercel Blob
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const { filename, contentType, file } = await request.json();
    
    if (!filename || !contentType || !file) {
      return new Response('Missing required fields', { status: 400 });
    }

    // 检查环境变量
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return new Response('Blob storage not configured', { status: 500 });
    }

    // 将base64转换为Buffer
    const buffer = Buffer.from(file, 'base64');
    
    // 上传到Vercel Blob
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType,
    });

    return Response.json({ 
      success: true, 
      url: blob.url,
      downloadUrl: blob.downloadUrl 
    });

  } catch (error) {
    console.error('Upload error:', error);
    return new Response('Upload failed', { status: 500 });
  }
}