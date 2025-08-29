import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Material, SaveMaterial } from "@/types/material";
import { Action } from "@/models/action";
import { Categoria } from "@/types/categoria";
import { useState } from "react";

interface MaterialFormProps {
  onSave?: (item: SaveMaterial) => void;
  onCancel?: () => void;
  actionType?: Action;
  initialData?: Material;
  unidadesMedida: { id: number; nombre: string; simbolo: string }[];
  categorias: Categoria[];
  bodegaId: number;
}

const MaterialForm = ({
  onSave,
  onCancel,
  actionType,
  initialData,
  unidadesMedida,
  categorias,
  bodegaId,
}: MaterialFormProps) => {
  const [codigoUnspsc, setCodigoUnspsc] = useState(initialData?.codigo_unspsc ?? "");

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
            numero_contrato: data.numero_contrato as string,
            fecha_vencimiento: data.fecha_vencimiento
              ? new Date(data.fecha_vencimiento as string)
              : undefined,
            fecha_vigencia: data.fecha_vigencia
              ? new Date(data.fecha_vigencia as string)
              : undefined,
            codigo_sena: data.codigo_sena as string,
            codigo_unspsc: codigoUnspsc, // ✅ usamos el valor del estado
            tipo: data.tipo as string,
            bodega_id: Number(initialData?.bodega_id ?? bodegaId),
            unidad_medida_id: Number(data.unidad_medida_id),
            categoria_id: Number(data.categoria_id),
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

      <Select
        isRequired
        label="Categoría"
        name="categoria_id"
        defaultSelectedKeys={initialData?.categoria_id ? [initialData.categoria_id.toString()] : []}
        onChange={(e) => {
          const categoriaId = Number(e.target.value);
          const categoria = categorias.find((c) => c.id === categoriaId);
          if (categoria) {
            setCodigoUnspsc(categoria.codigoUnspsc ?? ""); 
          }
        }}
      >
        {categorias.map((categoria) => (
          <SelectItem key={categoria.id}>{categoria.nombre}</SelectItem>
        ))}
      </Select>

      <Input
        isRequired
        label="Número de contrato"
        name="numero_contrato"
        placeholder="Ingrese número de contrato"
        defaultValue={initialData?.numero_contrato ?? ""}
      />

      <Input
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
        isDisabled
        isRequired
        label="Código UNSPSC"
        name="codigo_unspsc"
        value={codigoUnspsc} 
        onChange={(e) => setCodigoUnspsc(e.target.value)} // opcional, si quieres que sea editable
      />

      <Select
        isRequired
        label="Tipo"
        name="tipo"
        defaultSelectedKeys={initialData?.tipo ? [initialData.tipo.toString()] : []}
      >
        {[{ id: "consumible", nombre: "Consumible" }, { id: "devolutivo", nombre: "Devolutivo" }].map((unidad) => (
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
