import nameInitials from "name-initials";
import PropTypes from "prop-types";

function Avatar({ name, size, profile = null }) {
  return (
    <div className="avatar" style={{ margin: "7px -12px 0", width: `${size || 30}px`, height: `${size || 30}px` }}>
      {/* <span style={{fontSize:`${size && size/2.5}px`}}>{nameInitials(name)}</span> */}

      {/* conditionally render user image or default avatar */}
      {profile !== null && profile !== undefined ? (
        <img src={profile} alt={name} />
      ) : (
        <span className="avatar__name" style={{ fontSize: `${size && size / 2.5}px` }}>
          {nameInitials(name)}
        </span>
      )}
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  isSender: PropTypes.bool,
};

export default Avatar;
