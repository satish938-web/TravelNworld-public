import React from 'react';
import blogHero from '../../assets/images/blogs/blog.jpg';

const BlogsHero = () => {
  return (
    <div
      className="relative w-full h-[200px] md:h-[500px] lg:h-[600px] bg-black bg-center bg-cover py-1"
      style={{ backgroundImage: `url(${blogHero}) `}}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Our Blog</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Stay updated with the latest articles, insights, and inspiration.
        </p>
      </div>
    </div>
  );
};

export default BlogsHero;