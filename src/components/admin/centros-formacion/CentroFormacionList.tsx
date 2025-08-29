
import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { Permission } from '@/components/auth/Permission';
import { Permisos } from '@/models/permisos';
import { CentroFormacion } from '@/types/centro-formacion';
import { Button } from '@heroui/button';
import React from 'react';


interface CentroFormacionListProps {
  onEdit?: (item: CentroFormacion) => void;
  onDelete?: (item: CentroFormacion) => void;
  items: CentroFormacion[];
}

const CentroFormacionList: React.FC<CentroFormacionListProps> = ({ onEdit, onDelete, items }) => {
  const columns: Column<CentroFormacion>[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
    { key: 'locacionNombre', label: 'Ciudad', sortable: true, filterable: true },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (item) => (
        <div className="flex space-x-2">
          <Permission permiso={Permisos.CENTRO_FORMACION_EDITAR}>
            <Button color="primary" size="sm" onPress={() => onEdit?.(item)}>Editar</Button>
          </Permission>
          <Permission permiso={Permisos.CENTRO_FORMACION_ELIMINAR}>
            <Button color="danger" size="sm" onPress={() => onDelete?.(item)}>Eliminar</Button>
          </Permission>
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

export default CentroFormacionList;