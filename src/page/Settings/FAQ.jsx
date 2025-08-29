import { Form, Input, Modal, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useAddFaqMutation, useDeleteFaqMutation, useGetFaqQuery, useUpdateFaqMutation } from "../redux/api/manageApi";
import { Navigate } from "../../Navigate";

const { TextArea } = Input;

const FAQ = () => {
  const { data: faqsData, refetch } = useGetFaqQuery();
  const [addFaq] = useAddFaqMutation();
  const [editFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [form] = Form.useForm();

  // Add FAQ Submit
  const handleAddFaq = async (values) => {
    try {
      const res = await addFaq(values).unwrap();
      message.success(res?.message || "FAQ added successfully ✅");
      form.resetFields();
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to add FAQ ❌");
    }
  };

  // Edit FAQ Submit
  const handleEditFaq = async (values) => {
    try {
      const res = await editFaq({ id: selectedFaq.id, data: values }).unwrap();
      message.success(res?.message );
      form.resetFields();
      setIsEditModalOpen(false);
      setSelectedFaq(null);
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to update FAQ ❌");
    }
  };

  // Delete FAQ
  const handleDeleteFaq = async (id) => {
    try {
      const res = await deleteFaq(id).unwrap();
      message.success(res?.message || "FAQ deleted successfully ✅");
      refetch();
    } catch (err) {
      message.error(err?.data?.message || "Failed to delete FAQ ❌");
    }
  };

  // Open Edit Modal
  const openEditModal = (faq) => {
    setSelectedFaq(faq);
    form.setFieldsValue(faq);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-1">
      <Navigate title={"FAQ"} />

      {/* FAQ List */}
      <div className="lg:grid grid-cols-2 gap-5 mt-2">
        {faqsData?.data?.map((faq, i) => (
          <div key={faq.id} className="p-2 border rounded-md">
            <p className="pb-2 font-medium">Question no: {i + 1}</p>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.question}</p>
            <div className="flex justify-between items-center">
              <p className="py-2 font-medium">Answer</p>
              <div className="flex gap-4">
                <button
                  onClick={() => openEditModal(faq)}
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>
                <MdDeleteOutline
                  onClick={() => handleDeleteFaq(faq.id)}
                  className="text-red-600 text-xl cursor-pointer"
                />
              </div>
            </div>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Add FAQ Button */}
      <div className="flex items-center justify-center mt-10">
        <button
          className="px-5 py-2 bg-[#9C5F46] text-white rounded"
          onClick={() => {
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          + Add FAQ
        </button>
      </div>

      {/* Add Modal */}
      <Modal
        centered
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <p className="text-center font-semibold pb-5 text-xl">Add FAQ</p>
        <Form form={form} onFinish={handleAddFaq}>
          <Form.Item
            name="question"
            rules={[{ required: true, message: "Please enter a question" }]}
          >
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "Please enter an answer" }]}
          >
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
              style={{ background: "black", borderColor: "#2F799E" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        centered
        open={isEditModalOpen}
        footer={null}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <p className="text-center font-semibold pb-5 text-xl">Edit FAQ</p>
        <Form form={form} onFinish={handleEditFaq}>
          <Form.Item
            name="question"
            rules={[{ required: true, message: "Please enter a question" }]}
          >
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "Please enter an answer" }]}
          >
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
              style={{ background: "black", borderColor: "#2F799E" }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQ;
