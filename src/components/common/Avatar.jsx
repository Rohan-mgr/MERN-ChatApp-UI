import nameInitials from "name-initials";
// import fbImg from "../../assets/images/fb.jpg";
import PropTypes from "prop-types";


function Avatar({name, isSender}) {
  return (
    <div className="avatar" style={isSender ? {marginLeft: '-12px'}:{marginRight: '-12px'}}>
        <span>{nameInitials(name)}</span>

        {/* conditionally render user image or default avatar */}
        {/* {true ? <span>{nameInitials(name)}</span> : <img src={fbImg} style={{width: '30px', height: '30px'}}/> } */}
      </div>
  )
}

Avatar.propTypes = {
    name: PropTypes.string,
    isSender: PropTypes.bool,
}

export default Avatar;