import { Form, Modal, Upload, DatePicker, TimePicker, Input } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";


const EditPromotionModal = ({ editModal, setEditModal }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
  
    const onChange = ({ fileList: newFileList }) => setFileList(newFileList);
  
    const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    };
  
    const handleCancel = () => {
      form.resetFields();
      setFileList([]);
      setEditModal(false);
    };
  
    const handleSubmit = (values) => {
      console.log("Submitted:", values);
    };
  
    return (
      <Modal
        centered
        open={editModal}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <div className="mb-6 mt-2">
          <h2 className="text-center font-semibold text-xl mb-4">Edit promotional</h2>
  
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="px-2"
          >
            {/* Upload */}
            <label className="block font-medium mb-2 text-gray-700">
              Add Photo or video
            </label>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              className="mb-4"
            >
              {fileList.length < 2 && (
                <div>
                  <PlusOutlined />
                </div>
              )}
            </Upload>
  
            {/* Date, Time, Duration */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Form.Item name="date" className="mb-0">
                <DatePicker
                  placeholder="Enter Date"
                  className="w-full"
                  style={{ height: 40 }}
                />
              </Form.Item>
              <Form.Item name="time" className="mb-0">
                <TimePicker
                  placeholder="Enter time"
                  className="w-full"
                  style={{ height: 40 }}
                />
              </Form.Item>
              <Form.Item name="duration" className="mb-0">
                <Input
                  placeholder="3h 45m"
                  className="w-full"
                  style={{ height: 40 }}
                />
              </Form.Item>
            </div>
  
            {/* Description */}
            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={3}
                placeholder="Write description"
                className="bg-gray-100"
              />
            </Form.Item>
  
            {/* Save Button */}
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
}

export default EditPromotionModal