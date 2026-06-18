import { Navigate } from "react-router";
import PropTypes from "prop-types";
export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};