import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IProjectEntity } from "../../context/ProjectProvider/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Link, Stack } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import r from "../../context/routes.json";
import { Api } from "../../services/api";
import { getUserLocalStorage } from "../../context/AuthProvider/util";
import { IUserEntity } from "../../context/AuthProvider/types";
import UserService from "../EditUser/services";

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

export default function ProjectsTable() {
  const [projects, setProjects] = useState<IProjectEntity[]>([]);
  const [users, setUsers] = useState<IUserEntity[]>([]);

  useEffect(() => {
    Api.get("https://dcode-arch-app.herokuapp.com/user").then((res) => {
      setUsers(res.data);
    });
    Api.get("https://dcode-arch-app.herokuapp.com/contract").then((res) => {
      setProjects(res.data);
    });
  }, []);

  const catchName= (id: string) => {
    return users.map(u => {
        if(u.id === id) {
            return u.name
        }
    })
  };

  return (
    <>
      <TableContainerS component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell>Responsável</StyledTableCell>
              <StyledTableCell>Prazo da primeira entrega</StyledTableCell>
              <StyledTableCell>Preço</StyledTableCell>
              <StyledTableCell>Quantidade de parcelas</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((projects) => (
              <StyledTableRow key={projects.clientName}>
                <StyledTableCell component="th" scope="row">
                  {projects.clientName}
                </StyledTableCell>
                <StyledTableCell>{projects.description}</StyledTableCell>
                <StyledTableCell>{catchName(projects.idOfResponsible)}</StyledTableCell>
                <StyledTableCell>{projects.firstDeliveryDate}</StyledTableCell>
                <StyledTableCell>{projects.price}</StyledTableCell>
                <StyledTableCell>
                  {projects.numberOfInstallments}
                </StyledTableCell>
                <StyledTableCell>
                  <Link href={r.editProject + projects.id}>
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
