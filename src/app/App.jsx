import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Loader from "../components/common/Loader";

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )
              }
            >
              {route.children?.map((child) => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
