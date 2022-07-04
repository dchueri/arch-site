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
import 'antd/dist/antd.css';

function App() {
  const auth = useAuth();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route
            path="me"
            element={
              <ProtectedLayout>
                <NavBar/>
              </ProtectedLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
