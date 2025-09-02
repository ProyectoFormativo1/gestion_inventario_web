import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Permission } from "@/components/auth/Permission";
import { Permisos } from "@/models/permisos";
import { Perrito } from "@/types/perrito";
import { Button } from "@heroui/button";
import React from "react";

interface PerritoListProps {
  onEdit?: (item: Perrito) => void;
  onDelete?: (item: Perrito) => void;
  items: Perrito[];
}

const PerritoList: React.FC<PerritoListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Perrito>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    { key: "nombre", label: "Nombre", sortable: true, filterable: true },
    { key: "color", label: "Color", sortable: true, filterable: true },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex space-x-2">
          <Permission permiso={Permisos.PERRRITOS_EDITAR}>
            <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>
              Editar
            </Button>
          </Permission>
          <Permission permiso={Permisos.PERRRITOS_ELIMINAR}>
            <Button color="danger" size="sm" onPress={() => onDelete?.(item)}>
              Eliminar
            </Button>
          </Permission>
        </div>
      ),
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      data={items.map((p) => ({ ...p, key: p.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default PerritoList;
