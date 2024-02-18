import { useContext } from "react";
import { ChatContext } from "../../context/chat.context";
import NameInitials from "./NameInitials";
import PropTypes from "prop-types";
import { FiMoreHorizontal } from "react-icons/fi";


export default function ChatHeader({ username, profile = null}) {
  const {setShowChatDetails} = useContext(ChatContext);
  return (
    <div className="chat__header">
      <NameInitials name={username} profile={profile}/>
      <div className="chat__header__actions">
        <span className="chat__header__actions__more" onClick={() => setShowChatDetails(prev => !prev)}><FiMoreHorizontal /></span>
      </div>
    </div>
  );
}

ChatHeader.propTypes = {
  username: PropTypes.string.isRequired,
};