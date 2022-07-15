import { Button, Stack } from "@mui/material";
import routesList from "../../../routes/routesList.json";
import UsersTable from "./UsersTable";

export function UsersList() {
  return (
    <>
      <h1>Usuários</h1>
      <UsersTable />
      <Stack>
        <Button href={routesList.registerUser} style={{alignSelf: 'center', margin: '2em'}} variant="contained">Cadastrar usuário</Button>
      </Stack>
    </>
  );
}
