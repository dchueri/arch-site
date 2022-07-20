import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Grid, Stack, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "moment";
import moment from "moment";
import { useEffect, useState } from "react";
import { IUserEntity } from "../../../context/AuthProvider/types";
import { IProjectEntity } from "../../../context/ProjectProvider/types";
import { Api } from "../../../services/api";
import ProjectServices from "../../Project/services";
import { ReportServices } from "../services";
import ProjectsTable from "./ProjectsTable";

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

export default function UserReportTable() {
  const [projects, setProjects] = useState<IProjectEntity[]>([]);
  const [projectsByMonth, setProjectsByMonth] = useState<IProjectEntity[]>([]);
  const [users, setUsers] = useState<IUserEntity[]>([]);
  const [userNames, setUserNames] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [nameOfResponsible, setNameOfResponsible] = useState("");
  const [idOfResponsible, setIdOfResponsible] = useState("");
  const [value, setValue] = useState<Date | null>(new Date());
  const [month, setMonth] = useState(0);
  let total: number = 0;
  const [open, setOpen] = useState(false);
  let projectsWithBonusOnMonth: IProjectEntity[] = [];

  useEffect(() => {
    let usersList: IUserEntity[] = [];
    Api.get("https://dcode-arch-app.herokuapp.com/user").then((res) => {
      setUsers(res.data);
      usersList = res.data;

      let userNamesList: string[] = [];
      let idUsersList: string[] = [];
      usersList.map((u) => {
        userNamesList.push(u.name);
        idUsersList.push(u.id);
      });
      setUserIds(idUsersList);
      setUserNames(userNamesList);
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

  const handleDefineMonth = (month: number) => {
    const months = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Out",
      "Set",
      "Nov",
      "Dez",
    ];
    setMonth(month);
    //return setValue(months[month]);
  };

  const handleNameOfResponsible = (event: any) => {
    let projectsList: IProjectEntity[] = [];
    const id = ProjectServices.catchUserIdByName(
      event.target.innerText,
      userNames,
      userIds
    );
    setIdOfResponsible(id);
    setNameOfResponsible(event.target.innerText);
    projects.map((p) =>
      p.idOfResponsible == id ? projectsList.push(p) : null
    );
  };

  const handleVerifyProjectsOfMonth = (month: number) => {
    projects.map(p => {
      const monthsWithBonus = ReportServices.defineMonthsWithBonus(p.commissionValue, p.dealDate, p.numberOfInstallments);
      if (monthsWithBonus[month] > 0) {
        projectsWithBonusOnMonth.push(p)
      }
    })
    setProjectsByMonth(projectsWithBonusOnMonth);
  }

  return (
    <>
      <h1>
        {nameOfResponsible
          ? `Relatório Mensal por Responsável - ${nameOfResponsible}`
          : "Selecione um responsável"}
      </h1>
      <Stack
        spacing={3}
        sx={{
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={12} sm={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["month"]}
                inputFormat={"MMM"}
                label="Mês de pagamento"
                minDate={new Date("2022-01-01")}
                maxDate={new Date("2025-01-01")}
                value={value}
                onChange={(newValue) => {
                  handleDefineMonth(newValue!.getMonth());
                  handleVerifyProjectsOfMonth(newValue!.getMonth());
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <ProjectsTable projects={projectsByMonth} month={month} userNames={userNames} userIds={userIds} />
      </Stack>
    </>
  );
}
