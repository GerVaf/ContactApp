import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }) => {
  const { token } = useSelector((state) => state.userSlice.user);
  if (!token) {
    return <Navigate to={"/login"} />;
  } else {
    return <div>{children}</div>;
  }
};

export default RouteGuard;
