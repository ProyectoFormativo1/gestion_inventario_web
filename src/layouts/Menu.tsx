// adminMenu.ts
import { HomeIcon, DocumentTextIcon } from "@heroicons/react/16/solid";
import { routes } from "../routes/Routes";
import { ArrowRight, ChartLine, PackageSearch, ShieldUser, TrendingUpDown } from "lucide-react";
import { MenuItem } from "../components/atomic/atoms/MenuItem";
import { Permisos } from "@/models/permisos";

export const adminMenu: MenuItem[] = [
  {
    code: "HOME",
    title: "Inicio",
    path: routes.dashboard,
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
  },
  {
    code: "settings",
    title: "Administración",
    icon: <DocumentTextIcon className="h-6 w-6" />,
    subItems: [
      {
        code: "CIUDAD",
        title: "Ciudad",
        path: routes.ciudades,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.CIUDAD_LISTA,
      },
      {
        code: "CENTRO_FORMACION",
        title: "Centros de Formación",
        path: routes.centroFormacion,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.CENTRO_FORMACION_LISTA,
      },
      {
        code: "SEDES",
        title: "Sedes",
        path: routes.sedes,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.SEDES_LISTA,
      },
      {
        code: "AREAS",
        title: "Áreas",
        path: routes.areas,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.AREAS_LISTA,
      },
      {
        code: "PROGRAMAS",
        title: "Programas",
        path: routes.programas,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.PROGRAMAS_LISTA,
      },
      {
        code: "AMBIENTES",
        title: "Ambientes",
        path: routes.ambientes,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.AMBIENTES_LISTA,
      },
      {
        code: "FICHAS",
        title: "Fichas",
        path: routes.fichas,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.FICHAS_LISTA,
      },
      {
        code: "CATEGORIAS",
        title: "Categorías",
        path: routes.categorias,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.CATEGORIA_LISTA,
      },
    ],
  },
  {
    code: "USUARIOS",
    title: "Usuarios",
    path: routes.usuarios,
    icon: <ShieldUser className="h-6 w-6" />,
    permiso: Permisos.USUARIOS_LISTA,
  },
  {
    code: "BODEGAS",
    title: "Bodegas",
    path: routes.bodegas,
    icon: <PackageSearch className="h-6 w-6" />,
    permiso: Permisos.BODEGA_LISTA,
  },
  {
    code: "CATEGORIAS",
    title: "Categorías",
    path: routes.categorias,
    icon: <PackageSearch className="h-6 w-6" />,
    permiso: Permisos.CATEGORIA_LISTA,
  },
  {
    code: "ESTADISTICAS",
    title: "Estadísticas",
    path: routes.estadisticas,
    icon: <ChartLine className="h-6 w-6" />,
    permiso: Permisos.ESTADISTICAS_REPORT_VER,
  },
  {
    code: "MOVIMIENTOS",
    title: "Movimientos",
    path: routes.movimientos,
    icon: <TrendingUpDown className="h-6 w-6" />,
    permiso: Permisos.MOVIMIENTOS_LISTA,
  },
   {
    code: "PERRITOS",
    title: "Perritos",
    path: routes.perritos,
    icon: <TrendingUpDown className="h-6 w-6" />,
    permiso: Permisos.PERRRITOS_LISTA,
  },
  {
    code: "PERMISOS",
    title: "Permisos",
    icon: <DocumentTextIcon className="h-6 w-6" />,
    subItems: [
      {
        code: "ROLES",
        title: "Roles",
        path: routes.roles,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.ROLES_LISTA,
      },
      {
        code: "CARGOS",
        title: "Cargos",
        path: routes.cargos,
        icon: <ArrowRight className="h-6 w-6" />,
        permiso: Permisos.CARGO_LISTA,
      },
    ],
  },
 
];
