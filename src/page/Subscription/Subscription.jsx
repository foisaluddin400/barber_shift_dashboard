import { message, Table } from "antd";
import { Navigate } from "../../Navigate";
import { useState, useMemo } from "react";
import { AddSubscriptionModal } from "./AddSubscriptionModal";
import { EditSubscriptionModal } from "./EditSubscriptionModal";
import { useDeleteSubscriptionMutation, useGetSubscriptionQuery } from "../redux/api/manageApi";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Subscription = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
const [deleteSubscription] = useDeleteSubscriptionMutation()
  // API Call
  const { data: subscriptionData, isLoading } = useGetSubscriptionQuery();
  console.log(subscriptionData);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleEdit = (record) => {
    setSelectedUser(record);
    setEditModal(true);
  };
  // map api data for table
  const tableData = useMemo(() => {
    if (!subscriptionData?.data) return [];
    return subscriptionData.data.map((item, index) => ({
      key: item.id,
      id: index + 1,
      name: item.title,
      description: item.description,
      duration: item.duration,
      fee: item.price,
      status: item.status,
    }));
  }, [subscriptionData]);
  const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteSubscription(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
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
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
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
        <div className="flex gap-3">
          <button
            onClick={() => handleEdit(record)}
            className="bg-[#D17C51] p-2 rounded text-xl text-white"
          >
            <FiEdit2 />
          </button>

          {/* 🗑 Delete */}
          <button
            onClick={() => handleDeleteFaq(record?.key)}
            className="bg-red-500 p-2 rounded text-xl text-white"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="p-1">
        <div className="flex justify-between">
          <div className="flex">
            <Navigate title={"Subscription"} />
            <h1 className="pl-2 font-semibold text-xl">
              {`(${subscriptionData?.data?.length || 0})`}
            </h1>
          </div>
          <button
            className="bg-[#D17C51] px-5 py-2 text-white rounded"
            onClick={() => setOpenAddModal(true)}
          >
            + Subscription
          </button>
        </div>

        <div className="p-2">
          <div className="rounded-md overflow-hidden">
            <Table
              columns={columns}
              dataSource={tableData}
              loading={isLoading}
              pagination={false}
              rowClassName="border-b border-gray-300"
              scroll={{ x: 750 }}
            />
          </div>
        </div>
      </div>

      <AddSubscriptionModal
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
      <EditSubscriptionModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Subscription;
