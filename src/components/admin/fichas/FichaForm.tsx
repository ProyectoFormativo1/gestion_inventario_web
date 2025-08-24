import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Action } from "@/models/action";
import { Ficha, SaveFicha } from "@/types/ficha";
import { Sede } from "@/types/sede";
import { CentroFormacion } from "@/types/centro-formacion";
import { Locacion } from "@/types/locacion";
import { Ambientes } from "@/types/ambientes";


interface FichaFormProps {
  onSave?: (item: SaveFicha) => void;
  onCancel?: () => void;
  onChangeCiudad?: (id: number) => void;
  onChangeCentro?: (id: number) => void;
  onChangeSede?: (id: number) => void;
    onChangeArea?: (id: number) => void;

  actionType?: Action;
  initialData?: Ficha;
  programas: { id: number; nombre: string }[];
  areas: { id: number; nombre: string }[];
  sedes: Sede[];
  centros: CentroFormacion[];
  cities: Locacion[];
  ambientes: Ambientes[];
}

const FichaForm = ({
  onSave,
  onCancel,
  onChangeCiudad,
  onChangeCentro,
  onChangeSede,
  onChangeArea,
  actionType,
  initialData,
  programas,
  areas,
  sedes,
  centros,
  cities,
  ambientes,
}: FichaFormProps) => {
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
            programaId: Number(data.programaId),
            ambienteId: Number(data.ambienteId)
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
        onChange={(e) => {
          const value = e.target.value;
          if (onChangeArea) {
            onChangeArea(Number(value));
          }
        }}
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
        label="Ambiente"
        labelPlacement="outside"
        name="ambienteId"
        defaultSelectedKeys={
          initialData?.ambienteId ? [initialData.ambienteId.toString()] : []
        }
        placeholder="Seleccione un ambiente"
      >
        {ambientes.map((ambiente) => (
          <SelectItem key={ambiente.id}>{ambiente.nombre}</SelectItem>
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
