import { Card, CardBody, CardHeader } from "@heroui/card";
import { Statistics } from "../../../models/statistics";
import BarChart from "../../atomic/atoms/BarChart";
import StatisticsTable from "./StatisticsTable";
import LineChart from "@/components/atomic/atoms/LineChart";

interface StatisticsChartProps {
    data: Statistics;
}

export const CHART_COLORS = {
    teal: 'rgb(0, 128, 128)',
        pink: 'rgb(255, 182, 193)',


        lime: 'rgb(50, 205, 50)',

    red: 'rgb(255, 99, 132)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    brown: 'rgb(165, 42, 42)',
    indigo: 'rgb(75, 0, 130)',
    orange: 'rgb(255, 159, 64)',
    gold: 'rgb(255, 215, 0)',
  };

const colores = Object.values(CHART_COLORS);

const StatisticsChart = ({ data }: StatisticsChartProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-10">
            <Card className=" w-full">
                <CardHeader className="justify-between">
                    <h4 className="text-small font-semibold leading-none text-default-600">Moviemintos Mensuales</h4>
                </CardHeader>
                <CardBody className="justify-between">
                    <BarChart
                        labels={[...new Set(
                            data.movimientoDatasets.reduce((acc, movimiento) => acc.concat(movimiento.data.map((item) => item.key)), [])
                        )]}
                        datasets={data.movimientoDatasets.map((movimiento, index) => ({
                            label: movimiento.label,
                            data: movimiento.data.map((item) => item.value),
                            backgroundColor: colores[index],
                            borderColor: colores[index],
                        }))
                    }
                    />
                </CardBody>
            </Card>
            <Card className="w-full">
                <CardBody className="justify-between">
                    <StatisticsTable items={data.proximosAVencer} />
                </CardBody>
            </Card>
        </div>
    );
};

export default StatisticsChart;
