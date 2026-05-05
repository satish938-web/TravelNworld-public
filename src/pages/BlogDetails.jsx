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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 bg-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-t-2 border-red-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-t-2 border-slate-900 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
        <p className="font-['Barlow'] font-bold uppercase tracking-[0.2em] text-xs mt-8">Curating Story...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-32 bg-white">
        <p className="text-red-600 font-['Montserrat'] font-black mb-8 text-3xl">Story not found.</p>
        <button onClick={() => navigate('/blogs')} className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-3 mx-auto">
          <FaArrowLeft /> Return to Editorial
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-sans text-gray-900 bg-white">
      {/* Navigation Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-[11px] text-slate-500 hover:text-red-600 font-black transition-all uppercase tracking-[0.3em]"
        >
          <FaArrowLeft /> Back to List
        </button>

        <img src={logo} alt="Travel N World" className="h-10 object-contain" />

        <div className="hover:scale-110 transition-transform">
          <ShareButton
            title={blog.title}
            text={blog.title}
            url={window.location.href}
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-16 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 text-[10px] font-black text-red-600 uppercase tracking-[0.4em] mb-8 font-['Barlow']">
          <span className="w-10 h-[1px] bg-red-600"></span>
          <span>Editorial Journey</span>
          <span className="w-10 h-[1px] bg-red-600"></span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-10 font-['Montserrat'] tracking-tight">
          {blog.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] font-['Barlow']">
          <span className="flex items-center gap-2">By <span className="text-slate-900">{blog.author || "Travel N World"}</span></span>
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl mb-24 ring-[12px] ring-slate-50">
        <img
          src={blog.coverImage || "https://via.placeholder.com/1200x675?text=Travel+N+World"}
          alt={blog.title}
          className="w-full h-auto object-cover max-h-[700px]"
        />
      </div>

      {/* Main content using HTML renderer */}
      <article 
        className="prose prose-xl max-w-none prose-slate leading-[1.8] text-slate-700 blog-content-body font-['Barlow']"
        style={{
          '--tw-prose-headings': '#0f172a',
          '--tw-prose-links': '#dc2626',
          '--tw-prose-bold': '#0f172a',
        }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Social Footer */}
      <div className="mt-32 pt-16 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Share this Editorial</p>
        <div className="flex justify-center gap-8">
          {[
            { icon: <FaFacebookF size={22} />, color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
            { icon: <FaTwitter size={22} />, color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}` },
            { icon: <FaLinkedinIn size={22} />, color: '#0A66C2', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}` }
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: social.color }}
              className="text-white p-5 rounded-[1.5rem] hover:-translate-y-2 transition-all duration-300 shadow-2xl hover:shadow-red-200"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

