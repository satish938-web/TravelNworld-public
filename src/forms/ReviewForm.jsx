import React, { useState } from "react";
import Swal from "sweetalert2";
import { uploadToS3 } from "../utils/s3Upload";

const tags = [
  "Great service",
  "Quick service",
  "Unprofessional agent",
  "Inefficient service",
  "Hassle-free process",
  "Great recommendations",
];

const ReviewForm = ({ isOpen, onClose, rating, onSubmit, agentId}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [experienceText, setExperienceText] = useState("");
  const [guestName, setGuestName] = useState("");
  const [currentRating, setCurrentRating] = useState(rating || 5);

  if (!isOpen) return null;

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + uploadedImages.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Maximum 5 images allowed",
      });
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };
  const handleSubmit = async () => {
    Swal.fire({
      title: '<span style="color:#2563EB">Submit Review?</span>',
      html: `
        <p><strong>Selected Tags:</strong> ${selectedTags.length ? selectedTags.join(", ") : "None"}</p>
        <p><strong>Uploaded Images:</strong> ${uploadedImages.length}</p>
        <p><strong>Experience:</strong> ${experienceText || "No text provided"}</p>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-lg shadow-lg',
        icon: 'text-orange-600',
        confirmButton: 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
        cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2',
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: 'Uploading...',
            text: 'Please wait while we upload your images',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          // Upload images to S3 first
          const imageKeys = [];
          for (const item of uploadedImages) {
            const folder = agentId ? `agents/${agentId}/reviews/public` : "reviews/public";
            const key = await uploadToS3(item.file, folder);
            imageKeys.push(key);
          }

          if (onSubmit) {
            await onSubmit({
              rating: currentRating,
              userName: guestName,
              tags: selectedTags,
              text: experienceText,
              images: imageKeys,
            });
          }

          Swal.fire({
            icon: 'success',
            title: 'Submitted!',
            text: 'Your review has been submitted.',
            confirmButtonColor: '#2563EB',
          });

          // Reset form
          onClose();
          setSelectedTags([]);
          setUploadedImages([]);
          setExperienceText('');
          setGuestName('');
        } catch (error) {
          console.error("Review submission error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Failed to upload images. Please try again.',
          });
        }
      }
    });
  };




  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 text-xl"
          aria-label="Close review form"
        >
          &times;
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="border rounded p-4 text-center">
            <img
              src="https://via.placeholder.com/60"
              alt="business"
              className="w-16 h-16 mx-auto rounded-md mb-2"
            />
            <h3 className="font-semibold">Sitaaram Travels Pvt Ltd</h3>
            <p className="text-sm text-gray-500">Sadhubela Bhupatwala</p>

            <p className="mt-4 text-sm text-gray-600">
              How would you rate your experience?
            </p>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  onClick={() => setCurrentRating(n)}
                  className={`text-2xl cursor-pointer transition-transform hover:scale-110 ${
                    n <= currentRating ? "text-orange-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm bg-gray-100 inline-block px-3 py-1 rounded-full">
              {currentRating === 3 ? "Average 😐" : currentRating > 3 ? "Good 😊" : "Poor 😞"}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <p className="text-sm font-medium mb-2">
              What did you like and dislike?
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <span
                    key={i}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm cursor-pointer select-none ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>

            <p className="text-sm font-medium mb-1">Your Full Name</p>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none mb-4"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
            />

            <p className="text-sm font-medium mb-1 flex items-center justify-between">
              Tell us about your experience
              <span className="text-blue-500 text-xs cursor-pointer">💡 Tips</span>
            </p>
            <textarea
              rows="4"
              placeholder="Please share your experience..."
              className="w-full border rounded p-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              value={experienceText}
              onChange={(e) => setExperienceText(e.target.value)}
              required
            />

            <p className="mt-4 text-sm font-medium">Upload Photos (max 5)</p>

            <label
              htmlFor="upload"
              className="mt-2 border-2 border-dashed border-blue-300 rounded-md p-4 flex items-center justify-center cursor-pointer text-blue-500 hover:bg-blue-50"
            >
              📷 Upload Photo
              <input
                id="upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Preview selected images */}
            <div className="mt-4 flex flex-wrap gap-3">
              {uploadedImages.map(({ url }, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded overflow-hidden border"
                >
                  <img
                    src={url}
                    alt={`upload-${index}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-bl px-1 text-xs"
                    aria-label={`Remove uploaded image ${index + 1}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white mt-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
