import { Checkbox, Form, Input, message } from "antd";
import img from '../assets/header/auth.png'
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../page/redux/api/userApi";
const ResetPass = () => {

   const navigate = useNavigate()
     const [resetPassword] = useResetPasswordMutation()



  const onFinish = async (values) => {
    
    console.log(values);

    const data = {
      email: localStorage.getItem("email"),
      password: values?.password,
   
    };

    try {
      const result = await resetPassword({ data }).unwrap();
      message.success(result?.message);
      navigate("/login");
    } catch (error) {
      message.error(error?.data?.message || "Error resetting password.");
    }
  };
  return (
    <div className="min-h-screen grid grid-cols-2 bg-[#F7F0ED]">
      <div className=" min-h-screen flex items-center justify-center">
        <div className="">
          <div className=" md:px-16 px-5 py-16  w-[600px] ">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Set a new password
              </h2>
              <p className="pb-7">
                Create a new password. Ensure it differs from previous ones for
                security
              </p>
            </div>
            <Form
              name="reset-password"
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please set your password!" },
                  {
                    min: 8,
                    max: 10,
                    message: "Password must be 8-10 characters long!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border  rounded-md"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2 border  rounded-md"
                />
              </Form.Item>

              <Form.Item>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#D17C51] text-white rounded-md"
                >
                  Reset
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img className="h-screen w-full" src={img} alt="" />
      </div>
    </div>
  );
};

export default ResetPass;
