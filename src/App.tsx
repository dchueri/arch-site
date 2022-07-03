import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthProvider } from "./context/AuthProvider";
import "./style.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route
            path="/me"
            element={
              <ProtectedLayout>
                <h1>Logado</h1>
              </ProtectedLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
