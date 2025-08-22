import { Area, SaveArea } from "@/types/area";
import { Action } from "@/models/action";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { CentroFormacion } from "@/types/centro-formacion";
import { Locacion } from "@/types/locacion";

interface AreaFormProps {
  onSave?: (item: SaveArea) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Area;
  sedes: { id: number; nombre: string }[];
  centros: CentroFormacion[];
  cities: Locacion[];
}

const AreaForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
  sedes,
  centros,
  cities,
}: AreaFormProps) => {
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
        labelPlacement="outside"
        label="Ciudad"
        name="locationId"
        defaultSelectedKeys={initialData?.locacionId?.toString() ?? ""}
        placeholder="Seleccione una opción"
      >
        {cities.map((city) => (
          <SelectItem key={city.id}>{city.nombre}</SelectItem>
        ))}
      </Select>
      <Select
        label="Centro de Formación"
        isRequired
        labelPlacement="outside"
        name="centroFormacionId"
        defaultSelectedKeys={initialData?.centroFormacionId?.toString() ?? ""}
        placeholder="Seleccione una opción"
      >
        {centros.map((centro) => (
          <SelectItem key={centro.id}>{centro.nombre}</SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        label="Sede"
        labelPlacement="outside"
        name="sedeId"
        defaultSelectedKeys={initialData?.sedeId?.toString() ?? ""}
        placeholder="Seleccione una opción"
        
      >
        {sedes?.map((sede) => (
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
