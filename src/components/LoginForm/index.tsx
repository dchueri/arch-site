import { Button, Form, message } from "antd";
import "antd/dist/antd.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider/useAuth";
import routesList from "../../routes/routesList.json";
import "./style.css";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const history = useNavigate()

  const ButtonStyle = styled(Button)`
    font-weight: 500;
  `;

  async function onFinish(values: { email: string; password: string }) {
    values.email = email;
    values.password = password;
    try {
      await auth.authenticate(values.email, values.password);
      history(routesList.myProfile);
    } catch (e) {
      console.log(e)
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
                required
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
                required
              />
              <span className="focus-input" data-placeholder="Senha" />
            </Form.Item>

            <div className="container-login-form-btn">
              <ButtonStyle
                type="primary"
                htmlType="submit"
                className="login-form-btn"
              >
                Entrar
              </ButtonStyle>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
