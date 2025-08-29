import { Table, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useGetAllSubscriberQuery } from "../redux/api/manageApi";
import { useState } from "react";

const PremiumSubscriber = () => {
      const [searchTerm, setSearch] = useState("");
  console.log(searchTerm)
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageSize = 10;
  const { data: subscriber, isLoading } = useGetAllSubscriberQuery({
        
    searchTerm:searchTerm,
     page: currentPage,
    limit: pageSize,
  });
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Transform API data into table-friendly format
  const tableData = subscriber?.data?.map((item, index) => ({
    key: item.id,
    sl: index + 1,
    name: item.fullName,
    email: item.email,
    phone: item.phoneNumber,
    joiningDate: new Date(item.startDate).toLocaleDateString(),
    endDate: new Date(item.endDate).toLocaleDateString(),
    interval: item.offer?.duration,
    plan: item.offer?.title,
    fee: `$${item.offer?.price} ${item.offer?.currency?.toUpperCase()}`,
    status: item.paymentStatus === "COMPLETED" ? "Paid" : "Due",
  }));

  const columns = [
    {
      title: "SL no.",
      dataIndex: "sl",
      key: "sl",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Joining Date",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Interval",
      dataIndex: "interval",
      key: "interval",
      render: (interval) => (
        <span className="text-[#D17C51]">{interval}</span>
      ),
    },
    {
      title: "Subscription Fee",
      dataIndex: "fee",
      key: "fee",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`border px-4 py-1 rounded-full text-sm ${
            status === "Paid"
              ? "border-green-500 text-green-600"
              : "border-orange-500 text-orange-500"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between items-center">
        <Navigate title={"Premium Subscribers"} />
        <Input
           onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
      </div>

      <div className="p-2">
        <div className="rounded-md overflow-hidden">
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={tableData}
            pagination={false}
            rowClassName="border-b border-gray-300"
            scroll={{ x: 1200 }}
          />
        </div>
      </div>
       <div className="mt-4 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={subscriber?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
            
          />
        </div>
    </div>
  );
};

export default PremiumSubscriber;
