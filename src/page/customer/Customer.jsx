import { Table, Switch, Tag, Input, Pagination, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useState, useMemo } from "react";
import { useBlockCustomerMutation, useGetCustomerQuery } from "../redux/api/manageApi";

const Customer = () => {
  const [selectedYear, setSelectedYear] = useState("ACTIVE");
    const [searchTerm, setSearch] = useState("");
    console.log(searchTerm)
    const [currentPage, setCurrentPage] = useState(1);
    
    const pageSize = 10;
  const { data: customerData, isLoading } = useGetCustomerQuery({ status: selectedYear,
    searchTerm:searchTerm,
     page: currentPage,
    limit: pageSize,});

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
const[blockCustomer, { isLoading: blockLoading }] = useBlockCustomerMutation()

  const tableData = useMemo(() => {
    if (!customerData?.data) return [];

    return customerData.data.map((item, index) => ({
      key: item.id || index,
      id: index + 1,
      customerName: item.fullName,
      avatar:
        item.image ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.fullName),
      city: item.address || "N/A",
      gender: item.gender || "N/A",
      contact: item.phoneNumber || "N/A",
      status: item.status,
      blocked: item.status,
    }));
  }, [customerData]);

const handleBlockToggle = async (record, checked) => {
  try {
  
    const payload = {
      status: record.status === "BLOCKED" ? false : true,
    };

    const res = await blockCustomer({
      id: record.key,
      data: payload,
    }).unwrap();

    message.success(res?.message || "Status updated ✅");
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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
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
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
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
      checked={record.status === "ACTIVE"} // ACTIVE হলে ON
      onChange={(checked) => handleBlockToggle(record, checked)}
      loading={blockLoading}
    />
  ),
},



  ];
    const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-1">
      <div className="flex justify-between">
        <div className="flex ">
          <Navigate title={"Customers"} />
          <h1 className=" pl-2 font-semibold text-xl">
            {`(${customerData?.meta?.total || 0})`}
          </h1>
        </div>
        <Input
         onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
      </div>

      {/* Filter and Search */}
      <div className=" p-2">
        <div className="flex justify-between items-center mb-4">
          <select
            className="rounded p-2 px-4 border border-[#C79A88] mr-11"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>

        {/* Table */}
        <div className=" rounded-md overflow-hidden">
          <Table
            columns={columns}
            dataSource={tableData}
            loading={isLoading}
            pagination={false}
            rowClassName=" border-b border-gray-300"
            scroll={{ x: 800 }}
          />
        </div>
         <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={customerData?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
            
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
