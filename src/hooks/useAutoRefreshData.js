import { useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * Custom hook to auto-refresh agent data at specified intervals
 * Ensures the public profile always reflects the latest admin edits
 */
export const useAutoRefreshData = (
  agentId,
  options = {}
) => {
  const {
    refreshInterval = 30000, // Default 30 seconds for safety
    onDataUpdate = null,
    onError = null,
  } = options;

  const timeoutRef = useRef(null);
  const isRefreshingRef = useRef(false);
  const onDataUpdateRef = useRef(onDataUpdate);
  const onErrorRef = useRef(onError);

  // Sync callbacks to refs
  useEffect(() => {
    onDataUpdateRef.current = onDataUpdate;
    onErrorRef.current = onError;
  }, [onDataUpdate, onError]);

  useEffect(() => {
    if (!agentId) return;

    const fetchUpdatedData = async () => {
      // Prevent overlapping requests
      if (isRefreshingRef.current) return;

      try {
        isRefreshingRef.current = true;
        const apiBase = import.meta.env.VITE_API_BASE || '';
        const response = await axios.get(
          `${apiBase}/api/agents/public/${agentId}?t=${Date.now()}`,
          { timeout: 5000 }
        );

        if (response.data && onDataUpdateRef.current) {
          onDataUpdateRef.current(response.data);
        }
      } catch (error) {
        if (onErrorRef.current) {
          onErrorRef.current(error);
        }
        console.warn('Auto-refresh failed:', error.message);
      } finally {
        isRefreshingRef.current = false;
        // Recursive timeout: only schedule the next one AFTER the current one is done
        timeoutRef.current = setTimeout(fetchUpdatedData, refreshInterval);
      }
    };

    // Start the refresh cycle after the specified interval
    timeoutRef.current = setTimeout(fetchUpdatedData, refreshInterval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [agentId, refreshInterval]);

  const manualRefresh = async () => {
    if (!agentId) return;

    try {
      isRefreshingRef.current = true;
      const apiBase = import.meta.env.VITE_API_BASE || '';
      const response = await axios.get(`${apiBase}/api/agents/public/${agentId}`);

      if (response.data?.data && onDataUpdateRef.current) {
        onDataUpdateRef.current(response.data.data);
      }
      return response.data?.data;
    } catch (error) {
      if (onErrorRef.current) onErrorRef.current(error);
      throw error;
    } finally {
      isRefreshingRef.current = false;
    }
  };

  return {
    manualRefresh,
    isRefreshing: isRefreshingRef.current,
  };
};
