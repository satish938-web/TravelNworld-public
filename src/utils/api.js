const rawApiBase = import.meta.env.VITE_API_BASE;
export const API_BASE = (rawApiBase && rawApiBase !== "undefined" && rawApiBase !== "null")
    ? rawApiBase
    : "http://localhost:5000"; // Standard default for local development

export const USE_BACKEND = Boolean(API_BASE);

export const S3_BASE_URL = import.meta.env.VITE_CDN_BASE_URL || "https://media.travelnworld.com";

/**
 * Transforms an S3 key into a full URL if it's not already an absolute URL.
 * @param {string} src - The image source (key or full URL)
 * @returns {string} - The full URL
 */
export const getImageUrl = (src) => {
  if (!src) return "";
  if (typeof src !== "string") return "";
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("blob:")) return src;
  return `${S3_BASE_URL}/${src.startsWith("/") ? src.slice(1) : src}`;
};


export async function getJson(path) {
	const res = await fetch(`${API_BASE}${path}`, {
        // Add cache-busting headers to prevent showing stale data
        cache: 'no-store',
    });
	if (!res.ok) throw new Error(`Request failed: ${res.status}`);
	return res.json();
}

export async function postJson(path, body, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body || {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}

export async function putJson(path, body, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body || {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}

export async function deleteJson(path, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'DELETE',
        headers,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}

export async function getJsonWithAuth(path, options = {}) {
    const token = localStorage.getItem('twz_auth_token');
    const headers = { 
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(options.headers || {}) 
    };
    const res = await fetch(`${API_BASE}${path}`, { 
        headers,
        // Add cache-busting headers to prevent showing stale data
        cache: 'no-store',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = data?.message || `Request failed: ${res.status}`;
        throw new Error(message);
    }
    return data;
}

/**
 * Normalize HTML content from editors
 * Ensures proper rendering of spaces and special characters
 */
export const normalizeHtmlContent = (html) => {
    if (!html) return '';
    let normalized = html;
    // Replace common double-escapes
    normalized = normalized.replace(/&amp;nbsp;/g, '&nbsp;');
    normalized = normalized.replace(/&amp;lt;/g, '&lt;');
    normalized = normalized.replace(/&amp;gt;/g, '&gt;');
    normalized = normalized.replace(/&amp;quot;/g, '&quot;');
    normalized = normalized.replace(/&amp;#/g, '&#');
    return normalized;
};
