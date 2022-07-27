import { Button, Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import routesList from "../../../routes/routesList.json";
import UsersTable from "./UsersTable";

export function UsersList() {
  const history = useNavigate();
  return (
    <>
      <h1>Usuários</h1>
      <UsersTable />
      <Stack>
        <NavLink to={routesList.registerUser}>
          <Button
            style={{ alignSelf: "center", margin: "2em" }}
            variant="contained"
          >
            Cadastrar usuário
          </Button>
        </NavLink>
      </Stack>
    </>
  );
}
