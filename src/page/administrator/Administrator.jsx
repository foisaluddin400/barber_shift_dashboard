import { Table, Input, Button, Space, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useState } from "react";
import AddAdministrator from "./AddAdministrator";
import EditAdministrator from "./EditAdministrator";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Administrator = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Has Access to",
      dataIndex: "access",
      key: "access",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <button
              onClick={() => setEditModal(true)}
              
              className="bg-[#D17C51] p-2 rounded text-xl text-white"
             
            ><FiEdit2 /></button>
          </Tooltip>
          <Tooltip title="Delete">
            <button
            
              className="bg-red-500 p-2 rounded text-xl text-white"
              
            ><RiDeleteBin6Line /></button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      sl: "#1233",
      name: "Kathryn Murp",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      email: "bockely@att.com",
      contact: "(201) 555-0124",
      access: "User Management",
    },
    {
      key: "2",
      sl: "#1233",
      name: "Devon Lane",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      email: "csilvers@rizon.com",
      contact: "(219) 555-0114",
      access: "Barber owner",
    },
    {
      key: "3",
      sl: "#1233",
      name: "Foysal Rahman",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      email: "qamaho@mail.com",
      contact: "(316) 555-0116",
      access: "User Report",
    },
    {
      key: "4",
      sl: "#1233",
      name: "Hari Danang",
      avatar: "https://randomuser.me/api/portraits/men/15.jpg",
      email: "xterris@gmail.com",
      contact: "(907) 555-0101",
      access: "Review Conversation",
    },
    {
      key: "5",
      sl: "#1233",
      name: "Floyd Miles",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      email: "xterris@gmail.com",
      contact: "(505) 555-0125",
      access: "Bank Transfer, Transaction",
    },
    {
      key: "6",
      sl: "#1233",
      name: "Eleanor Pena",
      avatar: "https://randomuser.me/api/portraits/women/20.jpg",
      email: "xterris@gmail.com",
      contact: "(704) 555-0127",
      access: "Support",
    },
    {
      key: "7",
      sl: "#1233",
      name: "Devon Lane",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      email: "xterris@gmail.com",
      contact: "(219) 555-0114",
      access: "Category Management",
    },
    {
      key: "8",
      sl: "#1233",
      name: "Hari Danang",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      email: "xterris@gmail.com",
      contact: "(270) 555-0117",
      access: "Auction Management",
    },
    {
      key: "9",
      sl: "#1233",
      name: "Hari Danang",
      avatar: "https://randomuser.me/api/portraits/men/91.jpg",
      email: "xterris@gmail.com",
      contact: "(207) 555-0119",
      access: "Barber",
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between mb-4">
        <Navigate title={"Customers"} />
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
      </div>

      <button
        className="bg-[#D17C51] px-5 py-2 text-white rounded mb-4"
        onClick={() => setOpenAddModal(true)}
      >
        + Subscription
      </button>

      <div className="rounded-md overflow-hidden">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName="border-b border-gray-200"
        />
      </div>

      {/* Modals */}
      <AddAdministrator
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
      <EditAdministrator
        editModal={editModal}
        setEditModal={setEditModal}
      />
    </div>
  );
};

export default Administrator;
