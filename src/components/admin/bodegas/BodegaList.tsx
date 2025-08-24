import { Bodega } from '@/types/bodega';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Database, Delete, Edit, EllipsisVertical, Package, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BodegaListProps {
  onEdit?: (item: Bodega) => void;
  onDelete?: (item: Bodega) => void;
  items: Bodega[];
}

const BodegaList: React.FC<BodegaListProps> = ({ onEdit, onDelete, items }) => {
  const navigate = useNavigate();
  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";


  return (
    <div className="m-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="max-w-[340px]  w-full mb-4">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Package className="h-9 w-9" />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">{item.nombre}</h4>
                  <h5 className="text-small tracking-tight text-default-400">{item.descripcion}</h5>
                </div>
              </div>

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <EllipsisVertical className="h-6  cursor-pointer" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Actions" variant="flat">
                  {[
                    onEdit ? (
                      <DropdownItem key="edit" startContent={<Edit className={iconClasses} />} onPress={() => onEdit(item)}>
                        Editar
                      </DropdownItem>
                    ) : null,
                    onDelete ? (
                      <DropdownItem key="delete" startContent={<Delete className={iconClasses} />} onPress={() => onDelete(item)}>
                        Eliminar
                      </DropdownItem>
                    ) : null,
                  ].filter(Boolean)}
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small text-default-400">
              <div className="flex items-center gap-2">
                <Package />
                <span>250 materiales</span>
              </div>
              <div className="flex items-center gap-2">
                <User />
                <span>Juan Carlos Salam</span>
              </div>
              <div className="flex items-center gap-2">
                <Database />
                <span>20% utilizada</span>
              </div>
            </CardBody>
            <CardFooter className="gap-3 justify-between">
              <Button
                color="success"
                radius="full"
                size="sm"
                variant="solid"
              >
                Activo
              </Button>
              <div className="flex-1" />
              <Button
                color="primary"
                radius="full"
                size="sm"
                onPress={() => navigate(`/bodegas/${item.id}/materiales`)}
                endContent={<ArrowLongRightIcon color='primary' className="px-2 shrink-0" />}
                variant="bordered"
              >
                Ver materiales
              </Button>
            </CardFooter>
          </Card>
        ))}

        {items.length === 0 && (
          <div className="flex flex-col w-full">
             <Alert
                color="secondary"
                title={`No hay bodegas disponibles`}
                variant='bordered'
              />
          </div>
        )}
      </div>
    </div>

  );
};

export default BodegaList;
