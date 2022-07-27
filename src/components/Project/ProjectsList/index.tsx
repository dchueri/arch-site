import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import routesList from "../../../routes/routesList.json";
import ProjectsTable from "./ProjectsTable";

export function ProjectsList() {
  return (
    <>
      <h1>Projetos</h1>
      <ProjectsTable />
      <Stack>
        <NavLink
          to={routesList.registerProject}
          style={{ alignSelf: "center", margin: "2em" }}
        >
          <Button
            variant="contained"
          >
            Cadastrar projeto
          </Button>
        </NavLink>
      </Stack>
    </>
  );
}
