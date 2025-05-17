import React from 'react';
import HeroSection from '../components/home/hero-section';
import CategoryPreview from '../components/home/category-preview';
import FeaturedPosts from '../components/home/featured-posts';

const HomePage = () => {
    return (
        <div className="container mx-auto px-4">
            <HeroSection />
            <CategoryPreview />
            <FeaturedPosts />
        </div>
    );
};

export default HomePage;