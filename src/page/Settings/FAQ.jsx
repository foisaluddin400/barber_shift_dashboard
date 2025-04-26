import { Form, Input, Modal, Button, message } from 'antd';
import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Navigate } from '../../Navigate';

const { TextArea } = Input;

const FAQ = () => {
  const [faqData, setFaqData] = useState([
    { _id: 1, question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
    { _id: 2, question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript recommended by React." }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [form] = Form.useForm();

  const openEditModal = (faq) => {
    setSelectedFaq(faq);
    form.setFieldsValue(faq);
    setIsEditModalOpen(true);
  };

  return (
    <div className=" p-1">
      <Navigate title={'FAQ'}></Navigate>

      <div className="lg:grid grid-cols-2 gap-5 mt-2">
        {faqData.map((faq, i) => (
          <div key={faq._id} className="p-2">
            <p className="pb-3">Question no: {i + 1}</p>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.question}</p>
            <div className="flex justify-between">
              <p className="py-2">Answer</p>
              <div className="flex gap-4">
                <button onClick={() => openEditModal(faq)} className="py-2">
                  Edit
                </button>
                <div className="py-2">
                  <MdDeleteOutline className="text-xl cursor-pointer" />
                </div>
              </div>
            </div>
            <p className="bg-[#F2F2F2] p-2 rounded-md">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-20">
        <button className='px-5 py-2 bg-[#9C5F46] text-white rounded' onClick={() => setIsModalOpen(true)} type="submit" > + Add FAQ </button>
      </div>

      <Modal centered open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <p className="text-center font-semibold pb-5 text-xl">Add FAQ</p>
        <Form form={form}>
          <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button type="primary" shape="round" size="large" style={{ background: "black", borderColor: "#2F799E" }}> Save </Button>
          </div>
        </Form>
      </Modal>

      <Modal centered open={isEditModalOpen} footer={null} onCancel={() => setIsEditModalOpen(false)}>
        <p className="text-center font-semibold pb-5 text-xl">Edit FAQ</p>
        <Form form={form}>
          <Form.Item name="question" rules={[{ required: true, message: 'Please enter a question' }]}>
            <Input placeholder="Type question here..." />
          </Form.Item>
          <Form.Item name="answer" rules={[{ required: true, message: 'Please enter an answer' }]}>
            <TextArea rows={4} placeholder="Type answer here..." />
          </Form.Item>
          <div className="flex items-center justify-center mt-2">
            <Button type="primary" shape="round" size="large" style={{ background: "black", borderColor: "#2F799E" }}> Save </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQ;