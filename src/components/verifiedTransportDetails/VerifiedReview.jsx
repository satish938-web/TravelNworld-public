import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, ArrowRight, Info, PlusCircle, CheckCircle2, User, Quote } from "lucide-react";
import ReviewForm from "../../forms/ReviewForm.jsx";
import travelItemPropType from '../../propTypes/travelItemPropType.js';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_BASE, getImageUrl } from '../../utils/api';
import { toast } from 'react-hot-toast';

function VerifiedReview({ travelItem, reviewsList = [] }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [allReviews, setAllReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedFullImage, setSelectedFullImage] = useState(null);

  useEffect(() => {
    // Combine regular reviews with dashboard curated reviewsList
    const combined = [
      ...(reviewsList || []),
      ...(travelItem.reviewsList || []).map(r => ({
        ...r,
        userName: r.name,
        text: r.comment,
        isCurated: true
      }))
    ];
    setAllReviews(combined);
  }, [reviewsList, travelItem.reviewsList]);

  const handleReviewSubmit = async (review) => {
    try {
      const apiBase = API_BASE || "";
      
      // Submit to backend
      const res = await axios.post(`${apiBase}/api/agents/${id}/reviews`, {
        rating: review.rating,
        userName: review.userName,
        comment: review.text,
        tags: review.tags,
        images: review.images // These are S3 keys now
      });

      // Optimistically add the new review to the list
      setAllReviews((prev) => [
        res.data.data, // Use data from response
        ...prev
      ]);
      
      setShowReviewForm(false);
    } catch (err) {
      console.error("Failed to submit review:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || "Failed to submit review. Please try again.";
      toast.error(errorMsg);
      throw err; // Re-throw so ReviewForm doesn't show success modal
    }
  };

  const hasReviews = allReviews.length > 0 || (travelItem.reviewsCount > 0);

  return (
    <motion.section
      id="reviews"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="text-red-600" size={16} />
            <span className="text-red-600 font-black uppercase tracking-widest text-[9px]">Community Feedback</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Reviews & Ratings</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Rating Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-red-900/20 md:sticky md:top-24 z-10 border border-slate-800">
            <div className="text-center mb-8">
              <div className="text-5xl font-black mb-2 tracking-tighter">{travelItem.rating || "4.8"}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Based on {allReviews.length || travelItem.reviewsCount || 0} reviews</p>
            </div>

            <div className="space-y-4 mb-10">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-[11px] font-black w-4 text-slate-400">{star}</span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: star === 5 ? "85%" : star === 4 ? "10%" : "5%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-premium-gradient rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setSelectedRating(5); setShowReviewForm(true); }}
              className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <PlusCircle size={16} /> Write a Review
            </button>
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-8 space-y-6">

          {/* Live Reviews rendering */}
          <AnimatePresence mode="popLayout">
            {allReviews.slice(0, visibleCount).map((review, i) => (
              <motion.div
                key={review._id || i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, backgroundColor: "#fdfdfd" }}
                className="relative bg-white border border-slate-100 rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200 group cursor-pointer"
                onClick={() => setSelectedReview(review)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 font-black border border-red-100 group-hover:bg-premium-gradient group-hover:text-white transition-colors duration-500">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base leading-none mb-1.5">{review.userName || "Guest Traveler"}</h4>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={10} className={idx < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest">
                      {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recent"}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-4 -left-4 text-slate-50 w-12 h-12 -z-0" />
                  <p className="text-slate-600 font-medium leading-relaxed text-sm relative z-10">
                    {review.comment || review.text}
                  </p>
                </div>

                {review.images && review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                    {review.images.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={getImageUrl(img)} 
                        alt={`Review Image ${idx + 1}`} 
                        onClick={(e) => {
                          e.stopPropagation(); // Don't trigger the review detail modal
                          setSelectedFullImage(img);
                        }}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-100 hover:scale-110 hover:shadow-lg transition-all cursor-zoom-in"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {allReviews.length > visibleCount && (
            <div className="flex justify-center pt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 flex items-center gap-2 group"
              >
                View More Reviews 
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {!hasReviews && (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200 shadow-sm">
                <MessageSquare size={28} strokeWidth={1} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">Be the first to rate</h3>
              <p className="text-slate-500 font-medium text-xs mb-8">Your feedback helps fellow travelers find the best experiences.</p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
              >
                Write First Review
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Review Detail Modal */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedReview(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-premium-gradient hover:text-white rounded-full flex items-center justify-center transition-all z-10"
              >
                &times;
              </button>

              <div className="p-8 sm:p-10 overflow-y-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-premium-gradient flex items-center justify-center text-white font-black shadow-lg shadow-red-200">
                    <User size={32} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xl mb-1">{selectedReview.userName || "Guest Traveler"}</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={14} className={idx < selectedReview.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative mb-10">
                  <Quote className="absolute -top-6 -left-6 text-slate-50 w-20 h-20 -z-0" />
                  <p className="text-slate-700 font-medium leading-relaxed text-lg relative z-10 italic">
                    "{selectedReview.comment || selectedReview.text}"
                  </p>
                </div>

                {selectedReview.images && selectedReview.images.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Review Gallery</h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {selectedReview.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedFullImage(img)}
                          className="aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:scale-105 transition-transform duration-500 cursor-zoom-in group"
                        >
                          <img 
                            src={getImageUrl(img)} 
                            alt={`Review ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:brightness-90 transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Posted on {selectedReview.createdAt ? new Date(selectedReview.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recent"}
                </span>
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all"
                >
                  Close Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Screen Image Lightbox */}
      <AnimatePresence>
        {selectedFullImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFullImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-full max-h-full flex items-center justify-center"
            >
              <img 
                src={getImageUrl(selectedFullImage)} 
                alt="Full Size Review" 
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
              
              <button 
                onClick={() => setSelectedFullImage(null)}
                className="absolute -top-12 right-0 text-white flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Close Image <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">&times;</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showReviewForm && (
        <ReviewForm
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          rating={selectedRating}
          onSubmit={handleReviewSubmit}
          agentId={id}
        />
      )}
    </motion.section>
  );
}

VerifiedReview.propTypes = {
  travelItem: travelItemPropType.isRequired,
  reviewsList: PropTypes.array
};

export default VerifiedReview;
