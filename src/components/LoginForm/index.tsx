import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Input } from "@mui/material";
import styled from "styled-components";
import 'antd/dist/antd.css';

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const history = useNavigate();

  const ButtonStyle = styled(Button)`
    font-weight: 500;
  `

  async function onFinish(values: { email: string; password: string }) {
    values.email = email;
    values.password = password;
    console.log(values);
    try {
      await auth.authenticate(values.email, values.password);
      history("/users");
    } catch (e) {
      message.error("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="login-area">
        <h1>Bem vindo!</h1>
          <Form className="login-form" onFinish={onFinish}>
            <Form.Item name="email" className="login-form-input">
              <input
                type="email"
                className={email !== "" ? "has-val input" : "input"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <span className="focus-input" data-placeholder="E-mail" />
            </Form.Item>
            <Form.Item name="password" className="login-form-input">
              <input
                type="password"
                className={password !== "" ? "has-val input" : "input"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span className="focus-input" data-placeholder="Senha" />
            </Form.Item>

            <div className="container-login-form-btn">
              <ButtonStyle type='primary' htmlType="submit" className="login-form-btn">
                Login
              </ButtonStyle>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
