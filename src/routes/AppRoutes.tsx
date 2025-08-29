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
import CategoriaPage from "@/pages/admin/CategoriaPage";
import { Permisos } from "@/models/permisos";
import UnAuthorized from "@/components/atomic/templates/Unauthorized";
import PermisosPage from "@/pages/admin/PermisosPage";

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
              permiso={Permisos.ESTADISTICAS_REPORT_VER}
              component={DashboardPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.estadisticas}
          element={
            <ProtectedRoute
              permiso={Permisos.ESTADISTICAS_REPORT_VER}
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
              permiso={Permisos.CIUDAD_LISTA}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.categorias}
          element={
            <ProtectedRoute
              permiso={Permisos.CATEGORIA_LISTA}
              component={CategoriaPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.centroFormacion}
          element={
            <ProtectedRoute
              permiso={Permisos.CENTRO_FORMACION_LISTA}
              component={CentroFormacionPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.sedes}
          element={
            <ProtectedRoute
              permiso={Permisos.SEDES_LISTA}
              component={SedesPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.bodegas}
          element={
            <ProtectedRoute
              permiso={Permisos.BODEGA_LISTA}
              component={BodegasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.roles}
          element={
            <ProtectedRoute
              permiso={Permisos.ROLES_LISTA}

              component={RolPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.cargos}
          element={
            <ProtectedRoute
              permiso={Permisos.CARGO_LISTA}
              component={CargoPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.areas}
          element={
            <ProtectedRoute
              permiso={Permisos.AREAS_LISTA}
              component={AreasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.ambientes}
          element={
            <ProtectedRoute
              permiso={Permisos.AMBIENTES_LISTA}
              component={AmbientesPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.programas}
          element={
            <ProtectedRoute
              permiso={Permisos.PROGRAMAS_LISTA}
              component={ProgramasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.fichas}
          element={
            <ProtectedRoute
              permiso={Permisos.FICHAS_LISTA}
              component={FichasPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.usuarios}
          element={
            <ProtectedRoute
              permiso={Permisos.USUARIOS_LISTA}
              component={UsuariosPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.materiales}
          element={
            <ProtectedRoute
              permiso={Permisos.MATERIALES_LISTA}
              component={MaterialesPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.movimientos}
          element={
            <ProtectedRoute
              permiso={Permisos.MOVIMIENTOS_LISTA}
              component={MovimientosPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.permisos}
          element={
            <ProtectedRoute
              component={PermisosPage}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path={routes.unauthorized}
          element={
            <ProtectedRoute
              component={UnAuthorized}
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
