import { useState, useEffect } from 'react';
import { API_BASE, getImageUrl } from '../utils/api';

/**
 * Fetches the hero media for a given page from the backend.
 * @param {string} page - Page name matching the admin dashboard entry (e.g. "About", "Packages")
 * @returns {{ mediaUrl: string|null, isVideo: boolean, loading: boolean }}
 */
export const usePageHero = (page) => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!page) { setLoading(false); return; }
    
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hero-videos?page=${page}`);
        if (res.ok) {
          const data = await res.json();
          const active = (data.data || [])
            .filter(v => v.isActive !== false)
            .sort((a, b) => (a.order || 0) - (b.order || 0))[0];
          if (active?.url) setMediaUrl(getImageUrl(active.url));
        }
      } catch {
        // silently fall back to static content
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [page]);

  const isVideo = !!mediaUrl && (
    mediaUrl.endsWith('.mp4') || mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.ogg')
  );

  return { mediaUrl, isVideo, loading };
};
