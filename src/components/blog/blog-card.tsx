import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
}

export default function BlogCard({ 
  slug, 
  title, 
  excerpt, 
  coverImage, 
  date,
  category 
}: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        {coverImage ? (
          <Image 
            src={coverImage} 
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 h-48 w-full flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">{date}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline font-medium">
          Read more
        </Link>
      </div>
    </div>
  );
}