import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Ficha } from "@/types/ficha";
import { Button } from "@heroui/button";
import React from "react";

interface FichaListProps {
  onEdit?: (item: Ficha) => void;
  onDelete?: (item: Ficha) => void;
  items: Ficha[];
}

const FichaList: React.FC<FichaListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Ficha>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    { key: "codigo", label: "Código", sortable: true, filterable: true },
    { key: "fechaCreacion", label: "Fecha de Creación", sortable: true, filterable: true },
    { key: "programaNombre", label: "Programa", sortable: true, filterable: true },
    { key: "ambienteNombre", label: "Ambiente", sortable: true, filterable: true },

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
      data={items.map((f) => ({ ...f, key: f.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default FichaList;
