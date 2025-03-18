import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";


export const PasswordTab = () => {
 

  const [passError, setPassError] = useState("");
  const navigate = useNavigate(); 

  const handlePasswordChange = async (values) => {
    if (values?.newPassword === values.oldPassword) {
      return setPassError("Your old password cannot be your new password.");
    }
    if (values?.newPassword !== values?.confirmPassword) {
      return setPassError("Confirm password doesn't match.");
    } else {
      setPassError("");
    }

    
    const data = {
      id: adminId,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };


    // try {
    //   await changePassword(data).unwrap(); 
    //   message.success("Password updated successfully!");
    //   localStorage.removeItem("accessToken"); 
    //   navigate("/login"); 
    // } catch (error) {
    //   message.error(error?.data?.message || "Failed to update password.");
    // }
  };

  return (
    <div>
    <Form layout="vertical" onFinish={handlePasswordChange}>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Change Your Password
      </h2>

      <Form.Item
        name="oldPassword"
        label="Old Password"
        rules={[
          { required: true, message: "Please enter your current password!" },
        ]}
      >
        <Input.Password className="py-2" placeholder="Old Password" />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          { required: true, message: "Please enter a new password!" },
        ]}
      >
        <Input.Password className="py-2" placeholder="New Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={["newPassword"]}
        rules={[
          { required: true, message: "Please confirm your new password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Passwords do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password className="py-2" placeholder="Confirm Password" />
      </Form.Item>

      {/* Display error if password validations fail */}
      {passError && (
        <p className="text-red-500 text-sm mb-2">{passError}</p>
      )}

      <Form.Item>
      <div className="flex justify-center">
           <button className="bg-[#9C5F46] text-white py-2 px-5" type="submit" htmlType="submit" block>
              Update
            </button>
           </div>
      </Form.Item>
    </Form>
  </div>
  )
}
