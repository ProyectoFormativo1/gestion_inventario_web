import { Ambientes, SaveAmbientes } from "../../../types/ambientes";
import { Action } from "@/models/action";
import { CentroFormacion } from "@/types/centro-formacion";
import { Ficha } from "@/types/ficha";
import { Locacion } from "@/types/locacion";
import { Programa } from "@/types/programa";
import { Sede } from "@/types/sede";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

interface AmbientesFormProps {
  onSave?: (item: SaveAmbientes) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Ambientes;
  areas: { id: number; nombre: string }[];
  sedes: Sede[];
  centros: CentroFormacion[];
  cities: Locacion[];
  fichas: Ficha[];
  programas: Programa[];
}

const AmbientesForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
  areas,
  sedes,
  centros,
  cities,
  fichas,
  programas,
}: AmbientesFormProps) => {
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
            nombre: data.nombre as any,
            fichaId: data.fichaId as any,
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre del ambiente"
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
        label="Programa"
        labelPlacement="outside"
        name="programaId"
        defaultSelectedKeys={
          initialData?.programaId ? [initialData.programaId.toString()] : []
        }
        placeholder="Seleccione un programa"
      >
        {programas.map((programa) => (
          <SelectItem key={programa.id}>{programa.nombre}</SelectItem>
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
export default AmbientesForm;
