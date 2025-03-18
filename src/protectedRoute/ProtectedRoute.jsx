// import React, { useEffect } from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { Skeleton } from "antd";

// import { useGetSuperAdminQuery } from "../page/redux/api/userApi";

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // const location = useLocation();
  // const navigate = useNavigate(); // Added useNavigate
  // const accessToken = localStorage.getItem("accessToken");

  // if (!accessToken) {
  //   return <Navigate to={"/login"} state={{ from: location }} replace />;
  // }

  // const { data: getUserInfo, isError, isLoading, isSuccess } = useGetSuperAdminQuery(undefined, {
  //   refetchOnMountOrArgChange: true,
  // });

  // useEffect(() => {
  //   if (isError || (!isLoading && !isSuccess) || !getUserInfo?.data || !["admin", "super_admin"].includes(getUserInfo.data.role)) {
  //     navigate("/login", { state: { from: location }, replace: true });
  //   }
  // }, [isError, isLoading, isSuccess, getUserInfo, navigate, location]);

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Skeleton active />
  //     </div>
  //   );
  // }

  // return children;
  
  const {token} = useSelector((state) => state.logInUser)
  console.log(token)
  const { pathname } = useLocation();

  if (!token) {
      return <Navigate to="/login" state={{ path: pathname }}></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
