import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Statistics } from "../../../models/statistics";
import {
  ArrowDownIcon,
  ArrowLongUpIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@heroui/button";
import { Check, Package2Icon, PackageMinus, Wrench } from "lucide-react";

interface StatisticsCardProps {
  data: Statistics;
}

interface SubKeyConfig {
  path: string;
  label: string;
  icon?: any;
}

interface StatisticsConfigItem {
  label: string;
  key: string;
  changeKey?: string;
  changeKeyLabel?: string;
  icon: any;
  changeKeyIcon?: any;
  subKeys?: SubKeyConfig[];
  formatter?: (value: any) => {
    icon: any;
    className: string;
    text: string;
  };
}

const statisticsConfig: StatisticsConfigItem[] = [
  {
    label: "Total Materiales",
    key: "materiales.total",
    changeKey: "materiales.porcentajeCrecimiento",
    icon: Package2Icon,
    changeKeyLabel: "% más que el mes pasado",
    formatter: (value: number) => {
      const isPositive = value >= 0;
      const text = isPositive
        ? `+${value}% más que el mes pasado`
        : `${value}% menos que el mes pasado`;
      return {
        icon: isPositive ? ArrowLongUpIcon : ArrowDownIcon,
        className: isPositive ? "text-green-500" : "text-red-500",
        text: text,
      };
    },
  },
  {
    label: "Stock bajo",
    key: "reabastecimientos",
    changeKey: "reabastecimientos",
    changeKeyIcon: ArrowDownIcon,
    icon: PackageMinus,
     formatter: (value: number) => {
      const text = value <= 0 ? "No hay materiales que requieran reabastecimiento" : `${value} materiales requieren reabastecimiento`;
      return {
        icon:  value >0 ? Wrench: Check,
        className: value >0 ? "text-red-500": "text-green-500",
        text:text,
      };
    },
  },
  {
    label: "Movimientos hoy",
    key: "movimientosHoy.total",
    subKeys: [
      { path: "movimientosHoy.entradas", label: "Entradas", icon: ArrowLongUpIcon },
      { path: "movimientosHoy.salidas", label: "Salidas", icon: ArrowDownIcon },
    ],
    icon: ArrowTrendingUpIcon,
  },
];

function getValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

const StatisticsCard = ({ data }: StatisticsCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statisticsConfig.map(
        ({
          label,
          key,
          changeKey,
          changeKeyLabel,
          icon: Icon,
          changeKeyIcon,
          subKeys,
          formatter,
        }) => {
          return (
            <Card key={key} className="max-w-[440px] w-full">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {label}
                    </h4>
                    <h4 className="text-primary font-medium text-large">
                      {getValue(data, key)}
                    </h4>
                  </div>
                </div>
                <Button isIconOnly radius="full" variant="light">
                  <Icon />
                </Button>
              </CardHeader>

              <CardFooter className="flex flex-col gap-2 items-start">
                {subKeys ? (
                  subKeys.map(({ path, label, icon: SubIcon }) => {
                    const EffectiveIcon = SubIcon || ArrowLongUpIcon;
                    return (
                      <div key={path} className="flex gap-1 items-center">
                        <EffectiveIcon width={18} />
                        <p className="text-default-400 text-small">
                          {getValue(data, path)} {label}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  (() => {
                    const value = getValue(data, changeKey??"");
                    if (formatter) {
                      const { icon: DynamicIcon, className, text } =
                        formatter(value);
                      return (
                        <div className="flex gap-1 items-center">
                          <DynamicIcon width={18} className={className} />
                          <p className={`text-small ${className}`}>{text}</p>
                        </div>
                      );
                    }

                    const ChangeKeyIcon = changeKeyIcon || ArrowLongUpIcon;
                    return (
                      <div className="flex gap-1 items-center">
                        <ChangeKeyIcon width={18} />
                        <p className="text-default-400 text-small">
                          {value} {changeKeyLabel}
                        </p>
                      </div>
                    );
                  })()
                )}
              </CardFooter>
            </Card>
          );
        }
      )}
    </div>
  );
};

export default StatisticsCard;
