import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import EditProject from "../components/Project/EditProject";
import { MyProjectsList } from "../components/Project/MyProjectsList";
import { ProjectsList } from "../components/Project/ProjectsList";
import RegisterProject from "../components/Project/RegisterProject";
import { ProtectedLayout } from "../components/ProtectedLayout";
import CompleteReport from "../components/Report/CompleteReport";
import MonthlyReport from "../components/Report/MonthlyReport";
import UserReport from "../components/Report/UserReport";
import EditUser from "../components/User/EditUser";
import RegisterUser from "../components/User/RegisterUser";
import { UsersList } from "../components/User/UsersList";
import routesList from "./routesList.json";

export const IndexRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routesList.login} element={<LoginForm />} />
        <Route
          path={routesList.usersList}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <UsersList />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.registerUser}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <RegisterUser />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.editUser + ":userId"}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <EditUser />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.projectsList}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <ProjectsList />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.registerProject}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <RegisterProject />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.editProject + ":projectId"}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <EditProject />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.completeReport}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <CompleteReport />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.userReport}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <UserReport />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.monthlyReport}
          element={
            <ProtectedLayout role={"ADMIN"}>
              <MonthlyReport />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.myProjects}
          element={
            <ProtectedLayout role={"PROJETISTA"}>
              <MyProjectsList />
            </ProtectedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
