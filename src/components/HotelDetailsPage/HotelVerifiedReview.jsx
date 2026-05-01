import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from '../../forms/ReviewForm.jsx';
import ShareButton from '../blogs/ShareButton.jsx';
import hotelItemPropType from '../../propTypes/hotelItemPropType.js';
const HotelVerifiedReview = ({ hotelItem }) => {
  const navigate = useNavigate();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleReviewSubmit = (review) => {
    setSubmittedReviews((prev) => [...prev, review]);
    setShowReviewForm(false);
  };

  return (
    <section id="reviews">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 
          onClick={() => navigate(`/hotel-details/${hotelItem.id}/reviews`)}
          className="font-semibold text-2xl text-gray-800 cursor-pointer"
        >
          Reviews & Ratings
        </h2>
        <button
          onClick={() => navigate(`/verified-hotel-reviews/${hotelItem.id}`)}
          className="text-xl text-blue-600 underline hover:text-blue-800"
        >
          View All
        </button>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-green-600 text-white text-2xl font-bold px-4 py-2 rounded-md">
          {hotelItem.averageRating || "4.9"}
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {hotelItem.totalRatings || 599} Ratings
          </p>
          <p className="text-sm text-gray-500">
            JD rating index based on {hotelItem.totalRatings || 599} ratings across the web
          </p>
        </div>
      </div>

      {/* Start Review */}
      <div className="mb-6">
        <p className="font-medium text-gray-800 mb-2">Start your Review</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => {
                setSelectedRating(n);
                setShowReviewForm(true);
              }}
              className="text-gray-400 text-6xl cursor-pointer hover:text-yellow-400 transition"
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          rating={selectedRating}
          onSubmit={handleReviewSubmit}
          subject={{
            name: hotelItem.name,
            image: hotelItem.image,
            address: hotelItem.address,
        }}
        />
      )}

      {/* Rating Trend (Dummy) */}
      <div className="mb-6">
        <p className="font-medium text-gray-800 mb-2">Recent rating trend</p>
        <div className="flex flex-wrap gap-2">
          {Array(10).fill().map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-1 border px-3 py-1 rounded-full text-sm"
            >
              <span className="text-black font-semibold">5.0</span>
              <span className="text-yellow-500">★</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">Relevant</button>
        <button className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Latest</button>
        <button className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">High to Low</button>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(hotelItem.highlights?.length > 0 ? hotelItem.highlights : ["Clean rooms", "Good service", "Affordable", "Near tourist spots"]).map((tag, i) => (
          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Dynamic Last Review */}
      {hotelItem.lastReview && (
        <div className="border-t pt-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{hotelItem.lastReview.name}</p>
              <p className="text-xs text-gray-500">1 review</p>
            </div>
            <span className="ml-auto text-xs text-gray-400">{hotelItem.lastReview.date}</span>
          </div>

          <div className="text-yellow-500 text-lg mb-2">
            {'★'.repeat(hotelItem.lastReview.rating)}{'★'.repeat(5 - hotelItem.lastReview.rating).replace(/★/g, '☆')}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {hotelItem.lastReview.tags.map((tag, i) => (
              <span key={i} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                ✅ {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-700 italic mb-4">
            &rdquo;{hotelItem.lastReview.text}&rdquo;

          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-gray-800">👍 Helpful</button>
            <button className="flex items-center gap-1 hover:text-gray-800">💬 Comment</button>
            <button className="flex items-center gap-1 hover:text-gray-800">🔗 Share</button>
          </div>
        </div>
      )}

      {/* Fallback if no review */}
      {!hotelItem.lastReview && submittedReviews.length === 0 && (
        <p className="text-sm text-gray-500 italic mb-6">
          No reviews yet. Be the first to write one!
        </p>
      )}

      {/* Submitted Reviews */}
      {submittedReviews.map((review, i) => (
        <div key={i} className="border-t pt-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">You</p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
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
            &rdquo;{review.text}&rdquo;
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
                title={`Check out this review on ${hotelItem.name}`}
                text="Here's a great hotel I found on JD!"
                url={window.location.href}
              />
              <span className="hidden sm:inline">Share</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
HotelVerifiedReview.propTypes = {
  hotelItem: hotelItemPropType.isRequired,
};
export default HotelVerifiedReview;
