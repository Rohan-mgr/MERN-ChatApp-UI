import React from "react";
import SideNav from "./SideNav";
import { useParams } from "react-router-dom";
import Main from "./Main";
import { SocketContextProvider } from "../../context/socket.context";

function App() {
  const { chatId } = useParams();
  return (
    <div className="dashboard">
      <SocketContextProvider
        chatId={chatId}
        url={import.meta.env.VITE_APP_BASE_URL}
      >
        <SideNav />
        <Main />
      </SocketContextProvider>
    </div>
  );
}

export default App;
