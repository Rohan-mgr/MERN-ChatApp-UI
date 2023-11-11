import NameInitials from "./NameInitials";
import PropTypes from "prop-types";


export default function ChatHeader({ username }) {
  return (
    <div className="chat__header">
      <NameInitials name={username} />
    </div>
  );
}

ChatHeader.propTypes = {
  username: PropTypes.string.isRequired,
};