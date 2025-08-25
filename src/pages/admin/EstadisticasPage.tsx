import { useStatistics } from "../../hooks/use-statistics";
import StatisticsCard from "../../components/admin/dashboard/StatisticsCard";
import CardLoading from "../../components/atomic/atoms/CardLoading";
import StatisticsChart from "../../components/admin/dashboard/StatisticsChart";
import { Alert } from "@heroui/alert";

const DashboardPage = () => {

  const { isLoading, isSuccess, data, error } = useStatistics();

  return (
    <>
      <h1>Hola Bienvenido a la administracion del sistema</h1>
      <p className="my-3 text-default-400 text-small">Vista general del sistema de gestion de bodegas</p>
      {error && (
        <div className="w-full flex items-center my-3">
          <Alert
            color="danger"
            title={`Ocurrio un error al intentar consultar la informacion`}
          />
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardLoading key={index} />
          ))}
        </div>
      )}

      {isSuccess && (
        <div>
          <StatisticsCard data={data} />
          <StatisticsChart data={data} />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
