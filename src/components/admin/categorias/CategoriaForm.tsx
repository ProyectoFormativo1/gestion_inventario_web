import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Categoria, SaveCategoria } from "@/types/categoria";
import { Action } from "@/models/action";

interface CategoriaFormProps {
  onSave?: (item: SaveCategoria) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Categoria;
}

const CategoriaForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
}: CategoriaFormProps) => {
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
            codigoUnspsc: data.codigoUnspsc as string,
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre de la categoría"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        defaultValue={initialData?.nombre ?? ""}
      />

      <Input
        isRequired
        label="Código UNSPSC"
        labelPlacement="outside"
        name="codigoUnspsc"
        placeholder="Ingrese el código UNSPSC"
        type="text"
        defaultValue={initialData?.codigoUnspsc ?? ""}
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

export default CategoriaForm;
