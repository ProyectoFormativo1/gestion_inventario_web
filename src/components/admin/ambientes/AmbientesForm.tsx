import { Ambientes, SaveAmbientes } from "../../../types/ambientes";
import { Action } from "@/models/action";
import { CentroFormacion } from "@/types/centro-formacion";
import { Locacion } from "@/types/locacion";
import { Sede } from "@/types/sede";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

interface AmbientesFormProps {
  onSave?: (item: SaveAmbientes) => void;
  onCancel?: () => void;
  onChangeCiudad?: (id: number) => void;
  onChangeCentro?: (id: number) => void;
  onChangeSede?: (id: number) => void;
  actionType?: Action;
  initialData?: Ambientes;
  areas: { id: number; nombre: string }[];
  sedes: Sede[];
  centros: CentroFormacion[];
  cities: Locacion[];
}

const AmbientesForm = ({
  onSave,
  onCancel,
  onChangeCiudad,
  onChangeCentro,
  onChangeSede,
  actionType,
  initialData,
  areas,
  sedes,
  centros,
  cities
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
            areaId: Number(data.areaId) as any,
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
        onChange={(e) => {
          const value = e.target.value;
          if (onChangeCiudad) {
            onChangeCiudad(Number(value));
          }
        }}
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
        onChange={(e) => {
          const value = e.target.value;
          if (onChangeCentro) {
            onChangeCentro(Number(value));
          }
        }}
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
        onChange={(e) => {
          const value = e.target.value;
          if (onChangeSede) {
            onChangeSede(Number(value));
          }
        }}
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
