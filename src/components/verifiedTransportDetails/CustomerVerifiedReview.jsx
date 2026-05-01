import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import transportData from '../../data/transportData';
import Header from '../../components/verifiedTransportDetails/Header';
import RightSide from '../../components/verifiedTransportDetails/RightSide';
import ShareButton from '../../components/blogs/ShareButton';

const CustomerVerifiedReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const travelItem = transportData.find(item => item.id === parseInt(id));

  const reviews = Array(5).fill().map((_, i) => ({
    name: `Customer ${i + 1}`,
    date: '22 Sep 2025',
    rating: 5,
    tags: ['Good offers', 'Great service'],
    text: 'Excellent travel service!',
    images: [],
  }));

  if (!travelItem) return <div className="p-4">Transport details not found.</div>;

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen font-sans">
      <Header travelItem={travelItem} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* LEFT */}
        <div className="w-full lg:w-[80%] flex flex-col gap-6 border rounded-md p-5 shadow-sm bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-700">
              All Reviews for {travelItem.title}
            </h2>
            <button
              onClick={() => navigate(`/verified-transport-details/${id}`)}
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              ← Back to Details
            </button>
          </div>

          {reviews.map((review, i) => (
            <div key={i} className="border-t pt-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">1 review</p>
                </div>
                <span className="ml-auto text-xs text-gray-400">{review.date}</span>
              </div>

              <div className="text-orange-500 text-lg mb-2">
                {'★'.repeat(review.rating)}{'★'.repeat(5 - review.rating).replace(/★/g, '☆')}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {review.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                    ✅ {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-700 italic mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {review.images.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {review.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`uploaded-${index}`}
                      className="w-16 h-16 rounded object-cover border"
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-6 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-gray-800">👍 Helpful</button>
                <button className="flex items-center gap-1 hover:text-gray-800">💬 Comment</button>
                <div className="flex items-center gap-1 hover:text-gray-800 cursor-pointer">
                  <ShareButton
                    title="Check out this review"
                    text="Great travel service!"
                    url={window.location.href}
                  />
                  <span className="hidden sm:inline">Share</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[20%] flex flex-col gap-6">
          <RightSide travelItem={travelItem} />
        </div>
      </div>
    </div>
  );
};

export default CustomerVerifiedReview;
