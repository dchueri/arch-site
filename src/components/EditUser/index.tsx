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
import { FocusEventHandler, useEffect, useState } from "react";
import { IUserEditEntity, IUserEntity } from "../../context/AuthProvider/types";
import { useNavigate, useParams } from "react-router-dom";
import { Divider, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export default function EditUser() {
  const [user, setUser] = useState<IUserEntity>();
  const [role, setRole] = useState("");
  const [mail, setMail] = useState('');
  const theme = createTheme();
  const params = useParams();
  const count = 0;
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const newUser = await UserService.findOne(params.userId || "");
      setUser(newUser);
      setRole(newUser.role);
      setMail(newUser.email);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString() || "";
    const password = data.get("password")?.toString() || "";
    const passwordConfirmation =
      data.get("passwordConfirmation")?.toString() || "";
    const email = data.get("email")?.toString() || "";
    const role = data.get("role")?.toString() || "";
    const infoUser = {
      id: params.userId || "",
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      role: role,
    };
    if (infoUser.password === infoUser.passwordConfirmation) {
      if (Validations.verifyPasswordLength(password) || password.length == 0) {
        if (Validations.verifyNameLength(name)) {
          if (Validations.verifyIfIsEmail(email)) {
            if (email == mail) {
              console.log(mail)
              if (infoUser.password.length > 0) {
                await UserService.editUser(
                  infoUser.id,
                  infoUser.name,
                  infoUser.email,
                  infoUser.role,
                  infoUser.password
                ).then(message.success("Usuário atualizado com sucesso."));
              } else {
                await UserService.editUser(
                  infoUser.id,
                  infoUser.name,
                  infoUser.email,
                  infoUser.role
                ).then(message.success("Usuário atualizado com sucesso."));
              }
            } else {
              if (await Validations.verifyIfEmailExists(email)) {
                if (infoUser.password.length > 0) {
                  await UserService.editUser(
                    infoUser.id,
                    infoUser.name,
                    infoUser.email,
                    infoUser.role,
                    infoUser.password
                  ).then(message.success("Usuário atualizado com sucesso."));
                } else {
                  await UserService.editUser(
                    infoUser.id,
                    infoUser.name,
                    infoUser.email,
                    infoUser.role
                  ).then(message.success("Usuário atualizado com sucesso."));
                }
              } else {
                return message.error("E-mail já cadastrado.");
              }
            }
          } else {
            return message.error("E-mail inválido.");
          }
        } else {
          return message.error("Nome inválido.");
        }
      } else {
        message.error("A senha deve possuir no mínimo 6 caracteres.");
      }
    } else {
      message.error("As senhas devem ser iguais.");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const handleUser = (event: any) => {
    if (event.target.value != null) {
      setUser(event.target.value);
    }
  };

  const handleDeleteUser = async () => {
    await UserService.deleteUser(user?.id || "").then(() => {
      history("/users");
      message.success("Usuário excluído com sucesso.");
    });
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
                  name="name"
                  fullWidth
                  id="name"
                  label="Nome"
                  value={user?.name}
                  onChange={handleUser}
                  focused
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  fullWidth
                  id="role"
                  name="role"
                  value={role}
                  label="Cargo"
                  onChange={handleChange}
                >
                  <MenuItem value="GUEST">Administrador</MenuItem>
                  <MenuItem value="EMPLOYER">Projetista</MenuItem>
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
                  onChange={handleUser}
                  focused
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
                  name="passwordConfirmation"
                  label="Repita a nova senha"
                  type="password"
                  id="passwordConfirmation"
                  autoComplete="password-confirmation"
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
                type="button"
                onClick={handleDeleteUser}
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
