import { Form, Input, Button, Card, Row, Modal } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import * as _ from "lodash";
import { signUp, verifyCode } from "api/authentication";
import { handleErrorMessage, handleSuccessMessage } from "utils/helper/common";
import { history } from "../../App";

export default function SignUp() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [codeForm] = Form.useForm();
  const [codeVisible, setCodeVisible] = useState(false);
  const [email, setEmail] = useState<string>("");
  const navigateToLogIn = () => {};

  const handleSubmit = async (payload: any) => {
    payload = _.omit(payload, "passwordConfirm");
    const response = await signUp(payload);
    setEmail(payload.email);
    if (response?.response?.statusCode === 400) {
      handleErrorMessage(response?.response?.devMessage);
    } else {
      setCodeVisible(true);
    }
  };

  const handleSubmitCode = async (code: string) => {
    // Handle the submitted code here
    const payload = {
      email,
      code,
    };
    console.log("Submitted code:", payload);
    const response = await verifyCode(payload);
    if (response?.response?.statusCode === 400) {
      handleErrorMessage(response?.response?.devMessage);
    } else {
      handleSuccessMessage("Đăng ký thành công");
      history.push("/login");
    }
    setCodeVisible(false);
  };

  const validatePasswordConfirm = (
    _: any,
    value: string,
    callback: (error?: string) => void
  ) => {
    const { getFieldValue } = form;
    if (value && value !== getFieldValue("password")) {
      callback("Mật khẩu xác nhận không khớp");
    } else {
      callback();
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <Card bordered className={styles.signUpForm}>
        <Form form={form} onFinish={handleSubmit}>
          <Row justify="center">
            <h2>Đăng ký</h2>
          </Row>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email",
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: t("validate.passwordRequired") },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="passwordConfirm"
            rules={[
              { required: true, message: t("validate.passwordRequired") },
              { validator: validatePasswordConfirm },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button
              block
              type="dashed"
              htmlType="button"
              onClick={navigateToLogIn}
            >
              <Link to={"/login"}>Đăng nhập</Link>
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Enter 6-digit Code"
        visible={codeVisible}
        onCancel={() => setCodeVisible(false)}
        onOk={() => codeForm.submit()}
      >
        <Form form={codeForm} onFinish={({ code }) => handleSubmitCode(code)}>
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please enter the code",
              },
              {
                len: 6,
                message: "Please enter a 6-digit code",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
