import { useEffect, useState } from "react";
// import nameInitials from "name-initials";
import PropTypes from "prop-types";
import { fetchMessages } from "../../services/chat";
import Avatar from "./Avatar";

function NameInitials({ name, userId, handleClick, chat, isHeading = false, socket, profile = null }) {
  const [isLoading, setIsLoading] = useState(false);
  const [latestMsg, setLatestMsg] = useState({});

  const groupMembers = isHeading ? chat?.users.slice(0, 3) : chat?.users.slice(0, 9);

  useEffect(() => {
    setIsLoading(true);
    const fetchChatMessages = async () => {
      try {
        const { data } = await fetchMessages(chat?._id);
        setLatestMsg(data[data?.length - 1]);
        if (data) {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error, "Error from fetching messages in name initials");
        throw new Error(error);
      }
    };
    chat?._id && fetchChatMessages();
  }, [chat?._id === latestMsg?.chat?._id]);

  // useEffect(() => {
  //   if(chat?._id && message && chat?._id === message?.chat?._id){
  //     setLatestMsg(() => {
  //       return message ? message: {};
  //     })
  //   }
  // }, [message && message?._id]);

  useEffect(() => {
    socket &&
      socket.on("save-messsage", function (data) {
        setLatestMsg((prevState) => {
          return {
            ...prevState,
            ...data?.message,
          };
        });
      });
  }, [chat?._id === latestMsg?.chat?._id]);

  return (
    <div className="name__initials" onClick={handleClick || null}>
      <div className="name__initials__wrapper">
        {!chat?.isGroupChat ? (
          <Avatar name={name} size={58} profile={profile} chat={chat} />
        ) : (
          <div className="name__initials__wrapper__group">
            {chat?.users.slice(0, 2).map((user) => {
              return <Avatar key={user?._id} name={user?.fullName} size={32} profile={user?.profileUrl} chat={chat} />;
            })}
            {chat?.users?.length > 2 && (
              <div className="name__initials__wrapper__group__others">{chat?.users?.length - 2}+</div>
            )}
          </div>
        )}
      </div>
      <div className="name__initials__content">
        <p>
          {name
            ? name
            : groupMembers.map((user) => user.fullName.split(" ")[0]).join(", ") +
              (isHeading && chat?.users?.length > 3 ? ", ..." : "")}
        </p>
        {isHeading &&
          (isLoading ? (
            <span>Loading...</span>
          ) : (
            latestMsg &&
            chat?._id === latestMsg?.chat?._id && (
              <span>
                {userId === latestMsg?.sender?._id ? (
                  <strong>You: </strong>
                ) : (
                  <strong>
                    {latestMsg && latestMsg?.chat?.isGroupChat && `${latestMsg?.sender?.fullName.split(" ")[0]}: `}
                  </strong>
                )}
                {latestMsg?.content == "" && latestMsg?.attachment ? "Sent an attachment" : latestMsg?.content}
              </span>
            )
          ))}
      </div>
    </div>
  );
}

NameInitials.propTypes = {
  name: PropTypes.string,
  message: PropTypes.object,
  handleClick: PropTypes.func,
  chat: PropTypes.object,
  userId: PropTypes.string,
  isHeading: PropTypes.bool,
  socket: PropTypes.object,
};

export default NameInitials;
