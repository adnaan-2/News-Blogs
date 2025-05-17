"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BlogContent from '@/components/blog/blog-content';

const BlogPostPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch post data from an API
    const fetchPost = async () => {
      try {
        // Mock data for demonstration
        const mockPost = {
          title: `Blog Post: ${slug}`,
          content: `<p>This is the content of the blog post with slug: ${slug}</p>
                   <p>In a real application, this would be fetched from a database or API.</p>
                   <h2>Section Title</h2>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc in aliquam tincidunt, 
                   nisl lacus vulputate urna, sed bibendum nunc nisi vel nisi.</p>`,
          coverImage: "https://picsum.photos/800/400",
          date: new Date().toLocaleDateString(),
          author: {
            name: "John Doe",
            image: "https://randomuser.me/api/portraits/men/22.jpg"
          },
          category: "Technology"
        };
        
        setTimeout(() => {
          setPost(mockPost);
          setLoading(false);
        }, 500); // Simulating API delay
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-4">The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4">
      <BlogContent
        title={post.title}
        content={post.content}
        coverImage={post.coverImage}
        date={post.date}
        author={post.author}
        category={post.category}
      />
    </div>
  );
};

export default BlogPostPage;