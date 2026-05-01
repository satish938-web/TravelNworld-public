import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { uploadToS3 } from "../../utils/s3Upload"; // corrected import

// Helper: generate a simple thumbnail preview (first frame) – using video element URL
const VideoThumbnail = ({ url }) => (
  <video src={url} className="w-full h-32 object-cover" muted preload="metadata" />
);

const HeroVideoManagement = () => {
  const API_BASE = import.meta.env.VITE_API_BASE || "";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [form, setForm] = useState({ title: "", order: "", isActive: true, file: null });

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/hero-videos`);
      setVideos(data?.data || []);
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Failed to load videos" });
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openAddModal = () => {
    setEditMode(false);
    setCurrentVideo(null);
    setForm({ title: "", order: "", isActive: true, file: null });
    setShowModal(true);
  };

  const openEditModal = (video) => {
    setEditMode(true);
    setCurrentVideo(video);
    setForm({ title: video.title, order: video.order, isActive: video.isActive, file: null });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`${API_BASE}/api/hero-videos/${id}`);
      Swal.fire({ icon: "success", title: "Deleted" });
      fetchVideos();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Delete failed" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let videoUrl = currentVideo?.url;
      if (form.file) {
        // upload to S3 first
        const uploaded = await uploadFileToS3(form.file);
        videoUrl = uploaded?.Location || uploaded?.url || uploaded;
      }

      const payload = {
        title: form.title,
        order: Number(form.order),
        url: videoUrl,
        isActive: form.isActive,
      };

      if (editMode) {
        await axios.put(`${API_BASE}/api/hero-videos/${currentVideo._id}`, payload);
        Swal.fire({ icon: "success", title: "Updated" });
      } else {
        await axios.post(`${API_BASE}/api/hero-videos`, payload);
        Swal.fire({ icon: "success", title: "Created" });
      }
      setShowModal(false);
      fetchVideos();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Save failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Hero Video Management</h1>
      <button
        onClick={openAddModal}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        + Add New Video
      </button>

      {/* Grid of video cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v._id} className="bg-white rounded shadow overflow-hidden">
            <VideoThumbnail url={v.url} />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{v.title}</h2>
              <p className="text-sm text-gray-600">Order: {v.order}</p>
              <p className="text-sm text-gray-600">Status: {v.isActive ? "Active" : "Inactive"}</p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => openEditModal(v)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(v._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Video" : "Add New Video"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  value={form.order}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Active</label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Video File {editMode ? "(optional)" : ""}</label>
                <input type="file" name="file" accept="video/*" onChange={handleChange} className="w-full" />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroVideoManagement;
