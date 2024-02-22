import { createContext } from "react";
import { startChat } from "../services/chat";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

// export default ChatContext;

import { useState } from "react";
import PropTypes from "prop-types";

export const ChatContextProvider = (props) => {
  const navigate = useNavigate(null);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [showChatDetails, setShowChatDetails] = useState(false);
  const [recentUpdatedUser, setRecentUpdatedUser] = useState({});

  const handleSearchedUserClick = async (userId, userFullName, profileUrl, isGroupChat) => {
    try {
      const response = await startChat(userId);
      const { data } = response;

      if (!data?.isExistedChat) {
        setChats((prevState) => {
          return [data?.fullChat, ...prevState];
        });
        navigate(`/chat/${data?.fullChat?._id}`, {
          state: { name: userFullName, isGroupChat, userId, profile: profileUrl },
        });
      } else {
        const index = chats.findIndex((chat) => chat?._id === data?.chatId);
        const removed = chats.splice(index, 1);
        // Sort the array based on the index
        const updatedChats = removed.concat(chats);
        setChats(updatedChats);

        navigate(`/chat/${data?.chatId}`, {
          state: { name: userFullName, isGroupChat, userId, profile: profileUrl },
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        selectedUser,
        setSelectedUser,
        showChatDetails,
        setShowChatDetails,
        chats,
        setChats,
        users,
        setUsers,
        recentUpdatedUser,
        setRecentUpdatedUser,
        handleSearchedUserClick,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node,
};
