import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import routesList from "../../../routes/routesList.json";
import UsersTable from "./UsersTable";

export function UsersList() {
  return (
    <>
      <h1>Usuários</h1>
      <UsersTable />
      <Stack>
        <NavLink to={routesList.registerUser} style={{ alignSelf: "center", margin: "2em" }}>
          <Button
            variant="contained"
          >
            Cadastrar usuário
          </Button>
        </NavLink>
      </Stack>
    </>
  );
}
