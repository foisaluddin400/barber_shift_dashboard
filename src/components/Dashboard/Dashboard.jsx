import ShopRegistration from "./ShopRegistration";
import { SubscriptionGrowth } from "./SubscriptionGrowth";
import UserGrowth from "./UserGrowth";

const Dashboard = () => {
  return (
    <div className="p-2 min-h-screen">
      <div className="  grid grid-cols-4 gap-4 text-center py-3">
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
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded p-3">
          <SubscriptionGrowth></SubscriptionGrowth>
        </div>
        <div className="bg-white rounded">
          <UserGrowth></UserGrowth>
        </div>
      </div>
      <ShopRegistration></ShopRegistration>
    </div>
  );
};

export default Dashboard;
