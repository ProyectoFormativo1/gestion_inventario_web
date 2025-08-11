import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Action } from "@/models/action";
import { SaveSede, Sede } from "@/types/sede";
import { CentroFormacion } from "@/types/centro-formacion";

interface SedeFormProps {
    onSave?: (item: SaveSede) => void;
    onCancel?: () => void;
    actionType?: Action;
    initialData?: Sede;
    centros: CentroFormacion[]
}

const CentroFormacionForm = ({
    onSave,
    onCancel,
    actionType,
    initialData,
    centros
}: SedeFormProps) => {
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
                        centroFormacionId: data.centroFormacionId as any
                    });
                }
            }}
        >
            <Input
                isRequired
                label="Nombre de sede"
                labelPlacement="outside"
                name="nombre"
                placeholder="Ingrese el nombre"
                type="text"
                defaultValue={initialData?.nombre ?? ""}
            />
            <Select
                label="Centro de Formación"
                isRequired
                labelPlacement="outside"
                name="centroFormacionId"
                defaultSelectedKeys={initialData?.centroFormacionId?.toString() ?? ""}
                placeholder="Seleccione una opción"
            >
                {centros.map((centro) => (
                    <SelectItem key={centro.id}>
                        {centro.nombre}
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
export default CentroFormacionForm;