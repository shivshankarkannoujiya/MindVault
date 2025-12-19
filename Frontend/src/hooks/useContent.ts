import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const useContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/contents`, {
        withCredentials: true,
      });
      setContents(response.data?.contents || []);
    } catch (error) {
      console.error(`ERROR FETCHING CONTENTS:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { contents, loading, refresh: fetchContent };
};
