import { Form, Input, message, Modal } from "antd";
import React, { useEffect } from "react";
import { useUpdateSupportMutation } from "../redux/api/manageApi";

const ReplyUser = ({ openAddModal, setOpenAddModal, selectedUser }) => {
  console.log(selectedUser);
  const [form] = Form.useForm();
  const handleCancel = () => {
  

    setOpenAddModal(false);
  };
const [updateSupport] = useUpdateSupportMutation();
const handleSubmit = async (values) => {
    const id = selectedUser?.supportId;
    console.log(values);
    const data = {
      userId: selectedUser?.id,
      message: values?.message,
    };

    try {
      const response = await updateSupport({ data, id }).unwrap();

      message.success(response?.message);
      setOpenAddModal(false);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message);
    }
  };
  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        message: selectedUser?.message,
      });
    }
  }, [selectedUser, form]);
  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-4">Reply</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Description */}
          <Form.Item
            label="Answer"
            name="message"
            rules={[{ required: true, message: "Please enter the reply" }]}
          >
            <Input.TextArea placeholder="Enter Reply" rows={4} />
          </Form.Item>

          {/* Buttons */}
          <div className="flex gap-3 mt-3">
            <button
  type="submit"
  disabled={!!selectedUser?.message}
  className={`px-4 py-3 w-full rounded-md text-white 
    ${selectedUser?.message
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-[#D17C51]"}`}
>
  Reply
</button>

            <button
              type="button"
              className="px-4 py-3 w-full bg-[#D9000A] text-white rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ReplyUser;
