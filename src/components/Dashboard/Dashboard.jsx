import ShopRegistration from "./ShopRegistration";
import { SubscriptionGrowth } from "./SubscriptionGrowth";
import UserGrowth from "./UserGrowth";
import logo1 from '../../assets/header/mm.png'
import logo2 from '../../assets/header/pp.png'
import logo3 from '../../assets/header/qq.png'
import logo4 from '../../assets/header/hh.png'
import logo5 from '../../assets/header/pp.png'
import { useGetDasboardQuery } from "../../page/redux/api/manageApi";
const Dashboard = () => {
  const {data:dashboardData} = useGetDasboardQuery()
  console.log(dashboardData)
  return (
    <div className="p-1 min-h-screen">
      <div className=" grid md:grid-cols-4 grid-cols-2 gap-4 text-center py-3">
        <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Total Customer</p>
          <div className="flex justify-center my-2">
            <img src={logo1} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboardData?.data?.customerCount || '0'}</h1>
        </div>
        <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Total Barber Owners</p>
          <div className="flex justify-center my-2">
            <img src={logo3} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboardData?.data?.barberCount || '0'}</h1>
        </div>
         <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Total Income</p>
          <div className="flex justify-center my-2">
            <img src={logo2} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboardData?.data?.customerCount || '0'}</h1>
        </div>
         <div className="bg-white py-6 rounded-md">
          <p className=" mt-3 text-xl">Total Subscribers</p>
          <div className="flex justify-center my-2">
            <img src={logo4} alt="" />
          </div>
          <h1 className="text-3xl font-bold">{dashboardData?.data?.customerCount || '0'}</h1>
        </div>
       
      </div>
      <div className="lg:grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded md:p-3">
          <SubscriptionGrowth></SubscriptionGrowth>
        </div>
        <div className="bg-white rounded mt-3 lg:mt-0">
          <UserGrowth></UserGrowth>
        </div>
      </div>
      <ShopRegistration></ShopRegistration>
    </div>
  );
};

export default Dashboard;
