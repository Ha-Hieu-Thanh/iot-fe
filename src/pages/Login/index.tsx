import React from "react";
// import { Redirect, useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
import _ from "lodash";
import styles from "./style.module.scss";
import { Card, Input, Button, Form, Row, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { login } from "utils/helper/authentication";
import { Link, Navigate } from "react-router-dom";
import { handleSuccessMessage } from "utils/helper/common";
// import { login } from 'api/authentication';
// import { handleErrorMessage } from 'helper';

export default function Login() {
  // const history = useHistory();
  const { t } = useTranslation();

  const navigateToSignUp = () => {};
  const handleSubmit = async (payload: any) => {
    login(payload);
    handleSuccessMessage("Đăng nhập thành công");
  };

  const isAuthenticated = !!Cookies.get("token");
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className={styles.loginContainer}>
      <Card bordered className={styles.loginForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>{t("common.login")}</h2>
          </Row>
          <Form.Item
            label={t("common.email")}
            name="email"
            rules={[
              {
                required: true,
                message: t("validate.usernameRequired"),
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("common.password")}
            name="password"
            rules={[
              { required: true, message: t("validate.passwordRequired") },
            ]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox> {t("common.rememberMe")}</Checkbox>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              {t("common.login").toUpperCase()}
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button
              block
              type="dashed"
              htmlType="button"
              onClick={navigateToSignUp}
            >
              <Link to={"/sign-up"}>{t("common.signUp").toUpperCase()}</Link>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
