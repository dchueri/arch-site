import React from "react";
import { useAuth } from "../../context/AuthProvider/useAuth";

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  if (!auth.email) {
    return <h1>Você precisa fazer o login para acessar.</h1>;
  } else {
    return children;
  }
};
