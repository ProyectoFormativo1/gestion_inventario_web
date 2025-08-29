import React, { useRef, useState } from "react";
import AreaList from "./AreaList";
import { Action } from "@/models/action";
import { Area, SaveArea } from "@/types/area";
import { useAreas } from "@/hooks/use-area";
import AreaForm from "./AreaForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { useCentrosFormacionByLocacion } from "@/hooks/use-centroformacion";
import { useLocacion } from "@/hooks/use-locacion";
import { useSedesByCentros } from "@/hooks/use-sede";
import { Permission } from "@/components/auth/Permission";
import { Permisos } from "@/models/permisos";
interface AreasMainProps {}

const AreasMain: React.FC<AreasMainProps> = ({}) => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );

  //Listas
  const [locacionSelectedId, setSelectedLocacionId] = useState<number | null>(
    null
  );
  const [centroSelectedId, setSelectedCentroId] = useState<number | null>(null);

  const { ciudades } = useLocacion();
  const { data: centrosBylocacion } =
    useCentrosFormacionByLocacion(locacionSelectedId);
  const { data: sedesByCentros } = useSedesByCentros(centroSelectedId);

  //Table
  const { data, isLoading, createArea, updateArea, deleteArea } = useAreas();

  //Modal
  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedArea(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Áreas</h2>
          <Permission permiso={Permisos.AREAS_CREAR}>
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
            <AreaForm
              centros={centrosBylocacion ?? []}
              sedes={sedesByCentros ?? []}
              cities={ciudades ?? []}
              initialData={selectedArea ?? undefined}
              onCancel={closeModal}
              onChangeCiudad={(ciudadId) => {
                setSelectedLocacionId(ciudadId);
                setSelectedCentroId(null);
              }}
              onChangeCentro={(centroId) => {
                setSelectedCentroId(centroId);
              }}
              actionType={action}
              onSave={(item: SaveArea) => {
                action === Action.EDIT ? updateArea(item) : createArea(item);
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Área" : "Editar Área"}
        />

        {isLoading && <Loading />}

        <AreaList
          items={data ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedArea(item);
            setSelectedLocacionId(item.locacionId);
            setSelectedCentroId(item.centroFormacionId);
            openModal();
          }}
          onDelete={(item) => {
            setAreaToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && areaToDelete) {
              deleteArea(areaToDelete.id);
              setAreaToDelete(null);
              setSelectedLocacionId(null);
              setSelectedCentroId(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar esta área?"
        />
      </Card>
    </div>
  );
};

export default AreasMain;
