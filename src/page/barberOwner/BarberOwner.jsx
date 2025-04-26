import { Table, Switch, Tag, Input, Button, Dropdown, Space } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { TbFilter } from "react-icons/tb";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { Link } from "react-router-dom";

const BarberOwner = () => {
  const items = [
    {
      label: (
        <button target="_blank" rel="noopener noreferrer">
          Top Selling
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
          Inactive
        </button>
      ),
      key: "2",
    },
    {
      label: (
        <button target="_blank" rel="noopener noreferrer">
          All Shops
        </button>
      ),
      key: "3",
    },
  ];

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
            className="w-8 h-8 rounded-full"
          />
          <Link to={'/dashboard/barberOwner/barberDetails'}><span>{text}</span></Link>
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
          color={status === "Active" ? "#C79A88" : "red"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Block / Unblock",
      dataIndex: "blocked",
      key: "blocked",
      render: (blocked) => <Switch defaultChecked={!blocked} />,
    },
  ];

  const data = [
    {
      id: "01",
      shopName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      city: "Berlin",
      rating: "5.0",
      contact: "+9724545643",
      status: "Active",
      blocked: false,
    },
    {
      id: "02",
      shopName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      city: "Frankfurt",
      rating: "5.0",
      contact: "+9724545643",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "03",
      shopName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      city: "Berlin",
      rating: "5.0",
      contact: "+9724545643",
      status: "Active",
      blocked: false,
    },
    {
      id: "04",
      shopName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      city: "Frankfurt",
      rating: "5.0",
      contact: "+9724545643",
      status: "Active",
      blocked: false,
    },
    {
      id: "05",
      shopName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      city: "Berlin",
      rating: "5.0",
      contact: "+9724545643",
      status: "Active",
      blocked: false,
    },
  ];

  return (
    <div className="p-1">
      <div className="flex ">
        <Navigate title={"Barber Owner"}></Navigate>
        
      </div>
      {/* Filter and Searc */}
      <div className="p-2">
        <div className="flex justify-between items-center mb-4">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <button
              className="flex gap-2 items-center border border-[#D17C51] p-1 px-3 rounded"
              onClick={(e) => e.preventDefault()}
            >
              Filter
              <TbFilter />
            </button>
          </Dropdown>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64 px-4 py-2 rounded-lg bg-white"
          />
        </div>

        {/* Table */}
        <div className=" rounded-md overflow-hidden">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName=" border-b border-gray-300"
            scroll={{ x: 800 }} 
          />
        </div>
      </div>
    </div>
  );
};

export default BarberOwner;
