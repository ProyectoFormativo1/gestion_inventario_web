
import GlobalTable, { Column } from '@/components/atomic/organisms/Table';
import { StatisticsMateriales } from '@/models/statistics';
import React from 'react';

interface StatisticsTableProps {
    items: StatisticsMateriales[];
}

const StatisticsTable: React.FC<StatisticsTableProps> = ({ items }) => {
    const columns: Column<StatisticsMateriales>[] = [
        { key: 'id', label: 'ID', sortable: true, filterable: true },
        { key: 'nombre', label: 'Nombre', sortable: true, filterable: true },
        { key: 'fecha_vencimiento', label: 'Fecha de Vencimiento', sortable: true, filterable: true },
        { key: 'stok', label: 'Stock', sortable: true, filterable: true },
        { key: 'bodegaNombre', label: 'Bodega', sortable: true, filterable: true },
    ];

    return (
        <>
            <h2 className="text-lg font-semibold mb-4">Materiales Próximos a Vencer</h2>
            <GlobalTable
                columns={columns}
                data={items.map(c => ({ ...c, key: c.id }))}
                rowsPerPage={5}
                defaultSortColumn="id"
            />
        </>

    );
};

export default StatisticsTable;