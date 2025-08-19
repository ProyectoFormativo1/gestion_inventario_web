import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Statistics } from "../../../models/statistics";
import { ArrowLongUpIcon,ChartBarIcon, CurrencyDollarIcon, ShoppingCartIcon, UsersIcon } from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";

interface StatisticsCardProps {
    data: Statistics;
}

const statisticsConfig = [
    { label: "Usuarios Activos", key: "totalActiveUsers", changeKey: "monthlyChangePercentageUsers", icon: UsersIcon },
    { label: "Total Productos", key: "totalProducts", changeKey: "monthlyChangePercentageProducts", icon: ShoppingCartIcon },
    { label: "Préstamos Activos", key: "totalActiveLoans", changeKey: "monthlyChangePercentageLoans", icon: CurrencyDollarIcon },
    { label: "Tasa de Devolución", key: "percentReturnCup", changeKey: "monthlyChangePercentageReturnCup", isPercentage: true, icon:  ChartBarIcon}
];

const StatisticsCard = ({ data }: StatisticsCardProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statisticsConfig.map(({ label, key, changeKey, isPercentage, icon: Icon }) => (
                <Card key={key} className="max-w-[340px] w-full">
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{label}</h4>
                                <h4 className="text-primary font-medium text-large">
                                    {data[key]} {isPercentage ? "%" : ""}
                                </h4>
                            </div>
                        </div>
                        <Button isIconOnly radius="full" variant="light" onPress={() => {}}>
                            <Icon />
                        </Button>
                    </CardHeader>
                    <CardFooter className="gap-3">
                        <div className="flex gap-1">
                            <ArrowLongUpIcon width={20} />
                            <p className="text-default-400 text-small">
                                {data[changeKey]}% más que el mes pasado
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default StatisticsCard;
