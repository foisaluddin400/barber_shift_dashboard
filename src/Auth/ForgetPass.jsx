import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import img from "../assets/header/auth.png";
import { useForgotPasswordMutation } from "../page/redux/api/userApi";

const ForgetPass = () => {
  const [forgetPassword] = useForgotPasswordMutation()
   const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values);

    forgetPassword(values)
      .unwrap()
      .then((payload) => {
        message.success(payload?.message);
        navigate("/verify");
        localStorage.setItem("email", values?.email);
      })
      .catch((error) => message.error(error?.data?.message));
  };

  return (
    <div className="min-h-screen md:grid grid-cols-2 bg-[#F7F0ED]">
      
      <div className=" min-h-screen flex items-center justify-center">
        <div className="">
          <div className=" md:px-16 px-5 py-16  md:w-[600px] rounded">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Forget Password?
              </h2>
              <p className="pb-7">
                Please enter your email to get verification code
              </p>
            </div>
            <Form
              name="forgetPassword"
              layout="vertical"
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                  },
                  {
                    type: "email",
                    message: "Invalid email address",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your Email"
                  className="w-full px-4 py-2 border bg-white rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Item>

              <Form.Item>
              
                  <button
                    type="primary"
                    htmlType="submit"
                    className="w-full py-2 mt-6 bg-[#D17C51] text-white rounded  focus:ring-2 focus:ring-gray-500"
                  >
                    Submit
                  </button>
            
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex justify-center items-center">
              <img className="h-screen w-full" src={img} alt="" />
            </div>
      </div>
    </div>
  );
};

export default ForgetPass;
