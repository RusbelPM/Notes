
import { Navigate } from "react-router"


export const PublicRoute = ({children, isLoggetIn}) => {

  return isLoggetIn // true | false
  ? <Navigate to="/"/>
  : children
  
}
