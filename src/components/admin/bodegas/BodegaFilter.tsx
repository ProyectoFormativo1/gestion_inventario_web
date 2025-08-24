
import { Select, SelectItem } from "@heroui/select";
import { Locacion } from "@/types/locacion";
import { useEffect, useState } from "react";
import { useSedesByCentros } from "@/hooks/use-sede";
import { useCentrosFormacionByLocacion } from "@/hooks/use-centroformacion";

interface BodegaFilterProps {
    onChangeSede?: (id: number) => void;
    cities: Locacion[];
}

const BodegaFilter = ({
    onChangeSede,
    cities
}: BodegaFilterProps) => {
    //Listas
    // inicializa desde localStorage si existe, sino null
    const [locacionSelectedId, setSelectedLocacionId] = useState<number | null>(
        () => Number(localStorage.getItem("locacionId")) || null
    );
    const [centroSelectedId, setSelectedCentroId] = useState<number | null>(
        () => Number(localStorage.getItem("centroId")) || null
    );
    const [sedeSelectedId, setSelectedSedeId] = useState<number | null>(
        () => Number(localStorage.getItem("sedeId")) || null
    );

    const { data: centrosBylocacion } = useCentrosFormacionByLocacion(locacionSelectedId);
    const { data: sedesByCentros } = useSedesByCentros(centroSelectedId);

    useEffect(() => {
        if (sedeSelectedId !== null) {
            onChangeSede!(sedeSelectedId!);
        }
    }, [locacionSelectedId, centroSelectedId, sedeSelectedId]);


    // Guarda en localStorage cada vez que cambian
    useEffect(() => {
        if (locacionSelectedId !== null) {
            localStorage.setItem("locacionId", String(locacionSelectedId));
        }
    }, [locacionSelectedId]);

    useEffect(() => {
        if (centroSelectedId !== null) {
            localStorage.setItem("centroId", String(centroSelectedId));
        }
    }, [centroSelectedId]);

    return (
        <>

            <Select
                isRequired
                labelPlacement="outside"
                label="Ciudad"
                name="locationId"
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedLocacionId(Number(value));
                    setSelectedCentroId(null);
                    setSelectedSedeId(null);
                }}
                placeholder="Seleccione una opción"
                defaultSelectedKeys={locacionSelectedId ? [locacionSelectedId.toString()] : []}
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
                defaultSelectedKeys={centroSelectedId ? [centroSelectedId.toString()] : []}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCentroId(Number(value));
                    setSelectedSedeId(null);
                }}
            >
                {(centrosBylocacion ?? []).map((centro) => (
                    <SelectItem key={centro.id}>{centro.nombre}</SelectItem>
                ))}
            </Select>
            <Select
                isRequired
                label="Sede"
                labelPlacement="outside"
                name="sedeId"
                placeholder="Seleccione una sede"
                defaultSelectedKeys={sedeSelectedId ? [sedeSelectedId.toString()] : []}
                onChange={(e) => {
                    const value = e.target.value;
                    if (onChangeSede) {
                        setSelectedSedeId(Number(value));
                        onChangeSede(Number(value));
                    }
                }}
            >
                {(sedesByCentros ?? []).map((sede) => (
                    <SelectItem key={sede.id}>{sede.nombre}</SelectItem>
                ))}
            </Select>
        </>
    );
};

export default BodegaFilter;
