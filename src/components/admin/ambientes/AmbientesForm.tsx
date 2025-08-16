import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { Ambientes, SaveAmbientes } from "../../../types/ambientes";
import { Action } from "@/models/action";
import { Location } from "@/types/location";

interface AmbientesFormProps {
    onSave?: (item: SaveAmbientes) => void;
    onCancel?: () => void;
    actionType?: Action;
    initialData?: Ambientes;
    cities: Location[]
}

const AmbientesForm = ({
    onSave,
    onCancel,
    actionType,
    initialData,
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
                        fichaId: data.fichaId as any
                    });
                }
            }}
        >
            <Input
                isRequired
                label="Nombre del centro de formación"
                labelPlacement="outside"
                name="nombre"
                placeholder="Ingrese el nombre"
                type="text"
                defaultValue={initialData?.nombre ?? ""}
            />
            <Select
                isRequired
                labelPlacement="outside"
                label="Codigo"
                name="fichaId"
                defaultSelectedKeys={initialData?.fichaId?.toString() ?? ""}
                placeholder="Seleccione una opción"
            >
                {cities.map((city) => (
                    <SelectItem key={city.id}>
                        {city.nombre}
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
export default AmbientesForm;