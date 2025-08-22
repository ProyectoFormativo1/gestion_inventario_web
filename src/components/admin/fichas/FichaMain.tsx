import React, { useRef, useState } from "react";
import { Action } from "@/models/action";
import { Ficha, SaveFicha } from "@/types/ficha";
import { useFichas } from "@/hooks/use-ficha";
import FichaForm from "./FichaForm";
import FichaList from "./FichaList";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useCentrosFormacion } from "@/hooks/use-centroformacion";
import { useLocacion } from "@/hooks/use-locacion";
import { useSede } from "@/hooks/use-sede";
import { useAreas } from "@/hooks/use-area";
import { useambientes } from "@/hooks/use-ambientes";
import { useProgramas } from "@/hooks/use-programa";

interface FichasMainProps {
  programas: { id: number; nombre: string }[];
}

const FichasMain: React.FC<FichasMainProps> = ({}) => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedFicha, setSelectedFicha] = useState<Ficha | null>(null);
  const [fichaToDelete, setFichaToDelete] = useState<Ficha | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );

  const { data, isLoading, createFicha, updateFicha, deleteFicha } =
    useFichas();
  const { data: centros } = useCentrosFormacion();
  const { ciudades } = useLocacion();
  const { data: programas } = useProgramas();
  const { data: sedes } = useSede();
  const { data: area } = useAreas();
  const { data: ambiente } = useambientes();
  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedFicha(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Fichas</h2>
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
            <FichaForm
              centros={centros ?? []}
              programas={programas ?? []}
              areas={area ?? []}
              sedes={sedes ?? []}
              cities={ciudades ?? []}
              ambientes={ambiente ?? []}
              initialData={selectedFicha ?? undefined}
              onCancel={closeModal}
              actionType={action}
              onSave={(item: SaveFicha) => {
                action === Action.EDIT ? updateFicha(item) : createFicha(item);
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Ficha" : "Editar Ficha"}
        />

        {isLoading && <Loading />}

        <FichaList
          items={data ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedFicha(item);
            openModal();
          }}
          onDelete={(item) => {
            setFichaToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && fichaToDelete) {
              deleteFicha(fichaToDelete.id);
              setFichaToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar esta ficha?"
        />
      </Card>
    </div>
  );
};

export default FichasMain;
