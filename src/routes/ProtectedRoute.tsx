import { Navigate, useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

export const ProtectedRoute = ({
  isAuthenticated,
  children,
}: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return children;
};
