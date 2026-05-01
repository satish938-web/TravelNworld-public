import axios from 'axios';
import { API_BASE } from './api';

/**
 * Upload a file to S3 using a presigned URL (PUT)
 * @param {File} file - The file object to upload
 * @param {String} folder - Target folder on S3 (e.g., 'agents', 'destinations')
 * @returns {Promise<String>} - Returns the S3 file key (path) if successful
 */
export const uploadToS3 = async (file, folder = "uploads") => {
  const apiBase = API_BASE || "";
  
  try {
    console.log(`Requesting upload URL for: ${file.name} in folder: ${folder}`);
    
    // 1. Get presigned URL from our backend
    const { data } = await axios.post(
      `${apiBase}/api/upload/presigned-url`,
      {
        fileName: file.name,
        fileType: file.type,
        folder: folder,
      }
    );

    const { uploadUrl, fileKey } = data;
    console.log("Got presigned URL. Starting direct upload to S3...");

    // 2. Upload file directly to S3 using PUT
    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      // Optional: tracking progress
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload Progress: ${percentCompleted}%`);
      }
    });

    console.log("Upload successful! Key:", fileKey);
    return fileKey;

  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error(error.response?.data?.message || "Failed to upload to S3");
  }
};
