import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Action } from "@/models/action";

interface Ficha {
  id: number;
  codigo: string;
  fecha_creacion: string; // YYYY-MM-DD
  programaId: number;
}

interface SaveFicha {
  id?: number;
  codigo: string;
  fecha_creacion: string;
  programaId: number;
}

interface FichaFormProps {
  onSave?: (item: SaveFicha) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Ficha;
  programas: { id: number; nombre: string }[];
}

const FichaForm = ({ onSave, onCancel, actionType, initialData, programas }: FichaFormProps) => {
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
            codigo: data.codigo as string,
            fecha_creacion: data.fecha_creacion as string,
            programaId: Number(data.programaId),
          });
        }
      }}
    >
      <Input
        isRequired
        label="Código"
        labelPlacement="outside"
        name="codigo"
        placeholder="Ingrese el código de la ficha"
        type="text"
        defaultValue={initialData?.codigo ?? ""}
      />

      <Input
        isRequired
        label="Fecha de Creación"
        labelPlacement="outside"
        name="fecha_creacion"
        type="date"
        defaultValue={initialData?.fecha_creacion ?? ""}
      />

      <Select
        isRequired
        label="Programa"
        labelPlacement="outside"
        name="programaId"
        defaultSelectedKeys={initialData?.programaId ? [initialData.programaId.toString()] : []}
        placeholder="Seleccione un programa"
      >
        {programas.map((p) => (
          <SelectItem key={p.id}>{p.nombre}</SelectItem>
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

export default FichaForm;
