import { useEffect, useState } from "react";
import nameInitials from "name-initials";
import PropTypes from "prop-types";

function NameInitials({ name, message, handleClick }) {
  console.log(name);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    setMsg(message);
  }, [msg]);
  return (
    <div className="name__initials" onClick={handleClick || null}>
      <div className="name__initials__wrapper">
        <span>{nameInitials(name)}</span>
      </div>
      <div className="name__initials__content">
        <p>{name}</p>
        {msg && <span>{msg}</span>}
      </div>
    </div>
  );
}

NameInitials.propTypes = {
  name: PropTypes.string, 
  message: PropTypes.string, 
  handleClick: PropTypes.func
}

export default NameInitials;
