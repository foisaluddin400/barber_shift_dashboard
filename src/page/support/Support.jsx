import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import ReplyUser from "./ReplyUser";
import { useGetAllSupportQuery } from "../redux/api/manageApi";

const Support = () => {
  const [open, setOpen] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const { data: supportData } = useGetAllSupportQuery();

  const [selectedUser, setSelectedUser] = useState(null);
  const handleEdit = (record) => {
    setSelectedUser(record);
    setOpenAddModal(true);
  };
  useEffect(() => {
    if (supportData?.data) {

      const formattedData = supportData.data.map((item, index) => ({
        key: index + 1,
        userName: item.userName,
        id: item.userId,
        message: item.message,
        status: item.status,
        type: item.type,
        supportId: item.supportId,
      }));
      setFilteredData(formattedData);
    }
  }, [supportData]);
  console.log(supportData)

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`py-1 px-3 rounded-full ${
            status === "CLOSED" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "View Details",
      key: "viewDetails",
      render: (_, record) => (
        <Button
           onClick={() => {
            setSelectedSupport(record);
            setOpen(true);
          }}
          shape="circle"
          icon={<EyeOutlined />}
          style={{ backgroundColor: "#016A70", color: "white" }}
        />
      ),
    },
    {
      title: "Reply",
      key: "reply",
      render: (record) => (
        <button
          onClick={() => handleEdit(record)}
          className="bg-red-500 border px-4 py-1 rounded"
        >
          Reply
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="md:flex justify-between mb-4">
        <Navigate title={"Support"} />
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
          onChange={(e) => {
            const searchText = e.target.value.toLowerCase();
            const filtered = supportData?.data?.filter((item) =>
              item.userName.toLowerCase().includes(searchText)
            );
            setFilteredData(
              filtered?.map((item, index) => ({
                key: index + 1,
                userName: item.userName,
                message: item.message,
                status: item.status,
                type: item.type,
                supportId: item.supportId,
              }))
            );
          }}
        />
      </div>

      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        scroll={{ x: 900 }}
      />

      <Modal
        title="Support Details"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={500}
      >
        {selectedSupport && (
          <div>
            <p>
              <strong>User Name:</strong> {selectedSupport.userName}
            </p>
            <p>
              <strong>Message:</strong> {selectedSupport.message}
            </p>
            <p>
              <strong>Status:</strong> {selectedSupport.status}
            </p>
            <p>
              <strong>Type:</strong> {selectedSupport.type}
            </p>
          </div>
        )}
      </Modal>

      <ReplyUser setOpenAddModal={setOpenAddModal} openAddModal={openAddModal} selectedUser={selectedUser}/>
    </div>
  );
};

export default Support;
