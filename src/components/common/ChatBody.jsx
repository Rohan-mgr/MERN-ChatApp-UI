import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/socket.context";
import { fetchMessages } from "../../services/chat";
import { _getSecureLs } from "../../utils/storage";
import ChatItem from "./ChatItem";

export default function ChatBody() {
  const { messages, setMessages } = useContext(SocketContext);
  const { user } = _getSecureLs("auth");
  const { chatId } = useParams();

  console.log(messages, "from context api");

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await fetchMessages(chatId);
        setMessages(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChatMessages();
  }, [chatId]);
console.log(messages);
  return (
    <div className="chat__body">
      {messages?.length > 0 ? (
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
      )}
    </div>
  );
}
