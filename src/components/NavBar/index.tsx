import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import {
  AppBar,
  Box, IconButton,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider/useAuth";
import routesList from "../../routes/routesList.json";

export function NavBar() {
  const auth = useAuth();
  const pages = ["Usuários", "Projetos"];

  const ButtonS = styled(Button)`
    font-weight: 800;
    :hover {
      color: rgba(255, 255, 255, 0.7);
    }
  `;

  const AppBarS = styled(AppBar)`
    margin-bottom: 2em;
  `;

  function logout() {
    try {
      auth.logout();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AppBarS position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <MapsHomeWorkIcon />
        </IconButton>
        <Typography
          fontWeight="800"
          variant="h6"
          component="div"
          maxWidth="fit-content"
          sx={{ flexGrow: 1 }}
        >
          ArchApp
        </Typography>

        <Box
          padding="0 2em"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          <Stack direction="row" spacing={2}>
            <ButtonS
              key="users-list"
              href={routesList.usersList}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Usuários
            </ButtonS>
          </Stack>
          <Stack direction="row" spacing={2}>
            <ButtonS
              key="project-list"
              href={routesList.projects}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Projetos
            </ButtonS>
          </Stack>
        </Box>

        <Button onClick={logout} variant="contained" color="primary">
          Logout
        </Button>
      </Toolbar>
    </AppBarS>
  );
}
