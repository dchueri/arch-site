import { Button } from "antd";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { NavBar } from "./components/NavBar";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/AuthProvider/useAuth";
import { getUserLocalStorage } from "./context/AuthProvider/util";

import { UsersList } from "./components/UsersList";
import r from "./context/routes.json";
import RegisterUser from "./components/RegisterUser";
import { createTheme, ThemeProvider } from "@mui/material";
import { ThemeConsumer } from "styled-components";

function App() {
  const auth = useAuth();
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={r.login} element={<LoginForm />} />
            <Route
              path={r.usersList}
              element={
                <ProtectedLayout>
                  <UsersList />
                </ProtectedLayout>
              }
            />
            <Route
              path={r.registerUser}
              element={
                <ProtectedLayout>
                  <RegisterUser />
                </ProtectedLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
