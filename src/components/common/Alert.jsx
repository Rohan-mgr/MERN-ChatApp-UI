// import { useState } from "react";
import PropTypes from "prop-types";
export default function Alert({
  alertTitle,
  alertDescription,
  type,
  hideAlertBox,
  handleClose,
}) {
  //   const [hideAlertBox, sethideAlertBox] = useState(false);
  let symbolType = "";
  if (type === "success") {
    symbolType = "checkmark";
  } else if (type === "error") {
    symbolType = "close";
  } else {
    symbolType = "alert";
  }
  const hideAlertBoxCss = {
    display: "none",
  };
  return (
    <div
      style={
        !hideAlertBox || alertTitle === "" || alertDescription === ""
          ? hideAlertBoxCss
          : null
      }
      className={`alert-box alert-box-${type}`}
    >
      <div className="alert-symbol-description">
        <div className={`alert-symbol alert-symbol-${type}`}>
          <ion-icon name={`${symbolType}-outline`}></ion-icon>
        </div>
        <div className="alert-box-message">
          <p>{alertTitle}</p>
          <p>{alertDescription}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleClose}
        className={`alert-close-btn alert-close-btn-${type}`}
      >
        <ion-icon name="close-outline"></ion-icon>
      </button>
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  alertTitle: PropTypes.string.isRequired,
  alertDescription: PropTypes.string.isRequired,
  hideAlertBox: PropTypes.bool,
  handleClose: PropTypes.func,
};
