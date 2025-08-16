import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Usuario } from '@/types/usuario';
import { Button } from '@heroui/react';
import React from 'react';

interface UsuarioListProps {
  items: Usuario[];
  onEdit?: (item: Usuario) => void;
  onDelete?: (item: Usuario) => void;
}

const UsuarioList: React.FC<UsuarioListProps> = ({ items, onEdit, onDelete }) => {
  const columns: Column<Usuario>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombres', label: 'Nombres', sortable: true, filterable: true },
    { key: 'apellidos', label: 'Apellidos', sortable: true, filterable: true },
    { key: 'correo', label: 'Correo', sortable: true, filterable: true },
    { key: 'cargoNombre', label: 'Cargo', sortable: true, filterable: true },
    { key: 'rolNombre', label: 'Rol', sortable: true, filterable: true },
    { key: 'fecha_creacion', label: 'Fecha de creación', sortable: true, filterable: true },
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
      data={items.map(u => ({ ...u, key: u.id }))}
      rowsPerPage={5}
      defaultSortColumn="id"
    />
  );
};

export default UsuarioList;
