import React, { useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatContext } from "../../context/chat.context";
import { CSSTransition } from "react-transition-group";
import Avatar from "../../components/common/Avatar";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import UploadProfileModal from "../../components/common/UploadProfileModal";
import { SocketContext } from "../../context/socket.context";
import MediaDetails from "../../components/common/MediaDetails";


function ChatDetails() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { messages } = useContext(SocketContext);
  const { showChatDetails } = useContext(ChatContext);
  const chatDetailsRef = useRef(null);
  const {state} = useLocation();

  const handleClose = () => setShowProfileModal(false);
  const handleShow = () => setShowProfileModal(true);
  console.log(messages, "chat details")

  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [filesDropdown, setFilesDropdown] = useState(false);

  const toggleDropdown = () => {
    setMediaDropdown(!mediaDropdown);
  };

  const toggleExpandable = () => {
    setFilesDropdown(!filesDropdown);
  };

  return (
    <CSSTransition in={showChatDetails} nodeRef={chatDetailsRef} timeout={500} classNames="signup-field" unmountOnExit>
      <div className="chat__details" ref={chatDetailsRef}>
        {showProfileModal && <UploadProfileModal show={showProfileModal} handleProfileModal={handleClose} userId={state?.userId} />}
        <div className="chat__details__profile__container" onClick={handleShow}>
          <Avatar name={state?.name} size={160} />
          {!state?.isGroupChat && <div className="profile__camera__icon__wrapper">
            <FaCamera className="profile__camera__icon"/>
          </div>}
          <p>{state?.name}</p>

        </div>

        <div className="chat__details__navigation">
          <div className="chat__details__side-nav">
            <div className="chat__details__side-nav__nav-item">
              <div className="nav-label" onClick={toggleDropdown}>
                Media & Photos
                {mediaDropdown ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
              </div>
              {mediaDropdown && (
                <div className="dropdown">
                  <MediaDetails messages={messages} mediaType="photos" />
                </div>
              )}
            </div>
            <div className="chat__details__side-nav__nav-item">
              <div className="nav-label expandable" onClick={toggleExpandable}>
                Files
                {filesDropdown ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
              </div>
              {filesDropdown && (
                <div className="dropdown">
                    <MediaDetails messages={messages} mediaType="files" />

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default ChatDetails;
