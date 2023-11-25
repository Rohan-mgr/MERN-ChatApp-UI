import { createContext } from "react";

export const ChatContext = createContext();

// export default ChatContext;

import { useState } from "react";
import PropTypes from "prop-types";

export const ChatContextProvider = (props) => {
  const [selectedChat, setSelectedChat] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  console.log(selectedChat, "selectedChat");

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat, selectedUser, setSelectedUser }}>
      {props.children}
    </ChatContext.Provider>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node,
}
