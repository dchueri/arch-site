import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IUserEntity, UserProps } from "../../context/AuthProvider/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Link, Stack } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import r from "../../context/routes.json";
import { Api } from "../../services/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableContainerS = styled(TableContainer)`
  width: 60vw;
  margin: auto;
`;

export default function UsersTable() {
  const [users, setUsers] = useState<IUserEntity[]>([]);

  useEffect(() => {
    Api.get("https://dcode-arch-app.herokuapp.com/user").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <TableContainerS component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>E-mail</StyledTableCell>
              <StyledTableCell>Cargo</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.name}>
                <StyledTableCell component="th" scope="row">
                  {user.name}
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.role}</StyledTableCell>
                <StyledTableCell>
                  <Link href={r.editUser + user.id}>
                    <ModeEditIcon />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerS>
    </>
  );
}
