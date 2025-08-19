
import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Sede } from '@/types/sede';
import { Button } from '@heroui/button';
import React from 'react';


interface SedeListProps {
  onEdit?: (item: Sede) => void;
  onDelete?: (item: Sede) => void;
  items: Sede[];
}

const SedeList: React.FC<SedeListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Sede>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
    { key: 'centroFormacionNombre', label: 'Centro de Formación', sortable: true, filterable: true },
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
      data={items.map(c => ({ ...c, key: c.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default SedeList;