"use client";

// ReactJS
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// MUI
import { TableCell, TableRow } from "@mui/material";

// HOC
import { withAuth } from "@HOC/withAuth";

// Components
import Pagination from "@components/Pagination";
import { TableSkeleton } from "@components/Skeletons";
import TableActions from "@components/TableActions";
import TableLayout from "@components/TableLayout";

// Services
import { getTransfers } from "@services/transfers";

// Constants
import { HTransfers } from "@constants/headers";
import { UserRole } from "@constants/roles";

function TransfersPage() {
    // Translations
    const { t } = useTranslation();

    // States
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Query
    const { data: transfers, isLoading } = useQuery<TTransfer[]>({
        queryKey: ["transfers"],
        queryFn: () => getTransfers()
            .then((res) => {
                return res?.data ?? [];
            })
            .catch(() => [])
    });

    // Constants
    const visibleRows = transfers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (isLoading) return <TableSkeleton />;

    return (
        <TableLayout tableHeader={HTransfers}>
            {visibleRows?.map((row) => (
                <TableRow key={row?.id} tabIndex={-1}>
                    <TableCell align="center">{row?.plate}</TableCell>
                    <TableCell align="center">{row?.type}</TableCell>
                    <TableCell align="center">{row?.client}</TableCell>
                    <TableCell align="center">{row?.transmitter}</TableCell>
                    <TableCell align="center">{row?.created_at}</TableCell>
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