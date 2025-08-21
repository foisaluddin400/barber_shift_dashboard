import { Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useUpdateSubscriptionMutation } from "../redux/api/manageApi";

export const EditSubscriptionModal = ({
  editModal,
  setEditModal,
  selectedUser,
}) => {
  console.log(selectedUser);
  const [updateSubscription] = useUpdateSubscriptionMutation();

  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();

    setEditModal(false);
  };

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        description: selectedUser?.description,
        duration: selectedUser?.duration,
        price: selectedUser?.fee,
        title: selectedUser?.name,
      });
    }
  }, [selectedUser, form]);
//dd
  const handleSubmit = async (values) => {
    console.log(values);
    const id =selectedUser?.key
    const data = {
      duration: values?.duration,
      price: Number(values?.price),
      description: values?.description,
      title: values?.title,
    };
    console.log(data);
    try {
      const response = await updateSubscription({data, id}).unwrap();

      message.success(response?.message);
      setEditModal(false);
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message);
    }
  };
  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <div className="mb-6 mt-4">
        <h2 className="text-center font-bold text-lg mb-11">Edit</h2>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          {/* Package Name */}
          <Form.Item
            label="Subscription Plan Name"
            name="title"
            rules={[
              { required: true, message: "Please enter the package name" },
            ]}
          >
            <Input className="py-2" placeholder="Enter package name" />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input className="py-2" type="number" placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              placeholder="Duration"
              optionFilterProp="label"
              options={[
                { value: "WEEKLY", label: "Weekly" },
                { value: "MONTHLY", label: "Monthly" },
                { value: "YEARLY", label: "Yearly" },
                { value: "LIFETIME", label: "Life Time" },
              ]}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Point Range"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          {/* Services Selection */}

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="px-4 py-3 w-full bg-[#D17C51] text-white rounded-md"
            >
              Update
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
