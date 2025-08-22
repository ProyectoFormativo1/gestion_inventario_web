import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Action } from "@/models/action";
import { CentroFormacion } from "@/types/centro-formacion";
import { Locacion } from "@/types/locacion";
import { Sede } from "@/types/sede";
import { Programa, SavePrograma } from "@/types/programa";
import { Ficha } from "@/types/ficha";


interface ProgramaFormProps {
  onSave?: (item: SavePrograma) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Programa;
  areas: { id: number; nombre: string }[];
  sedes: Sede[];
  centros: CentroFormacion[];
  cities: Locacion[];
  fichas: Ficha[];
}

const ProgramaForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
  areas,
  sedes,
  centros,
  cities,
  fichas,
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
        defaultSelectedKeys={
          initialData?.sedeId ? [initialData.sedeId.toString()] : []
        }
        placeholder="Seleccione una sede"
      >
        {sedes?.map((sede) => (
          <SelectItem key={sede.id}>{sede.nombre}</SelectItem>
        ))}
      </Select>

      <Select
        isRequired
        label="Área"
        labelPlacement="outside"
        name="areaId"
        defaultSelectedKeys={
          initialData?.areaId ? [initialData.areaId.toString()] : []
        }
        placeholder="Seleccione un área"
      >
        {areas.map((area) => (
          <SelectItem key={area.id}>{area.nombre}</SelectItem>
        ))}
      </Select>
      <Select
        isRequired
        label="Ficha"
        labelPlacement="outside"
        name="fichaId"
        defaultSelectedKeys={
          initialData?.fichaId ? [initialData.fichaId.toString()] : []
        }
        placeholder="Seleccione una Ficha"
      >
        {fichas.map((ficha) => (
          <SelectItem key={ficha.id}>{ficha.codigo}</SelectItem>
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
