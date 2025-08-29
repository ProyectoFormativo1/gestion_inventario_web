import React, { useRef, useState } from "react";
import UsuarioList from "./UsuarioList";
import { Action } from "@/models/action";
import { Usuario, SaveUsuario } from "@/types/usuario";
import { useUsuario } from "@/hooks/use-usuario";
import UsuarioForm from "./UsuarioForm";
import Alert from "@/components/atomic/molecules/Alert";
import Modal from "@/components/atomic/molecules/Modal";
import { useCargo } from "@/hooks/use-cargo";
import { useRol } from "@/hooks/use-rol";
import Loading from "@/components/atomic/atoms/Loading";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { Permisos } from "@/models/permisos";
import { Permission } from "@/components/auth/Permission";

interface UsuariosMainProps {}

const UsuariosMain: React.FC<UsuariosMainProps> = () => {
  const [action, setAction] = useState<Action>(Action.ADD);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [usuarioToDelete, setUsuarioToDelete] = useState<Usuario | null>(null);

  const alertDeleteRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );
  const dialogFormRef = useRef<{ onOpen: () => void; onClose: () => void }>(
    null
  );

  // Hooks para CRUD y data
  const {
    data: usuarios,
    isLoading: usuariosLoading,
    createUsuario,
    updateUsuario,
    deleteUsuario,
  } = useUsuario();

  const { data: cargos, isLoading: cargosLoading } = useCargo();
  const { data: roles, isLoading: rolesLoading } = useRol();

  const openModal = () => dialogFormRef?.current?.onOpen();
  const closeModal = () => {
    dialogFormRef?.current?.onClose();
    setSelectedUsuario(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Card className="p-0 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Usuarios</h2>
          <Permission permiso={Permisos.USUARIOS_CREAR}>
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
            <UsuarioForm
              cargos={cargos ?? []}
              roles={roles ?? []}
              initialData={selectedUsuario ?? undefined}
              onCancel={closeModal}
              onSave={(item: SaveUsuario) => {
                action === Action.EDIT
                  ? updateUsuario(item)
                  : createUsuario(item);
                closeModal();
              }}
              actionType={action}
            />
          }
          title={action === Action.ADD ? "Agregar Usuario" : "Editar Usuario"}
        />

        {(usuariosLoading || cargosLoading || rolesLoading) && <Loading />}

        <UsuarioList
          items={usuarios ?? []}
          onEdit={(item) => {
            setAction(Action.EDIT);
            setSelectedUsuario(item);
            openModal();
          }}
          onDelete={(item) => {
            setUsuarioToDelete(item);
            alertDeleteRef.current?.onOpen();
          }}
        />

        <Alert
          ref={alertDeleteRef}
          onCloseCallback={(confirmed: boolean) => {
            if (confirmed && usuarioToDelete) {
              deleteUsuario(usuarioToDelete.id);
              setUsuarioToDelete(null);
            }
          }}
          title="Confirmar Eliminación"
          description="¿Está seguro de que desea eliminar este usuario?"
        />
      </Card>
    </div>
  );
};

export default UsuariosMain;
