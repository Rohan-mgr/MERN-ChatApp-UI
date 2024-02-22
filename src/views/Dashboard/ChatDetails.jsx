import React, { useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatContext } from "../../context/chat.context";
import { CSSTransition } from "react-transition-group";
import Avatar from "../../components/common/Avatar";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { SocketContext } from "../../context/socket.context";
import NameInitials from "../../components/common/NameInitials";
import MediaDetails from "../../components/common/MediaDetails";

function ChatDetails() {
  const { messages } = useContext(SocketContext);
  const { showChatDetails, handleSearchedUserClick } = useContext(ChatContext);
  const chatDetailsRef = useRef(null);
  const { state } = useLocation();

  const [mediaDropdown, setMediaDropdown] = useState(false);
  const [filesDropdown, setFilesDropdown] = useState(false);
  const [membersDropdown, setMembersDropdown] = useState(false);

  const toggleDropdown = () => {
    setMediaDropdown(!mediaDropdown);
  };

  const toggleExpandable = () => {
    setFilesDropdown(!filesDropdown);
  };

  const toggleMembersDropdown = () => {
    setMembersDropdown(!membersDropdown);
  };

  return (
    <CSSTransition in={showChatDetails} nodeRef={chatDetailsRef} timeout={500} classNames="signup-field" unmountOnExit>
      <div className="chat__details" ref={chatDetailsRef}>
        <div className="chat__details__profile__container">
          {!state?.isGroupChat ? (
            <Avatar name={state?.name} size={160} profile={state?.profile} isGroupChat={state?.isGroupChat} />
          ) : (
            <div className="chat__details__profile__container__group">
              {state?.chat?.users.slice(0, 2).map((user) => {
                return <Avatar key={user?._id} name={user?.fullName} size={75} profile={user?.profileUrl} />;
              })}
              {state?.chat?.users?.length > 2 && (
                <div className="chat__details__profile__container__group__others">
                  {state?.chat?.users?.length - 2}+
                </div>
              )}
            </div>
          )}

          <p>
            {state?.name
              ? state?.name
              : state?.chat?.users
                  .slice(0, 3)
                  ?.map((user) => user.fullName.split(" ")[0])
                  .join(", ") + ", ..."}
          </p>
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

            {state?.isGroupChat && (
              <div className="chat__details__side-nav__nav-item">
                <div className="nav-label" onClick={toggleMembersDropdown}>
                  Chat Members
                  {membersDropdown ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
                </div>
                {membersDropdown && (
                  <div className="dropdown">
                    {state?.chat?.users?.map((user) => {
                      return (
                        <NameInitials
                          key={user?._id}
                          handleClick={() => {
                            handleSearchedUserClick(user?._id, user?.fullName, user?.profileUrl, user?.isGroupChat);
                          }}
                          name={user?.fullName}
                          profile={user?.profileUrl}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default ChatDetails;
