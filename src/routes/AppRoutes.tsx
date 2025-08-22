import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../components/atomic/templates/NotFound";
import LoginPage from "../pages/auth/LoginPage";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/admin/DashboardPage"; 
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
import { useAuth } from "../hooks/use-auth";
import { routes } from "./Routes";
import CentroFormacionPage from "@/pages/admin/CentroFormacionPage";
import SedesPage from "@/pages/admin/SedesPage";
import BodegasPage from "@/pages/admin/BodegasPage";
import AreasPage from "@/pages/admin/AreasPage";
import AmbientesPage from "@/pages/admin/AmbientesPage";
import ProgramasPage from "@/pages/admin/ProgramasPage";
import FichasPage from "@/pages/admin/FichasPage";
import UsuariosPage from "@/pages/admin/UsuariosPage";
import MaterialesPage from "@/pages/admin/MaterialesPage";
import MovimientosPage from "@/pages/admin/MovimientosPage";
import CiudadPage from "@/pages/admin/CiudadPage";
import RolPage from "@/pages/admin/RolPage";
import CargoPage from "@/pages/admin/CargoPage";
import EstadisticasPage from "@/pages/admin/EstadisticasPage";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path={routes.home}
        element={
          <RedirectIfAuthenticated isAuthenticated={isAuthenticated}>
            <Navigate to={routes.login} />
          </RedirectIfAuthenticated>
        }
      />
      <Route element={<AuthLayout />}>
        <Route
          path={routes.login}
          element={
            <RedirectIfAuthenticated isAuthenticated={isAuthenticated}>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />
     
      </Route>
      <Route element={<AdminLayout />}>
        <Route
          path={routes.dashboard}
          element={
            <ProtectedRoute
              component={DashboardPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.estadisticas}
          element={
            <ProtectedRoute
              component={EstadisticasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.ciudades}
          element={
            <ProtectedRoute
              component={CiudadPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.centroFormacion}
          element={
            <ProtectedRoute
              component={CentroFormacionPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.sedes}
          element={
            <ProtectedRoute
              component={SedesPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.bodegas}
          element={
            <ProtectedRoute
              component={BodegasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.roles}
          element={
            <ProtectedRoute
              component={RolPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.cargos}
          element={
            <ProtectedRoute
              component={CargoPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.areas}
          element={
            <ProtectedRoute
              component={AreasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.ambientes}
          element={
            <ProtectedRoute
              component={AmbientesPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.programas}
          element={
            <ProtectedRoute
              component={ProgramasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
         <Route
          path={routes.fichas}
          element={
            <ProtectedRoute
              component={FichasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
         <Route
          path={routes.usuarios}
          element={
            <ProtectedRoute
              component={UsuariosPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.materiales}
          element={
            <ProtectedRoute
              component={MaterialesPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.movimientos}
          element={
            <ProtectedRoute
              component={MovimientosPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
