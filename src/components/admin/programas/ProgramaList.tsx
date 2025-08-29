import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Permission } from "@/components/auth/Permission";
import { Permisos } from "@/models/permisos";
import { Programa } from "@/types/programa";
import { Button } from "@heroui/button";
import React from "react";

interface ProgramaListProps {
  onEdit?: (item: Programa) => void;
  onDelete?: (item: Programa) => void;
  items: Programa[];
}

const ProgramaList: React.FC<ProgramaListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Programa>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    { key: "nombre", label: "Nombre", sortable: true, filterable: true },
    { key: "descripcion", label: "Descripción", sortable: true, filterable: true },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex space-x-2">
          <Permission permiso={Permisos.PROGRAMAS_EDITAR}>
                      <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>Editar</Button>
                    </Permission>
                    <Permission permiso={Permisos.PROGRAMAS_ELIMINAR}>
                      <Button color="danger" size="sm" onPress={() => onDelete?.(item)}>Eliminar</Button>
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

export default ProgramaList;
