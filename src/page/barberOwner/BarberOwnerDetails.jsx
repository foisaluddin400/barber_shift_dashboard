import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import { Switch } from "antd";
import { PersonalDetails } from "./PersonalDetails";
import { ShopService } from "./ShopService";
import { BarberTiming } from "./BarberTiming";
import { ShopPhoto } from "./ShopPhoto";

export const BarberOwnerDetails = () => {
  const [selectedTab, setSelectedTab] = useState("personal");
  return (
    <div className="p-1">
      <div>
        <Navigate title={"Clients > Barber Time"}></Navigate>
      </div>
      <div className="">
        <div className="flex justify-end">
        <Switch defaultChecked={true} />
        </div>
        <div className="flex border-b">
          <div
            onClick={() => setSelectedTab("personal")}
            className={` py-2.5   cursor-pointer ${
              selectedTab === "personal"
                ? "border-b border-[#D17C51] text-[#D17C51]  "
                : " "
            }`}
          >
            <div className="flex justify-between px-5">
              <span className="flex gap-2">Personal details</span>
            </div>
          </div>
          <div
            onClick={() => setSelectedTab("shop")}
            className={` py-2.5  cursor-pointer ${
              selectedTab === "shop"
                ? "border-b border-[#D17C51] text-[#D17C51] "
                : " "
            }`}
          >
            <div className="flex justify-between px-5 ">
              <span className="flex gap-2">Shop Services</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedTab("barber")}
            className={` py-2.5  cursor-pointer ${
              selectedTab === "barber"
                ? "border-b border-[#D17C51] text-[#D17C51] "
                : " "
            }`}
          >
            <div className="flex justify-between px-5 ">
              <span className="flex gap-2">Barber timings</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedTab("photo")}
            className={` py-2.5  cursor-pointer ${
              selectedTab === "photo"
                ? "border-b border-[#D17C51] text-[#D17C51] "
                : " "
            }`}
          >
            <div className="flex justify-between px-5 ">
              <span className="flex gap-2">Shop Photos</span>
            </div>
          </div>
        </div>
        
      </div>

      <div className="">
        {selectedTab === "personal" && <div><PersonalDetails></PersonalDetails></div>}
        {selectedTab === "shop" && <div><ShopService></ShopService></div>}

        {selectedTab === "barber" && <div><BarberTiming></BarberTiming></div>}

        {selectedTab === "photo" && <div><ShopPhoto></ShopPhoto></div>}
      </div>
    </div>
  );
};
