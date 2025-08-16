import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Action } from "@/models/action";

interface Programa {
  id: number;
  nombre: string;
  areaId: number;
}

interface SavePrograma {
  id?: number;
  nombre: string;
  areaId: number;
}

interface ProgramaFormProps {
  onSave?: (item: SavePrograma) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Programa;
  areas: { id: number; nombre: string }[]; // lista de áreas disponibles
}

const ProgramaForm = ({ onSave, onCancel, actionType, initialData, areas }: ProgramaFormProps) => {
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
            areaId: Number(data.areaId),
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre del programa"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        defaultValue={initialData?.nombre ?? ""}
      />

      <Select
        isRequired
        label="Área"
        labelPlacement="outside"
        name="areaId"
        defaultSelectedKeys={initialData?.areaId ? [initialData.areaId.toString()] : []}
        placeholder="Seleccione un área"
      >
        {areas.map((area) => (
          <SelectItem key={area.id}>{area.nombre}</SelectItem>
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

export default ProgramaForm;
