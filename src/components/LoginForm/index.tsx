import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const history = useNavigate();
  
  async function onFinish(values: { email: string; password: string }) {
    values.email = email
    values.password = password
    console.log(values)
    try {
      await auth.authenticate(values.email, values.password);
      history("/me");
    } catch (e) {
      message.error("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="container">
      <div className="container-login">
        <div className="login-area">
          <Form className="login-form" onFinish={onFinish}>
            <h1>Bem vindo!</h1>
            <Form.Item name="email" className="login-form-input">
              <Input
                type="email"
                className={email !== "" ? "has-val input" : "input"}
                onChange={(e) => {setEmail(e.target.value)}}
              />
              <span className="focus-input" data-placeholder="E-mail" />
            </Form.Item>
            <Form.Item name="password" className="login-form-input">
              <Input
                type="password"
                className={password !== "" ? "has-val input" : "input"}
                onChange={(e) => {setPassword(e.target.value)}}
              />
              <span className="focus-input" data-placeholder="Senha" />
            </Form.Item>

            <div className="container-login-form-btn">
              <Button htmlType="submit" className="login-form-btn">Login</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
