import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react'

export const EditSubscriptionModal = ({editModal,
    setEditModal,
    }) => {
    const [fileList, setFileList] = useState([]); 
    const [form] = Form.useForm();
    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        setEditModal(false);
      };

      const handleSubmit = async (values) => {
       console.log(values)
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
            name="name"
            rules={[{ required: true, message: "Please enter the package name" }]}
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
                { value: "yearly", label: "Yearly" },
                { value: "monthly", label: "Monthly" },
               
              ]}
            />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Point Range"
            name="descriptions"
            rules={[{ required: true, message: "Please enter the description" }]}
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
              
                Add
            
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
  )
}
