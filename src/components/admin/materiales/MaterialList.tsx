import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Material } from '@/types/material';
import { Button } from '@heroui/button';
import React from 'react';

interface MaterialListProps {
  items: Material[];
  onEdit?: (item: Material) => void;
  onDelete?: (item: Material) => void;
}

const MaterialList: React.FC<MaterialListProps> = ({ items, onEdit, onDelete }) => {
  const columns: Column<Material>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
    {
      key: 'stok', label: 'Stock', sortable: true, filterable: true, render: (item) => {
        return <span>{item.stok} {item.unidadMedidaNombre}</span>;
      } },
    { key: 'numero_contrato', label: 'N° Contrato', sortable: true, filterable: true },
    { key: 'codigo_sena', label: 'C. SENA', sortable: true, filterable: true },
    { key: 'codigo_unspsc', label: 'C. UNSPSC', sortable: true, filterable: true },
    { key: 'tipo', label: 'Tipo', sortable: true, filterable: true },
    { key: 'bodegaNombre', label: 'Bodega', sortable: true, filterable: true },
    { key: 'fecha_creacion', label: 'F. Creación', sortable: true, filterable: true },
    { key: 'fecha_actualizacion', label: 'F. Actualización', sortable: true, filterable: true },
    { key: 'fecha_vencimiento', label: 'F. Vencimiento', sortable: true, filterable: true },
    { key: 'fecha_vigencia', label: 'F. Vigencia', sortable: true, filterable: true },
    {
      key: 'acciones',
      label: 'Acciones',
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
      data={items.map((m) => ({ ...m, key: m.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default MaterialList;
