import { Button, Card } from "@heroui/react";
import React, { useRef, useState } from "react";
import MaterialList from "./MaterialList";
import { Action } from "@/models/action";
import { Material, SaveMaterial } from "@/types/material";
import { useMaterial } from "@/hooks/use-material";
import MaterialForm from "./MaterialForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { useBodegas } from "@/hooks/use-bodega";
import { useUnidadMedida } from "@/hooks/use-unidad-medida";

interface MaterialesMainProps {}

const MaterialesMain: React.FC<MaterialesMainProps> = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [materialToDelete, setMaterialToDelete] = useState<Material | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);

  // Hooks para CRUD y data
  const {
    data: materiales,
    isLoading: materialesLoading,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  } = useMaterial();

  const { data: bodegas, isLoading: bodegasLoading } = useBodegas();
  const { data: unidadesMedida, isLoading: unidadesLoading } = useUnidadMedida();

  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedMaterial(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Materiales</h2>
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
            <MaterialForm
              bodegas={bodegas ?? []}
              unidadesMedida={unidadesMedida ?? []}
              initialData={selectedMaterial ?? undefined}
              onCancel={closeModal}
              onSave={(item: SaveMaterial) => {
                action === Action.EDIT ? updateMaterial(item) : createMaterial(item);
                closeModal();
              }}
              actionType={action}
            />
          }
          title={action === Action.ADD ? "Agregar Material" : "Editar Material"}
        />

        {(materialesLoading || bodegasLoading || unidadesLoading) && <Loading />}

        <MaterialList
          items={materiales ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedMaterial(item);
            openModal();
          }}
          onDelete={(item) => {
            setMaterialToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && materialToDelete) {
              deleteMaterial(materialToDelete.id);
              setMaterialToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar este material?"
        />
      </Card>
    </div>
  );
};

export default MaterialesMain;
