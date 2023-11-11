import PropTypes from "prop-types";

function Button({ type, children, handleClick }) {
  return (
    <button type={type} className="primary" onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default Button;
