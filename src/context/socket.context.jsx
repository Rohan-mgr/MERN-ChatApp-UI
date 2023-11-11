import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { SocketEmitters, SocketHandlers } from "../utils/socket.utils";
import PropTypes from "prop-types";

export const SocketContext = createContext({});

export const SocketContextProvider = ({ chatId, children, url }) => {
  const [socket, setSocket] = useState({});
  const [emitters, setEmitters] = useState({});
  const [messages, setMessages] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  function setData(type, data) {
    switch (type) {
      case "message":
        if (!chatId || chatId === data?.message?.chat?._id) {
          setMessages((prevState) => [...prevState, data?.message]);
        } else {
          return null;
        }
        break;
    }
  }

  const socketHandlers = SocketHandlers(setData);

  useEffect(() => {
    const socket = io.connect(url);
    setSocket(socket);

    socket.on("connect", async () => {
      Object.entries(socketHandlers).forEach(([eventName, listener]) => {
        socket.on(eventName, listener.bind(socket));
      });
      setEmitters(() => { // prevState: setEmitters((_) => {...})
        return new SocketEmitters(socket);
      });
    });

    return () => {
      socket.close();
    };
  }, [chatId]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        emitters,
        messages,
        setMessages,
        searchedUsers,
        setSearchedUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  chatId: PropTypes.string, 
  children: PropTypes.node, 
  url: PropTypes.string,
}
