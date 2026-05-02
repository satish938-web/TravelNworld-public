import React, { useState, useEffect } from 'react';
import ShareButton from './ShareButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../../utils/api';

const BlogCards = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/blogs`);
        setBlogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-400 font-medium italic">Discovering stories...</div>;
  }

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden border border-gray-100 group"
          >
            {/* Image at Top */}
            <div className="h-56 overflow-hidden">
              <img
                src={blog.coverImage || "https://via.placeholder.com/400x250?text=Travel+N+World"}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              <h2 className="text-xl font-black text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                {blog.title}
              </h2>
              
              {/* Footer */}
              <div className="mt-auto pt-6 flex justify-between items-center border-t border-gray-50">
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                >
                  Read Story
                </Link>

                <ShareButton
                  title={blog.title}
                  text={blog.title}
                  url={window.location.origin + `/blogs/${blog.slug}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {blogs.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-medium">No stories found. Stay tuned!</div>
      )}
    </div>
  );
};

export default BlogCards;
