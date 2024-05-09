import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { SocketEmitters, SocketHandlers } from "../utils/socket.utils";
import PropTypes from "prop-types";

export const SocketContext = createContext({});

export const SocketContextProvider = ({ chatId, children, url, token, user }) => {
  const [socket, setSocket] = useState({});
  const [emitters, setEmitters] = useState({});
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
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

      case "activeUsers": {
        let activeUsersList = Object.values(data?.activeUsers);
        activeUsersList = activeUsersList?.filter((u) => u?._id !== user?._id);
        setActiveUsers(activeUsersList);
      }
    }
  }

  const socketHandlers = SocketHandlers(setData);

  useEffect(() => {
    const socket = io.connect(url, {
      query: { token },
    });
    setSocket(socket);

    socket.on("connect", async () => {
      socket.emit("user:join", user);
      Object.entries(socketHandlers).forEach(([eventName, listener]) => {
        socket.on(eventName, listener.bind(socket));
      });
      setEmitters(() => {
        // prevState: setEmitters((_) => {...})
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
        activeUsers,
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
  token: PropTypes.string,
  user: PropTypes.object,
};
