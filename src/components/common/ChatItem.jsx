import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";

export default function ChatItem({ children, name, profileUrl = null, isSender }) {
  return (
    <div className="chat__item">
      {!isSender && <Avatar name={name} profile={profileUrl} />}
      <div className={`chat__item__content ${isSender && "isSender"}`}>{children}</div>
      {isSender && <Avatar name={name} profile={profileUrl} />}
    </div>
  );
}

ChatItem.propTypes = {
  children: PropTypes.node.isRequired,
  isSender: PropTypes.bool,
  name: PropTypes.string,
};
