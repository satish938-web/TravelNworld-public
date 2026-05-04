import { useState, useRef, useCallback, useEffect } from "react";
import { uploadToS3 } from "../../../utils/s3Upload";
import { S3_BASE_URL } from "../../../utils/api";

// Convert S3 key to full URL if needed
const toFullUrl = (key) => {
  if (!key) return "";
  const keyStr = String(key);
  if (keyStr.startsWith("http") || keyStr.startsWith("blob:") || keyStr.startsWith("data:")) return keyStr;
  return `${S3_BASE_URL}/${keyStr.startsWith("/") ? keyStr.slice(1) : keyStr}`;
};

/**
 * MediaUploader — drag-and-drop photo/video uploader that uploads
 * files directly to S3 via presigned URLs.
 *
 * Props:
 *   existingUrls  — string[] : URLs/keys already saved (shown as thumbnails on mount)
 *   onChange      — fn(string[]) : called with the full updated URL list after each upload/remove
 *   label         — string  : section heading
 *   maxFiles      — number  : defaults to 10
 *   folder        — string  : S3 folder (default: "agent-media")
 */
const MediaUploader = ({
  existingUrls = [],
  onChange,
  label = "Photos & Videos",
  maxFiles = 10,
  folder = "agent-media",
}) => {
  const [mediaItems, setMediaItems] = useState(() =>
    existingUrls
      .filter(Boolean)
      .map((url) => ({
        url: toFullUrl(url),
        status: "done",
        isVideo: /\.(mp4|mov|avi|webm|mkv)(\?|$)/i.test(String(url)),
      }))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  // Sync when existingUrls prop changes (e.g. after data fetch)
  useEffect(() => {
    const filtered = existingUrls.filter(Boolean);
    if (filtered.length === 0) return;
    setMediaItems(
      filtered.map((url) => ({
        url: toFullUrl(url),
        status: "done",
        isVideo: /\.(mp4|mov|avi|webm|mkv)(\?|$)/i.test(String(url)),
      }))
    );
  }, [JSON.stringify(existingUrls)]);

  const notifyParent = useCallback(
    (items) => {
      onChange && onChange(items.filter((i) => i.status === "done").map((i) => i.url));
    },
    [onChange]
  );

  const uploadFiles = async (rawFiles) => {
    const allowed = Array.from(rawFiles).slice(0, maxFiles - mediaItems.length);
    if (allowed.length === 0) return;

    // Show placeholders immediately
    const placeholders = allowed.map((f) => ({
      url: URL.createObjectURL(f),
      status: "uploading",
      isVideo: f.type.startsWith("video/"),
      name: f.name,
    }));

    setMediaItems((prev) => {
      const next = [...prev, ...placeholders];
      return next;
    });
    setUploading(true);

    try {
      const uploadResults = await Promise.all(
        allowed.map(async (file, index) => {
          try {
            const fileKey = await uploadToS3(file, folder);
            const fullUrl = toFullUrl(fileKey);
            return { index, url: fullUrl, status: "done", isVideo: file.type.startsWith("video/") };
          } catch (err) {
            console.error(`Failed to upload ${file.name}:`, err);
            return {
              index,
              status: "error",
              isVideo: file.type.startsWith("video/"),
              url: URL.createObjectURL(file),
            };
          }
        })
      );

      setMediaItems((prev) => {
        const updated = [...prev];
        // Replace the placeholders (last `allowed.length` items)
        const startIdx = updated.length - allowed.length;
        uploadResults.forEach((res) => {
          updated[startIdx + res.index] = {
            url: res.url,
            status: res.status,
            isVideo: res.isVideo,
          };
        });
        // Notify parent with the new full URL list
        const doneUrls = updated.filter((i) => i.status === "done").map((i) => i.url);
        onChange && onChange(doneUrls);
        return updated;
      });
    } catch (err) {
      console.error("Upload batch failed:", err);
      setMediaItems((prev) =>
        prev.map((i) => (i.status === "uploading" ? { ...i, status: "error" } : i))
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    setMediaItems((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      notifyParent(updated);
      return updated;
    });
  };

  const canAddMore = mediaItems.length < maxFiles;

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="block text-xs font-medium text-gray-700 mb-0.5">{label}</label>
      )}

      {/* Drop Zone */}
      {canAddMore && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-6 py-8 cursor-pointer transition-colors select-none
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => uploadFiles(e.target.files)}
          />
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 12l-4-4-4 4M12 8v8"
            />
          </svg>
          <p className="text-sm text-gray-600 font-medium">
            {isDragging ? "Drop files here" : "Drag & drop or click to upload"}
          </p>
          <p className="text-xs text-gray-400">
            Photos (JPG, PNG, WEBP) and Videos (MP4, MOV, AVI, WEBM) · Max {maxFiles} files · 50
            MB each
          </p>
          {uploading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-xl">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-blue-600 font-medium">Uploading to S3…</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Thumbnails */}
      {mediaItems.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {mediaItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group rounded-lg overflow-hidden border border-gray-200 bg-black aspect-square"
            >
              {item.isVideo ? (
                <video src={item.url} className="w-full h-full object-cover opacity-80" muted />
              ) : (
                <img
                  src={item.url}
                  alt={`media-${idx}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              )}
              {item.status === "uploading" && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {item.status === "error" && (
                <div className="absolute inset-0 bg-red-600/70 flex items-center justify-center text-white text-xs font-medium">
                  Failed
                </div>
              )}
              {item.status === "done" && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                  title="Remove"
                >
                  ✕
                </button>
              )}
              {item.isVideo && (
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                  VIDEO
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        {mediaItems.filter((i) => i.status === "done").length} / {maxFiles} files uploaded
      </p>
    </div>
  );
};

export default MediaUploader;
