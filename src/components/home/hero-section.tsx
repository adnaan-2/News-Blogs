import React from 'react';

const HeroSection = () => {
    return (
        <div className="bg-blue-600 text-white py-20 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Our News & Blogging Site</h1>
            <p className="text-lg mb-8">Stay updated with the latest news and insightful blogs.</p>
            <div className="flex justify-center space-x-4">
                <button className="bg-white text-blue-600 px-4 py-2 rounded">Login</button>
                <button className="bg-white text-blue-600 px-4 py-2 rounded">Signup</button>
            </div>
        </div>
    );
};

export default HeroSection;