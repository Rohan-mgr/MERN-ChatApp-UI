
// import {useContext} from "react";
import nameInitials from "name-initials";
import PropTypes from "prop-types";
// import { ChatContext } from "../../context/chat.context";


function Avatar({name, size}) {
  // const {selectedUser} = useContext(ChatContext);
  return (
    <div className="avatar" style={{margin: "7px -12px 0", width: `${size || 30}px`, height: `${size || 30}px`}}>
        <span style={{fontSize:`${size && size/2.5}px`}}>{nameInitials(name)}</span>

        {/* conditionally render user image or default avatar */}
        {/* {(selectedUser?.profileUrl !== null) && (selectedUser?.profileUrl !== undefined) ? <img src={selectedUser?.profileUrl} alt={selectedUser?.fullName}/> : <span style={{fontSize:`${size && size/2.5}px`}}>{nameInitials(name)}</span> } */}
      </div>
  )
}

Avatar.propTypes = {
    name: PropTypes.string,
    isSender: PropTypes.bool,
}

export default Avatar;