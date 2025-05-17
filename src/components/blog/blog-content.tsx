import React from 'react';
import Image from 'next/image';

interface BlogContentProps {
  title: string;
  content: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    image?: string;
  };
  category: string;
}

export default function BlogContent({
  title,
  content,
  coverImage,
  date,
  author,
  category
}: BlogContentProps) {
  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 relative rounded-full overflow-hidden mr-3">
              {author.image ? (
                <Image 
                  src={author.image} 
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{author.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{author.name}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>
          
          <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {category}
          </div>
        </div>
      </div>

      {coverImage && (
        <div className="relative h-64 md:h-96 w-full mb-8">
          <Image 
            src={coverImage} 
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div 
        className="prose max-w-none prose-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}