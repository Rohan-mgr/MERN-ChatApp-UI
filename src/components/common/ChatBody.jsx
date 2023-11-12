import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/socket.context";
import { fetchMessages } from "../../services/chat";
import { _getSecureLs } from "../../utils/storage";
import ChatItem from "./ChatItem";
import BeatLoader from "react-spinners/BeatLoader";


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
            console.log(m);
            return (
              <React.Fragment key={m?._id}>
                <p
                  style={{
                    textAlign: user?._id === m?.sender?._id ? "right" : "left",
                  }}
                >
                  {m?.sender?.fullName}
                </p>
                <ChatItem
                  key={m?._id}
                  isSender={user?._id === m?.sender?._id ? true : false}
                >
                  {m?.content}
                </ChatItem>
              </React.Fragment>
            );
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
