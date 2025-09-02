import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Action } from "@/models/action";
import { Perrito, SavePerrito } from "@/types/perrito";

interface PerritoFormProps {
  onSave?: (item: SavePerrito) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Perrito;
}

const PerritoForm = ({
  onSave,
  onCancel,
  actionType,
  initialData
}: PerritoFormProps) => {
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
            nombre: data.nombre as string,
            color: data.color as string,
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre del perrito"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        defaultValue={initialData?.nombre ?? ""}
      />
      <Input
        isRequired
        label="Color del perrito"
        labelPlacement="outside"
        name="color"
        placeholder="Ingrese el color"
        type="text"
        defaultValue={initialData?.color ?? ""}
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

export default PerritoForm;
