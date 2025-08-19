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
    { key: 'stok', label: 'Stock', sortable: true, filterable: true },
    { key: 'numero_contrato', label: 'N° Contrato', sortable: true, filterable: true },
    { key: 'codigo_sena', label: 'Código SENA', sortable: true, filterable: true },
    { key: 'codigo_unspsc', label: 'Código UNSPSC', sortable: true, filterable: true },
    { key: 'tipo', label: 'Tipo', sortable: true, filterable: true },
    { key: 'bodegaNombre', label: 'Bodega', sortable: true, filterable: true },
    { key: 'unidadMedidaNombre', label: 'Unidad Medida', sortable: true, filterable: true },
    { key: 'fecha_creacion', label: 'Fecha creación', sortable: true, filterable: true },
    { key: 'fecha_actualizacion', label: 'Fecha actualización', sortable: true, filterable: true },
    { key: 'fecha_vencimiento', label: 'Fecha vencimiento', sortable: true, filterable: true },
    { key: 'fecha_vigencia', label: 'Fecha vigencia', sortable: true, filterable: true },
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
