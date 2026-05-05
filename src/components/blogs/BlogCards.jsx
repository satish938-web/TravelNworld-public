import React, { useState, useEffect } from 'react';
import ShareButton from './ShareButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../../utils/api';

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="h-64 bg-gray-200" />
    <div className="p-8">
      <div className="h-4 bg-gray-100 rounded w-1/4 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-4 bg-gray-100 rounded w-5/6 mb-8" />
      <div className="flex justify-between items-center pt-6 border-t border-gray-50">
        <div className="h-10 bg-gray-200 rounded-xl w-32" />
        <div className="h-10 bg-gray-100 rounded-xl w-12" />
      </div>
    </div>
  </div>
);

const BlogCards = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/api/blogs`);
        if (response.data?.data) {
          setAllBlogs(response.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Client-side pagination logic
  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
  const displayedBlogs = allBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(9)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {displayedBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-15px_rgba(220,38,38,0.15)] transition-all duration-700 flex flex-col overflow-hidden border border-gray-100 group hover:border-red-600/20"
          >
            {/* Image at Top */}
            <div className="h-72 overflow-hidden relative">
              <img
                src={blog.coverImage || "https://via.placeholder.com/400x250?text=Travel+N+World"}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="p-10 flex flex-col flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-red-600"></span>
                <span className="text-[11px] font-black text-red-600 uppercase tracking-[0.4em] font-['Barlow']">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6 line-clamp-2 leading-[1.2] font-['Montserrat'] tracking-tight group-hover:text-red-600 transition-colors duration-300">
                {blog.title}
              </h2>

              <p className="text-slate-500 font-light line-clamp-3 mb-8 leading-relaxed font-['Barlow'] text-base">
                {blog.shortDescription || "Embark on an extraordinary journey through our latest editorial piece, curated for the modern luxury traveler."}
              </p>
              
              {/* Footer */}
              <div className="mt-auto pt-8 flex justify-between items-center border-t border-gray-100">
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="bg-premium-gradient text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all duration-300 shadow-xl shadow-red-100"
                >
                  Read Story
                </Link>

                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <ShareButton
                    title={blog.title}
                    text={blog.title}
                    url={window.location.origin + `/blogs/${blog.slug}`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-20 flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-slate-900 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-red-200'
            }`}
          >
            Prev
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === i + 1
                    ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                    : 'bg-white text-slate-400 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all duration-300 ${
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-slate-900 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-red-200'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {allBlogs.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-400 font-medium">No stories found. Stay tuned!</div>
      )}
    </div>
  );
};

export default BlogCards;
