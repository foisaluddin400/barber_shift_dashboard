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
      <div className="md:flex justify-between">
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
          className={` py-2 px-5  cursor-pointer ${
            selectedTab === "personal" ? "  text-white  " : " "
          }`}
        >
        </div>
        
      </div>
      {selectedTab === "personal" && (
        <div>
          <Adds ></Adds>
        </div>
      )}

      {selectedTab === "photo" && (
        <div>
          <VideosAdd></VideosAdd>
        </div>
      )}

      <AddPromotionModal setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}></AddPromotionModal>
        
    </div>
  );
};

export default AdPromotional;
