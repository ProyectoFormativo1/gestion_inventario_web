import { Cargo } from "@/types/cargo";
import { Button } from "@heroui/button";

interface CargoListProps {
  items: Cargo[];
  onEdit: (item: Cargo) => void;
  onDelete: (item: Cargo) => void;
}

const CargoList = ({ items, onEdit, onDelete }: CargoListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase bg-gray-100 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Nombre</th>
            <th scope="col" className="px-6 py-3">Código</th>
            <th scope="col" className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-400">
                No hay cargos registrados
              </td>
            </tr>
          ) : (
            items.map((cargo) => (
              <tr
                key={cargo.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{cargo.id}</td>
                <td className="px-6 py-4">{cargo.nombre}</td>
                <td className="px-6 py-4 flex gap-2">
                  <Button size="sm" color="primary" onPress={() => onEdit(cargo)}>
                    Editar
                  </Button>
                  <Button size="sm" color="danger" onPress={() => onDelete(cargo)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CargoList;
