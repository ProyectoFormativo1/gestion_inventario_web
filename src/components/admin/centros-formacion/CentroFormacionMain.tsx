import React, { useRef, useState } from "react";
import CentrosList from "./CentroFormacionList";
import { Action } from "@/models/action";
import { CentroFormacion, SaveCentroFormacion } from "@/types/centro-formacion";
import { useCentrosFormacion } from "@/hooks/use-centroformacion";
import CentroFormacionForm from "./CentroFormacionForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import { useLocacion } from "@/hooks/use-locacion";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

interface CentrosFormacionMainProps {
}

const CentrosFormacionMain: React.FC<CentrosFormacionMainProps> = ({ }) => {
    const [action, setAction] = useState<Action>(Action.ADD);
    const [selectedCentro, setSelectedCentro] = useState<CentroFormacion | null>(
        null
    );
    const [centroToDelete, setCentroToDelete] = useState<CentroFormacion | null>(
        null
    );
    const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
        null
    );
    const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);


    const {
        data,
        isLoading,
        createCentroFormacion,
        updateCentroFormacion,
        deleteCentroFormacion,
    } = useCentrosFormacion();

    const {
        ciudades
    } = useLocacion();

    const openModal = () => dialogFormRef?.current?.onOpen();
    const closeModal = () => {
        dialogFormRef?.current?.onClose();
        setSelectedCentro(null);
    };

    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <Card className="p-0 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">
                        Centros de Formación
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

                <Modal
                    ref={dialogFormRef}
                    content={
                        <CentroFormacionForm
                            cities={ciudades ?? []}
                            initialData={selectedCentro ?? undefined}
                            onCancel={closeModal}
                            onSave={(item: SaveCentroFormacion) => {
                                action === Action.EDIT
                                    ? updateCentroFormacion(item)
                                    : createCentroFormacion(item);
                                closeModal();
                            }}
                        />
                    }
                    title={action === Action.ADD ? "Agregar Centro" : "Editar Centro"}
                >

                </Modal>
                {isLoading && <Loading />}
                <CentrosList
                    items={data ?? []}
                    onEdit={(item) => {
                        setAction(Action.EDIT);
                        setSelectedCentro(item);
                        openModal();
                    }}
                    onDelete={(item) => {
                        setCentroToDelete(item);
                        alertDeleteRef.current?.onOpen();
                    }}
                />

                {/* Alerta de confirmación para eliminar */}
                <Alert
                    ref={alertDeleteRef}
                    onCloseCallback={(confirmed: boolean) => {
                        if (confirmed && centroToDelete) {
                            deleteCentroFormacion(centroToDelete.id);
                            setCentroToDelete(null);
                        }
                    }}
                    title="Confirmar Eliminación"
                    description="¿Está seguro de que desea eliminar este centro de formación?"
                />
            </Card>
        </div>
    );
};

export default CentrosFormacionMain;