import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "moment";
import moment from "moment";
import { useEffect, useState } from "react";
import { IUserEntity } from "../../../context/AuthProvider/types";
import { IProjectEntity } from "../../../context/ProjectProvider/types";
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

  const catchName = (id: string) => {
    return users.map((u) => {
      if (u.id === id) {
        return u.name;
      }
    });
  };

  const handleDate = (dateString: string) => {
    const date = moment(dateString, moment.ISO_8601, true).utc();
    return date.format("DD/MM/YYYY");
  };

  const handleFormatPrice = (price: number) => {
    const formated = price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    return formated;
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
                <StyledTableCell>
                  {catchName(projects.idOfResponsible)}
                </StyledTableCell>
                <StyledTableCell>
                  {handleDate(projects.firstDeliveryDate)}
                </StyledTableCell>
                <StyledTableCell>
                  {handleFormatPrice(projects.price)}
                </StyledTableCell>
                <StyledTableCell>
                  {projects.numberOfInstallments}
                </StyledTableCell>
                <StyledTableCell>
                  <Link href={routesList.editProject + projects.id}>
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
