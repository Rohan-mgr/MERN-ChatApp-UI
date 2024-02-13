import { createContext } from "react";

export const ChatContext = createContext();

// export default ChatContext;

import { useState } from "react";
import PropTypes from "prop-types";

export const ChatContextProvider = (props) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [showChatDetails, setShowChatDetails] = useState(false);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat, selectedUser, setSelectedUser, showChatDetails, setShowChatDetails, chats, setChats }}>
      {props.children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node,
}
