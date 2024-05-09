import React from "react";
import SideNav from "./SideNav";
import { useParams } from "react-router-dom";
import Main from "./Main";
import { SocketContextProvider } from "../../context/socket.context";
import { ChatContextProvider } from "../../context/chat.context";
import { _getSecureLs } from "../../utils/storage";
import ChatDetails from "./ChatDetails";

function App() {
  const { chatId } = useParams();
  const { user } = _getSecureLs("auth");

  return (
    <div className="dashboard">
      <SocketContextProvider
        chatId={chatId}
        url={import.meta.env.VITE_SOCKET_URL}
        token={import.meta.env.VITE_SOCKET_TOKEN}
        user={user}
      >
        <ChatContextProvider>
          <SideNav />
          <Main />
          <ChatDetails />
        </ChatContextProvider>
      </SocketContextProvider>
    </div>
  );
}

export default App;
