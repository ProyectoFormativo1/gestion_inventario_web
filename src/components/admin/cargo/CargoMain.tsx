import React, { useRef, useState } from "react";
import CargoList from "./CargoList";
import { Action } from "@/models/action";
import { Cargo, SaveCargo } from "@/types/cargo";
import { useCargo } from "@/hooks/use-cargo";
import CargoForm from "./CargoForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Permisos } from "@/models/permisos";
import { Permission } from "@/components/auth/Permission";

const CargoMain: React.FC = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [cargoToDelete, setCargoToDelete] = useState<Cargo | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );

  const {
    data: cargos,
    isLoading,
    createCargo,
    updateCargo,
    deleteCargo,
  } = useCargo();

  const openModal = () => dialogFormRef.current?.onOpen();
  const closeModal = () => {
    dialogFormRef.current?.onClose();
    setSelectedCargo(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Cargos</h2>
          <Permission permiso={Permisos.CARGO_CREAR}>
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
          </Permission>
        </div>

        <Modal
          ref={dialogFormRef}
          content={
            <CargoForm
              initialData={selectedCargo ?? undefined}
              onCancel={closeModal}
              actionType={action}
              onSave={(item: SaveCargo) => {
                action === Action.EDIT ? updateCargo(item) : createCargo(item);
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Cargo" : "Editar Cargo"}
        />

        {isLoading && <Loading />}

        <CargoList
          items={cargos ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedCargo(item);
            openModal();
          }}
          onDelete={(item) => {
            setCargoToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && cargoToDelete) {
              deleteCargo(cargoToDelete.id);
              setCargoToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar este cargo?"
        />
      </Card>
    </div>
  );
};

export default CargoMain;
