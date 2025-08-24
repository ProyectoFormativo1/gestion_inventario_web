import React, { useRef, useState } from "react";
import { Action } from "@/models/action";
import { useBodegasBySede } from "@/hooks/use-bodega";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import Loading from "@/components/atomic/atoms/Loading";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useCentrosFormacionByLocacion } from "@/hooks/use-centroformacion";
import { useLocacion } from "@/hooks/use-locacion";
import { useSedesByCentros } from "@/hooks/use-sede";
import { Movimiento, SaveMovimiento } from "@/types/movimiento";
import { useMovimiento } from "@/hooks/use-movimiento";
import MovimientoList from "./MovimientoList";
import MovimientoForm from "./MovimientoForm";
import { useMaterial } from "@/hooks/use-material";
import { useTipoMovimiento } from "@/hooks/use-tipomovimiento";
import { useUsuario } from "@/hooks/use-usuario";

interface MovimientoMainProps { }

const MovimientoMain: React.FC<MovimientoMainProps> = () => {
    const [action, setAction] = useState<Action>(Action.ADD);
    const [selectedMovimiento, setSelectedMovimiento] = useState<Movimiento | null>(null);
    const [movimientoToDelete, setMovimientoToDelete] = useState<Movimiento | null>(null);

    const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
    const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);

    // Hook para CRUD de movimientos
    const {
        data: movimientos,
        isLoading,
        createMovimiento,
        deleteMovimiento,
    } = useMovimiento();


    //Listas
    const [locacionSelectedId, setSelectedLocacionId] = useState<number | null>(null);
    const [centroSelectedId, setSelectedCentroId] = useState<number | null>(null);
    const [sedeSelectedId, setSelectedSedeId] = useState<number | null>(null);
    const [bodegaSelectedId, setSelectedBodegaId] = useState<number | null>(null);

    const { ciudades } = useLocacion();
    const { data: centrosBylocacion } = useCentrosFormacionByLocacion(locacionSelectedId);
    const { data: sedesByCentros } = useSedesByCentros(centroSelectedId);
    const { data: bodegasBySedes } = useBodegasBySede(sedeSelectedId);
    const { data: materialesBySedes } = useMaterial(bodegaSelectedId);
    const { data: tiposMovimientos } = useTipoMovimiento();
    const { data: responsables } = useUsuario();

    //Modal
    const openModal = () => dialogFormRef?.current?.onOpen();
    const closeModal = () => {
        dialogFormRef?.current?.onClose();
        setSelectedMovimiento(null);
        setSelectedLocacionId(null);
        setSelectedCentroId(null);
        setSelectedSedeId(null);
        setSelectedMovimiento(null);
        setSelectedBodegaId(null);
    };

    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <Card className="p-0 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">Movimientos</h2>
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
                        <MovimientoForm
                            responsables={responsables ?? []}
                            tipoMovimientos={tiposMovimientos ?? []}
                            bodegas={bodegasBySedes ?? []}
                            materiales={materialesBySedes ?? []}
                            centros={centrosBylocacion ?? []}
                            cities={ciudades ?? []}
                            sedes={sedesByCentros ?? []}
                            initialData={selectedMovimiento ?? undefined}
                            onCancel={closeModal}
                            onSave={(item: SaveMovimiento) => {
                                action === Action.EDIT ? null : createMovimiento(item);
                                closeModal();
                            }}
                            onChangeCentro={(centroId) => {
                                setSelectedCentroId(centroId);
                                setSelectedSedeId(null);
                                setSelectedBodegaId(null);
                            }}
                            onChangeCiudad={(ciudadId) => {
                                setSelectedLocacionId(ciudadId);
                                setSelectedCentroId(null);
                                setSelectedSedeId(null);
                                setSelectedBodegaId(null);
                            }}
                            onChangeSede={(sedeId) => {
                                setSelectedSedeId(sedeId);
                                setSelectedBodegaId(null);
                            }}
                            onChangeBodega={(bodegaId) => {
                                setSelectedBodegaId(bodegaId);
                            }}
                            actionType={action}
                        />
                    }
                    title={action === Action.ADD ? "Agregar Movimiento" : "Editar Movimiento"}
                />

                {(isLoading) && <Loading />}


                <MovimientoList
                    items={movimientos ?? []}
                    onDelete={(item) => {
                        setMovimientoToDelete(item);
                        alertDeleteRef.current?.onOpen();
                    }}
                />

                <Alert
                    ref={alertDeleteRef}
                    onCloseCallback={(confirmed: boolean) => {
                        if (confirmed && movimientoToDelete) {
                            deleteMovimiento(movimientoToDelete.id);
                            setMovimientoToDelete(null);
                        }
                    }}
                    title="Confirmar Eliminación"
                    description="¿Está seguro de que desea eliminar este movimiento?"
                />
            </Card>
        </div>
    );
};

export default MovimientoMain;
