import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Share2 } from "lucide-react"; // ✅ Share icon
import transporterBlogData from "../../data/transporterBlogData";
import transportData from "../../data/transportData";
 
import { toast } from "react-hot-toast";

const TransporterBlogPage = () => {
  const { transporterId, slug } = useParams();
  const id = Number(transporterId);
 
  //  Find transporter
  const transporter = transportData.find((t) => t.id === id);
 
  // Redirect if slug doesn’t match
  if (transporter && transporter.slug !== slug) {
    return (
      <Navigate
        to={`/transporter/${id}/${transporter.slug}/blogs`}
        replace
      />
    );
  }
 
  const transporterName = transporter?.title || "This Transporter";
 
  // ✅ Filter blogs for this transporter
  const blogs = transporterBlogData.filter((blog) => blog.transporterId === id);
 
  // ✅ Ensure 4 cards (repeat if fewer)
  const blogCards =
    blogs.length >= 4
      ? blogs.slice(0, 4)
      : Array(4)
          .fill(null)
          .map((_, i) => blogs[i % blogs.length] || blogs[0]);
 
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* ✅ Transporter heading styled orange */}
      <h1 className="text-3xl font-extrabold mb-8 text-center">
        ✈️ Travel Blogs by{" "}
        <span className="text-orange-600">{transporterName}</span>
      </h1>
 
      {blogs.length === 0 ? (
        <p className="text-gray-600 text-center">
          No blogs found for {transporterName}.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogCards.map((blog, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-md hover:shadow-xl bg-white overflow-hidden transform hover:-translate-y-1 transition duration-300"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className={blog.imgStyle || "w-full h-44 object-cover"}
              />
              <div className="p-4 flex flex-col justify-between h-40">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {blog.desc}
                  </p>
                </div>
 
                {/* ✅ Bottom actions: Read More + Share */}
                <div className="flex items-center justify-between mt-3">
                  <Link
                    to={`/transporter/${transporter.id}/${transporter.slug}/blogs/${blog.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                     Read More →
                  </Link>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: blog.title,
                          text: blog.desc,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                      }
                    }}
                    className="text-gray-500 hover:text-blue-600 transition"
                    aria-label="Share Blog"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default TransporterBlogPage;
 
 
