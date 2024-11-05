import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import api from "../store/api";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const response = await api.get(`${contentType}/trending`);
        
        // Handle single movie response
        if (response.success && response.content) {
          // If you expect a single movie, wrap it in an array
          setTrendingContent([response.content]);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error("Error fetching trending content:", error);
        setTrendingContent(null);
      }
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;