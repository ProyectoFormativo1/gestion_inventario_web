import React, { useRef, useState } from "react";
import CiudadList from "./CiudadList";
import { Action } from "@/models/action";
import { Ciudad, SaveCiudad } from "@/types/ciudad";
import { useCiudades } from "@/hooks/use-ciudad";
import CiudadForm from "./CiudadForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

interface CiudadesMainProps {}

const CiudadesMain: React.FC<CiudadesMainProps> = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedCiudad, setSelectedCiudad] = useState<Ciudad | null>(null);
  const [ciudadToDelete, setCiudadToDelete] = useState<Ciudad | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);

  const {
    data,
    isLoading,
    createCiudad,
    updateCiudad,
    deleteCiudad,
  } = useCiudades();

  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedCiudad(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Ciudades</h2>
          <Button
            onPress={() => {
              setAction(Action.ADD);
              openModal();
            }}
            color="primary"
            className="w-40"
          >
            Agregar Nueva
          </Button>
        </div>

        <Modal
          ref={dialogFormRef}
          content={
            <CiudadForm
              parentCities={data ?? []}
              initialData={selectedCiudad ?? undefined}
              onCancel={closeModal}
              actionType={action}
              onSave={(item: SaveCiudad) => {
                action === Action.EDIT ? updateCiudad(item) : createCiudad(item);
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Ciudad" : "Editar Ciudad"}
        />

        {isLoading && <Loading />}

        <CiudadList
          items={data ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedCiudad(item);
            openModal();
          }}
          onDelete={(item) => {
            setCiudadToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        {/* Alerta de confirmación para eliminar */}
        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && ciudadToDelete) {
              deleteCiudad(ciudadToDelete.id);
              setCiudadToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar esta ciudad?"
        />
      </Card>
    </div>
  );
};

export default CiudadesMain;
