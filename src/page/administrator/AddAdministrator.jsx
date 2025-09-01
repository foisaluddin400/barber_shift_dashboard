import { Form, Input, Modal, Select, Checkbox, message } from "antd";
import React, { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import {
  useAddAdminProvideMutation,
  useGetAllAccessFunctionsQuery,
} from "../redux/api/manageApi";

const AddAdministrator = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [file, setFile] = useState(null);
  const [role, setRole] = useState(null); // Selected role

  const { data: accessCheckFunctionData } = useGetAllAccessFunctionsQuery();
  const [AddAdminProvide] = useAddAdminProvideMutation();

  // Original access options from API
  const accessOptions =
    accessCheckFunctionData?.data?.map((item) => ({
      label: item.function,
      value: item.id,
    })) || [];

  // Filtered access options based on role
  const filteredAccessOptions = role === "ADMIN"
    ? accessOptions.filter((option) => option.label !== "ADMIN_MANAGEMENT")
    : accessOptions;

  // Modal Cancel
  const handleCancel = () => {
    form.resetFields();
    setImagePreview(null);
    setOpenAddModal(false);
    setCheckedList([]);
    setFile(null);
    setRole(null);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append("profileImage", file);
      }

      const payload = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
        function: checkedList,
      };

      formData.append("bodyData", JSON.stringify(payload));

      const response = await AddAdminProvide(formData).unwrap();
      message.success(response?.message);
      handleCancel();
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message);
    }
  };

  const handleRoleChange = (value) => {
    setRole(value);

    if (value === "SUPER_ADMIN") {
      setCheckedList(accessOptions.map((o) => o.value));
    } else {
      setCheckedList([]);
    }
  };

  const handleCheckboxGroupChange = (list) => {
    if (role === "ADMIN") {
      // Find the "ALL" value from filteredAccessOptions
      const allOption = filteredAccessOptions.find((o) => o.label === "ALL")?.value;

      // If the "ALL" checkbox is selected
      if (allOption && list.includes(allOption)) {
        // Select all filtered options
        setCheckedList(filteredAccessOptions.map((o) => o.value));
      } else {
        // Otherwise, set only the selected items
        setCheckedList(list);
      }
    } else {
      // For non-ADMIN roles, just update the checked list
      setCheckedList(list);
    }
  };

  return (
    <Modal
      centered
      open={openAddModal}
      onCancel={handleCancel}
      footer={null}
      width={450}
    >
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-6">
          Add Administrator
        </h2>
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
            name="fullName"
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
                { label: "Super Admin", value: "SUPER_ADMIN" },
                { label: "Admin", value: "ADMIN" },
              ]}
              onChange={handleRoleChange}
            />
          </Form.Item>

          {/* Access Permissions */}
          <label className="block text-sm font-medium text-black mb-1">
            Give Access To
          </label>
          <div className="grid grid-cols-2 mt-2">
            <Checkbox.Group
              options={filteredAccessOptions} // Use filtered options
              value={checkedList}
              onChange={handleCheckboxGroupChange}
              disabled={role === "SUPER_ADMIN"}
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#D17C51] text-white rounded-md"
          >
            Save
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddAdministrator;