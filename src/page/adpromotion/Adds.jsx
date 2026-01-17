import React, { useState } from "react";
import { Table, Space, message, Modal } from "antd";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import {
  useDeleteAddPromotionMutation,
  useGetAddPromotionQuery,
} from "../redux/api/manageApi";
import EditPromotionModal from "./EditPromotionModal";

const Adds = () => {
  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [viewModal, setViewModal] = useState(false); // 👁 View modal state
  const [viewRecord, setViewRecord] = useState(null);

  const [deleteAddPromotion] = useDeleteAddPromotionMutation();
  const { data: addPromotionData, isLoading } = useGetAddPromotionQuery();

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  const handleEdit = (record) => {
    setSelectedUser(record);
    setEditModal(true);
  };

  const handleView = (record) => {
    setViewRecord(record);
    setViewModal(true);
  };

  const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteAddPromotion(id).unwrap();
      message.success(res?.message);
    } catch (err) {
      message.error(err?.data?.message);
    }
  };

  const formattedData =
    addPromotionData?.data?.map((item, index) => ({
      key: item.id,
      serial: `#${index + 1}`,
      image: item.images?.[0],
      imageList: item.images,
      title: item.description,
      startDate: new Date(item.startDate).toLocaleDateString(),
      endDate: new Date(item.endDate).toLocaleDateString(),
      date: `${new Date(item.startDate).toLocaleDateString()} - ${new Date(
        item.endDate
      ).toLocaleDateString()}`,
      duration: item.duration,
    })) || [];

  const columns = [
    {
      title: "S no.",
      dataIndex: "serial",
      key: "serial",
      align: "left",
      render: (text) => <div className="pl-4">{text}</div>,
    },
    {
      title: <div className="text-center">Ads</div>,
      dataIndex: "ads",
      key: "ads",
      render: (_, record) => (
        <div className="flex justify-center">
          <div className="flex items-start gap-3 bg-gray-100 rounded-md p-2 shadow-sm w-fit">
            {record.image?.endsWith(".mp4") ? (
              <video
                src={record.image}
                controls
                className="w-14 h-14 rounded-md object-cover"
              />
            ) : (
              <img
                src={record.image}
                alt="Ad"
                className="w-14 h-14 rounded-md object-cover"
              />
            )}

            <div>
              <h4 className="text-sm font-semibold leading-tight">
                {record.title || "Untitled Ad"}
              </h4>
              <p className="text-xs text-gray-600 mb-1">
                {record.date || "No duration"}
              </p>
              <p className="text-xs text-gray-600 mb-1">
                {record.duration || "No duration"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <div className="text-right pr-4">Action</div>,
      key: "action",
      render: (_, record) => (
        <div className="flex justify-end pr-4">
          <Space size="middle">
            {/* 👁 View */}
            <button
              onClick={() => handleView(record)}
              className="bg-blue-500 p-2 rounded text-xl text-white"
            >
              <AiOutlineEye />
            </button>

            {/* ✏️ Edit */}
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
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-3 h-[87vh]">
      <Table
        columns={columns}
        dataSource={formattedData}
        pagination={false}
        rowClassName="border-b border-gray-200"
        scroll={{ x: 600 }}
      />

      {/* ✏️ Edit Modal */}
      <EditPromotionModal
        editModal={editModal}
        setEditModal={setEditModal}
        selectedUser={selectedUser}
      />

      {/* 👁 View Modal */}
      <Modal
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={null}
        title="Ad Details"
      >
        {viewRecord && (
          <div>
            {viewRecord.image?.endsWith(".mp4") ? (
              <video
                src={viewRecord.image}
                controls
                className="w-full rounded-md mb-3"
              />
            ) : (
              <img
                src={viewRecord.image}
                alt="Ad"
                className="w-full rounded-md mb-3"
              />
            )}

            <h3 className="font-semibold mb-2">{viewRecord.title}</h3>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Date:</strong> {viewRecord.date}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Duration:</strong> {viewRecord.duration}
            </p>
            <p className="text-gray-600 text-sm">
              <strong>Description:</strong> {viewRecord.title}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Adds;
