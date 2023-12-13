import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

const PrivateRoute = ({ component: Component }: { component: React.ElementType }) => {
  const { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
