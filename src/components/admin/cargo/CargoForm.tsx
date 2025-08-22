import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Cargo, SaveCargo } from "@/types/cargo";
import { Action } from "@/models/action";

interface CargoFormProps {
  onSave?: (item: SaveCargo) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Cargo;
}

const CargoForm = ({ onSave, onCancel, actionType, initialData }: CargoFormProps) => {
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
            nombre: data.nombre as string
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre del Cargo"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        defaultValue={initialData?.nombre ?? ""}
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

export default CargoForm;
