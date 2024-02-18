import { useState, useEffect, useContext } from "react";
import { fetchAllUsers } from "../services/user";
import { ChatContext } from "../context/chat.context";

function useFetchUsers() {
  const { users, setUsers } = useContext(ChatContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetchAllUsers();
        setUsers(response?.data?.users);
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [setUsers]);

  return { isLoading, users, setUsers };
}

export default useFetchUsers;
