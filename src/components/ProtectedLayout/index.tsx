import { Title, TitleOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { margin } from "@mui/system";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider/useAuth";
import r from "../../context/routes.json";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const Container = styled.div`
    text-align: center;
    height: 100vh;
    display: flex;
    align-items: center;
  `

  const auth = useAuth();
  const history = useNavigate();
  if (!auth.email) {
    return (
      <Container>
        <body style={{height: 'fit-content'}}>
          <h1>Não autorizado</h1>
          <Typography>
            Você precisa fazer o login para acessar essa página.
          </Typography>
          <Button style={{margin: '1em'}} href={r.login}>Fazer login</Button>
        </body>
      </Container>
    );
  } else {
    return children;
  }
};
