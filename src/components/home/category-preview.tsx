import React from 'react';

const categories = [
  { name: 'Business', link: '/business' },
  { name: 'Tech', link: '/tech' },
  { name: 'Weather', link: '/weather' },
  { name: 'Automotive', link: '/automotive' },
  { name: 'Pakistan', link: '/pakistan' },
  { name: 'Global', link: '/global' },
  { name: 'Lifestyle', link: '/lifestyle' },
  { name: 'Health', link: '/health' },
  { name: 'Sports', link: '/sports' },
  { name: 'Islam', link: '/islam' },
  { name: 'Education', link: '/education' },
  { name: 'Entertainment', link: '/entertainment' },
];

const CategoryPreview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <div key={category.name} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold">{category.name}</h3>
          <a href={category.link} className="text-blue-500 hover:underline">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default CategoryPreview;