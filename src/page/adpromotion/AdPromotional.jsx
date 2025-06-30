import React, { useState } from "react";
import { Navigate } from "../../Navigate";
import Adds from "./Adds";
import VideosAdd from "./VideosAdd";
import AddPromotionModal from "./AddPromotionModal";
import EditPromotionModal from "./EditPromotionModal";

const AdPromotional = () => {
  const [selectedTab, setSelectedTab] = useState("personal");
  const [editModal, setEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex ">
          <Navigate title={"Ad Promotion"}></Navigate>
    
        </div>
        <button
        onClick={() => setOpenAddModal(true)}
          className="bg-[#D17C51] px-5 py-2 text-white rounded"
          // onClick={() => setOpenAddModal(true)}
        >
          + Adds
        </button>
      </div>
      <div className="flex gap-4">
        <div
          onClick={() => setSelectedTab("personal")}
          className={` py-2 px-5 border rounded border-[#D17C51]  cursor-pointer ${
            selectedTab === "personal" ? " bg-[#D17C51] text-white  " : " "
          }`}
        >
          <div className="flex justify-between px-5">
            <span className="flex gap-2">Ads</span>
          </div>
        </div>
        <div
          onClick={() => setSelectedTab("photo")}
          className={` py-2 px-5 border rounded border-[#D17C51]  cursor-pointer ${
            selectedTab === "photo" ? "bg-[#D17C51] text-white " : " "
          }`}
        >
          <div className="flex justify-between px-5">
            <span className="flex gap-2">Videos</span>
          </div>
        </div>
      </div>
      {selectedTab === "personal" && (
        <div>
          <Adds setEditModal={setEditModal}></Adds>
        </div>
      )}

      {selectedTab === "photo" && (
        <div>
          <VideosAdd></VideosAdd>
        </div>
      )}

      <AddPromotionModal setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}></AddPromotionModal>
        <EditPromotionModal  editModal={editModal}
        setEditModal={setEditModal}></EditPromotionModal>
    </div>
  );
};

export default AdPromotional;
