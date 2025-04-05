import { Table, Switch, Tag, Input, Button, Dropdown, Space } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { TbFilter } from "react-icons/tb";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AddSubscriptionModal } from "./AddSubscriptionModal";
import { EditSubscriptionModal } from "./EditSubscriptionModal";

const Subscription = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const items = [
    {
      label: (
        <button target="_blank" rel="noopener noreferrer">
          Blocked
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <button target="_blank" rel="noopener noreferrer">
          Active
        </button>
      ),
      key: "1",
    },
    {
      label: (
        <button target="_blank" rel="noopener noreferrer">
          All Customers
        </button>
      ),
      key: "2",
    },
  ];

  const handleEdit = (record) => {
    setEditModal(true);
  };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Subscription Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Deration",
      dataIndex: "deration",
      key: "deration",
    },
    {
      title: "Subscription Fee",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <button
            onClick={() => handleEdit(record)}
            shape="circle"
            className="  rounded text-[#AB684D]"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: "01",
      name: "Barber Time",
      description: "View ",
      deration: "Monthly",
      fee: "$09.00 ",
    },
    {
      id: "02",
      name: "Barber Time",
      description: "View ",
      deration: "Monthly",
      fee: "$09.00 ",
    },
    {
      id: "03",
      name: "Barber Time",
      description: "View ",
      deration: "Monthly",
      fee: "$09.00 ",
    },
    {
      id: "04",
      name: "Barber Time",
      description: "View ",
      deration: "Monthly",
      fee: "$09.00 ",
    },
  ];

  return (
    <div>
      <div className="p-1">
        <div className="flex justify-between">
          <div className="flex ">
            <Navigate title={"Customers"}></Navigate>
            <h1 className=" pl-2 font-semibold text-xl">{`(110)`}</h1>
          </div>
          <button
            className="bg-[#D17C51] px-5 py-2 text-white rounded"
            onClick={() => setOpenAddModal(true)}
          >
            + Subscription
          </button>
        </div>
        {/* Filter and Search */}
        <div className=" p-2">
          <div className="flex justify-between items-center mb-4">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <button
                className="flex gap-2 items-center border text-[#9C5F46] border-[#D17C51] p-1 px-3 rounded"
                onClick={(e) => e.preventDefault()}
              >
                All Customers
                <IoIosArrowDown />
              </button>
            </Dropdown>
          </div>

          {/* Table */}
          <div className=" rounded-md overflow-hidden">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              rowClassName=" border-b border-gray-300"
            />
          </div>
        </div>
      </div>
      <AddSubscriptionModal
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      ></AddSubscriptionModal>
      <EditSubscriptionModal
        editModal={editModal}
        setEditModal={setEditModal}
      ></EditSubscriptionModal>
    </div>
  );
};

export default Subscription;
