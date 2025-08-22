import React, { useRef, useState } from "react";
import RolList from "./RolList";
import { Action } from "@/models/action";
import { Rol, SaveRol } from "@/types/rol";
import { useRol } from "@/hooks/use-rol";
import RolForm from "./RolForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

interface RolMainProps {}

const RolMain: React.FC<RolMainProps> = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedRol, setSelectedRol] = useState<Rol | null>(null);
  const [rolToDelete, setRolToDelete] = useState<Rol | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);

  const { data: roles, isLoading, createRol, updateRol, deleteRol } = useRol();

  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedRol(null);
  };
3
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Roles</h2>
          <Button
            onPress={() => {
              setAction(Action.ADD);
              openModal();
            }}
            color="primary"
            className="w-40"
          >
            Agregar Nuevo
          </Button>
        </div>

        <Modal
          ref={dialogFormRef}
          content={
            <RolForm
              initialData={selectedRol ?? undefined}
              onCancel={closeModal}
              actionType={action}
              onSave={(item: SaveRol) => {
                action === Action.EDIT ? updateRol(item) : createRol(item);
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Rol" : "Editar Rol"}
        />

        {isLoading && <Loading />}

        <RolList
          items={roles ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedRol(item);
            openModal();
          }}
          onDelete={(item) => {
            setRolToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        {/* Alerta de confirmación para eliminar */}
        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && rolToDelete) {
              deleteRol(rolToDelete.id);
              setRolToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar este rol?"
        />
      </Card>
    </div>
  );
};

export default RolMain;
