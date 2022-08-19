import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const RequireAuth = ({ children }) => {
  const { authStatus } = useSelector((store) => store.authSlice);

  console.log(authStatus);

  if (authStatus) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
