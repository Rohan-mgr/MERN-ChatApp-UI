import { useEffect, useState } from "react";
import nameInitials from "name-initials";
import PropTypes from "prop-types";
import { fetchMessages } from "../../services/chat";

function NameInitials({ name, userId, handleClick, chatId, isHeading, socket }) {
  const [isLoading, setIsLoading ] = useState(false);
  const [latestMsg, setLatestMsg] = useState({});

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
  }, [chatId === latestMsg?.chat?._id]);


  // useEffect(() => {
  //   if(chatId && message && chatId === message?.chat?._id){
  //     setLatestMsg(() => {
  //       return message ? message: {};
  //     })
  //   }
  // }, [message && message?._id]);

  useEffect(()=> {
    socket && socket.on("save-messsage", function (data) {
      setLatestMsg(prevState => {
        return {
          ...prevState, 
          ...data?.message,
        }
      })
    })
  }, [chatId === latestMsg?.chat?._id]);
  console.log(latestMsg,chatId === latestMsg?.chat?._id, "data with socket")

  return (
    <div className="name__initials" onClick={handleClick || null}>
      <div className="name__initials__wrapper">
        <span>{nameInitials(name)}</span>
      </div>
      <div className="name__initials__content">
        <p>{name}</p>
        {isHeading && (isLoading ? <span>Loading...</span> : (latestMsg && chatId === latestMsg?.chat?._id && <span>{userId === latestMsg?.sender?._id ? <strong>You: </strong>: (<strong>{latestMsg && latestMsg?.chat?.isGroupChat && `${latestMsg?.sender?.fullName.split(" ")[0]}: `}</strong>)}{latestMsg?.content}</span>))}
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
  socket: PropTypes.object,
}

export default NameInitials;
