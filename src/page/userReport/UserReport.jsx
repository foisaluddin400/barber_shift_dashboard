import React, { useState, useMemo } from "react";
import { Navigate } from "../../Navigate";
import { Table, Input, Tag, Popconfirm, message, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReplyUser from "./ReplyUser";
import { useGetAllReportsQuery } from "../redux/api/manageApi";

const UserReport = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  console.log(searchTerm);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser);
  // API Call
  const { data: reportData, isLoading } = useGetAllReportsQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  const handlePageChange = (page) => setCurrentPage(page);
  const handleDeleteCategory = async (id) => {
    console.log(id);
    // try {
    //   const res = await deleteCategory(id).unwrap();
    //   message.success(res?.message);
    // } catch (error) {
    //   message.error(error?.data?.message || "Error deleting FAQ");
    // }
  };
  // data mapping for table
  const tableData = useMemo(() => {
    if (!reportData?.data) return [];
    return reportData.data.map((item, index) => ({
      key: item.reportId,
      id: item.userId,
      fullName: item.userName,
      contact: item.userPhoneNumber ? `${item.userPhoneNumber}` : "No contact",
      region: item.userAddress || "N/A",
      status: item.status,
      message: item.message,
      type: item.type,
    }));
  }, [reportData]);

  const handleEdit = (record) => {
    setSelectedUser(record);
    setOpenAddModal(true);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      render: (text, record) => (
        <div>
          <div className="font-semibold">{record.fullName}</div>
          <div className="text-xs text-gray-500">{record.message}</div>
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Region",
      dataIndex: "region",
      render: (text) => (
        <span className="text-gray-500">{text || "Not provided"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const color =
          status === "ACTIVE"
            ? "green"
            : status === "CLOSED"
            ? "volcano"
            : "blue";
        return (
          <Tag color={color} className="rounded-full px-3">
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(record)}
            className="bg-red-500 border px-4 py-1 rounded text-white"
          >
            Reply
          </button>
          {/* 
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => handleDeleteCategory(record?.key)}
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-green-600 px-4 py-1 border rounded text-white">
              Argon
            </button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between">
        <div className="flex">
          <Navigate title={"User Report"} />
          <h1 className="pl-2 font-semibold text-xl">
            {`(${reportData?.meta?.total || 0})`}
          </h1>
        </div>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="p-2">
        <div className="rounded-md overflow-hidden">
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            pagination={false}
            rowClassName="border-b border-gray-200"
            scroll={{ x: 900 }}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={reportData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <ReplyUser
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default UserReport;
