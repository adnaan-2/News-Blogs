import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, link }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="relative w-full h-40">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-cover rounded-t-lg" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a href={link} className="text-blue-500 hover:text-blue-800">
          Read more
        </a>
      </div>
    </div>
  );
};

export default Card;