import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import {
  AppBar,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Fragment } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import routesList from "../../routes/routesList.json";

export function NavBar() {
  const auth = useAuth();
  const pages = ["Usuários", "Projetos"];
  const user = getUserLocalStorage();

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

  if (user && user.role == "ADMIN") {
    return (
      <AppBarS position="static" className="nav-bar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
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
            <Stack direction="row" spacing={2}>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <Fragment>
                    <ButtonS
                      sx={{ my: 2, color: "white", display: "block" }}
                      {...bindTrigger(popupState)}
                    >
                      Relatórios
                    </ButtonS>
                    <Menu {...bindMenu(popupState)}>
                      <Link href={routesList.completeReport}>
                        <MenuItem onClick={popupState.close}>
                          Relatório completo
                        </MenuItem>
                      </Link>
                      <Link href={routesList.userReport}>
                        <MenuItem onClick={popupState.close}>
                          Relatório por projetista
                        </MenuItem>
                      </Link>
                      <Link href={routesList.monthlyReport}>
                        <MenuItem onClick={popupState.close}>
                          Relatório mensal
                        </MenuItem>
                      </Link>
                    </Menu>
                  </Fragment>
                )}
              </PopupState>
            </Stack>
            <Stack direction="row" spacing={2}>
              <ButtonS
                key="my-profile"
                href={routesList.myProfile}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Meu perfil
              </ButtonS>
            </Stack>
          </Box>
          <Stack direction="row" spacing={2}>
            <ButtonS
              key="my-profile"
              href={routesList.myProfile}
              sx={{ my: 2, color: "white", display: "block", margin: "0 1em" }}
            >
              {user.name}
            </ButtonS>
          </Stack>

          <Button
            onClick={logout}
            variant="contained"
            color="primary"
            href="/login"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBarS>
    );
  } else if (user && user.role == "PROJETISTA") {
    return (
      <AppBarS position="static" className="nav-bar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
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
                key="project-list"
                href={routesList.myProjects}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Meus Projetos
              </ButtonS>
            </Stack>
            <Stack direction="row" spacing={2}>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <Fragment>
                    <ButtonS
                      sx={{ my: 2, color: "white", display: "block" }}
                      {...bindTrigger(popupState)}
                    >
                      Relatórios
                    </ButtonS>
                    <Menu {...bindMenu(popupState)}>
                      <Link href={routesList.myMonthlyReport}>
                        <MenuItem onClick={popupState.close}>
                          Relatório mensal
                        </MenuItem>
                      </Link>
                    </Menu>
                  </Fragment>
                )}
              </PopupState>
            </Stack>
            <Stack direction="row" spacing={2}>
              <ButtonS
                key="my-profile"
                href={routesList.myProfile}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Meu perfil
              </ButtonS>
            </Stack>
          </Box>
          <Stack direction="row" spacing={2}>
            <ButtonS
              key="my-profile"
              href={routesList.myProfile}
              sx={{ my: 2, color: "white", display: "block", margin: "0 1em" }}
            >
              {user.name}
            </ButtonS>
          </Stack>
          <Button
            onClick={logout}
            variant="contained"
            color="primary"
            href="/login"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBarS>
    );
  } else {
    return <></>;
  }
}
