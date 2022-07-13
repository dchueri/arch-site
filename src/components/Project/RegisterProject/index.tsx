import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routesList from "../../../routes/routesList.json";
import { Api } from "../../../services/api";
import { NavBar } from "../../NavBar";
import ProjectServices from "../services";

export default function RegisterProject() {
  const theme = createTheme();
  const history = useNavigate();
  const [date, setDate] = useState<Date | null>(null);
  const [userNames, setUserNames] = useState<string[]>([]);
  const [nameOfResponsible, setNameOfResponsible] = useState("");
  const [userIds, setUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (userNames.length < 1) {
      Api.get("https://dcode-arch-app.herokuapp.com/user").then((res) => {
        let names = [];
        let ids = [];
        for (let i = 0; i < res.data.length; i++) {
          names.push(res.data[i].name);
          ids.push(res.data[i].id);
        }
        setUserNames(names);
        setUserIds(ids);
      });
    }
  });

  const handleChange = (newValue: Date | null) => {
    setDate(newValue!);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const clientName = data.get("clientName")!.toString() || "";
    const description = data.get("description")!.toString() || "";
    const idOfResponsible = ProjectServices.catchUserIdByName(
      nameOfResponsible,
      userNames,
      userIds
    );
    const price = data.get("price")!.toString();
    const numberOfInstallments = data.get("numberOfInstallments")!.toString();
    let dealDate;
    if (date === null) {
      setDate(new Date());
      let newDate = new Date();
      dealDate = moment(newDate).format("YYYY-MM-DD");
    } else {
      dealDate = moment(date).format("YYYY-MM-DD");
    }

    const project = {
      clientName: clientName,
      idOfResponsible: idOfResponsible,
      description: description,
      price: parseFloat(price),
      numberOfInstallments: parseInt(numberOfInstallments),
      dealDate: dealDate,
    };
    ProjectServices.createProject(project).then(() =>
      history(routesList.projectsList)
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="black">
            Cadastrar Projeto
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="clientName"
                  required
                  fullWidth
                  id="clientName"
                  label="Nome do Cliente"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  onChange={(event, value) => setNameOfResponsible(value!)}
                  disablePortal
                  id="idOfResponsible"
                  options={userNames}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Responsável" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Descrição"
                  name="description"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={date}
                    inputFormat="dd/MM/yyyy"
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    label="Data do acordo"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  label="Preço"
                  id="price"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="numberOfInstallments"
                  label="Número de parcelas"
                  id="numberOfInstallments"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
