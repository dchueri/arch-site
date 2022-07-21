import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { IProjectEntity } from "../../../context/ProjectProvider/types";
import MonthsRow from "../CompleteReport/MonthsRow";
import { ReportServices } from "../services";

const ProjectsTable = (props: {
  projects: IProjectEntity[];
  month: number;
  userNames: Array<string>;
  userIds: Array<string>;
}) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [monthBonus, setMonthBonus] = useState(0);
  let total = 0;

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

  const calculateTotal = (
    commissionValue: number,
    dealDate: string,
    numberOfInstallments: number
  ) => {
    const monthsWithBonus = ReportServices.defineMonthsWithBonus(
      commissionValue,
      dealDate,
      numberOfInstallments
    );
    total += monthsWithBonus[props.month];
  };

  return (
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
          <>
            {props.projects.map((project) => {
              return (
                <>
                  <StyledTableRow key={project.id}>
                    <StyledTableCell component="th" scope="row">
                      {project.clientName}
                    </StyledTableCell>
                    <StyledTableCell>{project.description}</StyledTableCell>
                    <StyledTableCell>{project.description}</StyledTableCell>
                    <StyledTableCell>
                      {handleDate(project.firstDeliveryDate)}
                    </StyledTableCell>
                    <StyledTableCell>
                      <>
                        {handleFormatPrice(project.commissionValue)}
                        {calculateTotal(
                          project.commissionValue,
                          project.dealDate,
                          project.numberOfInstallments
                        )}
                      </>
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
                    <MonthsRow open={open[project.id]} project={project} />
                  </StyledTableRow>
                </>
              );
            })}
            <StyledTableRow>
              <StyledTableCell>Total do mês selecionado:</StyledTableCell>
              <StyledTableCell>{handleFormatPrice(total)}</StyledTableCell>
            </StyledTableRow>
          </>
        </TableBody>
      </Table>
    </TableContainerS>
  );
};

export default ProjectsTable;
