import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Area, SaveArea } from "@/types/area";
import { Action } from "@/models/action";

interface AreaFormProps {
  onSave?: (item: SaveArea) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Area;
  sedes: { id: number; nombre: string }[]; // lista de sedes disponibles
}

const AreaForm = ({ onSave, onCancel, actionType, initialData, sedes }: AreaFormProps) => {
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
            sedeId: Number(data.sedeId),
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre del área"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        defaultValue={initialData?.nombre ?? ""}
      />

      <Select
        isRequired
        label="Sede"
        labelPlacement="outside"
        name="sedeId"
        defaultSelectedKeys={initialData?.sedeId ? [initialData.sedeId.toString()] : []}
        placeholder="Seleccione una sede"
      >
        {sedes.map((sede) => (
          <SelectItem key={sede.id}>{sede.nombre}</SelectItem>
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

export default AreaForm;
