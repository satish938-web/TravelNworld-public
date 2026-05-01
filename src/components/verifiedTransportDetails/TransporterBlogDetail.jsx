import React, { useEffect } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Share2, Printer } from "lucide-react";
import transporterBlogData from "../../data/transporterBlogData";
import transportData from "../../data/transportData";
 
const TransporterBlogDetail = () => {
  const { transporterId, slug, blogId } = useParams();
  const navigate = useNavigate();
  const tId = Number(transporterId);
  const bId = Number(blogId);
 
  // Find transporter by ID
  const transporter = transportData.find((t) => t.id === tId);
 
  // Redirect if slug does not match
  if (transporter && transporter.slug !== slug) {
    return (
      <Navigate
        to={`/transporter/${tId}/${transporter.slug}/blogs/${bId}`}
        replace
      />
    );
  }
 
  const transporterName = transporter?.title || "Transporter";
 
  // Find the blog for the transporter
  const blog = transporterBlogData.find(
    (b) => b.transporterId === tId && b.id === bId
  );
 
  useEffect(() => {
    if (blog && blog.title) {
      document.title = blog.title; // set page title dynamically
    }
  }, [blog]);
 
  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Link
          to={`/transporter/${tId}/${slug}/blogs`}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to blogs by {transporterName}
        </Link>
        <p className="mt-4 text-gray-700">Blog not found.</p>
      </div>
    );
  }
 
  // Web Share handler
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text:
          typeof blog.content[0] === "string"
            ? blog.content[0]
            : blog.content[0].items?.join(", ") || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
 
  return (
    <div className="max-w-3xl mx-auto p-6 font-sans text-gray-900">
      {/* ---------- Top Bar ---------- */}
      <div className="flex items-center justify-between border-b pb-4 mb-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium transition"
        >
          ← Back
        </button>
 
        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <Share2 size={16} /> Share
          </button>
 
          {/* Print */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium transition"
          >
            <Printer size={16} /> Print
          </button>
        </div>
      </div>
 
      {/* Blog Title */}
      <h1 className="text-3xl font-bold mt-4 mb-4">{blog.title}</h1>
 
      {/* Blog Image */}
      <img
        src={blog.img}
        alt={blog.title}
        className={`${blog.imgStyle} mb-6 rounded-lg shadow`}
      />
 
      {/* Blog Content */}
      <div className="text-gray-700 space-y-5 leading-relaxed">
        {blog.content.map((segment, idx) => {
          if (typeof segment === "string") {
            return (
              <p key={idx} className="text-lg">
                {segment}
              </p>
            );
          } else if (segment.type === "list" && Array.isArray(segment.items)) {
            return (
              <ul
                key={idx}
                className="list-disc list-inside ml-5 space-y-1 text-lg"
              >
                {segment.items.map((li, liIdx) => (
                  <li key={liIdx}>{li}</li>
                ))}
              </ul>
            );
          } else {
            return null;
          }
        })}
      </div>
 
      {/* ---------- Bottom Share Section ---------- */}
      <div className="mt-12 pt-8 border-t text-center">
        <p className="text-sm text-gray-600 mb-4 font-medium">
          Share this post:
        </p>
        <div className="flex justify-center gap-5 text-white text-xl">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              window.location.href
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
            aria-label="Share on Facebook"
          >
            <FaFacebookF />
          </a>
 
          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              window.location.href
            )}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition"
            aria-label="Share on Twitter"
          >
            <FaTwitter />
          </a>
 
          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              window.location.href
            )}&title=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 p-3 rounded-full hover:bg-blue-900 transition"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </div>
  );
};
 
export default TransporterBlogDetail;