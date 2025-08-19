import React, { useRef, useState } from "react";
import BodegaList from "./BodegaList";
import { Action } from "@/models/action";
import { Bodega, SaveBodega } from "@/types/bodega";
import { useBodegas } from "@/hooks/use-bodega";
import BodegaForm from "./BodegaForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import { useAreas } from "@/hooks/use-area";
import Loading from "@/components/atomic/atoms/Loading";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";

interface BodegasMainProps {}

const BodegasMain: React.FC<BodegasMainProps> = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedBodega, setSelectedBodega] = useState<Bodega | null>(null);
  const [bodegaToDelete, setBodegaToDelete] = useState<Bodega | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);

  // Hook para CRUD de bodegas
  const {
    data: bodegas,
    isLoading: bodegasLoading,
    createBodega,
    updateBodega,
    deleteBodega,
  } = useBodegas();

  // Hook para traer las áreas disponibles
  const { data: areas, isLoading: areasLoading } = useAreas();

  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedBodega(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Bodegas</h2>
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
            <BodegaForm
              areas={areas ?? []} // pasamos áreas para el select
              initialData={selectedBodega ?? undefined}
              onCancel={closeModal}
              onSave={(item: SaveBodega) => {
                action === Action.EDIT ? updateBodega(item) : createBodega(item);
                closeModal();
              }}
              actionType={action}
            />
          }
          title={action === Action.ADD ? "Agregar Bodega" : "Editar Bodega"}
        />

        {(bodegasLoading || areasLoading) && <Loading />}

        <BodegaList
          items={bodegas ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedBodega(item);
            openModal();
          }}
          onDelete={(item) => {
            setBodegaToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && bodegaToDelete) {
              deleteBodega(bodegaToDelete.id);
              setBodegaToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar esta bodega?"
        />
      </Card>
    </div>
  );
};

export default BodegasMain;
