import { useState, useEffect, useContext } from "react";
import { fetchChats } from "../services/chat";
import { ChatContext } from "../context/chat.context";

function useFetchChats() {
  // const [chats, setChats] = useState([]);
  const { chats, setChats, recentUpdatedUser } = useContext(ChatContext);
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
  }, [recentUpdatedUser, setChats]);

  return { isLoading, chats, setChats };
}

export default useFetchChats;
