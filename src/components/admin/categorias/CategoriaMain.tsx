import React, { useRef, useState } from "react";
import CategoriaList from "./CategoriaList";
import { Action } from "@/models/action";
import { Categoria, SaveCategoria } from "@/types/categoria";
import { useCategorias } from "@/hooks/use-categoria";
import CategoriaForm from "./CategoriaForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import Loading from "@/components/atomic/atoms/Loading"; 

interface CategoriasMainProps {}

const CategoriasMain: React.FC<CategoriasMainProps> = ({}) => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null
  );
  const [categoriaToDelete, setCategoriaToDelete] = useState<Categoria | null>(
    null
  );

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );

  const {
    data,
    isLoading,
    createCategoria,
    updateCategoria,
    deleteCategoria,
  } = useCategorias();

  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedCategoria(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Categorías</h2>
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

        {/* Modal de Formulario */}
        <Modal
          ref={dialogFormRef}
          content={
            <CategoriaForm
              initialData={selectedCategoria ?? undefined}
              onCancel={closeModal}
              onSave={(item: SaveCategoria) => {
                action === Action.EDIT
                  ? updateCategoria(item)
                  : createCategoria(item);
                closeModal();
              }}
            />
          }
          title={action === Action.ADD ? "Agregar Categoría" : "Editar Categoría"}
        ></Modal>

        {isLoading && <Loading />}

        <CategoriaList
          items={data ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedCategoria(item);
            openModal();
          }}
          onDelete={(item) => {
            setCategoriaToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        {/* Alerta de confirmación para eliminar */}
        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && categoriaToDelete) {
              deleteCategoria(categoriaToDelete.id);
              setCategoriaToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar esta categoría?"
        />
      </Card>
    </div>
  );
};

export default CategoriasMain;
