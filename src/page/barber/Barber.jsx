import { Table, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { Link } from "react-router-dom";
import { useGetAllBarberQuery } from "../redux/api/manageApi";
import { useMemo, useState } from "react";

export const Barber = () => {
    const [searchTerm, setSearch] = useState("");
  console.log(searchTerm)
  const [currentPage, setCurrentPage] = useState(1);
  
  const pageSize = 10;
  const { data: barbersData, isLoading } = useGetAllBarberQuery({
        
    searchTerm:searchTerm,
     page: currentPage,
    limit: pageSize,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tableData = useMemo(() => {
    if (!barbersData?.data) return [];
    return barbersData.data.map((item, index) => ({
      key: item.userId || index,
      id: index + 1,
      barberName: item.fullName,
      avatar:
        item.portfolio?.[0] ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(item.fullName),
      shop: item.shopName || "N/A",
      contact: item.phoneNumber || "N/A",
      sales: "$0",
      status: item.status,
    }));
  }, [barbersData]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Barber Name",
      dataIndex: "barberName",
      key: "barberName",
      render: (text, record) => (
        <Link to={`/dashboard/barber/barberDetails/${record.key}`}>
          <div className="flex items-center gap-2">
            <img
              src={record.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{text}</span>
          </div>
        </Link>
      ),
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between">
        <div className="flex">
          <Navigate title={"Barbers"} />
          <h1 className="pl-2 font-semibold text-xl">
            {`(${barbersData?.meta?.total || 0})`}
          </h1>
        </div>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
           onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter */}
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
          <select
            className="rounded p-2 px-4 border border-[#C79A88] mr-11"
          
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BLOCKED">Blocked</option>
          </select>
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
            total={barbersData?.meta?.total || 0}
            onChange={handlePageChange}
            showSizeChanger={false}
            
          />
        </div>
      </div>
    </div>
  );
};
