import { Form, Input, Modal } from 'antd'
import React from 'react'

const ReplyUser = ({openAddModal,setOpenAddModal}) => {
        const [form] = Form.useForm();
        const handleCancel = () => {
            form.resetFields();
          
            setOpenAddModal(false);
          };
    
          const handleSubmit = async (values) => {
           console.log(values)
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
            name="reply"
            rules={[{ required: true, message: "Please enter the reply" }]}
          >
            <Input.TextArea placeholder="Enter Reply" rows={4} />
          </Form.Item>

          {/* Services Selection */}
          

        
          {/* Buttons */}
          <div className="flex gap-3 mt-3">
          <button
              type="submit"
              className="px-4 py-3 w-full bg-[#D17C51] text-white rounded-md"
             
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
  )
}

export default ReplyUser