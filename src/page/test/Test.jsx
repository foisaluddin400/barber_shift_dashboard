import React, { useState } from "react";

import { Form } from "../../Ui/formField/Form";
import { FormItem } from "../../Ui/formField/FormItem";
import { TextInput } from "../../Ui/FormField/TextInput";
import { PasswordInput } from "../../Ui/FormField/PasswordInput";
import { Button } from "../../Ui/FormField/Button";
import { SelectInput } from "../../Ui/FormField/SelectField";

const TestPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Submitted:", values);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form onFinish={onFinish}>
        <FormItem   rules={[{ required: true, message: "Please select a Username" }]} label="Username" name="username">
          <TextInput placeholder="Enter username" />
        </FormItem>

        <FormItem  rules={[{ required: true, message: "Please select a Password" }]} label="Password" name="password">
          <PasswordInput placeholder="Enter password" />
        </FormItem>

        <FormItem  rules={[{ required: true, message: "Please select a Select Field" }]} label="Role" name="role">
          <SelectInput
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
        </FormItem>

        <Button loading={loading}>Submit</Button>
      </Form>
    </div>
  );
};

export default TestPage;
