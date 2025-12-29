import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

const Login = lazy(() => import("../features/auth/Login"));
const Dashboard = lazy(() => import("../features/dashboard/Dashboard"));
const ProjectList = lazy(() => import("../features/projects/ProjectList"));
const TestCaseList = lazy(() => import("../features/testcases/TestCaseList"));
const TestCaseDetails = lazy(() =>
  import("../features/testcases/TestCaseDetails")
);
const TestCaseForm = lazy(() => import("../features/testcases/TestCaseForm"));
const ExecuteTest = lazy(() => import("../features/executions/ExecuteTest"));
const ExecutionHistory = lazy(() =>
  import("../features/executions/ExecutionHistory")
);
const ProjectForm = lazy(() => import("../features/projects/ProjectForm"));

export const routes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    protected: true,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "projects", element: <ProjectList /> },
      { path: "projects/new", element: <ProjectForm /> },
      { path: "projects/:id/edit", element: <ProjectForm /> },

      { path: "testcases", element: <TestCaseList /> },
      { path: "testcases/new", element: <TestCaseForm /> },
      { path: "testcases/:id", element: <TestCaseDetails /> },
      { path: "testcases/:id/edit", element: <TestCaseForm /> },

      { path: "executions", element: <ExecutionHistory /> },
      { path: "executions/:id", element: <ExecuteTest /> },
    ],
  },
];
