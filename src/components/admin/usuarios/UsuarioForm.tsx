import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Usuario, SaveUsuario } from "@/types/usuario";
import { Action } from "@/models/action";

interface UsuarioFormProps {
  onSave?: (item: SaveUsuario) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Usuario;
  cargos: { id: number; nombre: string }[];
  roles: { id: number; nombre: string }[];
}

const UsuarioForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
  cargos,
  roles,
}: UsuarioFormProps) => {
  return (
    <Form
      className="w-full mx-auto flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        if (onSave) {
          onSave({
            id: initialData?.id,
            nombres: data.nombres as string,
            apellidos: data.apellidos as string,
            correo: data.correo as string,
            contrasena: data.contrasena as string,
            cargoId: Number(data.cargoId),
            rolId: Number(data.rolId),
            // 🔥 Conversión correcta de string a Date
            fecha_creacion: new Date(data.fecha_creacion as string),
          });
        }
      }}
        >
      <Input
        isRequired
        label="Nombres"
        name="nombres"
        placeholder="Ingrese nombres"
        defaultValue={initialData?.nombres ?? ""}
      />
      <Input
        isRequired
        label="Apellidos"
        name="apellidos"
        placeholder="Ingrese apellidos"
        defaultValue={initialData?.apellidos ?? ""}
      />
      <Input
        isRequired
        label="Correo"
        name="correo"
        placeholder="Ingrese correo"
        type="email"
        defaultValue={initialData?.correo ?? ""}
      />
      <Input
        isRequired
        label="Contraseña"
        name="contrasena"
        placeholder="Ingrese contraseña"
        type="password"
      />
      {actionType === Action.EDIT && (
        <Input
          isRequired
          label="Fecha de creación"
          disabled
          name="fecha_creacion"
          type="date"
          // 👇 El input date espera string "YYYY-MM-DD"
          defaultValue={
        initialData?.fechaCreacion
          ? new Date(initialData.fechaCreacion).toISOString().split("T")[0]
          : ""
          }
        />
      )}

      <Select
        isRequired
        label="Cargo"
        name="cargoId"
        defaultSelectedKeys={initialData?.cargoId ? [initialData.cargoId.toString()] : []}
      >
        {cargos.map((cargo) => (
          <SelectItem key={cargo.id}>{cargo.nombre}</SelectItem>
        ))}
      </Select>

      <Select
        isRequired
        label="Rol"
        name="rolId"
        defaultSelectedKeys={initialData?.rolId ? [initialData.rolId.toString()] : []}
      >
        {roles.map((rol) => (
          <SelectItem key={rol.id}>{rol.nombre}</SelectItem>
        ))}
      </Select>

      <div className="flex justify-end w-full">
        <Button color="default" onPress={onCancel} className="w-40 mr-2">
          Cancelar
        </Button>
        <Button color="primary" type="submit" className="w-40">
          {actionType === Action.ADD ? "Agregar" : "Guardar"}
        </Button>
      </div>
    </Form>
  );
};

export default UsuarioForm;
