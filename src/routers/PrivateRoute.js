
import { Navigate } from "react-router";

export const PrivateRoute = ({ children, isLoggetIn }) => {
  return isLoggetIn // true | false
          ? children 
          : <Navigate to="/auth" />;
};
