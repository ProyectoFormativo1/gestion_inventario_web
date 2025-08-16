import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Bodega } from '@/types/bodega';
import { Button } from '@heroui/react';
import React from 'react';

interface BodegaListProps {
  onEdit?: (item: Bodega) => void;
  onDelete?: (item: Bodega) => void;
  items: Bodega[];
}

const BodegaList: React.FC<BodegaListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Bodega>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
    { key: 'areaNombre', label: 'Área', sortable: true, filterable: true },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (item) => (
        <div className="flex space-x-2">
          <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>Editar</Button>
          <Button color="danger" size="sm" onPress={() => onDelete?.(item)}>Eliminar</Button>
        </div>
      )
    }
  ];

  return (
    <GlobalTable
      columns={columns}
      data={items.map(b => ({ ...b, key: b.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default BodegaList;
