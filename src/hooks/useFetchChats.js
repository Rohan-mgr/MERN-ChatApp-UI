import { useState, useEffect } from "react";
import { fetchChats } from "../services/chat";

function useFetchChats() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllChats = async () => {
      setIsLoading(true);
      try {
        const response = await fetchChats();
        setChats(response?.data);
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getAllChats();
  }, []);

  return { isLoading, chats, setChats };
}

export default useFetchChats;
