import PropTypes from "prop-types";

export default function InputField({
  type,
  placeholder,
  handleChange,
  value,
  errorMsg,
  name,
  handleBlur,
  refEl,
}) {
  return (
    <div>
      <input
        className={`${errorMsg ? "inputRedBorder" : ""}`}
        type={type}
        ref={refEl}
        name={name}
        placeholder={placeholder || " "}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      ></input>
      {errorMsg && <p className="errorMessage">{errorMsg}</p>}
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
};
