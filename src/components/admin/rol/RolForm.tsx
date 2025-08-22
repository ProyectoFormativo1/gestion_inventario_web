import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { SaveRol, Rol } from "@/types/rol";
import { Action } from "@/models/action";
import { Role } from "@/models/role"; // Enum de roles

interface RolFormProps {
  onSave?: (item: SaveRol) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Rol;
}

const RolForm = ({
  onSave,
  onCancel,
  actionType,
  initialData
}: RolFormProps) => {
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
            nombre: data.nombre as Role, 
            codigo: data.codigo as string,
            fecha_creacion: initialData?.fecha_creacion ?? new Date()
          });
        }
      }}
    >
      <Select
        isRequired
        labelPlacement="outside"
        label="Nombre del Rol"
        name="nombre"
        defaultSelectedKeys={initialData?.nombre ? [initialData.nombre] : []}
        placeholder="Seleccione un rol"
      >
        {Object.values(Role).map((rol) => (
          <SelectItem key={rol}>{rol}</SelectItem>
        ))}
      </Select>

      <Input
        isRequired
        label="Código"
        labelPlacement="outside"
        name="codigo"
        placeholder="Ingrese el código"
        type="text"
        defaultValue={initialData?.codigo ?? ""}
      />

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

export default RolForm;
