import { useParams, useLocation } from "react-router-dom";
import ChatHeader from "../../components/common/ChatHeader";
import ChatBottom from "../../components/common/ChatBottom";
import ChatBody from "../../components/common/ChatBody";

function Chat() {
  const { chatId } = useParams();
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="chat">
      {chatId !== "1" ? (
        <>
          <ChatHeader username={state || " "} />
          {/* <h2>Name: {state?.fullName}</h2>
          <p>User email: {state?.email}</p>
          <p>User Id: {userId}</p> */}
          <ChatBody />
          <ChatBottom />
        </>
      ) : (
        <h1 className="chat__empty">Start Your Conversation</h1>
      )}
    </div>
  );
}

export default Chat;
