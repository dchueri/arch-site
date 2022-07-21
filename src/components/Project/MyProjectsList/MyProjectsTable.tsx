import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
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
import { getUserLocalStorage } from "../../../context/AuthProvider/util";
import { IProjectEntity } from "../../../context/ProjectProvider/types";

import { Api } from "../../../services/api";
import MyMonthsRow from "./MyMonthsRow";

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

export default function MyProjectsTable() {
  const [projects, setProjects] = useState<IProjectEntity[]>([]);
  const user = getUserLocalStorage();
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const bonusPerMonth = {
    jan: 0,
    fev: 10,
    mar: 20,
    abr: 30,
    mai: 40,
    jun: 50,
    jul: 60,
    ago: 70,
    set: 80,
    out: 90,
    nov: 100,
    dez: 110,
  };

  useEffect(() => {
    Api.get("https://dcode-arch-app.herokuapp.com/contract").then((res) => {
      setProjects(res.data);
    });
  }, []);

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
      <TableContainer sx={{width: '60vw', margin: 'auto'}} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell>Prazo da primeira entrega</StyledTableCell>
              <StyledTableCell>Valor da comissão</StyledTableCell>
              <StyledTableCell>Quantidade de parcelas</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) =>
              project.idOfResponsible == user.id ? (
                <>
                  <StyledTableRow key={project.clientName}>
                    <StyledTableCell component="th" scope="row">
                      {project.clientName}
                    </StyledTableCell>
                    <StyledTableCell>{project.description}</StyledTableCell>
                    <StyledTableCell>
                      {handleDate(project.firstDeliveryDate)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {handleFormatPrice(project.commissionValue)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {project.numberOfInstallments}
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() =>
                          setOpen((oldOpen) => ({
                            ...oldOpen,
                            [project.id]: !oldOpen[project.id],
                          }))
                        }
                      >
                        {open[project.id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <MyMonthsRow open={open[project.id]} project={project} />
                  </StyledTableRow>
                </>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
