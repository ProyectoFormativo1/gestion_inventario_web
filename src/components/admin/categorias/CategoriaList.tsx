import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Permission } from "@/components/auth/Permission";
import { Permisos } from "@/models/permisos";
import { Categoria } from "@/types/categoria";
import { Button } from "@heroui/button";
import React from "react";

interface CategoriaListProps {
  onEdit?: (item: Categoria) => void;
  onDelete?: (item: Categoria) => void;
  items: Categoria[];
}

const CategoriaList: React.FC<CategoriaListProps> = ({
  onEdit,
  onDelete,
  items,
}) => {
  const columns: Column<Categoria>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    { key: "nombre", label: "Nombre", sortable: true, filterable: true },
    {
      key: "codigoUnspsc",
      label: "Código UNSPSC",
      sortable: true,
      filterable: true,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex space-x-2">
          <Permission permiso={Permisos.CATEGORIA_EDITAR}>
            <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>
              Editar
            </Button>
          </Permission>
          <Permission permiso={Permisos.CATEGORIA_ELIMINAR}>
            <Button color="danger" size="sm" onPress={() => onDelete?.(item)}>
              Eliminar
            </Button>
          </Permission>{" "}
        </div>
      ),
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      data={items.map((c) => ({ ...c, key: c.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default CategoriaList;
