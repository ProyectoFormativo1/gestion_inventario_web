import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Ciudad } from '@/types/ciudad';
import { Button } from '@heroui/button';
import React from 'react';

interface CiudadListProps {
  onEdit?: (item: Ciudad) => void;
  onDelete?: (item: Ciudad) => void;
  items: Ciudad[];
}

const CiudadList: React.FC<CiudadListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<Ciudad>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
    { key: 'tipo', label: 'Tipo', sortable: true, filterable: true },
    { key: 'codigoPostal', label: 'Código Postal', sortable: true, filterable: true },
    { key: 'parentNombre', label: 'Municipio', sortable: true, filterable: true },
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
