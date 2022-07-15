import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
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
import {
  IProjectEntity
} from "../../../context/ProjectProvider/types";
import { Api } from "../../../services/api";
import MonthsRow from "./MonthsRow";

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
  let total: number = 0;
  const [open, setOpen] = useState(false);

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

  const calculateTotal = (commissionValue: number) => {
    total += commissionValue;
  };

  return (
    <>
      <TableContainerS>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell>Responsável</StyledTableCell>
              <StyledTableCell>Prazo da primeira entrega</StyledTableCell>
              <StyledTableCell>Comissão</StyledTableCell>
              <StyledTableCell>Quantidade de parcelas</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <>
                <StyledTableRow key={project.id}>
                  <StyledTableCell component="th" scope="row">
                    {project.clientName}
                  </StyledTableCell>
                  <StyledTableCell>{project.description}</StyledTableCell>
                  <StyledTableCell>
                    {catchName(project.idOfResponsible)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {handleDate(project.firstDeliveryDate)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <>
                      {handleFormatPrice(project.commissionValue)}
                      {calculateTotal(project.commissionValue)}
                    </>
                  </StyledTableCell>
                  <StyledTableCell>
                    {project.numberOfInstallments}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <MonthsRow
                    open={open}
                    project={project}
                  />
                </StyledTableRow>
              </>
            ))}
            <StyledTableRow>
              <StyledTableCell>Total:</StyledTableCell>
              <StyledTableCell>{handleFormatPrice(total)}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainerS>
    </>
  );
}
