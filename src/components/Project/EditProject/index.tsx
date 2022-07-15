import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Autocomplete,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import * as React from "react";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProjectEntity } from "../../../context/ProjectProvider/types";
import { Api } from "../../../services/api";
import ProjectServices from "../services";

export default function EditProject() {
  const [project, setProject] = useState<IProjectEntity>();
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [idOfResponsible, setIdOfResponsible] = useState("");
  const [nameOfResponsible, setNameOfResponsible] = useState("");
  const [userNames, setUserNames] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [date, setDate] = useState<Date>();
  const theme = createTheme();
  const params = useParams() || "";
  const history = useNavigate();

  useLayoutEffect(() => {
    async function fetchData() {
      const resProject = await ProjectServices.findOne(params.projectId!);
      setProject(resProject);
      if (userNames.length < 1) {
        await Api.get("https://dcode-arch-app.herokuapp.com/user").then(
          (res) => {
            let names = [];
            let ids = [];
            for (let i = 0; i < res.data.length; i++) {
              names.push(res.data[i].name);
              ids.push(res.data[i].id);
            }
            setUserNames(names);
            setUserIds(ids);
            const newUserName = ProjectServices.catchUserNameById(
              resProject.idOfResponsible,
              names,
              ids
            );
            setNameOfResponsible(newUserName);
          }
        );
      }
      setClientName(resProject.clientName);
      setDescription(resProject.description);
      setIdOfResponsible(resProject.idOfResponsible);
      setDate(resProject.dealDate);
    }
    if (!project) {
      fetchData();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let dealDate;
    if (date === null) {
      setDate(new Date());
      let newDate = new Date();
      dealDate = moment(newDate).format("YYYY-MM-DD");
    } else {
      dealDate = moment(date).format("YYYY-MM-DD");
      console.log(dealDate);
    }

    const newProject = {
      id: project!.id,
      clientName: project!.clientName,
      idOfResponsible: project!.idOfResponsible,
      description: project!.description,
      price: +project!.price,
      numberOfInstallments: +project!.numberOfInstallments,
      dealDate: dealDate,
    };
    ProjectServices.editProject(newProject).then(res => console.log(res));
    console.log(newProject)
  };

  const handleDate = (newValue: Date | null) => {
    setDate(newValue!);
  };

  const handleClientName = (event: any) => {
    if (event.target.value != null) {
      setProject({ ...project!, clientName: event.target.value });
    }
  };

  const handleDescription = (event: any) => {
    if (event.target.value != null) {
      setProject({ ...project!, description: event.target.value });
    }
  };

  const handleNameOfResponsible = (event: any) => {
    const id = ProjectServices.catchUserIdByName(
      event.target.innerText,
      userNames,
      userIds
    );
    setNameOfResponsible(event.target.innerText);
    setProject({ ...project!, idOfResponsible: id });
  };

  const handleInstallments = (event: any) => {
    if (event.target.value != null) {
      setProject({ ...project!, numberOfInstallments: event.target.value });
    }
  };

  const handlePrice = (event: any) => {
    if (event.target.value != null) {
      setProject({ ...project!, price: event.target.value });
    }
  };

  const handleDeleteProject = async () => {
    ProjectServices.deleteProject(project!.id).then(() => {
      history("/projects");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "-moz-initial" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <>Editar Projeto</>
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="clientName"
                  fullWidth
                  id="clientName"
                  label="Nome do cliente"
                  value={project?.clientName || ""}
                  onChange={handleClientName}
                  required
                  focused
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  onChange={handleNameOfResponsible}
                  id="idOfResponsible"
                  value={nameOfResponsible || ""}
                  options={userNames}
                  renderInput={(params) => (
                    <TextField {...params} label="Responsável" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Descrição"
                  name="description"
                  value={project?.description || ""}
                  onChange={handleDescription}
                  required
                  focused
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={date}
                    inputFormat="dd/MM/yyyy"
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                    label="Data do acordo"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="numberOfInstallments"
                  label="Quantidade de parcelas"
                  name="numberOfInstallments"
                  value={project?.numberOfInstallments || ""}
                  onChange={handleInstallments}
                  focused
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="price">Preço</InputLabel>
                  <OutlinedInput
                    id="price"
                    name="price"
                    value={project?.price || ""}
                    onChange={handlePrice}
                    startAdornment={
                      <InputAdornment position="start">R$</InputAdornment>
                    }
                    label="Preço"
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Atualizar
              </Button>
              <Button
                type="button"
                onClick={handleDeleteProject}
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Excluir Projeto
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
