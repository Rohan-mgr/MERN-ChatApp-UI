import { useState } from "react";
import ChatContext from "./ChatContext";
import PropTypes from "prop-types";

const ChatState = (props) => {
  const [selectedChat, setSelectedChat] = useState({});

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {props.children}
    </ChatContext.Provider>
  );
};

ChatState.propTypes = {
  children: PropTypes.node,
}

export default ChatState;
