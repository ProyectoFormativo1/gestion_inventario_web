import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
interface Dataset {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
}

interface LineChartProps {
    labels: string[];
    datasets: Dataset[];
    title?: string
}

const LineChart = ({ labels, datasets, title }: LineChartProps) => {
    const chartData = {
        labels,
        datasets: datasets.map(dataset => ({
            ...dataset,
            borderWidth: dataset.borderWidth ?? 1
        }))
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true },
            position: 'top' as const,
            title: {
                display: !!title,
                text: title,
            },
        },
    };
    return <Line data={chartData} options={options} />;
};

export default LineChart;