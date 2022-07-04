import axios from "axios";
import React, { useEffect, useState } from "react";
import { IUserEntity } from "../../context/AuthProvider/types";
import { NavBar } from "../NavBar";
import UsersTable from "./UsersTable";

export function UsersList() {
  return (
    <>
      <NavBar />
      <h1>Usuários</h1>
      <UsersTable />
    </>
  );
}
