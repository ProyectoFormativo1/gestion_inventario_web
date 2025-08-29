import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Permission } from "@/components/auth/Permission";
import { Permisos } from "@/models/permisos";
import { Rol } from "@/types/rol";
import { Button } from "@heroui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

interface RolListProps {
  onEdit?: (item: Rol) => void;
  onDelete?: (item: Rol) => void;
  items: Rol[];
}

const RolList: React.FC<RolListProps> = ({ onEdit, onDelete, items }) => {
  const navigate = useNavigate();
  const columns: Column<Rol>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    { key: "nombre", label: "Nombre", sortable: true, filterable: true },
    { key: "codigo", label: "Código", sortable: true, filterable: true },
    { key: "fecha_creacion", label: "Fecha de Creación", sortable: true },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex space-x-2">
          <Button
            color="success"
            size="sm"
            onPress={() => navigate(`/permisos/${item.id}`)}
          >
            Permisos
          </Button>
          {item.codigo != "ROOT" && (
            <>
              <Permission permiso={Permisos.ROLES_EDITAR}>
                <Button
                  color="primary"
                  size="sm"
                  onPress={() => onEdit?.(item)}
                >
                  Editar
                </Button>
              </Permission>
              <Permission permiso={Permisos.ROLES_ELIMINAR}>
                <Button
                  color="danger"
                  size="sm"
                  onPress={() => onDelete?.(item)}
                >
                  Eliminar
                </Button>
              </Permission>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      data={items.map((r) => ({ ...r, key: r.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default RolList;
