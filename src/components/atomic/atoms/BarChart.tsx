import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Dataset {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
}

interface BarChartProps {
    labels: string[];
    datasets: Dataset[];
}

const BarChart = ({ labels, datasets }: BarChartProps) => {
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
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default BarChart;