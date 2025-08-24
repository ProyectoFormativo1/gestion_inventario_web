
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Action } from "@/models/action";
import { CentroFormacion } from "@/types/centro-formacion";
import { Locacion } from "@/types/locacion";
import { Sede } from "@/types/sede";
import { Movimiento, SaveMovimiento } from "@/types/movimiento";
import { Bodega } from "@/types/bodega";
import { Material } from "@/types/material";
import { TipoMovimiento } from "@/types/tipo-movimiento";
import { Usuario } from "@/types/usuario";
import { Package } from "lucide-react";
import { useState } from "react";

interface MovimientoFormProps {
    onSave?: (item: SaveMovimiento) => void;
    onCancel?: () => void;
    onChangeCiudad?: (id: number) => void;
    onChangeCentro?: (id: number) => void;
    onChangeSede?: (id: number) => void;
    onChangeBodega?: (id: number) => void;
    actionType?: Action;
    initialData?: Movimiento;
    cities: Locacion[];
    sedes: Sede[];
    centros: CentroFormacion[];
    bodegas: Bodega[];
    materiales: Material[];
    tipoMovimientos: TipoMovimiento[];
    responsables: Usuario[];

}

const MovimientoForm = ({
    onSave,
    onCancel,
    onChangeCiudad,
    onChangeCentro,
    onChangeSede,
    onChangeBodega,
    actionType,
    initialData,
    sedes,
    centros,
    cities,
    bodegas,
    materiales,
    tipoMovimientos,
    responsables
}: MovimientoFormProps) => {
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [cantidadError, setCantidadError] = useState<string>("");

    const getStockColor = (stok: number) => {
        if (stok > 20) return "text-green-700";
        if (stok >= 10 && stok <= 20) return "text-orange-500";
        return "text-red-600";
    };

    return (
        <Form
            className="w-full mx-auto flex flex-col gap-4"
            validationBehavior="native"
            onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.currentTarget));
                const cantidad = Number(data.cantidad);
                if (selectedMaterial && cantidad > selectedMaterial.stok) {
                    setCantidadError(`La cantidad no puede ser mayor al stock (${selectedMaterial.stok})`);
                    return;
                }
                if (onSave) {
                    onSave({
                        id: initialData?.id,
                        observaciones: data.observaciones as string,
                        cantidad: Number(data.cantidad),
                        responsableId: Number(data.responsableId),
                        materialId: Number(data.materialId),
                        tipoMovimientoId: Number(data.tipoMovimientoId),
                    });
                }
            }}
        >
            <Input
                isRequired
                label="Observaciones"
                labelPlacement="outside"
                name="observaciones"
                placeholder="Ingrese las observaciones"
                type="text"
                defaultValue={initialData?.observaciones ?? ""}
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
                label="Bodega"
                name="bodegaId"
                placeholder="Seleccione una bodega"
                onChange={(e) => {
                    const value = e.target.value;
                    if (onChangeBodega) {
                        onChangeBodega(Number(value));
                    }
                }}
            >
                {bodegas.map((bodega) => (
                    <SelectItem key={bodega.id}>{bodega.nombre}</SelectItem>
                ))}
            </Select>

            <Select
                isRequired
                labelPlacement="outside"
                label="Material"
                items={materiales}
                name="materialId"
                onChange={(e) => {
                    const material = materiales.find(m => m.id === Number(e.target.value));
                    setSelectedMaterial(material ?? null);
                    setCantidadError(""); // limpiar error al cambiar material
                }}
                placeholder="Seleccione un material"
                renderValue={(items) => {
                    return items.map((item) => (
                        <div key={item.data?.key} className="flex items-center gap-2">
                            <Package className="shrink-0" size={20} />
                            <div className="flex flex-col">
                                <span>{item.data?.nombre}</span>
                                <span className={`${getStockColor(item.data?.stok ?? 0)} text-tiny`}>
                                    ({item.data?.stok}) Disponible
                                </span>
                            </div>
                        </div>
                    ));
                }}
            >
                {(material) => (
                    <SelectItem key={material.id} textValue={material.nombre}>
                        <div key={material.key} className="flex items-center gap-2">
                            <Package className="shrink-0" size={20} />
                            <div className="flex flex-col">
                                <span>{material.nombre}</span>
                                <span className={`${getStockColor(material.stok)} text-tiny`}>
                                    ({material.stok}) Disponible
                                </span>
                            </div>
                        </div>
                    </SelectItem>
                )}
            </Select>
            <Input
                isRequired
                label="Cantidad"
                onChange={(e) => {
                    const value = Number(e.target.value);
                    if (selectedMaterial && value > selectedMaterial.stok) {
                        setCantidadError(`La cantidad no puede superar el stock (${selectedMaterial.stok})`);
                    } else {
                        setCantidadError("");
                    }
                }}
                labelPlacement="outside"
                name="cantidad"
                placeholder="Ingrese la cantidad"
                type="number"
                errorMessage={cantidadError}
                isInvalid={!!cantidadError}
                defaultValue={initialData?.cantidad.toString() ?? ""}
            />

            <Select
                isRequired
                labelPlacement="outside"
                label="Tipo de Movimiento"
                name="tipoMovimientoId"
                placeholder="Seleccione un tipo de movimiento"
            >
                {tipoMovimientos.map((tipo) => (
                    <SelectItem key={tipo.id}>{tipo.descripcion}</SelectItem>
                ))}
            </Select>
            <Select
                isRequired
                labelPlacement="outside"
                label="Responsable"
                name="responsableId"
                placeholder="Seleccione un responsable"
            >
                {responsables.map((responsable) => (
                    <SelectItem key={responsable.id} textValue={`${responsable.nombres} ${responsable.apellidos}`}>
                        {responsable.nombres} {responsable.apellidos}
                    </SelectItem>
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

export default MovimientoForm;
