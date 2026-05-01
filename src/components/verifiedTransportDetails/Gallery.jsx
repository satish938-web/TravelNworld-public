import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, Upload, ArrowRight, Maximize2, Play, X, Loader2, CloudUpload, CheckCircle2 } from "lucide-react";
import axios from 'axios';
import ImageGallery from '../ImageGallery';
import VideoGallery from '../VideoGallery';
import travelItemPropType from '../../propTypes/travelItemPropType.js';
import { API_BASE } from '../../utils/api';
import { getImageUrl } from '../../utils/api';
import { uploadToS3 } from '../../utils/s3Upload';
import { toast } from 'react-hot-toast';

/**
 * Enhanced Public Drag & Drop Uploader (Supports Multiple Files)
 */
const PublicUploader = ({ agentId, onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadProgress(0);

    let successCount = 0;
    const totalFiles = files.length;

    try {
      const apiBase = API_BASE || "";
      
      // Upload each file to S3
      for (let i = 0; i < totalFiles; i++) {
        try {
          const file = files[i];
          const fileKey = await uploadToS3(file, `agents/${agentId}/gallery/public`);
          
          // Save the S3 key to Agent Gallery via backend
          await axios.post(`${apiBase}/api/agents/public/${agentId}/photos`, {
            url: fileKey
          });
          
          successCount++;
          setUploadProgress(((i + 1) / totalFiles) * 100);
        } catch (fileErr) {
          console.error(`Failed to upload file ${i + 1}:`, fileErr);
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully shared ${successCount} memories with the community!`);
        if (onUploadSuccess) onUploadSuccess();
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Critical Upload failure", err);
      toast.error("Something went wrong during upload.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div 
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`relative w-full border-2 border-dashed rounded-[2.5rem] p-8 transition-all flex flex-col items-center justify-center text-center cursor-pointer group h-full min-h-[300px]
        ${dragActive ? "border-red-500 bg-red-50/50 scale-[1.02]" : "border-slate-200 bg-slate-50/30 hover:bg-white hover:border-red-400 hover:shadow-2xl hover:shadow-red-900/5"}
        ${isUploading ? "pointer-events-none" : ""}`}
    >
      <input 
        type="file" 
        id="public-upload" 
        multiple
        className="hidden" 
        onChange={(e) => handleFiles(e.target.files)}
        accept="image/*,video/*"
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center gap-5 w-full">
           <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
              <motion.div 
                className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-black text-red-600 text-xs">
                 {Math.round(uploadProgress)}%
              </div>
           </div>
           <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] animate-pulse">Uploading Memories...</p>
        </div>
      ) : (
        <label htmlFor="public-upload" className="cursor-pointer w-full flex flex-col items-center gap-4">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm group-hover:bg-premium-gradient group-hover:text-white transition-all duration-500 group-hover:-translate-y-1">
              <CloudUpload size={28} />
           </div>
           <div>
              <h3 className="text-lg font-black text-slate-900 mb-1 tracking-tight">Got Media?</h3>
              <p className="text-slate-500 font-medium text-[11px] leading-relaxed max-w-[200px] mx-auto">Click or drag to share your trip photos and videos with us.</p>
           </div>
           <div className="mt-2">
              <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest group-hover:bg-premium-gradient transition-colors shadow-lg">
                 Add Files <Upload size={12} />
              </span>
           </div>
        </label>
      )}
    </div>
  );
};

function Gallery({ travelItem }) {
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(null);
  const [isVideoGalleryOpen, setIsVideoGalleryOpen] = useState(false);

  // RIGOROUS FILTERING for "Preview" and broken items
  const filteredImages = (travelItem.images || []).filter(src => 
    src && 
    typeof src === 'string' && 
    !src.toLowerCase().includes('preview')
  );
  
  const filteredVideos = (travelItem.videos || []).filter(src => 
    src && 
    typeof src === 'string' && 
    !src.toLowerCase().includes('preview')
  );

  const allMedia = [
    ...filteredImages.map(src => ({ type: 'image', src })),
  ];

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[2px] bg-red-600 rounded-full" />
            <span className="text-red-600 font-black uppercase tracking-[0.2em] text-[10px]">Community Feed</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Guest Memories & Photos</h2>
          <p className="text-slate-500 text-sm font-medium mt-1">Real travel moments captured by our happy guests</p>
        </div>
        
        <button
          onClick={() => setIsImageGalleryOpen(true)}
          className="group px-7 py-2.5 bg-premium-gradient text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-red-200 active:scale-95 flex items-center gap-3"
        >
          Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>



        {/* Modern Horizontal Marquee Gallery */}
      <div className="relative w-full overflow-hidden mt-6">


        <div className="flex animate-marquee hover:pause whitespace-nowrap gap-4 py-2">
          {allMedia.length > 0 ? (
            [...allMedia, ...allMedia, ...allMedia].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: 1, zIndex: 10 }}
                className="relative w-[180px] sm:w-[280px] aspect-video rounded-2xl overflow-hidden shadow-xl border-2 border-white cursor-pointer group flex-shrink-0 transition-shadow hover:shadow-2xl hover:shadow-red-500/20"
                onClick={() => {
                  setInitialIndex(idx % allMedia.length);
                  setIsImageGalleryOpen(true);
                }}
              >
                {item.type === 'image' ? (
                  <img 
                    src={getImageUrl(item.src)} 
                    alt="Guest Memory" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : null}
                
                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                   <motion.div 
                     initial={{ y: 10, opacity: 0 }}
                     whileHover={{ y: 0, opacity: 1 }}
                     className="flex items-center gap-2 text-white"
                   >
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Camera size={14} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">View Memory</span>
                   </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="w-full min-h-[150px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-6 text-center mx-auto">
               <Camera size={24} className="text-slate-300 mb-2" strokeWidth={1} />
               <h3 className="text-sm font-black text-slate-900">Gallery Waiting</h3>
            </div>
          )}
        </div>
      </div>



      <ImageGallery
        travelItem={travelItem}
        isOpen={isImageGalleryOpen}
        setIsOpen={setIsImageGalleryOpen}
        initialIndex={initialIndex}
      />
      {/* <VideoGallery
        travelItem={travelItem}
        isOpen={isVideoGalleryOpen}
        setIsOpen={setIsVideoGalleryOpen}
      /> */}
    </motion.section>
  );
}

Gallery.propTypes = {
  travelItem: travelItemPropType.isRequired,
};

export default Gallery;

