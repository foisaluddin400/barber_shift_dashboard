import { useGetProfileQuery } from "../page/redux/api/manageApi";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtect = ({ children }) => {
  const { data: profileData } = useGetProfileQuery();
  const role = profileData?.data?.role;
  const { pathname } = useLocation();

  if (role === "ADMIN") {
    return <Navigate to="/" state={{ from: pathname }} replace />;
  }


  return children;
};

export default AdminProtect;
