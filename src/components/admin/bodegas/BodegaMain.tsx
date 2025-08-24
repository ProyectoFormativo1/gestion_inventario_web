import React, { useRef, useState } from "react";
import BodegaList from "./BodegaList";
import { Action } from "@/models/action";
import { Bodega, SaveBodega } from "@/types/bodega";
import { useBodegas, useBodegasBySede } from "@/hooks/use-bodega";
import BodegaForm from "./BodegaForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import { useAreasBySedes } from "@/hooks/use-area";
import Loading from "@/components/atomic/atoms/Loading";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useCentrosFormacionByLocacion } from "@/hooks/use-centroformacion";
import { useLocacion } from "@/hooks/use-locacion";
import { useSedesByCentros } from "@/hooks/use-sede";
import BodegaFilter from "./BodegaFilter";

interface BodegasMainProps { }

const BodegasMain: React.FC<BodegasMainProps> = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedBodega, setSelectedBodega] = useState<Bodega | null>(null);
  const [bodegaToDelete, setBodegaToDelete] = useState<Bodega | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);

  // Hook para CRUD de bodegas
  const [sedeTableSelectedId, setSelectedSedeTableId] = useState<number | null>(null);

  const {
    createBodega,
    updateBodega,
    deleteBodega,
  } = useBodegas(sedeTableSelectedId);

  const {
    data: bodegasBySede,
    isLoading: bodegasLoading
  } = useBodegasBySede(sedeTableSelectedId);

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
    setSelectedLocacionId(null);
    setSelectedCentroId(null);
    setSelectedSedeId(null);
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
              areas={areasBySedes ?? []}
              centros={centrosBylocacion ?? []}
              cities={ciudades ?? []}
              sedes={sedesByCentros ?? []}
              initialData={selectedBodega ?? undefined}
              onCancel={closeModal}
              onSave={(item: SaveBodega) => {
                action === Action.EDIT ? updateBodega(item) : createBodega(item);
                closeModal();
              }}
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
              actionType={action}
            />
          }
          title={action === Action.ADD ? "Agregar Bodega" : "Editar Bodega"}
        />

        {(bodegasLoading) && <Loading />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-2">
          <BodegaFilter
            onChangeSede={(sedeId) => {
              setSelectedSedeTableId(sedeId);
            }}
            cities={ciudades ?? []}
          />
        </div>


        <BodegaList
          items={bodegasBySede ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedBodega(item);
            setSelectedLocacionId(item.locacionId);
            setSelectedCentroId(item.centroFormacionId);
            setSelectedSedeId(item.sedeId);
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
              setSelectedLocacionId(null);
              setSelectedCentroId(null);
              setSelectedSedeId(null);
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
