import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Locacion } from '@/types/locacion';
import { Button } from '@heroui/button';
import React from 'react';

interface CiudadListProps {
  onEdit?: (item: Locacion) => void;
  onDelete?: (item: Locacion) => void;
  items: Locacion[];
}

const CiudadList: React.FC<CiudadListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Locacion>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
    { key: 'codigoPostal', label: 'Código Postal', sortable: true, filterable: true },
    { key: 'parentNombre', label: 'Departamento', sortable: true, filterable: true },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (item) => (
        <div className="flex space-x-2">
          <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>Editar</Button>
          <Button color="danger" size="sm" onPress={() => onDelete?.(item)}>Eliminar</Button>
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

export default CiudadList;
