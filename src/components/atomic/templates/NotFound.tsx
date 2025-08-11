import { Link } from "react-router-dom";
import { routes } from "../../../routes/Routes";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
      <Link to={routes.home} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700">
        Volver a la página principal
      </Link>
    </div>
  );
  };
  
  export default NotFound;
  