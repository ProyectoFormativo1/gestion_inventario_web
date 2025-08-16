import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Ciudad, SaveCiudad } from "@/types/ciudad";
import { Action } from "@/models/action";

interface CiudadFormProps {
  onSave?: (item: SaveCiudad) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Ciudad;
  parentCities: Ciudad[]; // Lista de ciudades padre disponibles
}

const CiudadForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
  parentCities
}: CiudadFormProps) => {
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
            tipo: data.tipo as string,
            codigoPostal: data.codigoPostal as string,
            parentId: data.parentId ? Number(data.parentId) : null
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre de la ciudad"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        defaultValue={initialData?.nombre ?? ""}
      />

      <Input
        isRequired
        label="Tipo"
        labelPlacement="outside"
        name="tipo"
        placeholder="Ej: Municipio, Departamento"
        type="text"
        defaultValue={initialData?.tipo ?? ""}
      />

      <Input
        isRequired
        label="Código Postal"
        labelPlacement="outside"
        name="codigoPostal"
        placeholder="Ingrese el código postal"
        type="text"
        defaultValue={initialData?.codigoPostal ?? ""}
      />

      <Select
        labelPlacement="outside"
        label="Ciudad Padre"
        name="parentId"
        defaultSelectedKeys={
          initialData?.parentId ? [initialData.parentId.toString()] : []
        }
        placeholder="Seleccione una opción"
      >
        {parentCities.map((city) => (
          <SelectItem key={city.id}>{city.nombre}</SelectItem>
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

export default CiudadForm;
