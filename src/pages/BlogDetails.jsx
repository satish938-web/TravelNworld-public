import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE } from '../utils/api';
import ShareButton from '../components/blogs/ShareButton';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/images/logo/logo.png';

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/blogs/${slug}`);
        setBlog(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500 mb-4"></div>
        <p className="font-medium">Loading story...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold mb-4 text-xl">Oops! Story not found.</p>
        <button onClick={() => navigate('/blogs')} className="text-orange-500 hover:underline font-bold flex items-center justify-center gap-2 mx-auto">
          <FaArrowLeft /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans text-gray-900">
      {/* Navigation Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 font-black transition-all uppercase tracking-widest"
        >
          <FaArrowLeft /> Back
        </button>

        <img src={logo} alt="Travel N World" className="h-12 object-contain" />

        <ShareButton
          title={blog.title}
          text={blog.title}
          url={window.location.href}
        />
      </div>

      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 leading-tight mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-400 text-sm font-bold uppercase tracking-wider">
          <span>By {blog.author || "Admin"}</span>
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl mb-16 ring-8 ring-gray-50/50">
        <img
          src={blog.coverImage || "https://via.placeholder.com/1200x675?text=Travel+N+World"}
          alt={blog.title}
          className="w-full h-auto object-cover max-h-[600px] hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Main content using HTML renderer */}
      <article 
        className="prose prose-lg max-w-none prose-orange leading-relaxed text-gray-700 blog-content-body"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Social Footer */}
      <div className="mt-24 pt-12 border-t border-gray-100 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-8">Share this journey</p>
        <div className="flex justify-center gap-6">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank" rel="noopener noreferrer"
            className="bg-[#1877F2] text-white p-4 rounded-2xl hover:-translate-y-2 transition-all shadow-xl shadow-blue-100"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="bg-[#1DA1F2] text-white p-4 rounded-2xl hover:-translate-y-2 transition-all shadow-xl shadow-sky-100"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`}
            target="_blank" rel="noopener noreferrer"
            className="bg-[#0A66C2] text-white p-4 rounded-2xl hover:-translate-y-2 transition-all shadow-xl shadow-blue-200"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

