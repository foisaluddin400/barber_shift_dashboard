import { Form, Modal, Upload, DatePicker, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useUpdateAddPromotionMutation } from "../redux/api/manageApi";

const EditPromotionModal = ({ editModal, setEditModal, selectedUser }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [updateAddPromotion] = useUpdateAddPromotionMutation();

  const onChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setEditModal(false);
  };
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

  useEffect(() => {
    if (selectedUser && editModal) {
      form.setFieldsValue({
        startDate: selectedUser.startDate
          ? dayjs(selectedUser.startDate, "DD/MM/YYYY")
          : null,
        endDate: selectedUser.endDate
          ? dayjs(selectedUser.endDate, "DD/MM/YYYY")
          : null,
        duration: selectedUser.duration || "",
        description: selectedUser.title || "",
      });

      setFileList(
        selectedUser.imageList?.map((file, index) => {
          const isVideo = file.endsWith(".mp4");
          return {
            uid: `-${index}`,
            name: `file-${index}`,
            status: "done",
            url: file,
            thumbUrl: isVideo ? "" : file,
            isVideo,
          };
        }) || []
      );
    }
  }, [selectedUser, editModal, form]);

const handleSubmit = async (values) => {
  const id = selectedUser?.key;

  try {
    const formData = new FormData();

    fileList.forEach((file) => {
    
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      } 
    });

    const bodyData = {
      startDate: values.startDate?.format("YYYY-MM-DD"),
      endDate: values.endDate?.format("YYYY-MM-DD"),
      duration: values.duration,
      description: values.description,
    };

    formData.append("bodyData", JSON.stringify(bodyData));

    const res = await updateAddPromotion({ formData, id });

    if (res) {
      message.success(res?.data?.message);
      form.resetFields();
      setFileList([]);
      setEditModal(false);
    } else {
      message.error(res?.data?.error || "Update failed");
    }
  } catch (error) {
    console.error(error);
    message.error("Something went wrong!");
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
      <div className="mb-6 mt-2">
        <h2 className="text-center font-semibold text-xl mb-4">
          Edit promotional
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
            itemRender={(originNode, file) => {
              if (file.isVideo) {
                return (
                  <video
                    src={file.url}
                    controls
                    style={{ width: "100%", height: "100%", borderRadius: 8 }}
                  />
                );
              }
              return originNode;
            }}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>

          {/* Date, Duration */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Form.Item label="Start Date" name="startDate" className="mb-0">
              <DatePicker
                placeholder="Start Date"
                className="w-full"
                style={{ height: 40 }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
            <Form.Item label="End Date" name="endDate" className="mb-0">
              <DatePicker
                placeholder="End Date"
                className="w-full"
                style={{ height: 40 }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
            <Form.Item label="Duration" name="duration" className="mb-0">
              <Input
                type="number"
                placeholder="Duration"
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
            Update
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default EditPromotionModal;
