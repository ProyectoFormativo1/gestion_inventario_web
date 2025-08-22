import { HomeIcon, DocumentTextIcon } from "@heroicons/react/16/solid";
import { MenuItem } from "../components/atomic/atoms/MenuItem";
import { routes } from "../routes/Routes";
import {  ArrowRight, ChartLine, PackageSearch, ShieldUser, TrendingUpDown } from "lucide-react";

export const adminMenu: MenuItem[] = [
  {
    code: "HOME",
    title: "Inicio",
    path: routes.dashboard,
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
  },
  /* {
    code: "STATS",
    title: "Estadísticas",
    path: routes.dashboard, 
    icon: <ChartBarIcon className="h-6 w-6" />,
  },
  {
    code: .dashboard",
    title: "Reportes",
    path: routes.dashboard, 
    icon: <DocumentTextIcon className="h-6 w-6 text-green-500" />,
  }, */
  {
    code: "settings",
    title: "Administracion",
    icon: <DocumentTextIcon className="h-6 w-6" />,
    subItems: [
      {
        code: "CIUDAD",
        title: "Ciudad",
        path: routes.ciudades,
        icon: <ArrowRight className="h-6 w-6" />,
      },
    
      {
        code: "CENTRO_FORMACION",
        title: "Centros de Formacion",
        path: routes.centroFormacion,
        icon: <ArrowRight className="h-6 w-6" />,
      },
        {
        code: "SEDES",
        title: "Sedes",
        path: routes.sedes,
        icon: <ArrowRight className="h-6 w-6" />,
      },
      {
        code: "AREAS",
        title: "Areas",
        path: routes.areas,
        icon: <ArrowRight className="h-6 w-6" />,
      },
      {
        code: "PROGRAMAS",
        title: "Programas",
        path: routes.programas,
        icon: <ArrowRight className="h-6 w-6" />,
      },
       
      {
        code: "BODEGAS",
        title: "Bodegas",
        path: routes.bodegas,
        icon: <ArrowRight className="h-6 w-6" />,
      },
 
      {
        code: "AMBIENTES",
        title: "Ambientes",
        path: routes.ambientes,
        icon: <ArrowRight className="h-6 w-6" />,
      },
      {
        code: "FICHAS",
        title: "Fichas",
        path: routes.fichas,
        icon: <ArrowRight className="h-6 w-6" />,
      },
    ],
  },
  
  {
    code: "USUARIOS",
    title: "Usuarios",
    path: routes.usuarios,
    icon: <ShieldUser className="h-6 w-6" />,
  },
  {
    code: "MATERIALES",
    title: "Materiales",
    path: routes.materiales,
    icon: <PackageSearch className="h-6 w-6" />,
  },
  {
    code: "ESTADISTICAS",
    title: "Estadisticas",
    path: routes.estadisticas,
    icon: <ChartLine className="h-6 w-6" />,
  },
  {
    code: "MOVIMIENTOS",
    title: "Movimientos",
    path: routes.movimientos,
    icon: <TrendingUpDown className="h-6 w-6" />,
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
      },
    
      {
        code: "CARGOS",
        title: "Cargos",
        path: routes.cargos,
        icon: <ArrowRight className="h-6 w-6" />,
      },
       
    ],
  },
];

