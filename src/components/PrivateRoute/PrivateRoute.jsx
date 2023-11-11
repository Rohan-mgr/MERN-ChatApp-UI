import { Navigate } from "react-router-dom";
import { _getSecureLs } from "../../utils/storage";
import PropTypes from "prop-types";

function PrivateRoute({ children }) {
  const { user } = _getSecureLs("auth");
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
