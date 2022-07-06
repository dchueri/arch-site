import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavBar } from "../NavBar";
import UserService from "./services";
import Validations from "../../validations/Validations";
import { message } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { IUserEntity } from "../../context/AuthProvider/types";
import { useParams } from "react-router-dom";
import { Divider, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import * as yup from 'yup';

export default function EditUser() {
  const [user, setUser] = useState<IUserEntity>();
  const [age, setAge] = useState('');
  const theme = createTheme();
  const params = useParams();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString() || "";
    const password = data.get("password")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    console.log(`name: ${name}, email: ${email}, password: ${password}`);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  //------CHECKP-----------
/*   const schema = Yup.object().shape({
    name: Yup.string().notRequired().min(3, "O nome deve ter mais de 3 letras"),
    email: Yup.string().email().notRequired(),
    oldPassword: Yup.string().notRequired(),
    password: Yup.string().notRequired().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: Yup.string().
        onOf([Yup.ref('password'), null],'Passwords must match')
  }) */

  useEffect(() => {
    UserService.findOne(params.userId || "").then((res) => {
      setUser(res);
    });
  }, []);

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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <>Editar Usuário</>
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  fullWidth
                  id="name"
                  label="Nome"
                  value={user?.name}
                  focused={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  fullWidth
                  id="cargo"
                  value={age}
                  label="Cargo"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Administrador</MenuItem>
                  <MenuItem value={2}>Projetista</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={user?.email}
                  focused={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Nova senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Repita a nova senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
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
                type="submit"
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Excluir Usuário
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
