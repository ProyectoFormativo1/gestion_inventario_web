import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Material, SaveMaterial } from "@/types/material";
import { Action } from "@/models/action";

interface MaterialFormProps {
  onSave?: (item: SaveMaterial) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Material;
  bodegas: { id: number; nombre: string }[];
  unidadesMedida: { id: number; nombre: string }[];
}

const MaterialForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
  bodegas,
  unidadesMedida,
}: MaterialFormProps) => {
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
            stok: Number(data.stok),
            fecha_creacion: new Date(data.fecha_creacion as string),
            fecha_actualizacion: new Date(data.fecha_actualizacion as string),
            numero_contrato: data.numero_contrato as string,
            fecha_vencimiento: new Date(data.fecha_vencimiento as string),
            fecha_vigencia: new Date(data.fecha_vigencia as string),
            codigo_sena: data.codigo_sena as string,
            codigo_unspsc: data.codigo_unspsc as string,
            tipo: data.tipo as string,
            bodega_id: Number(data.bodega_id),
            unidad_medida_id: Number(data.unidad_medida_id),
          });
        }
      }}
    >
      <Input
        isRequired
        label="Nombre"
        name="nombre"
        placeholder="Ingrese nombre del material"
        defaultValue={initialData?.nombre ?? ""}
      />

      <Input
        isRequired
        label="Stock"
        name="stok"
        type="number"
        placeholder="Ingrese cantidad"
        defaultValue={initialData?.stok?.toString() ?? ""}
      />

      <Input
        isRequired
        label="Fecha de creación"
        name="fecha_creacion"
        type="date"
        defaultValue={
          initialData?.fecha_creacion
            ? new Date(initialData.fecha_creacion).toISOString().split("T")[0]
            : ""
        }
      />

      <Input
        isRequired
        label="Fecha de actualización"
        name="fecha_actualizacion"
        type="date"
        defaultValue={
          initialData?.fecha_actualizacion
            ? new Date(initialData.fecha_actualizacion).toISOString().split("T")[0]
            : ""
        }
      />

      <Input
        isRequired
        label="Número de contrato"
        name="numero_contrato"
        placeholder="Ingrese número de contrato"
        defaultValue={initialData?.numero_contrato ?? ""}
      />

      <Input
        isRequired
        label="Fecha de vencimiento"
        name="fecha_vencimiento"
        type="date"
        defaultValue={
          initialData?.fecha_vencimiento
            ? new Date(initialData.fecha_vencimiento).toISOString().split("T")[0]
            : ""
        }
      />

      <Input
        isRequired
        label="Fecha de vigencia"
        name="fecha_vigencia"
        type="date"
        defaultValue={
          initialData?.fecha_vigencia
            ? new Date(initialData.fecha_vigencia).toISOString().split("T")[0]
            : ""
        }
      />

      <Input
        isRequired
        label="Código SENA"
        name="codigo_sena"
        placeholder="Ingrese código SENA"
        defaultValue={initialData?.codigo_sena ?? ""}
      />

      <Input
        isRequired
        label="Código UNSPSC"
        name="codigo_unspsc"
        placeholder="Ingrese código UNSPSC"
        defaultValue={initialData?.codigo_unspsc ?? ""}
      />

      <Input
        isRequired
        label="Tipo"
        name="tipo"
        placeholder="Ingrese tipo"
        defaultValue={initialData?.tipo ?? ""}
      />

      <Select
        isRequired
        label="Bodega"
        name="bodega_id"
        defaultSelectedKeys={initialData?.bodega_id ? [initialData.bodega_id.toString()] : []}
      >
        {bodegas.map((bodega) => (
          <SelectItem key={bodega.id}>{bodega.nombre}</SelectItem>
        ))}
      </Select>

      <Select
        isRequired
        label="Unidad de Medida"
        name="unidad_medida_id"
        defaultSelectedKeys={initialData?.unidad_medida_id ? [initialData.unidad_medida_id.toString()] : []}
      >
        {unidadesMedida.map((unidad) => (
          <SelectItem key={unidad.id}>{unidad.nombre}</SelectItem>
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

export default MaterialForm;
