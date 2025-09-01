import {
  Form,
  Modal,
  Upload,
  DatePicker,
  TimePicker,
  Input,
  message,
} from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAddAddpromotionMutation } from "../redux/api/manageApi";

const AddPromotionModal = ({ openAddModal, setOpenAddModal }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [addAddpromotion] = useAddAddpromotionMutation();
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
    setOpenAddModal(false);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      const bodyData = {
        startDate: values.startDate,
        endDate: values.endDate,
        duration: values.duration,
        description: values.description,
      };

      formData.append("bodyData", JSON.stringify(bodyData));

      const res = await addAddpromotion(formData);

      if (res) {
        message.success(res?.data?.message);
        form.resetFields();
        setFileList([]);
        setOpenAddModal(false);
      } else {
        message.error(message?.data?.error);
      }
    } catch (error) {
      console.error(error);
      message.error(message?.data?.error);
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
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-4">
          Add promotional
        </h2>

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
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            multiple={true}
            accept="image/*,video/*"
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>

          {/* Date, Time, Duration */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Form.Item label="Start Date" name="startDate" className="mb-0">
              <DatePicker
                placeholder="Start Date"
                className="w-full"
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item label="End Date" name="endDate" className="mb-0">
              <DatePicker
                placeholder="End Date"
                className="w-full"
                style={{ height: 40 }}
              />
            </Form.Item>
            {/* <Form.Item label="Duration" name="duration" className="mb-0">
              <Input
                type="number"
                placeholder="Duration"
                className="w-full"
                style={{ height: 40 }}
              />
            </Form.Item> */}
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
};

export default AddPromotionModal;
