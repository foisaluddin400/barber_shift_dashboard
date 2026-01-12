import { Form, Input, message, Modal } from "antd";
import React, { useEffect } from "react";
import {
  useGetSingleReplyQuery,
  useReplyUserMutation,
} from "../redux/api/manageApi";

const ReplyUser = ({ openAddModal, setOpenAddModal, selectedUser }) => {
  console.log(selectedUser?.id);
  console.log(selectedUser?.key);
  const id = selectedUser?.key;
  console.log(id);
  const [form] = Form.useForm();
  const { data: singleReply } = useGetSingleReplyQuery({ id });
  console.log(singleReply);
  const [replyUser] = useReplyUserMutation();
  const handleCancel = () => {
   
    setOpenAddModal(false);
  };
  useEffect(() => {
    if (singleReply?.data) {
      form.setFieldsValue({
        message: singleReply?.data?.message,
      });
    }
  }, [singleReply, form]);
  const handleSubmit = async (values) => {
    const id = selectedUser?.key;
    console.log(values);
    const data = {
      userId: selectedUser?.id,
      message: values?.message,
    };

    try {
      const response = await replyUser({ data, id }).unwrap();

      message.success(response?.message);
      setOpenAddModal(false);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message);
    }
  };
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
          <div className="flex gap-3 mt-3">
            <button
  type="submit"
  disabled={!!singleReply?.data?.message}
  className={`px-4 py-3 w-full rounded-md text-white 
    ${singleReply?.data?.message 
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
