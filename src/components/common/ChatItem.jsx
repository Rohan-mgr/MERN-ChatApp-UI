import React from "react";
import PropTypes from "prop-types";


export default function ChatItem({ children, isSender }) {
  return (
    <div className={`chat__item ${isSender && "isSender"}`}>{children}</div>
  );
}

ChatItem.propTypes = {
  children: PropTypes.node.isRequired,
  isSender: PropTypes.bool
};