import { Button, Stack } from "@mui/material";
import { NavBar } from "../NavBar";
import UsersTable from "./UsersTable";

export function UsersList() {
  return (
    <>
      <NavBar/>
      <h1>Usuários</h1>
      <UsersTable />
      <Stack>
        <Button href="/users/register-user" style={{alignSelf: 'center', margin: '2em'}} variant="contained">Cadastrar usuário</Button>
      </Stack>
    </>
  );
}
