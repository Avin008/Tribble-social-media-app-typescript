import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux-toolkit/hooks";
const RequireAuth = ({ children }: { children: any }) => {
  const { authStatus } = useAppSelector((store) => store.authSlice);

  if (authStatus) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default RequireAuth;
