import { Button, Stack } from "@mui/material";
import routesList from "../../../routes/routesList.json";
import { NavBar } from "../../NavBar";
import ProjectsTable from "./ProjectsTable";

export function ProjectsList() {
  return (
    <>
      <NavBar/>
      <h1>Projetos</h1>
      <ProjectsTable />
      <Stack>
        <Button href={routesList.registerProject} style={{alignSelf: 'center', margin: '2em'}} variant="contained">Cadastrar projeto</Button>
      </Stack>
    </>
  );
}