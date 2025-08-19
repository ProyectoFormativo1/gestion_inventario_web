
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { CentroFormacion, SaveCentroFormacion } from "../../../types/centro-formacion";
import { Action } from "@/models/action";
import { Location } from "@/types/location";

interface CentroFormacionFormProps {
    onSave?: (item: SaveCentroFormacion) => void;
    onCancel?: () => void;
    actionType?: Action;
    initialData?: CentroFormacion;
    cities: Location[]
}

const CentroFormacionForm = ({
    onSave,
    onCancel,
    actionType,
    initialData,
    cities
}: CentroFormacionFormProps) => {
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
                        locacionId: data.locacionId as any
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
                label="Ciudad"
                name="locationId"
                defaultSelectedKeys={initialData?.locacionId?.toString() ?? ""}
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
export default CentroFormacionForm;