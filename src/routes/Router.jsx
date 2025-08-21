import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";



import Subscription from "../page/Subscription/Subscription";

import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";


import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import About from "../page/Settings/About";
import Login from "../Auth/Login";
import BarberOwner from "../page/barberOwner/BarberOwner";

import { Barber } from "../page/barber/Barber";
import Customer from "../page/customer/Customer";
import BarberDetailsPage from "../page/barber/BarberDetailsPage";
import { BarberOwnerDetails } from "../page/barberOwner/BarberOwnerDetails";
import UserReport from "../page/userReport/UserReport";
import PremiumSubscriber from "../page/premiumSubscriber/PremiumSubscriber";
import Administrator from "../page/administrator/Administrator";
import AdPromotional from "../page/adpromotion/AdPromotional";
import AllShopRegistration from "../components/Dashboard/AllShopRegistration";
import Support from "../page/support/Support";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
       <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/barberOwner",
        element: <BarberOwner></BarberOwner>
      },
      {
        path: "/dashboard/allShop",
        element: <AllShopRegistration></AllShopRegistration>
      },
      {
        path: "/dashboard/barberOwner/barberDetails",
        element: <BarberOwnerDetails></BarberOwnerDetails>
      },
      {
        path: "/dashboard/customer",
        element: <Customer></Customer>
      },
      {
        path: "/dashboard/userReport",
        element: <UserReport></UserReport>
      },
      {
        path: "/dashboard/adPromotion",
        element: <AdPromotional></AdPromotional>
      },

      {
        path: "/dashboard/admin",
        element: <Administrator></Administrator>
      },
      

      {
        path: "/dashboard/premiumSubscribers",
        element: <PremiumSubscriber></PremiumSubscriber>
      },


      {
        path: "/dashboard/barber",
        element: <Barber></Barber>
      },
      {
        path: "/dashboard/barber/barberDetails/:id",
        element: <BarberDetailsPage></BarberDetailsPage>
      },
      {
        path: "/dashboard/Subscription",
        element: <Subscription></Subscription>,
      },
      {
        path: "/dashboard/support",
        element: <Support></Support>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
      {
        path: "/dashboard/Settings/aboutUs",
        element: <About></About>,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
