import React, { useContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChatContext } from "../../context/chat.context";
import { CSSTransition } from "react-transition-group";
import Avatar from "../../components/common/Avatar";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import UploadProfileModal from "../../components/common/UploadProfileModal";


function ChatDetails() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { showChatDetails } = useContext(ChatContext);
  const chatDetailsRef = useRef(null);
  const {state} = useLocation();

  console.log(state, "state in chat details")

  const handleClose = () => setShowProfileModal(false);
  const handleShow = () => setShowProfileModal(true);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandableOpen, setExpandableOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleExpandable = () => {
    setExpandableOpen(!expandableOpen);
  };

  return (
    <CSSTransition in={showChatDetails} nodeRef={chatDetailsRef} timeout={500} classNames="signup-field" unmountOnExit>
      <div className="chat__details" ref={chatDetailsRef}>
        {showProfileModal && <UploadProfileModal show={showProfileModal} handleProfileModal={handleClose} userId={state?.userId} />}
        <div className="chat__details__profile__container" onClick={handleShow}>
          <Avatar name={state?.name} size={160} user={state?.user}/>
          {!state?.isGroupChat && <div className="profile__camera__icon__wrapper">
            <FaCamera className="profile__camera__icon"/>
          </div>}
          <p>{state?.name}</p>

        </div>

        <div className="chat__details__navigation">
          <div className="chat__details__side-nav">
            <div className="chat__details__side-nav__nav-item">
              <div className="nav-label" onClick={toggleDropdown}>
                Services
                {/* <i className={`fas fa-chevron-${dropdownOpen ? "up" : "down"}`}></i> */}
                {dropdownOpen ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
              </div>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <a href="#">Service 1</a>
                  <a href="#">Service 2</a>
                  <a href="#">Service 3</a>
                </div>
              )}
            </div>
            <div className="chat__details__side-nav__nav-item">
              <div className="nav-label expandable" onClick={toggleExpandable}>
                Products
                {expandableOpen ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowRight />}
              </div>
              {expandableOpen && (
                <div className="expandable-content">
                  <a href="#">Product 1</a>
                  <a href="#">Product 2</a>
                  <a href="#">Product 3</a>
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
