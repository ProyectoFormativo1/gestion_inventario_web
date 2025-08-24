import React, { useRef, useState } from "react";
import { Action } from "@/models/action";
import { Ambientes, SaveAmbientes } from "@/types/ambientes";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import { useLocacion } from "@/hooks/use-locacion";
import Loading from "@/components/atomic/atoms/Loading";

// Importa tu hook para ambientes
import { useambientes } from "../../../hooks/use-ambientes";
import AmbientesForm from "./AmbientesForm";
import AmbientesList from "./AmbientesList";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { useCentrosFormacionByLocacion } from "@/hooks/use-centroformacion";
import { useSedesByCentros } from "@/hooks/use-sede";
import { useAreasBySedes } from "@/hooks/use-area";
interface AmbientesMainProps { }

const AmbientesMain: React.FC<AmbientesMainProps> = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedAmbiente, setSelectedAmbiente] = useState<Ambientes | null>(
    null
  );
  const [ambienteToDelete, setAmbienteToDelete] = useState<Ambientes | null>(
    null
  );

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );

  //Table
  const { data, isLoading, createAmbientes, updateAmbientes, deleteAmbientes } =
    useambientes();

  //Listas
  const [locacionSelectedId, setSelectedLocacionId] = useState<number | null>(null);
  const [centroSelectedId, setSelectedCentroId] = useState<number | null>(null);
  const [sedeSelectedId, setSelectedSedeId] = useState<number | null>(null);

  const { ciudades } = useLocacion();
  const { data: centrosBylocacion } = useCentrosFormacionByLocacion(locacionSelectedId);
  const { data: sedesByCentros } = useSedesByCentros(centroSelectedId);
  const { data: areasBySedes } = useAreasBySedes(sedeSelectedId);


  //Modal
  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedAmbiente(null);
    setSelectedLocacionId(null);
    setSelectedCentroId(null);
    setSelectedSedeId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        {/* Encabezado */}
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">
            Ambientes de Formación
          </h2>
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

        {/* Modal para agregar/editar */}
        <Modal
          ref={dialogFormRef}
          content={
            <AmbientesForm
              centros={centrosBylocacion ?? []}
              areas={areasBySedes ?? []}
              sedes={sedesByCentros ?? []}
              cities={ciudades ?? []}
              initialData={selectedAmbiente ?? undefined}
              onCancel={closeModal}
              onChangeCentro={(centroId) => {
                setSelectedCentroId(centroId);
                setSelectedSedeId(null);
              }}
              onChangeCiudad={(ciudadId) => {
                setSelectedLocacionId(ciudadId);
                setSelectedCentroId(null);
                setSelectedSedeId(null);
              }}
              onChangeSede={(sedeId) => {
                setSelectedSedeId(sedeId);
              }}
              onSave={(item: SaveAmbientes) => {
                if (action === Action.EDIT) {
                  updateAmbientes(item);
                } else {
                  createAmbientes(item);
                }
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Ambiente" : "Editar Ambiente"}
        />

        {/* Loading */}
        {isLoading && <Loading />}

        {/* Lista */}
        <AmbientesList
          items={data ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedAmbiente(item);
            setSelectedLocacionId(item.locacionId);
            setSelectedCentroId(item.centroFormacionId);
            setSelectedSedeId(item.sedeId);
            openModal();
          }}
          onDelete={(item) => {
            setAmbienteToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        {/* Alerta de confirmación para eliminar */}
        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && ambienteToDelete) {
              deleteAmbientes(ambienteToDelete.id);
              setAmbienteToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar este ambiente de formación?"
        />
      </Card>
    </div>
  );
};

export default AmbientesMain;
