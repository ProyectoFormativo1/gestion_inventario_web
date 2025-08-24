import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Action } from "@/models/action";
import { Programa, SavePrograma } from "@/types/programa";


interface ProgramaFormProps {
  onSave?: (item: SavePrograma) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Programa;
}

const ProgramaForm = ({
  onSave,
  onCancel,
  actionType,
  initialData
}: ProgramaFormProps) => {
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
            descripcion: data.descripcion as string,
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
      <Input
        isRequired
        label="Descripción del programa"
        labelPlacement="outside"
        name="descripcion"
        placeholder="Ingrese la descripción"
        type="text"
        defaultValue={initialData?.descripcion ?? ""}
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

export default ProgramaForm;
