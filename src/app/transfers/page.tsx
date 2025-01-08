"use client";

// ReactJS
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Context
import { useSlideAction } from "@contexts/SlideActionContext";

// MUI
import { TableCell, TableRow } from "@mui/material";

// HOC
import { withAuth } from "@HOC/withAuth";

// Components
import { FilterTransfers } from "@components/Filters";
import Pagination from "@components/Pagination";
import { TableSkeleton } from "@components/Skeletons";
import TableActions from "@components/TableActions";
import TableLayout from "@components/TableLayout";

// Services
import { getTransfers } from "@services/transfers";

// Constants
import { HTransfers } from "@constants/headers";
import { UserRole } from "@constants/roles";

// Utils
import { formatterShortDate } from "@utils/functions";

function TransfersPage() {
    // Context
    const { open } = useSlideAction();

    // Translations
    const { t } = useTranslation();

    // States
    const [filter, setFilter] = useState<TFilterTransfer | null>(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Queries
    const { data: transfers, isLoading } = useQuery<TTransfer[]>({
        queryKey: ["transfers", open, filter],
        queryFn: () => getTransfers(filter)
            .then((res) => {
                return res?.data ?? [];
            })
            .catch(() => [])
    });

    // Constants
    const visibleRows = transfers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (isLoading) return <TableSkeleton />;

    return (
        <TableLayout tableHeader={HTransfers} module="transfers">
            <FilterTransfers key="Filter" setFilter={setFilter} />
            {visibleRows?.map((row) => (
                <TableRow key={row?.id} tabIndex={-1}>
                    <TableCell align="center">{row?.plate}</TableCell>
                    <TableCell align="center">
                        {row?.type === "Venta" && t("Transfers.Sale")}
                        {row?.type === "Cesión" && t("Transfers.Cession")}
                    </TableCell>
                    <TableCell align="center">{row?.client}</TableCell>
                    <TableCell align="center">{row?.transmitter}</TableCell>
                    <TableCell align="center">{formatterShortDate(new Date(row?.created_at))}</TableCell>
                    <TableCell align="center">
                        <TableActions module="transfers" params={{ id: row?.id }} />
                    </TableCell>
                </TableRow>
            ))}
            <Pagination
                data={transfers as TTransfer[]}
                key="Pagination"
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
            />
        </TableLayout>
    );
}


export default withAuth(TransfersPage, {
    requiredRoles: [UserRole.ADMIN, UserRole.USER, UserRole.GUEST],
});