
import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Ambientes } from '@/types/ambientes';
import { Button } from '@heroui/button';
import React from 'react';


interface AmbientesListProps {
  onEdit?: (item: Ambientes) => void;
  onDelete?: (item: Ambientes) => void;
  items: Ambientes[];
}

const AmbientesList: React.FC<AmbientesListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Ambientes>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
    { key: 'areaNombre', label: 'Area', sortable: true, filterable: true },
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

export default AmbientesList;