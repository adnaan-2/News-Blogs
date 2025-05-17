import React from 'react';
import BlogCard from '@/components/blog/blog-card';

export default function BlogPage() {
  // In a real app, you would fetch this data from an API or database
  const blogPosts = [
    {
      id: "1",
      slug: "getting-started-with-nextjs",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern React applications with Next.js framework.",
      coverImage: "https://picsum.photos/600/300?random=1",
      date: "May 10, 2025",
      category: "Development"
    },
    {
      id: "2",
      slug: "mastering-tailwind-css",
      title: "Mastering Tailwind CSS",
      excerpt: "Tips and tricks to get the most out of the utility-first CSS framework.",
      coverImage: "https://picsum.photos/600/300?random=2",
      date: "May 5, 2025",
      category: "Design"
    },
    {
      id: "3",
      slug: "building-serverless-applications",
      title: "Building Serverless Applications",
      excerpt: "Explore the benefits of serverless architecture for modern web applications.",
      coverImage: "https://picsum.photos/600/300?random=3",
      date: "April 28, 2025",
      category: "Cloud"
    },
    {
      id: "4",
      slug: "react-performance-optimization",
      title: "React Performance Optimization",
      excerpt: "Learn advanced techniques to make your React applications faster.",
      coverImage: "https://picsum.photos/600/300?random=4",
      date: "April 22, 2025",
      category: "Development"
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
            date={post.date}
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
}