import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Navigate } from "react-router";


const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default Private;
