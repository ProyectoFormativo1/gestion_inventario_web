import React, { } from "react";
import { usePermisosByRol } from "@/hooks/use-permisos-by-rol";
import { Accordion, AccordionItem } from "@heroui/accordion";
import Loading from "@/components/atomic/atoms/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@heroui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@heroui/button";
import { capitalize } from "@/utils/capitalioze.util";
import { Switch } from "@heroui/switch";

interface RolPermisosMainProps { }

const RolPermisosMain: React.FC<RolPermisosMainProps> = () => {
    const { id } = useParams<{ id: string }>(); //Id de bodega seleccionada
    const navigate = useNavigate();
    const { data: permisos, isLoading, isError, createPermiso, deletePermiso } = usePermisosByRol(id ? parseInt(id) : null);
    return (
        <div className="flex-1 overflow-y-auto  bg-gray-50">
            <Card className="p-0 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                    <Button
                        variant="bordered"
                        color="primary"
                        startContent={<ArrowLeft />}
                        onPress={() => navigate(-1)}
                    >
                        Volver
                    </Button>
                    <h2 className="text-lg font-medium text-gray-800">Permisos</h2>
                </div>
                {isLoading && <Loading />}
                {isError && <div>Error al cargar permisos</div>}
                {permisos && (
                    <div className="p-4">
                        <Accordion variant="bordered" defaultExpandedKeys={["ciudad"]}>
                            {permisos.map((permiso) => (
                                <AccordionItem key={permiso.modulo} title={capitalize(permiso.modulo)}>
                                    <div>
                                        {permiso.permisos.map((permiso) => (
                                            <div key={permiso.id}>
                                                <Switch
                                                    defaultSelected={permiso.asignado}
                                                    color="success"
                                                    onValueChange={(value) => {
                                                        if (value) {
                                                            createPermiso({ rolId: Number(id), permisoId: permiso.id });
                                                        } else {
                                                            deletePermiso({ rolId: Number(id), permisoId: permiso.id });
                                                        }
                                                    }}
                                                >
                                                    {capitalize(permiso.descripcion)}
                                                </Switch>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default RolPermisosMain;
