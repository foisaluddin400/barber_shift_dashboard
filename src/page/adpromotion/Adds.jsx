import React from "react";
import { Table, Button, Space, Tooltip } from "antd";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddPromotionModal from "./AddPromotionModal";

const Adds = ({setEditModal}) => {
    
  const columns = [
    {
      title: "S no.",
      dataIndex: "serial",
      key: "serial",
      align: "left",
      render: (text) => <div className="pl-4">{text}</div>,
    },
    {
      title: <div className="text-center">Ads</div>,
      dataIndex: "ads",
      key: "ads",
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex items-start gap-3 bg-gray-100 rounded-md p-2 shadow-sm w-fit">
            <img
              src={record.image}
              alt="Ad"
              className="w-14 h-14 rounded-md object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold leading-tight">Barber time</h4>
              <p className="text-xs text-gray-600 mb-1">Faux hawk</p>
              <span className="text-xs text-gray-500">10/06/24 - 25/06/24</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <div className="text-right pr-4">Action</div>,
      key: "action",
      render: () => (
        <div className="flex justify-end pr-4">
          <Space size="middle">
        
            <button
              onClick={() => setEditModal(true)}
              
              className="bg-[#D17C51] p-2 rounded text-xl text-white"
             
            ><FiEdit2 /></button>
        
       
            <button
            
              className="bg-red-500 p-2 rounded text-xl text-white"
              
            ><RiDeleteBin6Line /></button>
      
        </Space>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      serial: "#12333",
      image: "https://i.ibb.co/LprpYP4/barber.jpg",
    },
    {
      key: "2",
      serial: "#12333",
      image: "https://i.ibb.co/LprpYP4/barber.jpg",
    },
    {
      key: "3",
      serial: "#12333",
      image: "https://i.ibb.co/LprpYP4/barber.jpg",
    },
    {
      key: "4",
      serial: "#12333",
      image: "https://i.ibb.co/LprpYP4/barber.jpg",
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName="border-b border-gray-200"
        scroll={{ x: 600 }} 
      />
      
    </div>
  );
};

export default Adds;
