import { Form, Input, Modal, Select, Checkbox, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  useGetAllAccessFunctionsQuery,
  useUpdateAccessFunctionMutation,
} from "../redux/api/manageApi";
import { useMemo } from "react";
const EditAdministrator = ({ editModal, setEditModal, selectedUser }) => {
  const adminId = selectedUser?.key;
  console.log(selectedUser)
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [checkedList, setCheckedList] = useState([]);
  const [role, setRole] = useState(null);

  const { data: accessCheckFunctionData } = useGetAllAccessFunctionsQuery();
  const [updateAccessFunction] = useUpdateAccessFunctionMutation();

const accessOptions = useMemo(() => {
  return accessCheckFunctionData?.data?.map((item) => ({
    label: item.function,
    value: item.id,
  })) || [];
}, [accessCheckFunctionData]);


useEffect(() => {
  if (selectedUser && accessOptions.length > 0) {
    const matchedIds = accessOptions
      .filter((opt) => selectedUser.access?.includes(opt.label))
      .map((opt) => opt.value);

    setCheckedList(matchedIds);
    setRole(selectedUser.role);

    form.setFieldsValue({
      email: selectedUser?.email,
      fullName: selectedUser?.name,
      role: selectedUser?.role,
    });

    setImagePreview(selectedUser?.avatar);
  }
}, [selectedUser, accessOptions, form]);


  const handleCancel = () => {
    form.resetFields();
    setImagePreview(null);
    setCheckedList([]);
    setRole(null);
    setEditModal(false);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        adminId,
        function: checkedList, 
      };
      console.log(data)

      const response = await updateAccessFunction(data).unwrap();
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
    }
  };

const handleCheckboxGroupChange = (list) => {
  if (role === "ADMIN") {
    // Find the "ALL" value from accessOptions (case-sensitive match with data)
    const allOption = accessOptions.find((o) => o.label === "ALL")?.value;

    // If the "ALL" checkbox is selected
    if (allOption && list.includes(allOption)) {
      // Select all options
      setCheckedList(accessOptions.map((o) => o.value));
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
      open={editModal}
      onCancel={handleCancel}
      footer={null}
      width={450}
    >
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-6">
          Edit Administrator
        </h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="px-2"
        >
          {/* Profile Picture */}
          <div className="w-[120px] h-[120px] mx-auto mb-6">
            <img
              src={
                imagePreview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-[120px] h-[120px] rounded-full object-cover border"
            />
          </div>

          {/* Name */}
          <Form.Item label="Name" name="fullName">
            <Input disabled />
          </Form.Item>

          {/* Email */}
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>

          {/* Role */}
          <Form.Item label="Role" name="role">
            <Select
              disabled
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
              options={accessOptions}
              value={checkedList}
              onChange={handleCheckboxGroupChange}
              disabled={role === "SUPER_ADMIN"}
            />
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
