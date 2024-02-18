import { createContext } from "react";

export const ChatContext = createContext();

// export default ChatContext;

import { useState } from "react";
import PropTypes from "prop-types";

export const ChatContextProvider = (props) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [showChatDetails, setShowChatDetails] = useState(false);
  const [recentUpdatedUser, setRecentUpdatedUser] = useState({});
  console.log(users)

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat, selectedUser, setSelectedUser, showChatDetails, setShowChatDetails, chats, setChats, users, setUsers, recentUpdatedUser, setRecentUpdatedUser}}>
      {props.children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node,
}
