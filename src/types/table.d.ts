interface TableLayoutProps {
    children: React.ReactNode[];
    tableHeader: readonly string[];
}

interface EnhancedTableHeadProps {
    tableHeader: readonly string[];
}

interface IPaginationProps {
    data: TTransfer[];
    page: number;
    rowsPerPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}