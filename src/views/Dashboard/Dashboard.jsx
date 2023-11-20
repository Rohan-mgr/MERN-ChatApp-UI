import React from "react";
import SideNav from "./SideNav";
import { useParams } from "react-router-dom";
import Main from "./Main";
import { SocketContextProvider } from "../../context/socket.context";
import { _getSecureLs } from "../../utils/storage";


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
        <SideNav />
        <Main />
      </SocketContextProvider>
    </div>
  );
}

export default App;
