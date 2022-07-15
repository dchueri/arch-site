import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import EditProject from "../components/Project/EditProject";
import { ProjectsList } from "../components/Project/ProjectsList";
import RegisterProject from "../components/Project/RegisterProject";
import { ProtectedLayout } from "../components/ProtectedLayout";
import Report from "../components/Report/CompleteReport";
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
            <ProtectedLayout>
              <UsersList />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.registerUser}
          element={
            <ProtectedLayout>
              <RegisterUser />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.editUser + ":userId"}
          element={
            <ProtectedLayout>
              <EditUser />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.projectsList}
          element={
            <ProtectedLayout>
              <ProjectsList />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.registerProject}
          element={
            <ProtectedLayout>
              <RegisterProject />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.editProject + ":projectId"}
          element={
            <ProtectedLayout>
              <EditProject />
            </ProtectedLayout>
          }
        />
        <Route
          path={routesList.completeReport}
          element={
            <ProtectedLayout>
              <Report />
            </ProtectedLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
