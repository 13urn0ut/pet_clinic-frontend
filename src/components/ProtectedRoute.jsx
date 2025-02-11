import { useContext } from "react";
import { Outlet, Navigate } from "react-router";
import UserContext from "../contexts/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? children : <Navigate to="/login" />}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
