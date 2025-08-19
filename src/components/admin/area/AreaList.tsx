import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Area } from "@/types/area";
import { Button } from "@heroui/button";
import React from "react";

interface AreaListProps {
  onEdit?: (item: Area) => void;
  onDelete?: (item: Area) => void;
  items: Area[];
}

const AreaList: React.FC<AreaListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Area>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    { key: "nombre", label: "Nombre", sortable: true, filterable: true },
    { key: "sedeNombre", label: "Sede", sortable: true, filterable: true },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex space-x-2">
          <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>
            Editar
          </Button>
          <Button color="danger" size="sm" onPress={() => onDelete?.(item)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      data={items.map((a) => ({ ...a, key: a.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default AreaList;
