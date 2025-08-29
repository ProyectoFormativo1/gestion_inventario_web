import GlobalTable, { Column } from "@/components/atomic/organisms/Table";
import { Movimiento } from "@/types/movimiento";
import { Button } from "@heroui/button";
import React from "react";
import { Chip } from "@heroui/chip";
import { TipoMovimientoEnum } from "@/types/tipo-movimiento";
import { ArrowDown, ArrowUp } from "lucide-react";
import { format } from "date-fns";
import { Permission } from "@/components/auth/Permission";
import { Permisos } from "@/models/permisos";

interface MovimientoListProps {
  onDelete?: (item: Movimiento) => void;
  items: Movimiento[];
}

const MovimientoList: React.FC<MovimientoListProps> = ({ onDelete, items }) => {
  const columns: Column<Movimiento>[] = [
    { key: "id", label: "ID", sortable: true, filterable: true },
    {
      key: "materialNombre",
      label: "Material",
      sortable: true,
      filterable: true,
    },
    {
      key: "tipoMovimientoDescripcion",
      label: "Tipo de Movimiento",
      sortable: true,
      filterable: true,
      render: (item) => (
        <Chip
          color={
            item.tipoMovimientoNombre === TipoMovimientoEnum.ENTRADA
              ? "success"
              : "danger"
          }
          startContent={
            item.tipoMovimientoNombre === TipoMovimientoEnum.ENTRADA ? (
              <ArrowUp size={12} />
            ) : (
              <ArrowDown size={12} />
            )
          }
          variant="bordered"
        >
          {item.tipoMovimientoDescripcion}
        </Chip>
      ),
    },
    { key: "cantidad", label: "Cantidad", sortable: true, filterable: true },
    {
      key: "responsableNombre",
      label: "Responsable",
      sortable: true,
      filterable: true,
    },
    {
      key: "fecha",
      label: "Fecha",
      sortable: true,
      filterable: true,
      render: (item) => format(item.fecha, "dd/MM/yyyy hh:mm a"),
    },
    {
      key: "observaciones",
      label: "Observaciones",
      sortable: true,
      filterable: true,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <div className="flex space-x-2">
          <Permission permiso={Permisos.MOVIMIENTOS_ELIMINAR}>
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
      defaultSortColumn="fecha"
      defaultSortDirection="desc"
    />
  );
};

export default MovimientoList;
