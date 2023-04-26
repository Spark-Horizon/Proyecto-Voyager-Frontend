import {  Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

export function PrivateRoute({ logged, children, link }) {
  const { currentUser } = useAuth();
  if(logged){
    return currentUser ? children : <Navigate to={link} />;
  } else{
    return !currentUser ? children : <Navigate to={link} />;
  }
}