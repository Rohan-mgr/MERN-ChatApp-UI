import nameInitials from "name-initials";
import PropTypes from "prop-types";


function Avatar({name, size, user}) {
  console.log(user?.profileUrl);
  return (
    <div className="avatar" style={{margin: "7px -12px 0", width: `${size || 30}px`, height: `${size || 30}px`}}>
        {/* <span style={{fontSize:`${size && size/2.5}px`}}>{nameInitials(name)}</span> */}

        {/* conditionally render user image or default avatar */}
        {user?.profileUrl !== null ? <span style={{fontSize:`${size && size/2.5}px`}}>{nameInitials(name)}</span> : <img src={user?.profileUrl} style={{width: '30px', height: '30px'}}/> }
      </div>
  )
}

Avatar.propTypes = {
    name: PropTypes.string,
    isSender: PropTypes.bool,
}

export default Avatar;