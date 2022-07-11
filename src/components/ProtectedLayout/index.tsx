import { Typography } from "@mui/material";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider/useAuth";
import routesList from "../../routes/routesList.json";

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
        <div style={{height: 'fit-content', width: '100vw'}}>
          <h1>Não autorizado</h1>
          <Typography>
            Você precisa fazer o login para acessar essa página.
          </Typography>
          <Button style={{margin: '1em'}} href={routesList.login}>Fazer login</Button>
        </div>
      </Container>
    );
  } else {
    return children;
  }
};
