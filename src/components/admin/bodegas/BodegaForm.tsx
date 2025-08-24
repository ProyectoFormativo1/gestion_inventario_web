
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Bodega, SaveBodega } from "@/types/bodega";
import { Action } from "@/models/action";
import { Area } from "@/types/area";
import { CentroFormacion } from "@/types/centro-formacion";
import { Locacion } from "@/types/locacion";
import { Sede } from "@/types/sede";

interface BodegaFormProps {
  onSave?: (item: SaveBodega) => void;
  onCancel?: () => void;
  onChangeCiudad?: (id: number) => void;
  onChangeCentro?: (id: number) => void;
  onChangeSede?: (id: number) => void;
  actionType?: Action;
  initialData?: Bodega;
  areas: Area[];
  cities: Locacion[];
  sedes: Sede[];
  centros: CentroFormacion[];
}

const BodegaForm = ({
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
}: BodegaFormProps) => {
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
            areaId: Number(data.areaId),
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre de la bodega"
        labelPlacement="outside"
        name="nombre"
        placeholder="Ingrese el nombre"
        type="text"
        defaultValue={initialData?.nombre ?? ""}
      />
       <Input
        isRequired
        label="Descripción de la bodega"
        labelPlacement="outside"
        name="descripcion"
        placeholder="Ingrese la descripción"
        type="text"
        defaultValue={initialData?.descripcion ?? ""}
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
        defaultSelectedKeys={initialData?.locacionId ? [initialData.locacionId.toString()] : []}
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
        defaultSelectedKeys={
          initialData?.centroFormacionId ? [initialData.centroFormacionId.toString()] : []
        }
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
        labelPlacement="outside"
        label="Área"
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

export default BodegaForm;
