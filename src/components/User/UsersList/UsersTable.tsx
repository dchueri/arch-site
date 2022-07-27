import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IUserEntity } from "../../../context/AuthProvider/types";
import { getUserLocalStorage } from "../../../context/AuthProvider/util";
import routesList from "../../../routes/routesList.json";
import { Api } from "../../../services/api";

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

export default function UsersTable() {
  const [users, setUsers] = useState<IUserEntity[]>([]);
  const me = getUserLocalStorage();

  useEffect(() => {
    let arr: Array<IUserEntity> = [];
    Api.get("https://dcode-arch-app.herokuapp.com/user").then((res) => {
      arr = res.data;
      arr.map((u) => (u.id == me.id ? arr.splice(arr.indexOf(u), 1) : null));
      setUsers(arr);
    });
  }, []);

  return (
    <>
      <TableContainer sx={{ width: "60vw", margin: "auto" }} component={Paper}>
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
                  <NavLink
                    to={routesList.editUser + user.id}
                    style={{ alignSelf: "center", margin: "2em" }}
                  >
                    <ModeEditIcon />
                  </NavLink>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
