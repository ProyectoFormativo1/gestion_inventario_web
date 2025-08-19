import React, { useRef, useState } from "react";
import SedeList from "./SedeList";
import { Action } from "@/models/action";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import { useSede } from "@/hooks/use-sede";
import { SaveSede, Sede } from "@/types/sede";
import SedeForm from "./SedeForm";
import { useCentrosFormacion } from "@/hooks/use-centroformacion";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

interface SedeMainProps {
}

const SedeMain: React.FC<SedeMainProps> = ({ }) => {
    const [action, setAction] = useState<Action>(Action.ADD);
    const [selectedSede, setSelectedSede] = useState<Sede | null>(
        null
    );
    const [SedeToDelete, setSedeToDelete] = useState<Sede | null>(
        null
    );
    const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
        null
    );
    const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(null);
    const {
        data,
        isLoading,
        createSede,
        updateSede,
        deleteSede,
    } = useSede();

    const {
        data: centros
    } = useCentrosFormacion();

    const openModal = () => dialogFormRef?.current?.onOpen();
    const closeModal = () => {
        dialogFormRef?.current?.onClose();
        setSelectedSede(null);
    };
    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <Card className="p-0 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-800">
                        Sedes
                    </h2>
                    <Button
                        onPress={() => {
                            setAction(Action.ADD);
                            dialogFormRef?.current?.onOpen();
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
                        <SedeForm
                            centros={centros ?? []}
                            initialData={selectedSede ?? undefined}
                            onCancel={closeModal}
                            onSave={(item: SaveSede) => {
                                action === Action.EDIT
                                    ? updateSede(item)
                                    : createSede(item);
                                closeModal();
                            }}
                        />
                    }
                    title={action === Action.ADD ? "Agregar Sede" : "Editar Sede"}
                >

                </Modal>
                {isLoading && <Loading />}
                <SedeList
                    items={data ?? []}
                    onEdit={(item) => {
                        setAction(Action.EDIT);
                        setSelectedSede(item);
                        openModal();
                    }}
                    onDelete={(item) => {
                        setSedeToDelete(item);
                        alertDeleteRef.current?.onOpen();
                    }}
                />

                {/* Alerta de confirmación para eliminar */}
                <Alert
                    ref={alertDeleteRef}
                    onCloseCallback={(confirmed: boolean) => {
                        if (confirmed && SedeToDelete) {
                            deleteSede(SedeToDelete.id);
                            setSedeToDelete(null);
                        }
                    }}
                    title="Confirmar Eliminación"
                    description="¿Está seguro de que desea eliminar esta sede?"
                />
            </Card>
        </div>
    );
};

export default SedeMain;