import { Table, Switch, Tag, Input, message, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  useBlockOwnerMutation,
  useGetBarberOwnerQuery,
} from "../redux/api/manageApi";

const BarberOwner = () => {
  const [status, setStatus] = useState(""); 
  console.log(status)
  const [searchTerm, setSearch] = useState("");
  console.log(searchTerm);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  // API queries
  const {
    data: barberData,
    isLoading,
    refetch,
  } = useGetBarberOwnerQuery({
    status: status,
    searchTerm: searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  const [blockUser, { isLoading: blockLoading }] = useBlockOwnerMutation();

  const tableData = useMemo(() => {
    if (!barberData?.data) return [];

    return barberData.data.map((item, index) => ({
      key: item.id || index,
      id: index + 1,
      shopName: item.shopName,
      avatar: item.shopLogo,
      city: item.shopAddress,
      rating: "5.0",
      contact: item.shopPhoneNumber || item.phoneNumber,
      status: item.isVerified ? "ACTIVE" : "INACTIVE",
      isVerified: item.isVerified,
    }));
  }, [barberData]);

  const handleBlockToggle = async (record, checked) => {
    console.log(checked);
    try {
      const res = await blockUser({
        id: record.key,
        data: checked,
      }).unwrap();
      console.log(res);
      message.success(res?.message);

      refetch();
    } catch (err) {
      console.error(err);
      message.error("Failed to update status ❌");
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            src={record.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <Link to={`/dashboard/barberOwner/barberDetails/${record.key}`}>
            <span>{text}</span>
          </Link>
        </div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div className="flex items-center gap-1">
          <span className="text-[#FFB400] text-xl">
            <MdOutlineStarPurple500 />
          </span>
          {rating}
        </div>
      ),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className="px-4 py-1 rounded-full"
          color={status === "ACTIVE" ? "#C79A88" : "red"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Block / Unblock",
      key: "blocked",
      render: (_, record) => (
        <Switch
          checked={record.isVerified}
          onChange={(checked) => handleBlockToggle(record, checked)}
          loading={blockLoading}
        />
      ),
    },
  ];

  const handleStatusChange = (e) => {
    setStatus(e.target.value || ""); // Set status or clear it
    setCurrentPage(1); // Reset to first page when status changes
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-1">
      <div className="flex ">
        <Navigate title={"Barber Owner"} />
      </div>

      {/* Filter and Search */}
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
          <select
            className="rounded p-2 px-4 border border-[#C79A88] mr-11"
            value={status}
              onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="BLOCKED">Inactive</option>
          </select>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64 px-4 py-2 rounded-lg bg-white"
          />
        </div>

        {/* Table */}
        <div className="rounded-md overflow-hidden">
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            pagination={false}
            rowClassName="border-b border-gray-300"
            scroll={{ x: 800 }}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={barberData?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BarberOwner;
