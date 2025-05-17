import React from 'react';
import BlogCard from '@/components/blog/blog-card'

const featuredPosts = [
    {
        id: 1,
        title: 'Understanding the Latest Trends in Technology',
        excerpt: 'A deep dive into the emerging technologies that are shaping our future.',
        coverImage: '/images/tech-trends.jpg', // Changed from 'image' to 'coverImage'
        slug: 'understanding-latest-trends-technology', // Added slug
        date: 'May 15, 2025', // Added date
        category: 'Technology' // Added category
    },
    {
        id: 2,
        title: 'Health Tips for a Better Lifestyle',
        excerpt: 'Simple yet effective health tips to improve your daily routine.',
        coverImage: '/images/health-tips.jpg', // Changed from 'image' to 'coverImage'
        slug: 'health-tips-better-lifestyle', // Added slug
        date: 'May 12, 2025', // Added date
        category: 'Health' // Added category
    },
    {
        id: 3,
        title: 'The Future of Automotive Industry',
        excerpt: 'Exploring the innovations that are driving the automotive sector forward.',
        coverImage: '/images/automotive-future.jpg', // Changed from 'image' to 'coverImage'
        slug: 'future-automotive-industry', // Added slug
        date: 'May 10, 2025', // Added date
        category: 'Automotive' // Added category
    },
];

const FeaturedPosts = () => {
    return (
        <section className="py-10">
            <h2 className="text-2xl font-bold text-center mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredPosts.map(post => (
                    <BlogCard
                        key={post.id}
                        id={String(post.id)}
                        slug={post.slug}
                        title={post.title}
                        excerpt={post.excerpt}
                        coverImage={post.coverImage}
                        date={post.date}
                        category={post.category}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedPosts;