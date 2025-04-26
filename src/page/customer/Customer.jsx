import { Table, Switch, Tag, Input, Button, Dropdown, Space } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { TbFilter } from "react-icons/tb";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
//df
const Customer = () => {
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
            className="w-8 h-8 rounded-full"
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
      key: "Gender",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
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
      customerName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      city: "Berlin",
      gender: "Male",
      contact: "+9724545643",
      status: "Active",
      blocked: false,
    },
    {
      id: "02",
      customerName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      city: "Frankfurt",
      gender: "Female",
      contact: "+9724545643",
      status: "Inactive",
      blocked: true,
    },
    {
      id: "03",
      customerName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      city: "Berlin",
      gender: "Female",
      contact: "+9724545643",
      status: "Active",
      blocked: false,
    },
    {
      id: "04",
      customerName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      city: "Frankfurt",
      gender: "Male",
      contact: "+9724545643",
      status: "Active",
      blocked: false,
    },
    {
      id: "05",
      customerName: "Barber Time",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      city: "Berlin",
      gender: "Male",
      contact: "+9724545643", 
      status: "Active",
      blocked: false,
    },
  ];
  

  return (
    <div className="p-1">
      <div className="flex justify-between">
        <div className="flex ">
          <Navigate title={"Customers"}></Navigate>
          <h1 className=" pl-2 font-semibold text-xl">{`(110)`}</h1>
        </div>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
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
            scroll={{ x: 800 }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
