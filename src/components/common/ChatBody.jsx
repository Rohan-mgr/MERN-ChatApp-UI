import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/socket.context";
import { fetchMessages } from "../../services/chat";
import { _getSecureLs } from "../../utils/storage";
import BeatLoader from "react-spinners/BeatLoader";
import RenderMsg from "./MessageRenderer";



export default function ChatBody() {
  const { messages, setMessages } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);
  const { user } = _getSecureLs("auth");
  const { chatId } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchChatMessages = async () => {
      try {
        const response = await fetchMessages(chatId);
        if(response) {
          setLoading(false);
        }
        setMessages(response?.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchChatMessages();
  }, [chatId]);
  return (
    <div className="chat__body">
      { !loading ? messages?.length > 0 ? (
        messages
          .slice()
          .reverse()
          .map((m) => {
            return <RenderMsg key={m?._id} msg = {m} user={user} />;
          })
      ) : (
        <p style={{ textAlign: "center" }}>Say hi 🖐</p>
      ): <div className="chat__body__loader">
            <BeatLoader color="#0D6EFD" />
      </div>
}
    </div>
  );
}
