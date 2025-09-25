import {
  Table,
  Input,
  Space,
  Tooltip,
  Select,
  message,
  Pagination,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useState } from "react";
import AddAdministrator from "./AddAdministrator";
import EditAdministrator from "./EditAdministrator";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useDeleteAdminAccessMutation,
  useGetAllAdminAccessQuery,
} from "../redux/api/manageApi";

const { Option } = Select;

const Administrator = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteUser] = useDeleteAdminAccessMutation();
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  console.log(searchTerm);
  const { data: adminData, isLoading } = useGetAllAdminAccessQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  console.log("Admin Data:", adminData);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleEdit = (record) => {
    setSelectedUser(record);
    setEditModal(true);
  };

  const handleDeleteFaq = async (id) => {
    console.log(id);
    try {
      const res = await deleteUser(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };
  const handlePageChange = (page) => setCurrentPage(page);
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Has Access To",
      dataIndex: "access",
      key: "access",
      render: (accesses) => (
        <Select mode="multiple" value={accesses} style={{ width: 200 }}>
          {accesses.map((acc) => (
            <Option key={acc} value={acc}>
              {acc}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <button
              onClick={() => handleEdit(record)}
              className="bg-[#D17C51] p-2 rounded text-xl text-white"
            >
              <FiEdit2 />
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <button
              onClick={() => handleDeleteFaq(record?.key)}
              className="bg-red-500 p-2 rounded text-xl text-white"
            >
              <RiDeleteBin6Line />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // ✅ Data mapping from API
  const data =
    adminData?.data?.map((admin, index) => ({
      key: admin.adminId,
      sl: index + 1,
      name: admin.adminName,
      avatar: admin.adminImage,
      email: admin.adminEmail,
      role: admin.role,
      access:
        admin.accesses?.length > 0
          ? admin.accesses.map((a) => a.function)
          : ["Super Admin"],
    })) || [];

  return (
    <div className="p-1">
      {/* Header with search */}
      <div className="flex justify-between mb-4">
        <Navigate title={"Administrator"} />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
      </div>

      {/* Add Admin Button */}
      <button
        className="bg-[#D17C51] px-5 py-2 text-white rounded mb-4"
        onClick={() => setOpenAddModal(true)}
      >
        + Add Administrator
      </button>

      {/* Table */}
      <div className="rounded-md overflow-hidden">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          pagination={false}
          rowClassName="border-b border-gray-200"
          scroll={{ x: 900 }}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={adminData?.meta?.total || 0}
          onChange={handlePageChange}
          showSizeChanger={false}
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
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Administrator;
