import { Link } from "react-router-dom";
import { routes } from "../../../routes/Routes";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">401</h1>
      <p className="text-xl text-gray-600 mb-8">No tienes permiso para acceder a esta página.</p>
      <Link to={routes.home} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700">
        Volver a la página principal
      </Link>
    </div>
  );
  };
  
  export default UnAuthorized;
  