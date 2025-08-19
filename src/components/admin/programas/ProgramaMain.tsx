import React, { useRef, useState } from "react";
import { Action } from "@/models/action";
import { Programa, SavePrograma } from "@/types/programa";
import { useProgramas } from "@/hooks/use-programa";
import ProgramaForm from "./ProgramaForm";
import ProgramaList from "./ProgramaList";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

interface ProgramasMainProps {
  areas: { id: number; nombre: string }[]; // lista de áreas disponibles
}

const ProgramasMain: React.FC<ProgramasMainProps> = ({ areas }) => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedPrograma, setSelectedPrograma] = useState<Programa | null>(null);
  const [programaToDelete, setProgramaToDelete] = useState<Programa | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);

  const { data, isLoading, createPrograma, updatePrograma, deletePrograma } = useProgramas();

  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedPrograma(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Programas</h2>
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
            <ProgramaForm
              areas={areas}
              initialData={selectedPrograma ?? undefined}
              onCancel={closeModal}
              actionType={action}
              onSave={(item: SavePrograma) => {
                action === Action.EDIT ? updatePrograma(item) : createPrograma(item);
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Programa" : "Editar Programa"}
        />

        {isLoading && <Loading />}

        <ProgramaList
          items={data ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedPrograma(item);
            openModal();
          }}
          onDelete={(item) => {
            setProgramaToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && programaToDelete) {
              deletePrograma(programaToDelete.id);
              setProgramaToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar este programa?"
        />
      </Card>
    </div>
  );
};

export default ProgramasMain;
