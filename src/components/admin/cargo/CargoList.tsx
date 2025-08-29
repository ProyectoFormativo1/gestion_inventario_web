import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Permission } from "@/components/auth/Permission";
import { Permisos } from "@/models/permisos";
import { Cargo } from "@/types/cargo";
import { Button } from "@heroui/button";
import React from "react";

interface CargoListProps {
  onEdit?: (item: Cargo) => void;
  onDelete?: (item: Cargo) => void;
  items: Cargo[];
}

const CargoList: React.FC<CargoListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Cargo>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    { key: "nombre", label: "Nombre", sortable: true, filterable: true },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex space-x-2">
          <Permission permiso={Permisos.CARGO_EDITAR}>
            <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>
              Editar
            </Button>
          </Permission>
          <Permission permiso={Permisos.CARGO_ELIMINAR}>
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
      data={items.map((r) => ({ ...r, key: r.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default CargoList;
