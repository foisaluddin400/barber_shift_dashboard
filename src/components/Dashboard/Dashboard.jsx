import ShopRegistration from "./ShopRegistration";
import { SubscriptionGrowth } from "./SubscriptionGrowth";
import UserGrowth from "./UserGrowth";

const Dashboard = () => {
  return (
    <div className="p-1 min-h-screen">
      <div className=" grid md:grid-cols-4 grid-cols-2 gap-4 text-center py-3">
        <div className="bg-white py-6 rounded-md">
          <p className="text-[#2E4CB9] mt-3 text-sm">Total Customer</p>
          <h1 className="text-3xl font-bold">123</h1>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <h1 className="text-3xl font-bold">9</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total Services</p>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <h1 className="text-3xl font-bold">9</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total Services</p>
        </div>
        <div className=" bg-white py-6 rounded-md">
          <h1 className="text-3xl font-bold">9</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total Services</p>
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
