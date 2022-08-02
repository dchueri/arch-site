import { Typography } from "@mui/material";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import routesList from "../../routes/routesList.json";

interface ProtectedLayoutProps {
  children: JSX.Element;
  role?: string;
}

export const ProtectedLayout = ({ children, role }: ProtectedLayoutProps) => {
  const Container = styled.div`
    text-align: center;
    height: 80vh;
    display: flex;
    align-items: center;
  `;

  const user = getUserLocalStorage();
  const auth = useAuth();
  const history = useNavigate();
  if(user && role === 'ADMIN' && user?.role === 'PROJETISTA') {
    return (
      <Container>
        <div style={{height: 'fit-content', width: '100vw'}}>
          <h1>Não autorizado</h1>
          <Typography>
            Você não tem autorização para acessar essa página.
          </Typography>
          <Button style={{margin: '1em'}} href={routesList.login}>Fazer login</Button>
        </div>
      </Container>
    );
  }
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
