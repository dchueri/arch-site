import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { IUserEntity } from "../../../context/AuthProvider/types";
import { getUserLocalStorage } from "../../../context/AuthProvider/util";
import UserServices from "../services";

export default function MyProfile() {
  const [user, setUser] = useState<IUserEntity | null>();
  const [mail, setMail] = useState("");
  const theme = createTheme();
  const params = getUserLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      const newUser = await UserServices.findOne(params.id!);
      setUser(newUser);
      setMail(newUser.email);
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submit = {
      id: params!.id,
      name: user!.name,
      password: data.get("password")?.toString() || "",
      passwordConfirmation: data.get("passwordConfirmation")?.toString() || "",
      email: user!.email,
      role: params.role,
    };
    await UserServices.submitEditForm(submit, mail);
  };

  const handleName = (event: any) => {
    if (event.target.value != null) {
      setUser({...user!, name: event.target.value});
    }
  };

  const handleEmail = (event: any) => {
    if (event.target.value != null) {
      setUser({...user!, email: event.target.value});
    }
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
            <>Editar Usuário</>
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  fullWidth
                  id="name"
                  label="Nome"
                  value={user?.name}
                  onChange={handleName}
                  focused
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  value={user?.email}
                  onChange={handleEmail}
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
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
