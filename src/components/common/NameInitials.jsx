import { useEffect, useState } from "react";
import nameInitials from "name-initials";
import PropTypes from "prop-types";
import { fetchMessages } from "../../services/chat";

function NameInitials({ name, userId, message, handleClick, chatId, isHeading }) {
  const [isLoading, setIsLoading ] = useState(false);
  const [latestMsg, setLatestMsg] = useState({});
  console.log("latest msg >>>>>>>>>", latestMsg?.sender?.fullName)

  useEffect(() => {
    setIsLoading(true);
    const fetchChatMessages = async () => {
      try {
        const {data} = await fetchMessages(chatId);
        setLatestMsg(data[data?.length - 1]);
        if(data) {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error, "Error from fetching messages in name initials");
        throw new Error(error);
      }
    };
    chatId && fetchChatMessages();
  }, []);

  useEffect(() => {
    if(chatId && message && chatId === message?.chat?._id){
      setLatestMsg(() => {
        return message ? message: {};
      })
    }
  }, [message && message?._id]);

  return (
    <div className="name__initials" onClick={handleClick || null}>
      <div className="name__initials__wrapper">
        <span>{nameInitials(name)}</span>
      </div>
      <div className="name__initials__content">
        <p>{name}</p>
        {isHeading && (isLoading ? <span>Loading...</span> : (latestMsg && <span>{userId === latestMsg?.sender?._id ? <strong>You: </strong>: (<strong>{latestMsg && latestMsg?.chat?.isGroupChat && `${latestMsg && latestMsg?.sender?.fullName.split(" ")[0]}: `}</strong>)}{latestMsg?.content}</span>))}
      </div>
    </div>
  );
}

NameInitials.propTypes = {
  name: PropTypes.string, 
  message: PropTypes.object, 
  handleClick: PropTypes.func, 
  chatId: PropTypes.string,
  userId: PropTypes.string, 
  isHeading: PropTypes.bool,
}

export default NameInitials;
