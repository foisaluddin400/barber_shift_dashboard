import { Form, Input, Modal, Select, Checkbox } from "antd";
import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";

const EditAdministrator = ({ editModal, setEditModal }) => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [checkAll, setCheckAll] = useState(true);
  const [checkedList, setCheckedList] = useState([
    "Dashboard",
    "User Management",
    "Barber owner",
    "Subscriptions",
    "Support",
    "Settings",
  ]);

  const accessOptions = [
    "Dashboard",
    "User Management",
    "Barber owner",
    "Subscriptions",
    "Support",
    "Settings",
  ];

  const handleCancel = () => {
    form.resetFields();
    setImagePreview(null);
    setEditModal(false);
  };

  const handleSubmit = async (values) => {
    console.log({
      ...values,
      permissions: checkAll ? "All" : checkedList,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleCheckAllChange = (e) => {
    const isChecked = e.target.checked;
    setCheckAll(isChecked);
    setCheckedList(isChecked ? accessOptions : []);
  };

  const handleCheckboxGroupChange = (list) => {
    setCheckedList(list);
    setCheckAll(list.length === accessOptions.length);
  };

  return (
    <Modal
      centered
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={450}
    >
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-6">Edit</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="px-2"
        >
          {/* Profile Picture */}
          <div className="relative w-[120px] h-[120px] mx-auto mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="imgUpload"
              style={{ display: "none" }}
            />
            <img
              src={
                imagePreview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-[120px] h-[120px] rounded-full object-cover border"
            />
            <label
              htmlFor="imgUpload"
              className="absolute bottom-1 right-1 bg-[#D17C51] w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
            >
              <IoCameraOutline className="text-white text-base" />
            </label>
          </div>

          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>

          {/* Contact Number */}
          <Form.Item
            label="Contact Number"
            name="contact"
            rules={[{ required: true, message: "Please enter contact number" }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Type here" />
          </Form.Item>

          {/* Role */}
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select
              placeholder="Select role"
              options={[
                { label: "Owner", value: "Owner" },
                { label: "Admin", value: "Admin" },
              ]}
            />
          </Form.Item>

          {/* Access Permissions */}
          <label className="block text-sm font-medium text-black mb-1">
            Give Access To
          </label>
          <div>
            <Checkbox checked={checkAll} onChange={handleCheckAllChange}>
              All
            </Checkbox>
            <div className="grid grid-cols-2 ">
              <Checkbox.Group
                options={accessOptions}
                value={checkedList}
                onChange={handleCheckboxGroupChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#D17C51] text-white rounded-md"
          >
            Save
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default EditAdministrator;
