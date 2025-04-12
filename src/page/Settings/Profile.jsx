import { useState } from "react";
import {  Form, Input } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { PasswordTab } from "./PasswordTab";
import { Navigate } from "../../Navigate";




const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  const [form] = Form.useForm();
  const [image, setImage] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  

  const handleProfileUpdate = async (values) => {
   
   
  };

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form
          layout="vertical"
          form={form}
          onFinish={handleProfileUpdate} 
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Edit Your Profile
          </h2>
          <Form.Item
            name="first"
            label="First Name"
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input className="py-2" placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="last"
            label="Last Name"
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input className="py-2" placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ type: "email", message: "Invalid email format!" }]}
          >
            <Input className="py-2" placeholder="Email" disabled />
          </Form.Item>

          <Form.Item
            name="contactNo"
            label="Contact No."
            rules={[
              { required: true, message: "Please enter your contact number!" },
            ]}
          >
            <Input className="py-2" placeholder="Contact No" />
          </Form.Item>

          <Form.Item>
           <div className="flex justify-center">
           <button className="bg-[#9C5F46] text-white py-2 px-5" type="submit" htmlType="submit" block>
              Save Changes
            </button>
           </div>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: <PasswordTab />,
    },
  ];

  return (
    <div className="p-1">
      <Navigate title={'Profile'}></Navigate>
      <div className="">
      <div className="max-w-xl mx-auto mt-8 rounded-lg p-6 ">
      {/* Profile Picture Section */}
      <div className="text-center mb-6">
        <div className="relative w-[140px] h-[124px] mx-auto">
          <input
            type="file"
            onChange={handleImageChange}
            id="img"
            style={{ display: "none" }}
          />
          <img
            style={{ width: 140, height: 140, borderRadius: "100%" }}
            src={`${
              image
                ? URL.createObjectURL(image)
                : `ff`
            }`}
            alt="Admin Profile"
          />
          {activeTab === "1" && (
            <label
              htmlFor="img"
              className="absolute top-[80px] -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              <IoCameraOutline className="text-black " />
            </label>
          )}
        </div>

        <p className="text-lg font-semibold mt-4">
          name
        </p>
      </div>

      {/* Custom Tabs Section */}
      <div className="mb-4">
        <div className="flex space-x-6 justify-center mb-4">
          {tabItems.map((item) => (
            <button
              key={item.key}
              className={`py-2 font-medium ${
                activeTab === item.key
                  ? "border-b border-[#9C5F46] text-[#9C5F46]"
                  : "text-black hover:text-[#02111E]"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div>{tabItems.find((item) => item.key === activeTab)?.content}</div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Profile;
